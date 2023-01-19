import "../sui-widget-panel.js";
import { html } from "lit";
import * as data from "./data.js";
import { expect, fixture, waitUntil, aTimeout } from "@open-wc/testing";

describe("sui-widget-panel tests", () => {

  beforeEach(() =>  {

    window.top.portal = { locale: "en_GB" };

    window.fetch = url => {

      if (url === data.i18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(data.i18n) });
      } else if (url === data.userForumsUrl) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(data.userForums) });
      } else {
        console.error(`Miss on ${url}`);
        return Promise.reject();
      }
    };
  });

  it ("renders in user mode correctly", async () => {

    // In user mode, we'd expect to get announcements from multiple sites.
    let el = await fixture(html`
      <sui-widget-panel user-id="${data.userId}"></sui-widget-panel>
    `);

    await waitUntil(() => el.i18n);
  });

  it ("is accessible", async () => {

    let el = await fixture(html`
      <sui-widget-panel user-id="${data.userId}"></sui-widget-panel>
    `);

    await waitUntil(() => el.i18n);

    expect(el.shadowRoot).to.be.accessible();
  });
});
