import { TestBed } from '@angular/core/testing';

import { NgxSnippetsService } from './ngx-snippets.service';

describe('NgxSnippetsService', () => {
  let service: NgxSnippetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSnippetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
