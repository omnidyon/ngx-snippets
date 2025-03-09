import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmniSnippetsComponent } from './omni-snippets.component';

describe('OmniSnippetsComponent', () => {
  let component: OmniSnippetsComponent;
  let fixture: ComponentFixture<OmniSnippetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OmniSnippetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmniSnippetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
