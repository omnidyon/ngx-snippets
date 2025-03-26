import { TestBed } from '@angular/core/testing';
import { TokenizerService } from './tokenizer.service';
import { TEST_SNIPPET } from '../../test-data/snippet';
import { MOCK_C_TOKENS_LARGE } from '../../test-data/classified-tokens';

describe('TokenizerService', () => {
  let service: TokenizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenizerService);
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should tokenize properly', () => {
    const tokens = service.tokenize(TEST_SNIPPET.template, TEST_SNIPPET.format);
    expect(tokens).toEqual(MOCK_C_TOKENS_LARGE);
  })
});
