import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSnippetsComponent } from './ngx-snippets.component';

describe('NgxSnippetsComponent', () => {
  let component: NgxSnippetsComponent;
  let fixture: ComponentFixture<NgxSnippetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSnippetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxSnippetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
