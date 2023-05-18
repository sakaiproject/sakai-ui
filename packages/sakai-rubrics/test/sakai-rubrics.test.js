import "../sakai-rubrics-manager.js";
import { html } from "lit";
import * as data from "./data.js";
import { expect, fixture, waitUntil, aTimeout } from "@open-wc/testing";
import fetchMock from "fetch-mock/esm/client";

describe("sakai-rubrics tests", () => {

  beforeEach(() =>  {

    window.top.portal = { locale: "en_GB" };

    window.bootstrap = {
      Popover: function() {},
    };

    fetchMock
      .get(data.i18nUrl, data.i18n, {overwriteRoutes: true})
      .get(data.sharedRubricsUrl, data.sharedRubrics, {overwriteRoutes: true})
      .get(data.rubricsUrl, data.rubrics, {overwriteRoutes: true})
      .get("*", 500, {overwriteRoutes: true});
  });

  it ("manager renders correctly", async () => {

    // In user mode, we'd expect to get announcements from multiple sites.
    let el = await fixture(html`
      <sakai-rubrics-manager site-id="${data.siteId}"></sakai-rubrics-manager>
    `);

    await waitUntil(() => el.i18n);

    expect(el.querySelector("h1:first-child")).to.exist;
    expect(el.querySelector("h1:first-child").innerHTML).to.contain(el.i18n.manage_rubrics);
    expect(el.querySelector("#site-rubrics-title")).to.exist;
  });

  it ("is rubrics manager accessible", async () => {

    let el = await fixture(html`
      <sakai-rubrics-manager site-id="${data.siteId}"></sakai-rubrics-manager>
    `);

    await waitUntil(() => el.i18n);

    expect(el).to.be.accessible();
  });
});
