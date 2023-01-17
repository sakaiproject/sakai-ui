import "../sui-calendar.js";
import { html } from "lit";
import * as data from "./data.js";
import { expect, fixture, waitUntil, aTimeout } from "@open-wc/testing";

describe("sui-calendar tests", () => {

  beforeEach(() =>  {

    window.top.portal = { locale: "en_GB" };

    window.fetch = url => {

      if (url === data.i18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(data.i18n) });
      } else if (url === data.userCalendarUrl) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(data.userCalendarEvents) });
      } else {
        console.error(`Miss on ${url}`);
        return Promise.reject();
      }
    };
  });

  it ("renders in user mode correctly", async () => {

    // In user mode, we'd expect to get announcements from multiple sites.
    let el = await fixture(html`
      <sui-calendar user-id="${data.userId}"></sui-calendar>
    `);

    expect(el.shadowRoot.getElementById("container")).to.exist;

    waitUntil(() => el.events);

    el.dispatchEvent(new CustomEvent("user-selected-date-changed", { detail: { selectedDate: data.selectedDate } }));

    await el.updateComplete;

    expect(el.shadowRoot.querySelector("#days-events a")).to.exist;
    expect(el.shadowRoot.querySelectorAll("#days-events a span").item(0).innerHTML).to.contain(data.userCalendarEvents.events[0].title);
    expect(el.shadowRoot.querySelectorAll("#days-events a span").item(1).innerHTML).to.contain(data.userCalendarEvents.events[0].siteTitle);
  });

  it ("is accessible", async () => {

    let el = await fixture(html`
      <sui-calendar user-id="${data.userId}"></sui-calendar>
    `);

    expect(el.shadowRoot).to.be.accessible();
  });
});
