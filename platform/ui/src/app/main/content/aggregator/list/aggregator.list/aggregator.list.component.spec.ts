import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Aggregator.ListComponent } from './aggregator.list.component';

describe('Aggregator.ListComponent', () => {
  let component: Aggregator.ListComponent;
  let fixture: ComponentFixture<Aggregator.ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Aggregator.ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Aggregator.ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
