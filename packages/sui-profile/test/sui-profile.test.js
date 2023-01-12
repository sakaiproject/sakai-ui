import "../sui-profile.js";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import * as data from "./data.js";

describe("sui-profile tests", () => {

  beforeEach(() =>  {

    window.top.portal = { locale: "en_GB", siteId: data.siteId };

    window.fetch = url => {

      if (url === data.profileI18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(data.profileI18n)});
      } else if (url === data.profileUrl) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(data.profile)});
      } else {
        console.error(`Miss on ${url}`);
        return Promise.reject();
      }
    };
  });

  it ("renders correctly", async () => {
 
    let el = await fixture(html`<sui-profile user-id="${data.userId}"></sui-profile>`);
    await waitUntil(() => el.i18n);
    expect(el.shadowRoot.querySelector("div.container")).to.exist;
    expect(el.shadowRoot.querySelectorAll("div.body > div").length).to.equal(5);
    expect(el.shadowRoot.querySelector("div.role")).to.exist;
    expect(el.shadowRoot.querySelector("div.role").innerHTML).to.contain(data.profile.role);
    expect(el.shadowRoot.querySelector("div.pronunciation > div").innerHTML).to.contain(data.profile.pronunciation);
    expect(el.shadowRoot.querySelector("sui-pronunciation-player")).to.exist;
    expect(el.shadowRoot.querySelector("div.url")).to.exist;
  });

  it ("is accessible", async () => {

    const el = await fixture(html`<sui-profile user-id="${data.userId}"></sui-profile>`);
    await waitUntil(() => el.i18n);
    await expect(el).to.be.accessible();
  });
});
