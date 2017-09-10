import { Component, OnInit, Input } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Ng2SmartTableModule, LocalDataSource  } from 'ng2-smart-table';
import { AggregatorService} from "../aggregator.service";
@Component({
  selector: 'aggregator-list',
  templateUrl: './aggregator.list.component.html',
  styleUrls: ['./aggregator.list.component.css'],
  providers:[
    AggregatorService]
})
export class AggregatorListComponent implements OnInit {

  @Input() ids: any[];
  private aggregators: LocalDataSource;
  constructor(private aggregatorService: AggregatorService) { }

  ngOnInit() {
    this.aggregatorService.fromList(this.ids)
    .subscribe((data)=>{
      this.aggregators = new LocalDataSource(data);
      this.aggregators.load(data);

    })
  }
  settings={
    columns: {
      _id: {
        editable:false,
        title: 'ID'
      },
      name: {
        editable:false,
        title: 'Name'
      },
      description: {
        editable:false,
        title: 'Description'
      },
      channel: {
        editable:false,
        title: 'MQTT Topic'
      }
    }
  }
  
}
