import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Custom3Component } from './custom3.component';

describe('Custom3Component', () => {
  let component: Custom3Component;
  let fixture: ComponentFixture<Custom3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Custom3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Custom3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
