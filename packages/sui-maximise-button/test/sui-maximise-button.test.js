import "../sui-maximise-button.js";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import * as data from "./data.js";

describe("sui-maximise-button tests", () => {

  const launchUrl = "http://eggs.com";

  beforeEach(() =>  {

    window.top.portal = {
      locale: "en_GB",
      siteId: data.siteId,
      maximiseTool: () => {},
      minimiseTool: () => {},
    };

    window.fetch = url => {

      if (url === data.maximiseI18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(data.maximiseI18n)});
      } else {
        console.error(`Miss on ${url}`);
        return Promise.reject();
      }
    };
  });

  it ("renders correctly", async () => {
 
    let el = await fixture(html`<sui-maximise-button></sui-maximise-button>`);
    await waitUntil(() => el.i18n);
    expect(el.querySelector(`a[title='${el.i18n.fullscreen_view}']`)).to.exist;
    el.setMaximised();
    await el.updateComplete;
    expect(el.querySelector(`a[title='${el.i18n.normal_view}']`)).to.exist;

    el = await fixture(html`<sui-maximise-button full-screen></sui-maximise-button>`);
    await waitUntil(() => el.i18n);
    expect(el.querySelector(`a[title='${el.i18n.normal_view}']`)).to.exist;
    el.setMinimised();
    await el.updateComplete;
    expect(el.querySelector(`a[title='${el.i18n.fullscreen_view}']`)).to.exist;

    el = await fixture(html`<sui-maximise-button></sui-maximise-button>`);
    el.querySelector(`a[title='${el.i18n.fullscreen_view}']`).click();
    await el.updateComplete;
    expect(el.querySelector(`a[title='${el.i18n.normal_view}']`)).to.exist;

    el = await fixture(html`<sui-maximise-button full-screen></sui-maximise-button>`);
    await waitUntil(() => el.i18n);
    el.querySelector(`a[title='${el.i18n.normal_view}']`).click();
    await el.updateComplete;
    expect(el.querySelector(`a[title='${el.i18n.fullscreen_view}']`)).to.exist;
  });

  it ("is accessible", async () => {

    const el = await fixture(html`<sui-maximise-button></sui-maximise-button>`);
    await waitUntil(() => el.i18n);
    await expect(el).to.be.accessible();
  });
});
