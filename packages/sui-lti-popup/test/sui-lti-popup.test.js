import "../sui-lti-popup.js";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import * as data from "./data.js";

describe("sui-lti-popup tests", () => {

  const launchUrl = "http://eggs.com";

  beforeEach(() =>  {

    window.top.portal = { locale: "en_GB", siteId: data.siteId };

    window.fetch = url => {

      if (url === data.ltiI18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(data.ltiI18n)});
      } else {
        console.error(`Miss on ${url}`);
        return Promise.reject();
      }
    };
  });

  it ("renders correctly", async () => {
 
    let el = await fixture(html`<sui-lti-popup></sui-lti-popup>`);
    await waitUntil(() => el.i18n);
    expect(el.querySelector("div.sakai-popup-launcn")).to.not.exist;


    el = await fixture(html`<sui-lti-popup pre-launch-text="Pre Launch" post-launch-text="Post Launch" launch-url="${launchUrl}"></sui-lti-popup>`);
    await waitUntil(() => el.i18n);
    expect(document.getElementById(`sakai-lti-popup-${el.randomId}`)).to.exist;
  });

  it ("is accessible", async () => {

    const el = await fixture(html`<sui-lti-popup></sui-lti-popup>`);
    await waitUntil(() => el.i18n);
    await expect(el).to.be.accessible();
  });
});
