
import { Utils } from '../app-utils'

const noImage = "http://www.nosun.co.za/wp-content/themes/sistina/core/assets/images/no-featured-175.jpg";
export class Food {
    title: string;
    price: number;
    image: string;
    description: string;
    wattingTime: number;
    keyWord: string;
    constructor(title: string, price?: number, image?: string, description?: string, wattingTime?: number) {
        this.title = title;
        this.price = (price ? price : 0);
        this.image = (image ? image : noImage);
        this.description = (description ? description : "");
        this.wattingTime = (wattingTime ? wattingTime : 0);
        let shortTitle = title.toLowerCase().split(' ').map(elm => { return elm.charAt(0) }).join('');
        this.keyWord = title.toLowerCase() + "._." + Utils.bodauTiengViet(title.toLowerCase() + "._."+ shortTitle);
    } 
}

export class OrderedFood extends Food {
    quantily: number;
    constructor(title: string, price?: number, image?: string, description?: string, wattingTime?: number, quantily?: number) {
        super(title, price, image, description, wattingTime);
        this.quantily = (quantily ? quantily : 0);
    }
}