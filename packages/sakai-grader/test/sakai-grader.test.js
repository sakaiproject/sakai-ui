import "../sakai-grader.js";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import * as data from "./data.js";
import fetchMock from "fetch-mock/esm/client";

describe("sakai-grader tests", () => {

  beforeEach(() =>  {

    window.top.portal = { locale: "en_GB" };

    fetchMock
      .get(data.i18nUrl, data.i18n, { overwriteRoutes: true })
      .get("*", 500, { overwriteRoutes: true });
  });

  it ("renders correctly", async () => {
 
    const el = await fixture(html`<sakai-grader></sakai-grader>`);

    await waitUntil(() => el.i18n);

    expect(el.querySelector(".grader-nav")).to.exist;
  });

  /*
  it ("is accessible", async () => {

    const el = await fixture(html`<sakai-grader></sakai-grader>`);

    await waitUntil(() => el.i18n);

    await expect(el).to.be.accessible();
  });
  */
});
