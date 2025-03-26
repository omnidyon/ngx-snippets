import { Component } from '@angular/core';
import { TemplateTokenizerDirective } from './template-tokenizer.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('TemplateTokenizerDirective', () => {
  it('Should create an instance', () => {
    const { directive } = setup();
    expect(directive).toBeTruthy();
  });
});

function setup() {
  @Component({
    standalone: true,
    imports: [TemplateTokenizerDirective],
    template: `
      <div class="snippets-gutter" #lineNumbers></div>
      <div templateTokenizer [lineNumbers]="lineNumbers"></div>
    `,
  })
  class TestHost {}

  const fixture: ComponentFixture<TestHost> = TestBed.createComponent(TestHost);
  const directive = fixture.debugElement.query(By.directive(TemplateTokenizerDirective));

  fixture.detectChanges();

  return {
    directive,
  };
}
