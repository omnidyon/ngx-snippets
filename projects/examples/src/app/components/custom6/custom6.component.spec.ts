import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Custom6Component } from './custom6.component';

describe('Custom6Component', () => {
  let component: Custom6Component;
  let fixture: ComponentFixture<Custom6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Custom6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Custom6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
