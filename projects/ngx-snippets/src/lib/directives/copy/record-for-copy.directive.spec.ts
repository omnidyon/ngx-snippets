import { Component } from '@angular/core';
import { RecordForCopyDirective } from './record-for-copy.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('RecordForCopyDirective', () => {
  it('Should create an instance', () => {
    const { directive } = setup();
    expect(directive).toBeTruthy();
  });
});

function setup() {
  @Component({
    standalone: true,
    imports: [RecordForCopyDirective],
    template: ` <div recordForCopy>Test Copy Text</div> `,
  })
  class TestHost {}

  const fixture: ComponentFixture<TestHost> = TestBed.createComponent(TestHost);
  const directive = fixture.debugElement.query(
    By.directive(RecordForCopyDirective)
  );

  fixture.detectChanges();

  return {
    directive,
  };
}
