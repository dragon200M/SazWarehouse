import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationOnMainComponent } from './operation-on-main.component';

describe('OperationOnMainComponent', () => {
  let component: OperationOnMainComponent;
  let fixture: ComponentFixture<OperationOnMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationOnMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationOnMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
