type CarOptions = {
  airbags?: string[];
  coolingAndHeating?: string[];
  security?: string[];
  entertainment?: string[];
  comfortInterior?: string[];
  comfortExterior?: string[];
  emission?: string[];
  other?: string[];
  exterior?: string[];
  interior?: string[];
  sales?: string[];
  safety?: string[];
  lighting?: string[];
};

type IDealer = {
  dealerId?: string;
  dealerName?: string;
  dealerAddress?: string;
  dealerPhone?: string;
  dealerEmail?: string;
};

type ICarPageProps = {
  coverImages: File[];
  carNameModel: string;
  inc_btw_price: string;
  excl_btw_price: string;
  excl_bpm_btw_price: string;
  carMileage: string;
  carTransmission: string;
  carFuel: string;
  carPower: string;
  carEngineCapacity: string;
  carERD: string;
  carVat: string;
  carColor: string;
  carVanish: string;
  carBody: string;
  carNumberOfDoors: string;
  carWeight: string;
  damages: { title: string; text: string }[];
  options: CarOptions;
  dealerInfo: IDealer | string;
};

export { type ICarPageProps };
