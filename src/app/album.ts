export class Album {
    id : string;
    note:number[];
    average?:number;
    ref: string;
    name : string;
    title : string;
    description: string;
    duration: number;
    status : string;
    url? : string;
    like? :string;
    tags?: Array<string>;
    random? :number;
}

export class List {
    id : string;
    list : string[];
}