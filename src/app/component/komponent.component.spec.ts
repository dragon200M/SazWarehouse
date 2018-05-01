import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KomponentComponent } from './komponent.component';

describe('ComponentComponent', () => {
  let component: KomponentComponent;
  let fixture: ComponentFixture<KomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
