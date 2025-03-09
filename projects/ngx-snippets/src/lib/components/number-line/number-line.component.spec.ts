import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberLineComponent } from './number-line.component';

describe('NumberLineComponent', () => {
  let component: NumberLineComponent;
  let fixture: ComponentFixture<NumberLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
