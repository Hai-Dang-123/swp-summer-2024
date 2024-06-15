// create-sell-request.dto.ts
export class CreateSellRequestDto {
  address: string;
  role: string;
  sellForm: {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    initialOffer: number;
    hasOriginalBox: boolean;
    hasOriginalPapers: boolean;
    hasFactoryStickers: boolean;
    isLimitedEdition: boolean;
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
