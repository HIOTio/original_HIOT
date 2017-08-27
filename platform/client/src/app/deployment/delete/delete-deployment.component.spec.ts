import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DeleteDeploymentComponent } from "./delete-deployment.component";

describe("DeleteDeploymentComponent", () => {
  let component: DeleteDeploymentComponent;
  let fixture: ComponentFixture<DeleteDeploymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDeploymentComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
