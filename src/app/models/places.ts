import { IconName } from "@fortawesome/fontawesome-svg-core";

export class Place {
    id: number | undefined = 0;
    name: string = '';
    placetypeid: number | undefined = 0;
    placetype: string = '';
    createdAt: string = '';
    updatedAt: string = '';
    userid: number | undefined;
    createdAt_date: Date = new Date();
    updatedAt_date: Date = new Date();
    icon: IconName | undefined;
    user: string = ''
  }

  export class Placetype {
    id: number | undefined = 0;
    name: string = '';
    icon: IconName | undefined;
    createdAt: string = '';
    updatedAt: string = '';
    userid: number | undefined;
    createdAt_date: Date = new Date();
    updatedAt_date: Date = new Date();
    user: string = ''
  }

  export class Subplace {
    id: number | undefined = 0;
    name: string = '';
    placeid: number | undefined = 0;
    createdAt: string = '';
    updatedAt: string = '';
    userid: number | undefined;
    createdAt_date: Date = new Date();
    updatedAt_date: Date = new Date();
    place: string = ''
    user: string = ''
  }

   export const Icons: IconName[] = [
    'snowflake',
    'temperature-low',
    'tree-city',
    'door-closed',
  ]