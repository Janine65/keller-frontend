export class Thing {
  id: number | undefined = 0;
  name: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  userid: number | undefined;
  weight: string = '';
  thing_type: string = '';
  shop: string = '';
  createdAt_date: Date = new Date();
  updatedAt_date: Date = new Date();
  user: string = ''
}

export class Alcoholic {
  id: number | undefined = 0;
  name: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  userid: number | undefined;
  weight: string | undefined;
  country: string | undefined;
  region: string | undefined;
  year: number | undefined;
  grapes: string[] | undefined;
  type: string | undefined;
  thing_type: string = 'alcoholic';
  shop: string = '';
  createdAt_date: Date = new Date();
  updatedAt_date: Date = new Date();
  year_date: Date | undefined;
  user: string = ''
}

export class Food {
  id: number | undefined = 0;
  name: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  userid: number | undefined;
  weight: string = '';
  vacuumed: boolean = false;
  sealed: boolean = false;
  thing_type: string = 'food';
  shop: string = '';
  createdAt_date: Date = new Date();
  updatedAt_date: Date = new Date();
  icon: string = ''
  user: string = ''
}

export class Nonalcoholic {
  id: number | undefined = 0;
  name: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  userid: number | undefined;
  weight: string = '';
  thing_type: string = 'nonalcoholic'
  shop: string = '';
  createdAt_date: Date = new Date();
  updatedAt_date: Date = new Date();
  user: string = ''
}

export class Nonfood {
  id: number | undefined = 0;
  name: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  userid: number | undefined;
  weight: string = '';
  thing_type: string = 'nonfood';
  shop: string = '';
  createdAt_date: Date = new Date();
  updatedAt_date: Date = new Date();
  user: string = ''
}

export class Object2Subplace {
  id: number | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  alcoholicid: number | undefined;
  foodid: number | undefined;
  nonalcoholicid: number | undefined;
  nonfoodid: number | undefined;
  subplaceid: number | undefined;
  weight: number | undefined;
  count: number | undefined;
  userid: number | undefined;
  shopped_at: string | undefined;
  valid_until: string | undefined;
  valid_until_date: Date | undefined;
  shopped_at_date: Date | undefined;
}

export interface ListElement {
  name: string;
  code: string;
}

export const WineType = [
  {type:"red", label: "Red"}, {type:"rose", label: "Rose"}, {type: "white", label: "White"}, {type: "sparkling", label: "Sparkling"}
]

export const Grapes = [
  {
    label: 'A-C',
    items: [
      { label: 'Airén' },
      { label: 'Alicante Bouschet' },
      { label: 'Aligoté' },
      { label: 'Aramon noir' },
      { label: 'Blauer Portugieser' },
      { label: 'Bobal' },
      { label: 'Cabernet franc' },
      { label: 'Cabernet Sauvignon' },
      { label: 'Cardinal' },
      { label: 'Carignan[10]' },
      { label: 'Catarratto bianco comune' },
      { label: 'Catarratto bianco lucido' },
      { label: 'Cayetana blanca' },
      { label: 'Cereza' },
      { label: 'Chardonnay' },
      { label: 'Chelva' },
      { label: 'Chenin blanc' },
      { label: 'Cinsault' },
      { label: 'Colombard' },
      { label: 'Concord' },
      { label: 'Criolla grande' },
    ]
  },
  {
    label: 'D-J',
    items: [
      { label: 'Fernão Pires' },
      { label: 'Gamay' },
      { label: 'Garganega' },
      { label: 'Gewürztraminer' },
      { label: 'Grauburgunder' },
      { label: 'Grenache noir' },
      { label: 'Grüner Veltliner' },
      { label: 'Gutedel' },
      { label: 'Isabella' },]
  },
  {
    label: 'K-N',
    items: [
      { label: 'Kadarka' },
      { label: 'Macabeo' },
      { label: 'Malbec' },
      { label: 'Melon de Bourgogne' },
      { label: 'Mencia' },
      { label: 'Merlot' },
      { label: 'Monastrell + Mourvèdre' },
      { label: 'Muscat blanc à petits grains' },
      { label: 'Muscat de Hambourg' },
      { label: 'Muskat Alexandrien' },
      { label: 'Nebbiolo' },
      { label: 'Negroamaro' },
      { label: 'Nero d\'Avola' },
      { label: 'Neuburger' },
      { label: 'Nuragus' },
    ]
  },
  {
    label: 'O-R',
    items: [
      { label: 'País' },
      { label: 'Palomino' },
      { label: 'Pardillo' },
      { label: 'Parellada' },
      { label: 'Pedro Giménez' },
      { label: 'Pedro Ximénez' },
      { label: 'Pinot noir' },
      { label: 'Rebsorte' },
      { label: 'Regina' },
      { label: 'Riesling' },
      { label: 'Rivaner' },
      { label: 'Rkatsiteli' },
      { label: 'Ruby Cabernet' },
    ]
  },
  {
    label: 'S-Z',
    items: [
      { label: 'Sangiovese' },
      { label: 'Sauvignon blanc' },
      { label: 'Schwarzriesling' },
      { label: 'Sémillon' },
      { label: 'Silvaner' },
      { label: 'Sultana' },
      { label: 'Syrah' },
      { label: 'Tempranillo' },
      { label: 'Trebbiano + Variationen' },
      { label: 'Vernatsch' },
      { label: 'Weißburgunder' },
      { label: 'Welschriesling' },
      { label: 'Xarel·lo' },
      { label: 'Zinfandel' },
    ]
  },
]