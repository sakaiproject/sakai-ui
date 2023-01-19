import "../sui-widget-panel.js";
import { html } from "lit";
import * as data from "./data.js";
import { expect, fixture, waitUntil, aTimeout } from "@open-wc/testing";
import fetchMock from "fetch-mock/esm/client";

describe("sui-widget-panel tests", () => {

  window.top.portal = { locale: "en_GB" };

  fetchMock
    .get(data.i18nUrl, data.i18n, {overwriteRoutes: true})
    .get("*", 500, {overwriteRoutes: true});

  it ("renders in user mode correctly", async () => {

    // In user mode, we'd expect to get announcements from multiple sites.
    let el = await fixture(html`
      <sui-widget-panel user-id="${data.userId}" widget-ids="${JSON.stringify(data.widgetIds)}" layout="${JSON.stringify(data.layout1)}"></sui-widget-panel>
    `);

    await waitUntil(() => el.i18n);

    expect(el.shadowRoot.getElementById("grid")).to.exist;

    data.layout1.forEach(id => expect(el.shadowRoot.querySelector(`sui-${id}-widget`)?.shadowRoot).to.exist);

    data.widgetIds.filter(id => !data.layout1.includes(id))
      .forEach(id => expect(el.shadowRoot.querySelector(`sui-${id}-widget`)).to.not.exist);

    el.editing = true;
    await el.updateComplete;

    const addLink = el.shadowRoot.querySelector("#add-button a");
    expect(addLink).to.exist;
    // Open the picker
    addLink.click();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("sui-widget-picker")?.shadowRoot).to.exist;
    // Close the picker
    addLink.click();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("sui-widget-picker")).to.not.exist;

    let forums = el.shadowRoot.querySelector("#grid > div:nth-child(2) > sui-forums-widget");
    expect(forums).to.exist;
    forums.dispatchEvent(new CustomEvent("move", { detail: { widgetId: "forums", direction: "left" }, bubbles: true }));
    await el.updateComplete;
    forums = el.shadowRoot.querySelector("#grid > div:first-child > sui-forums-widget");
    expect(forums).to.exist;
    forums.dispatchEvent(new CustomEvent("move", { detail: { widgetId: "forums", direction: "right" }, bubbles: true }));
    await el.updateComplete;
    forums = el.shadowRoot.querySelector("#grid > div:nth-child(2) > sui-forums-widget");
    expect(forums).to.exist;

    forums.dispatchEvent(new CustomEvent("remove"));
    await el.updateComplete;
    expect(el.shadowRoot.querySelector("#grid > div > sui-forums-widget")).to.not.exist;
  });

  it ("is accessible", async () => {

    let el = await fixture(html`
      <sui-widget-panel user-id="${data.userId}" widget-ids="${JSON.stringify(data.widgetIds)}" layout="${JSON.stringify(data.layout1)}"></sui-widget-panel>
    `);

    await waitUntil(() => el.i18n);

    expect(el.shadowRoot).to.be.accessible();
  });
});
