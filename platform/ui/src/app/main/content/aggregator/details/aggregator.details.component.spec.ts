import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Aggregator.DetailsComponent } from './aggregator.details.component';

describe('Aggregator.DetailsComponent', () => {
  let component: Aggregator.DetailsComponent;
  let fixture: ComponentFixture<Aggregator.DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Aggregator.DetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Aggregator.DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
