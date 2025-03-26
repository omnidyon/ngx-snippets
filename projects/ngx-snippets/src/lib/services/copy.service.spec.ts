import { TestBed } from '@angular/core/testing';

import { CopyService } from './copy.service';

describe('CopyService', () => {
  let service: CopyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopyService);
    service.set('');
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should set text for copying', () => {
    service.set('Copy test text');
    expect(service.get()).toBe('Copy test text');
  })

  it('Should add more text to existing copy text', () => {
    service.set('First Text');
    expect(service.get()).toBe('First Text');
    service.add('Second Text');
    expect(service.get()).toBe('First TextSecond Text');
  })

  it('Should set text lines properly', () => {
    service.setLine(0, 'First Line');
    service.setLine(1, 'Second Line');
    expect(service.get()).toBe(`First Line\nSecond Line`);
  })
});
