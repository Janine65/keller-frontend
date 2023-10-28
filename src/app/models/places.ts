export class Place {
    id: number | undefined = 0;
    name: string = '';
    type: PlaceType = PlaceType[""];
    createdAt: string = '';
    updatedAt: string = '';
    userid: number | undefined;
    createdAt_date: Date = new Date();
    updatedAt_date: Date = new Date();
    user: string = ''
  }

  export enum PlaceType { '', 'tiefkuehl', 'kuehl', 'offen'}