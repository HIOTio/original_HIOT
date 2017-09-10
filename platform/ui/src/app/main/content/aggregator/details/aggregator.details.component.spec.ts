import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorDetailsComponent } from './aggregator.details.component';

describe('Aggregator.DetailsComponent', () => {
  let component: AggregatorDetailsComponent;
  let fixture: ComponentFixture<AggregatorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregatorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
