import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerstoreComponent } from './customerstore.component';

describe('CustomerstoreComponent', () => {
  let component: CustomerstoreComponent;
  let fixture: ComponentFixture<CustomerstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
