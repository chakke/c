import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dc-header',
  templateUrl: 'dc-header.html'
})
export class DcHeaderComponent {
  searchKeyword = "";
  backButtons = ["ios-arrow-round-back-outline", "ios-close-outline"]
  @Input()
  placholder = "Tìm kiếm món ăn, dịch vụ, khuyến mãi";
  @Input()
  showSearchBar = true;
  @Input()
  title = "Bistro Dancer";
  @Input()
  showBackButton = false;

  //Just use 1 in 2 following propertives
  @Input()
  backButtonType = 0;
  @Input()
  backButton = "ios-arrow-round-back-outline";

  @Output()
  onSearch = new EventEmitter<string>();
  constructor() {
  }
  ngAfterViewInit() {
    this.backButton = this.backButtons[this.backButtonType];
  }
  search() {
    this.onSearch.emit(this.searchKeyword);
  }

}
