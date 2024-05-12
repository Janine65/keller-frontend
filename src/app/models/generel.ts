import { IconName } from "@fortawesome/fontawesome-svg-core";

export class DropdownClass {
    label: string = '';
    icon: IconName | undefined; 
    value: string | number | undefined;
}

export class ReturnStruct {
    data: undefined | {} | [] | string;
    message: string = '';
}