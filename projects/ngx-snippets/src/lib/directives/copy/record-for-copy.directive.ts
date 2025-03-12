import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { CopyService } from '../../services/copy.service';

@Directive({
  selector: '[recordForCopy]',
})
export class RecordForCopyDirective implements AfterViewInit {
  self!: HTMLPreElement;
  constructor(
    private copyService: CopyService,
    private elementRef: ElementRef
  ) {
    this.self = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.copyService.set(this.self.innerText);
  }
}
