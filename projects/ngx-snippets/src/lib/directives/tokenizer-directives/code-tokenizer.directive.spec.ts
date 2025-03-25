import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CodeTokenizerDirective } from "./code-tokenizer.directive";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";

describe('TokenizerDirective', () => {
  it('should create an instance', () => {
    const { directive } = setup();
    expect(directive).toBeTruthy();
  });
});

function setup() {
  @Component({
    standalone: true,
    imports: [CodeTokenizerDirective],
    template: `
      <div class="snippets-gutter" #lineNumbers></div>
      <div stud templateTokenizer [lineNumbers]="lineNumbers"></div>
    `,
  })
  class TestHost {}

  const fixture: ComponentFixture<TestHost> = TestBed.createComponent(TestHost);
  const directive = fixture.debugElement.query(By.directive(CodeTokenizerDirective));

  fixture.detectChanges();

  return {
    directive,
  };
}

