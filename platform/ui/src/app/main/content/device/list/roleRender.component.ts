import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
  <div>
  <i [ngClass]="value.isAggregator ? '_hasfunction' : '_doesnothaveFunction'" matTooltip="This device is {{value.isAggregator? '':'not '}} an aggregator" class="fa fa-list-ol"></i>
  <i [ngClass]="value.isBroker ? '_hasfunction' : '_doesnothaveFunction'" matTooltip="This device is {{value.isBroker? '':'not '}} a broker" class="fa fa-handshake-o"></i>
  <i [ngClass]="value.hasSensors ? '_hasfunction' : '_doesnothaveFunction'" matTooltip="{{value.sensors.length}} sensors attached" class="fa fa-thermometer-empty"></i>
  <i [ngClass]="value.isController ? '_hasfunction' : '_doesnothaveFunction'" matTooltip="{{value.controllers.length}} controllers attached" class="fa fa-play"></i>
  <i [ngClass]="value.isCoordinator ? '_hasfunction' : '_doesnothaveFunction'" matTooltip="This device is {{value.isCoordinator? '':'not '}}a coordinator" class="fa fa-object-group"></i>
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