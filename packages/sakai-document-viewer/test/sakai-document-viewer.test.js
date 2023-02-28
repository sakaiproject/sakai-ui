import "../sakai-document-viewer.js";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import * as data from "./data.js";

describe("sakai-document-viewer tests", () => {

  const content = { name: "something", ref: "/content/something" };

  beforeEach(() =>  {

    window.top.portal = { locale: "en_GB", siteId: data.siteId };

    window.fetch = url => {

      if (url === data.documentViewerI18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(data.documentViewerI18n)});
      } else {
        console.error(`Miss on ${url}`);
      }
    };
  });

  it ("renders correctly", async () => {

    const el = await fixture(html`<sakai-document-viewer content="${JSON.stringify(content)}"></sakai-document-viewer>`);

    await waitUntil(() => el.i18n);

    expect(el.querySelector("div.document-link")).to.exist;
    expect(el.querySelector("a[rel='noopener']")).to.exist;
    expect(el.querySelector("a[rel='noopener']").innerHTML).to.contain(content.name);
  });

  it ("is accessible", async () => {

    const el = await fixture(html`<sakai-document-viewer content="${JSON.stringify(content)}"></sakai-document-viewer>`);

    await waitUntil(() => el.i18n);

    await expect(el).to.be.accessible();
  });
});
