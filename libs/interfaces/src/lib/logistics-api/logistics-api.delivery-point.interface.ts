export interface LogisticsApiDeliveryPoint {
  rows: Row[];
  meta: Meta;
}

export interface Meta {
  total: number;
  offset: number;
  limit: number;
}

export interface Row {
  id: string;
  providerKey: ProviderKey;
  type: number;
  availableOperation: number;
  cod: number;
  paymentCash: number;
  paymentCard: number;
  name: string;
  lat: number;
  lng: number;
  code: string;
  postIndex: string;
  countryCode: CountryCode;
  region: Region;
  regionType: RegionType;
  area: null | string;
  city: null | string;
  cityType: ItyType | null;
  cityGuid: null | string;
  community: null | string;
  communityType: ItyType | null;
  communityGuid: null | string;
  street: null | string;
  streetType: StreetType | null;
  house: string;
  address: string;
  block: null | string;
  office: null | string;
  enabled: boolean;
  url: null;
  email: null;
  phone: string;
  timetable: string;
  worktime: { [key: string]: Worktime };
  photos: null;
  fittingRoom: null;
  description: Description;
  metro: Metro[] | null;
  multiplaceDeliveryAllowed: number;
  codeOriginal: string;
  extra: any[];
  limits: Limits;
}

export enum ItyType {
  ItyTypeГ = 'г.',
  Г = 'г',
  Гп = 'гп',
  Д = 'д',
  Мкр = 'мкр',
  П = 'п',
  Пгт = 'пгт',
  Рп = 'рп',
  С = 'с',
  СтЦа = 'ст-ца',
  Тер = 'тер',
  Х = 'х',
}

export enum CountryCode {
  Ru = 'RU',
}

export enum Description {
  ВыдачаЗаказовОсуществляетсяНаКассеМагазинаПятёрочка = 'Выдача заказов осуществляется на кассе магазина «Пятёрочка»',
}

export interface Limits {
  maxSizeA: number;
  maxSizeB: number;
  maxSizeC: number;
  maxSizeSum: null;
  minWeight: null;
  maxWeight: number;
  maxCod: null;
  maxVolume: null;
}

export interface Metro {
  name: string;
  line: string;
  distance: number;
}

export enum ProviderKey {
  X5 = 'x5',
}

export enum Region {
  Астраханская = 'Астраханская',
  Брянская = 'Брянская',
  Владимирская = 'Владимирская',
  Калмыкия = 'Калмыкия',
  Калужская = 'Калужская',
  Краснодарский = 'Краснодарский',
  Ленинградская = 'Ленинградская',
  Мордовия = 'Мордовия',
  Москва = 'Москва',
  Московская = 'Московская',
  Нижегородская = 'Нижегородская',
  Ростовская = 'Ростовская',
  Рязанская = 'Рязанская',
  СанктПетербург = 'Санкт-Петербург',
  Свердловская = 'Свердловская',
  Смоленская = 'Смоленская',
  Ставропольский = 'Ставропольский',
  Тверская = 'Тверская',
  Тульская = 'Тульская',
  ЧувашскаяРеспублика = 'Чувашская Республика',
}

export enum RegionType {
  Г = 'г',
  Край = 'край',
  Обл = 'обл',
  Респ = 'Респ',
  Чувашия = 'Чувашия',
}

export enum StreetType {
  БР = 'б-р',
  Городок = 'городок',
  Д = 'д',
  Заезд = 'заезд',
  КвЛ = 'кв-л',
  Линия = 'линия',
  Мкр = 'мкр',
  Наб = 'наб',
  П = 'п',
  Пер = 'пер',
  Пл = 'пл',
  ПрКт = 'пр-кт',
  Проезд = 'проезд',
  С = 'с',
  Спуск = 'спуск',
  Тер = 'тер',
  Ул = 'ул',
  Ш = 'ш',
}

export enum Worktime {
  The00002330 = '00:00/23:30',
  The00002345 = '00:00/23:45',
  The00002359 = '00:00/23:59',
  The04002345 = '04:00/23:45',
  The06000000 = '06:00/00:00',
  The06002300 = '06:00/23:00',
  The06302200 = '06:30/22:00',
  The07000000 = '07:00/00:00',
  The07002100 = '07:00/21:00',
  The07002200 = '07:00/22:00',
  The07002300 = '07:00/23:00',
  The07002345 = '07:00/23:45',
  The07302100 = '07:30/21:00',
  The07302130 = '07:30/21:30',
  The07302200 = '07:30/22:00',
  The07302230 = '07:30/22:30',
  The07302300 = '07:30/23:00',
  The07302330 = '07:30/23:30',
  The07302345 = '07:30/23:45',
  The08002100 = '08:00/21:00',
  The08002130 = '08:00/21:30',
  The08002200 = '08:00/22:00',
  The08002230 = '08:00/22:30',
  The08002300 = '08:00/23:00',
  The08002330 = '08:00/23:30',
  The08302200 = '08:30/22:00',
  The08302230 = '08:30/22:30',
  The08302300 = '08:30/23:00',
  The09002100 = '09:00/21:00',
  The09002200 = '09:00/22:00',
  The09002300 = '09:00/23:00',
  The10002200 = '10:00/22:00',
}
