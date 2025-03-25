import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberLineComponent } from './number-line.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

describe('NumberLineComponent', () => {
  it('Should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  describe('Should render number', () => {
    it('Has digit', async () => {
      const { getDigit } = await setup();
      expect(getDigit()).toBeTruthy();
    });

    it('Rendered digit', async () => {
      const { getDigit } = await setup();
      expect(getDigit().nativeElement.innerHTML.trim()).toBe('1');
    });
  });

  describe('Should handle click correctly', () => {
    it('Should apply class properly', async () => {
      const { fixture, getDigit, getNumberLine } = await setup();
      const digit = getDigit();
      digit.triggerEventHandler('click', {});
      fixture.detectChanges();
      expect(
        getDigit().nativeElement.classList.contains('selected-digit')
      ).toBeTrue();

      expect(
        getNumberLine().nativeElement.classList.contains('selected-line-number')
      ).toBeTrue();
    });
  });
});

async function setup() {
  @Component({
    selector: 'omni-number-line',
    template: ` <div
      class="number-line"
      [ngClass]="{ 'selected-line-number': selected }"
    >
      <span
        class="digit"
        [ngClass]="{ 'selected-digit': selected }"
        (click)="selectLine()"
        >{{ number }}
      </span>
    </div>`,
    imports: [NgClass],
    providers: [
      {
        provide: NumberLineComponent, // When the parent component is using ViewChild...
        useExisting: NumberLineComponentStub,
      },
    ],
    standalone: true,
  })
  class NumberLineComponentStub extends NumberLineComponent {
    override selectLine(): void {
      this.selected = true;
    }
  }

  @Component({
    standalone: true,
    imports: [NumberLineComponentStub],
    template: `<omni-number-line [number]="1"></omni-number-line>`,
  })
  class TestHost {}

  const fixture: ComponentFixture<TestHost> = TestBed.createComponent(TestHost);
  const debugElement = fixture.debugElement.query(
    By.directive(NumberLineComponent)
  );
  const component: NumberLineComponent = debugElement.componentInstance;
  const getDigit = () => fixture.debugElement.query(By.css('.digit'));
  const getNumberLine = () =>
    fixture.debugElement.query(By.css('.number-line'));

  fixture.detectChanges();

  return {
    fixture,
    debugElement,
    component,
    getDigit,
    getNumberLine,
  };
}
