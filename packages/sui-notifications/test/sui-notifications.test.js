import "../sui-notifications.js";
import { html } from "lit";
import * as data from "./data.js";
import { expect, fixture, aTimeout, waitUntil } from "@open-wc/testing";

describe("sui-notifications tests", () => {

  beforeEach(() =>  {

    window.top.portal = { locale: "en_GB", siteId: data.siteId };
    window.top.portal.notifications = {
      registerForMessages: (type, callback) => {},
      setup: Promise.resolve(),
    };

    window.fetch = url => {

      if (url === data.i18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(data.i18n)});
      } else if (url === data.notificationsUrl) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ notifications: data.notifications })});
      } else if (url === "/direct/portal/clearNotification?id=noti2") {
        return Promise.resolve({ ok: true });
      } else if (url === "/direct/portal/clearAllNotifications") {
        return Promise.resolve({ ok: true });
      } else {
        console.error(`Miss on ${url}`);
        return Promise.reject();
      }
    };
  });

  it ("renders correctly", async () => {

    let el = await fixture(html`
      <sui-notifications url="${data.notificationsUrl}"></sui-notifications>
    `);

    await el.updateComplete;

    expect(el.querySelectorAll(".accordion-item").length).to.equal(3);

    const assnAccordion = document.getElementById("assn-accordion");
    expect(assnAccordion).to.exist;
    expect(assnAccordion.querySelectorAll("li.toast").length).to.equal(1);

    const anncAccordion = document.getElementById("annc-accordion");
    expect(anncAccordion).to.exist;
    expect(anncAccordion.querySelectorAll("li.toast").length).to.equal(1);

    const closeButton = anncAccordion.querySelector("button.btn-close");
    expect(closeButton).to.exist;

    closeButton.click();

    // Wait for the clearNotification fetch call to do its thing
    await aTimeout(200);

    expect(el.querySelectorAll(".accordion-item").length).to.equal(2);

    const profileAccordion = document.getElementById("profile-accordion");
    expect(profileAccordion).to.exist;
    expect(profileAccordion.querySelectorAll("li.toast").length).to.equal(3);

    const clearAllButton = el.querySelector("button.clear-all-button");
    expect(clearAllButton).to.exist;

    clearAllButton.click();

    // Wait for the clearAllNotifications fetch call to do its thing
    await aTimeout(200);

    expect(el.querySelectorAll(".accordion-item").length).to.equal(0);
  });

  it ("is accessible", async () => {

    let el = await fixture(html`
      <sui-notifications></sui-notifications>
    `);

    expect(el).to.be.accessible();
  });
});
