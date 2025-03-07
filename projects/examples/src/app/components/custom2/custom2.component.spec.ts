import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Custom2Component } from './custom2.component';

describe('Custom2Component', () => {
  let component: Custom2Component;
  let fixture: ComponentFixture<Custom2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Custom2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Custom2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
