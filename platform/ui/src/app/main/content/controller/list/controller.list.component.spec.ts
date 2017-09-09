import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Controller.ListComponent } from './controller.list.component';

describe('Controller.ListComponent', () => {
  let component: Controller.ListComponent;
  let fixture: ComponentFixture<Controller.ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Controller.ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Controller.ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
