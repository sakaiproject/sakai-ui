import "../sui-user-photo.js";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import * as data from "./data.js";

describe("sui-user-photo tests", () => {

  it ("renders correctly", async () => {
 
    let el = await fixture(html`<sui-user-photo user-id="${data.userId}" classes="small"></sui-user-photo>`);
    const div = document.getElementById(el.generatedId);
    expect(div).to.exist;
    expect(div.classList.contains("small")).to.be.true;
  });

  it ("renders for print correctly", async () => {
 
    let el = await fixture(html`<sui-user-photo user-id="${data.userId}" print></sui-user-photo>`);
    expect(el.querySelector("img")).to.exist;
  });

  it ("is accessible", async () => {

    const el = await fixture(html`<sui-user-photo user-id="${data.userId}"></sui-user-photo>`);
    await expect(el).to.be.accessible();
  });
});
