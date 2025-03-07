import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Custom5Component } from './custom5.component';

describe('Custom5Component', () => {
  let component: Custom5Component;
  let fixture: ComponentFixture<Custom5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Custom5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Custom5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
