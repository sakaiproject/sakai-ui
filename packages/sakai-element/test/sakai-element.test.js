import { SakaiElement } from '../src/SakaiElement.js';
import { expect, fixture, waitUntil } from '@open-wc/testing';
import { html } from "lit";

describe("sakai-element tests", () => {

  it ("render", async () => {

    class MyElement extends SakaiElement {

      render() {
        return html`<h1>CHIPS</h1>`;
      }
    }

    customElements.define("my-element", MyElement);

    const el = await fixture('<my-element></my-element>');
    expect(el.querySelector("h1").innerHTML).to.equal("CHIPS")
  });

  it ("loadTranslations", async () => {

    const greeting = "Hello";
    const testUrl = "/sakai-ws/rest/i18n/getI18nProperties?locale=en_GB&resourceclass=org.sakaiproject.i18n.InternationalizedMessages&resourcebundle=myelement2";

    window.top.portal = { locale: 'en_GB' };

    // Mock up the i18n fetch that SakaiElement will make.
    window.fetch = url => {

      if (url === testUrl) {
        return Promise.resolve({ text: () => Promise.resolve(`greeting=${greeting}`)});
      } else {
        throw new Error("No bundle found");
      }
    };

    class MyElement2 extends SakaiElement {

      constructor() {

        super();

        this.loadTranslations('myelement2').then(r => { this.i18n = r; this.requestUpdate(); });
      }

      shouldUpdate() {
        return this.i18n;
      }

      render() {
        return html`<h1>${this.i18n.greeting} Somebody!</h1>`;
      }
    }

    customElements.define("my-element2", MyElement2);

    const el = await fixture('<my-element2></my-element2>');
    await waitUntil(() => el.i18n);
    expect(el.querySelector("h1").innerText).to.equal(`${greeting} Somebody!`)
  });
});
