import "../sakai-pwa.js";
import { html } from "lit";
import * as data from "./data.js";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import fetchMock from "fetch-mock/esm/client";

describe("sakai-pwa tests", () => {

  window.top.portal = { locale: "en_GB" };

  fetchMock
      .get(data.i18nUrl, data.i18n, {overwriteRoutes: true})
      .get("*", 500, {overwriteRoutes: true});

  it ("renders correctly", async () => {

    // In user mode, we'd expect to get announcements from multiple sites.
    let el = await fixture(html`
      <sakai-pwa></sakai-pwa>
    `);
  });
});
