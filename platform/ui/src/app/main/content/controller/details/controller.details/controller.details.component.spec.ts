import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Controller.DetailsComponent } from './controller.details.component';

describe('Controller.DetailsComponent', () => {
  let component: Controller.DetailsComponent;
  let fixture: ComponentFixture<Controller.DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Controller.DetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Controller.DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
