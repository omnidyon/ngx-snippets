import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Custom4Component } from './custom4.component';

describe('Custom4Component', () => {
  let component: Custom4Component;
  let fixture: ComponentFixture<Custom4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Custom4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Custom4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
