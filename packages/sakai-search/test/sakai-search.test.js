import "../sakai-search.js";
import { html } from "lit";
import * as data from "./data.js";
import { expect, fixture, waitUntil } from "@open-wc/testing";

describe("sakai-search tests", () => {

  beforeEach(() =>  {

    window.top.portal = { locale: "en_GB" };

    window.fetch = url => {

      if (url === data.searchI18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(data.searchI18n)});
      } else if (url === data.searchUrl) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(data.searchResults)});
      } else {
        console.error(`Miss on ${url}`);
        return Promise.reject();
      }
    };
  });

  it ("renders correctly", async () => {

    let el = await fixture(html`
      <sakai-search site-id="${data.siteId}" tool="${data.tool}"></sakai-search>
    `);

    await el.updateComplete;

    expect(el.querySelector("form")).to.exist;
    expect(el.querySelector("input[type='search']")).to.exist;
    document.getElementById("sakai-search-input").value = data.terms;
    document.getElementById("sakai-search-button").click();
    await waitUntil(() => el.querySelector(".search-result-link"), "Element did not render results");
    expect(document.querySelectorAll(".search-result-link").length).to.equal(2);
  });

  it ("is accessible", async () => {

    let el = await fixture(html`
      <sakai-search site-id="${data.siteId}" tool="${data.tool}"></sakai-search>
    `);

    await expect(el).to.be.accessible();
    document.getElementById("sakai-search-input").value = data.terms;
    document.getElementById("sakai-search-button").click();
    await el.updateComplete;
    await waitUntil(() => el.querySelector(".search-result-link"), "Element did not render results");
    await expect(el).to.be.accessible();
  });
});
