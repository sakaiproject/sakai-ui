import "../sui-icon.js";
import { expect, fixture } from "@open-wc/testing";
import { html } from "lit";

describe("sui-icon tests", () => {

  it ("renders correctly", async () => {
 
    const el = await fixture(html`<sui-icon type="lock"></sui-icon>`);

    expect(el.shadowRoot.querySelector("svg")).to.exist;
    expect(el.shadowRoot.querySelector("svg").dataset.icon).to.equal("lock");
  });

  it ("is accessible", async () => {

    const el = await fixture(html`<sui-icon type="lock"></sui-icon>`);

    await expect(el).to.be.accessible();
  });
});
