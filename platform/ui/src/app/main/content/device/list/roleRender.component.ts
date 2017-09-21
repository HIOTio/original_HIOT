import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <div>
  <i [ngClass]="value.isAggregator ? '_hasfunction' : '_doesnothaveFunction'" class="fa fa-list-ol"></i>
  <i [ngClass]="value.isBroker ? '_hasfunction' : '_doesnothaveFunction'" class="fa fa-handshake-o"></i>
  <i [ngClass]="value.hasSensors ? '_hasfunction' : '_doesnothaveFunction'" class="fa fa-thermometer-empty"></i>
  <i [ngClass]="value.isController ? '_hasfunction' : '_doesnothaveFunction'" class="fa fa-play"></i>
  <i [ngClass]="value.isCoordinator ? '_hasfunction' : '_doesnothaveFunction'" class="fa fa-object-group"></i>
  </div>
  `,
  styleUrls  : ["./device_list.component.scss"]
})
export class RoleRenderComponent implements ViewCell, OnInit {


  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {

  }

}