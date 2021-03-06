import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWarehouseComponent } from './detail-warehouse.component';

describe('DetailWarehouseComponent', () => {
  let component: DetailWarehouseComponent;
  let fixture: ComponentFixture<DetailWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
