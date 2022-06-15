import { html } from 'lit-element';
import { fixture, expect } from '@open-wc/testing';

import '../sakai-date-picker.js';

describe('SakaiDatePicker', () => {

  it ("Reflects the label attribute as a title and aria-label", async () => {

    const label = "birthday";

    const el = await fixture(html`<sakai-date-picker label="${label}"></sakai-date-picker>`);

    expect(el.shadowRoot.getElementById("date-picker-input")?.getAttribute("aria-label")).to.equal(label);
    expect(el.shadowRoot.getElementById("date-picker-input")?.getAttribute("title")).to.equal(label);
  });
});
