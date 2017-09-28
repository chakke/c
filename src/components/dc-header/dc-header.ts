import { Component, Input } from '@angular/core';

@Component({
  selector: 'dc-header',
  templateUrl: 'dc-header.html'
})
export class DcHeaderComponent {

  @Input()
  placholder = "Tìm kiếm món ăn, dịch vụ, khuyến mãi";
  @Input()
  showSearchBar = true;
  @Input()
  title = "Bistro Dancer"
  constructor() { 
  }

}
