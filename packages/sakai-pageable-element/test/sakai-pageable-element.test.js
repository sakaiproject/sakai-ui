import { SakaiPageableElement } from "../src/SakaiPageableElement.js";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import * as data from "./data.js";

describe("sakai-pageable-element tests", () => {

  class MyPageable extends SakaiPageableElement {

    constructor() {

      super();

      this.showPager = true;
    }

    content() {
      
      return html`
        ${this.data.map(p => html`
          <div id="${p}">${p}</div>
        `)}
      `;
    }

    loadAllData() {

      this.data = [ "chips", "fries", "spuds", "potatoes", "frites" ];
      return Promise.resolve();
    }
  }
  customElements.define("my-pageable", MyPageable);

  it ("is subclassed and renders correctly", async () => {
 
    let el = await fixture(html`<my-pageable></my-pageable>`);
    await el.updateComplete;
    expect(el.count).to.equal(1);
    expect(el.shadowRoot.getElementById("wrapper")).to.exist;
    expect(el.shadowRoot.getElementById("pager")).to.exist;
    expect(el.shadowRoot.querySelector("div#chips")).to.exist;
  });

  it ("is accessible", async () => {

    let el = await fixture(html`<my-pageable></my-pageable>`);
    await expect(el).to.be.accessible();
  });
});
