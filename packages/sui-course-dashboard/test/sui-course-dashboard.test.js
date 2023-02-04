import "../sui-course-dashboard.js";
import { html } from "lit";
import * as data from "./data.js";
import * as dialogData from "../../sui-dialog-content/test/data.js";
import { expect, fixture, waitUntil, aTimeout } from "@open-wc/testing";
import fetchMock from "fetch-mock/esm/client";

describe("sui-course-dashboard tests", () => {

  window.top.portal = { locale: "en_GB" };

  fetchMock
    .get(data.i18nUrl, data.i18n, { overwriteRoutes: true })
    .get(data.dashboardUrl, data.dashboardData, { overwriteRoutes: true })
    .get(dialogData.i18nUrl, dialogData.i18n, { overwriteRoutes: true })
    .get("*", 500, { overwriteRoutes: true });

  it ("renders in user mode correctly", async () => {

    // In user mode, we'd expect to get announcements from multiple sites.
    let el = await fixture(html`
      <sui-course-dashboard site-id="${data.siteId}"></sui-course-dashboard>
    `);

    await waitUntil(() => el.data);

    expect(el.querySelector("#course-dashboard-title-and-edit-block")).to.exist;
  });

  it ("is accessible", async () => {

    let el = await fixture(html`
      <sui-course-dashboard site-id="${data.siteId}"></sui-course-dashboard>
    `);

    await waitUntil(() => el.data);

    expect(el.shadowRoot).to.be.accessible();
  });
});
