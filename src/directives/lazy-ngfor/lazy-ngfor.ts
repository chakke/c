// import {
//   Directive, TemplateRef, Input, ChangeDetectorRef, ViewContainerRef,
//   IterableDiffers, OnChanges, SimpleChanges, SimpleChange
// } from '@angular/core';
// import { NgForOf, NgForOfContext } from "@angular/common";
// // import { NgForRow } from "@angular/common/src/directives/ng_for_of";

// @Directive({
//   selector: '[ngForIn]'
// })
// export class NgForIn<T> extends NgForOf<T> implements OnChanges {

//   @Input() ngForIn: any;
//   @Input() debounceTime: number;

//   constructor(viewContainer: ViewContainerRef,
//     template: TemplateRef<NgForOfContext<T>>,
//     differs: IterableDiffers) {

//     super(viewContainer, template, differs);
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if ('ngForIn' in changes) {
//       const value = this.ngForIn;

//       const previousValue = changes['ngForIn'].previousValue;
//       let newPreviousValue: Iterable<any>;
//       let newValue: Iterable<any>;

//       if (value instanceof Map) {
//         // Map: iterate over an Array of its keys
//         newValue = value && value.keys ? Array.from(value.keys()) : [];
//         newPreviousValue = previousValue && previousValue.keys ? Array.from(previousValue.keys()) : [];
//       }
//       else if (value instanceof Object) {
//         // Object: iterate over an Array of its keys
//         // This also includes Arrays, in which case we will iterate over its indexes
//         newValue = value && Object.keys(value);
//         newPreviousValue = previousValue && Object.keys(previousValue);
//       }
//       else if ((value !== undefined) && (value !== null) && ((<any>value).length !== undefined)) {
//         // For any other value with a "length" property, iterate over the indexes of an Array of that length
//         newValue = Object.keys(Array.from({ length: (<any>value).length }));
//         newPreviousValue = Object.keys(Array.from({ length: (<any>previousValue).length }));
//       }
//       else {
//         throw new Error(`Error trying to get iterable properties from ${value}`);
//       }

//       this.ngForOf = newValue;

//       changes['ngForOf'] = new SimpleChange(newPreviousValue, newValue, false);
//       super.ngOnChanges(changes);
//     }
//   }
 
// }