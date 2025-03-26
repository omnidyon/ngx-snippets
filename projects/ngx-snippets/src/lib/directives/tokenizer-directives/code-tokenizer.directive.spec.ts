import { MOCK_C_TOKENS } from '../../../test-data/classified-tokens';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeTokenizerDirective } from './code-tokenizer.directive';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

describe('CodeTokenizerDirective', () => {
  it('Should create an instance', () => {
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
      <div
        codeTokenizer
        [lineNumbers]="lineNumbers"
        [format]="JavaScript"
        [tokens]="tokens"
      ></div>
    `,
  })
  class TestHost {
    tokens = MOCK_C_TOKENS;
  }

  const fixture: ComponentFixture<TestHost> = TestBed.createComponent(TestHost);
  const directive = fixture.debugElement.query(
    By.directive(CodeTokenizerDirective)
  );

  console.log(fixture.debugElement.nativeElement)

  fixture.detectChanges();

  return {
    directive,
  };
}
