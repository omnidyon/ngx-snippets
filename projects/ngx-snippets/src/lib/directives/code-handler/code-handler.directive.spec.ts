import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeHandlerDirective } from './code-handler.directive';
import {
  Component,
  Directive,
} from '@angular/core';
import { By } from '@angular/platform-browser';

@Directive({
  selector: '[stud]',
})
class StudDirective extends CodeHandlerDirective {}

describe('CodeHandlerDirective', () => {
  it('Should create an instance', () => {
    const { directive } = setup();
    expect(directive).toBeTruthy();
  });
});

function setup() {
  @Component({
    standalone: true,
    imports: [StudDirective],
    template: `
      <div class="snippets-gutter" #lineNumbers></div>
      <div stud [lineNumbers]="lineNumbers"></div>
    `,
  })
  class TestHost {}

  const fixture: ComponentFixture<TestHost> = TestBed.createComponent(TestHost);
  const directive = fixture.debugElement.query(By.directive(StudDirective));

  fixture.detectChanges();

  return {
    directive,
  };
}
