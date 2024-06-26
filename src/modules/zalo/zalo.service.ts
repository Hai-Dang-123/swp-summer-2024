import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import qs from 'qs';
import * as donenv from 'dotenv';
import * as crypto from 'crypto';
import { ZaloPayEntity } from './zalo.entity';
import { BaseService } from 'src/common/base/service.base';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
donenv.config();

const config = {
  app_id: process.env.ZALO_PAY_APP_ID,
  key1: process.env.ZALO_PAY_KEY1,
  key2: process.env.ZALO_PAY_KEY2,
};

export type ZaloPayRefund = {
  zp_trans_id: string;
  amount: number;
  description: string;
};
export type ZaloPayRefundStatus = {
  app_id: number;
  m_refund_id: string;
  timestamp: number;
  mac: string;
};

@Injectable()
export class ZaloPayService extends BaseService<ZaloPayEntity> {
  constructor(
    @InjectRepository(ZaloPayEntity)
    private readonly ZaloPayEntity: Repository<ZaloPayEntity>,
  ) {
    super(ZaloPayEntity);
  }

  async createOrder(total: number): Promise<any> {
    const endpoint = 'https://sb-openapi.zalopay.vn/v2/create';
    const embed_data = {
      preferred_payment_method: [],
    };
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: 'TIENNT',
      app_time: Date.now(), // miliseconds
      item: JSON.stringify([{}]),
      embed_data: JSON.stringify(embed_data),
      amount: total,
      description: `SKIRA - Thanh toán đơn hàng #${transID}`,
      // bank_code: 'zalopayapp',
      bank_code: '',
      mac: '',
      callback_url: `${process.env.ZALO_PAY_CALLBACK}`,
    };
    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const mac =
      config.app_id +
      '|' +
      order.app_trans_id +
      '|' +
      order.app_user +
      '|' +
      order.amount +
      '|' +
      order.app_time +
      '|' +
      order.embed_data +
      '|' +
      order.item;
    order.mac = CryptoJS.HmacSHA256(mac, config.key1).toString();
    // console.log("order", order);

    return await axios
      .post(endpoint, null, { params: order })
      .then((res) => {
        return {
          payment: res.data,
          info: order,
        };
      })
      .catch((err) => console.log(err));
  }

  async getOrderStatus(data: any): Promise<any> {
    const endpoint = 'https://sb-openapi.zalopay.vn/v2/query';
    const postData = {
      app_id: config.app_id,
      app_trans_id: data.app_trans_id, // Input your app_trans_id
      mac: '',
    };
    const mac =
      postData.app_id + '|' + postData.app_trans_id + '|' + config.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(mac, config.key1).toString();
    const postConfig = {
      method: 'post',
      url: endpoint,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(postData),
    };
    return await axios(postConfig)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  async refund(payload: ZaloPayRefund): Promise<any> {
    const timestamp = Date.now();
    const uid = `${timestamp}${Math.floor(111 + Math.random() * 999)}`;

    const params = {
      app_id: 2554,
      m_refund_id: `${moment().format('YYMMDD')}_${2554}_${uid}`,
      timestamp, // miliseconds
      zp_trans_id: payload.zp_trans_id,
      amount: payload.amount,
      description: payload.description,
      mac: '',
    };

    // app_id|zp_trans_id|amount|description|timestamp
    const pre =
      params.app_id +
      '|' +
      params.zp_trans_id +
      '|' +
      params.amount +
      '|' +
      params.description +
      '|' +
      params.timestamp;
    params.mac = crypto
      .createHmac('sha256', config.key1)
      .update(pre)
      .digest('hex');

    const data = JSON.stringify({
      app_id: 2554,
      m_refund_id: params.m_refund_id,
      zp_trans_id: params.zp_trans_id,
      amount: params.amount,
      timestamp: params.timestamp,
      description: params.description,
      mac: params.mac,
    });

    console.log(data);

    const setup = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://sb-openapi.zalopay.vn/v2/refund',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: data,
    };

    return await axios(setup)
      .then((response) => {
        console.log(response.data);
        return {
          response: response.data,
          data: data,
        };
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getRefundStatus(params: ZaloPayRefundStatus): Promise<any> {
    const endpoint = 'https://sb-openapi.zalopay.vn/v2/query_refund';
    const data =
      config.app_id + '|' + params.m_refund_id + '|' + params.timestamp; // app_id|m_refund_id|timestamp
    params.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

    const url = new URL(endpoint);
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key]),
    );

    fetch(url, { method: 'POST' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json(); // Parse response data as JSON
      })
      .then((data) => {
        console.log('Response data:', data);
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }
}
