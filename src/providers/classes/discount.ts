export class Discount {
    title: string;
    image: string;
    startTime: Date;
    endTime: Date;
    content: string;
    constructor(title: string, image: string, startTime: Date, endTime: Date, content: string) {
        this.title = title;
        this.image = image;
        this.startTime = startTime;
        this.endTime = endTime;
        this.content = content;
    }
}