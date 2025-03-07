import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Custom7Component } from './custom7.component';

describe('Custom7Component', () => {
  let component: Custom7Component;
  let fixture: ComponentFixture<Custom7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Custom7Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Custom7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
