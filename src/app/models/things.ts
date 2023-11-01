export class Thing {
    id: number | undefined = 0;
    name: string = '';
    createdAt: string = '';
    updatedAt: string = '';
    userid: number | undefined;
    unit_weight: string = '';
    createdAt_date: Date = new Date();
    updatedAt_date: Date = new Date();
    icon: string = ''
    user: string = ''
  }

  export class Alcoholic {
    id: number | undefined = 0;
    name: string = '';
    createdAt: string = '';
    updatedAt: string = '';
    userid: number | undefined;
    unit_weight: string | undefined;
    country: string | undefined;
    region: string | undefined;
    year: number | undefined;
    grapes: string[] | undefined;
    createdAt_date: Date = new Date();
    updatedAt_date: Date = new Date();
    icon: string = ''
    user: string = ''
  }

  export class Food {
    id: number | undefined = 0;
    name: string = '';
    createdAt: string = '';
    updatedAt: string = '';
    userid: number | undefined;
    unit_weight: string = '';
    vacuumed: boolean = false;
    sealed: boolean = false;
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
    unit_weight: string = '';
    weight: number | undefined;
    createdAt_date: Date = new Date();
    updatedAt_date: Date = new Date();
    icon: string = ''
    user: string = ''
  }

  export class Nonfood {
    id: number | undefined = 0;
    name: string = '';
    createdAt: string = '';
    updatedAt: string = '';
    userid: number | undefined;
    unit_weight: string = '';
    createdAt_date: Date = new Date();
    updatedAt_date: Date = new Date();
    icon: string = ''
    user: string = ''
  }

  export class Object2Subplace {
    objectid: number | undefined = 0;
    subplaceid: number | undefined;
    weight: number | undefined;
    count: number | undefined;
    userid: number | undefined;
  }