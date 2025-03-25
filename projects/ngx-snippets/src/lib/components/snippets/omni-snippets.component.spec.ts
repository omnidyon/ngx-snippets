import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OmniSnippetsComponent } from './omni-snippets.component';
import { NumberLineComponent } from '../number-line/number-line.component';
import { SnippetConfig } from 'ngx-snippets';

const TEST_SNIPPET: SnippetConfig = {
  template: `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  template: \`
      <h1>Hello world!</h1>
  \`,
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'homes';
}
`,
  format: 'JavaScript',
};

describe('OmniSnippetsComponent', () => {
  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  describe('Should render header properly', () => {
    it('Should render header by default', async () => {
      const { getHeader } = await setup();
      expect(getHeader()).toBeTruthy();
    });

    it('Should not render header if header set to false', async () => {
      const { fixture, getHeader } = await setup();

      fixture.componentInstance.header = false;
      fixture.detectChanges();

      expect(getHeader()).toBeFalsy();
    });

    describe('Should render tabs properly', () => {
      it('Should have proper number of tabs', async () => {
        const { getTabs } = await setup();
        expect(getTabs().length).toBe(2);
      });

      it('Should have a proper text', async () => {
        const { getTabs } = await setup();
        expect(getTabs()[0].nativeElement.innerHTML.trim()).toBe(
          TEST_SNIPPET.format
        );
      });

      it('Should have a proper active tab', async () => {
        const { getTabs } = await setup();
        const fistTab = getTabs()[0].nativeElement;
        expect(fistTab.classList.contains('active-tab')).toBeTrue();
      });
    });
  });

  describe('Should have proper number of lines', () => {
    it('Should have proper number of lines in gutter', async () => {
      const { getNumbers } = await setup();
      expect(getNumbers().length).toBe(14);
    });

    it('Should have proper number of lines in snippet', async () => {
      const { getCodes } = await setup();
      expect(getCodes().length).toBe(14);
    });
  });
});

async function setup() {
  let component: OmniSnippetsComponent;
  let fixture: ComponentFixture<OmniSnippetsComponent>;

  await TestBed.configureTestingModule({
    imports: [OmniSnippetsComponent],
  }).compileComponents();

  fixture = TestBed.createComponent(OmniSnippetsComponent);
  component = fixture.componentInstance;
  component.snippets = [TEST_SNIPPET];

  const getHeader = () =>
    fixture.debugElement.query(By.css('.snippets-header'));
  const getTabs = () => fixture.debugElement.queryAll(By.css('.snippet-tab'));
  const getNumbers = () =>
    fixture.debugElement.queryAll(By.directive(NumberLineComponent));
  const getCodes = () => fixture.debugElement.queryAll(By.css('.line'));

  fixture.detectChanges();

  return {
    component,
    fixture,
    getHeader,
    getTabs,
    getNumbers,
    getCodes,
  };
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
