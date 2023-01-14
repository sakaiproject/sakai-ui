import "../sui-picture-changer.js";
import { html } from "lit";
import * as data from "./data.js";
import { expect, fixture, aTimeout, waitUntil } from "@open-wc/testing";

describe("sui-picture-changer tests", () => {

  beforeEach(() =>  {

    window.top.portal = { locale: "en_GB" };

    window.fetch = url => {

      if (url === data.i18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(data.i18n)});
      } else if (url.includes("/direct/profile-image/details")) {
        return Promise.resolve({ json: () => Promise.resolve({ status: "SUCCESS", url: "test/images/orville.jpeg" }) });
      } else {
        console.error(`Miss on ${url}`);
        return Promise.reject();
      }
    };
  });

  it ("renders correctly", async () => {

    let el = await fixture(html`
      <sui-picture-changer></sui-picture-changer>
    `);

    await el.updateComplete;

    expect(document.getElementById("image")).to.exist;
  });

  it ("is accessible", async () => {

    let el = await fixture(html`
      <sui-picture-changer></sui-picture-changer>
    `);

    expect(el).to.be.accessible();
  });
});
