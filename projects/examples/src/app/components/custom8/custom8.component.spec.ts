import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Custom8Component } from './custom8.component';

describe('Custom8Component', () => {
  let component: Custom8Component;
  let fixture: ComponentFixture<Custom8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Custom8Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Custom8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
