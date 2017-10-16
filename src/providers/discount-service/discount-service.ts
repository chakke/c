import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Discount } from '../classes/discount';

@Injectable()
export class DiscountServiceProvider {
  discounts: Array<Discount> = []
  constructor(public http: Http) {
    console.log('Hello DiscountServiceProvider Provider');
    let content = `<p>Dancer kính gửi tới quý khách hàng chương trình khuyến mãi dành riêng cho các VIP NHÍ khi cùng 
    cha mẹ tới nhà hàng vào dịp Tết Trung thu.</p>
    <p>CHƯƠNG TRÌNH ÁP DỤNG TỪ NGÀY 2/10/2017 đến hết ngày 8/10/2017.</p> 
    <p>VỚI TRẺ EM:</p>
    <p>- Tặng 1 bimbim Poca / 1 trẻ em</p>
    <p>- Tặng 1 bóng bay / 1 trẻ em</p> 
    <p> <i>(Áp dụng vào ngày duy nhất 4/10/2017)</i> </p>
    <p>VỚI CHA MẸ</p>
    <p>- Dùng 2 sữa chua (các vị) tặng 1 bánh caramen</p>
    <p>- Dùng 2 nước cam tặng 1 nước chanh leo</p>
    <p>- Dùng 2 hoa quả dần tặng 1 nước chanh tươi</p>
    <p>- Dùng 2 ly kem 3 viên tặng 1 ly kem 1 viên</p>
    <p><b><i>Rất hận hạnh được đón tiếp</i></b></p> `;
    for (let i = 0; i < 10; i++) {
      this.discounts.push(new Discount("Khuyến mãi tưng bừng đón Tết Trung thu", 'http://mmosite.vn/uploads/2014/09/05/MC/Ron%20rang%20xu%20Boom%20mua%20Tet%20Trung%20thu.jpg', new Date("2017-10-02"), new Date("2017-10-08"), content));
    }
  }

  getAllDiscount() {
    return this.discounts;
  }

  addDiscount(discount: Discount) {
    this.discounts.push(discount);
  }

}
