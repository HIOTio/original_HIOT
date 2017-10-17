import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <button routerLink="/device/{{value._id}}" mat-button>View Device</button>
  `,
  styleUrls  : ["./device_list.component.scss"]
})
export class ViewRenderComponent implements ViewCell, OnInit {


  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {

  }

}