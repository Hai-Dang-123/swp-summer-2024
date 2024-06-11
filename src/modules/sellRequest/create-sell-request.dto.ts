// create-sell-request.dto.ts
export class CreateSellRequestDto {
    address: string;
    sellForm: {
      initialOffer: number;
      sellMethod: string;
      hasOriginalBox: boolean;
      hasOriginalPapers: boolean;
      purchasedFromWatchfinder: boolean;
      hasFactoryStickers: boolean;
      watchYear: number;
      isLimitedEdition: boolean;
      customsCheckOption: string;
      minimumServicingFee: number;
      total: number;
    };
    watchForm: {
      name: string;
      image: string;
      description: string;
      modelNumber: string;
      serialNumber: string;
      type: string;
      caseMaterial: string;
      braceletMaterial: string;
      caseColor: string;
      dialColor: string;
      caseSize: string;
      yearOfManufacture: string;
      limitedEdition: boolean;
      marketValue: number;
    };
  }
  