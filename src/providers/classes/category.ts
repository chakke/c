import { Utils } from "../app-utils";

export class Category {
    id: number;
    titleVie: string;
    titleEng: string;
    keyword: string;
    constructor(id: number, titleVie: string, titleEng: string) {
        this.id = id;
        this.titleVie = titleVie;
        this.titleEng = titleEng;
        let shortTitle = titleVie.toLowerCase().split(' ').map(elm => { return elm.charAt(0) }).join('');
        this.keyword = titleVie.toLowerCase() + "._." + Utils.bodauTiengViet(titleVie.toLowerCase() + "._." + shortTitle);
    }
}