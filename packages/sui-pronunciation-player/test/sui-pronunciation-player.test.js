import "../sui-pronunciation-player.js";
import { expect, fixture } from "@open-wc/testing";
import { html } from "lit";
import * as data from "./data.js";

describe("sui-pronunciation-player tests", () => {

  const userId = "adrian";

  beforeEach(() =>  {

    window.top.portal = { locale: "en_GB", siteId: data.siteId };

    window.fetch = url => {

      if (url === data.pronunciationI18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(data.pronunciationI18n)});
      } else {
        console.error(`Miss on ${url}`);
        return Promise.reject();
      }
    };
  });

  it ("renders correctly", async () => {
 
    let el = await fixture(html`<sui-pronunciation-player></sui-pronunciation-player>`);
    await el.updateComplete;
    expect(el.shadowRoot.getElementById("play-button")).to.not.exist;

    el = await fixture(html`<sui-pronunciation-player user-id="${userId}"></sui-pronunciation-player>`);
    await el.updateComplete;
    expect(el.shadowRoot.getElementById("play-button")).to.exist;
  });
});
