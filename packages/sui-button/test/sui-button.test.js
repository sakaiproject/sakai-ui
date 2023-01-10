import "../sui-button.js";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit-element";

describe("sui-button tests", () => {

  it ("renders correctly", async () => {
 
    const el = await fixture(html`<sui-button primary>Eggs</sui-button>`);

    expect(el.shadowRoot.querySelector("button").classList.contains("primary")).to.be.true;
  });

  it ("is accessible", async () => {

    const el = await fixture(`<sui-button>Eggs</sui-button>`);

    await expect(el).to.be.accessible();
  });
});
