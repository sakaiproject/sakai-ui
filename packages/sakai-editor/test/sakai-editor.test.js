import "../sakai-editor.js";
import { html } from "lit";
import { expect, fixture } from "@open-wc/testing";

describe("sakai-editor tests", () => {

  beforeEach(() =>  {

    window.top.portal = { locale: "en_GB" };
  });

  it ("renders in user mode correctly", async () => {

    // In user mode, we'd expect to get announcements from multiple sites.
    let el = await fixture(html`
      <sakai-editor textarea></sakai-editor>
    `);
  });

  it ("is accessible", async () => {

    let el = await fixture(html`
      <sakai-editor textarea></sakai-editor>
    `);

    expect(el).to.be.accessible();
  });
});
