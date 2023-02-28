import "../sakai-lti-iframe.js";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import * as data from "./data.js";

describe("sakai-lti-iframe tests", () => {

  const launchUrl = "http://eggs.com";

  beforeEach(() =>  {

    window.top.portal = { locale: "en_GB", siteId: data.siteId };

    window.fetch = url => {

      if (url === data.ltiI18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(data.ltiI18n)});
      } else {
        console.error(`Miss on ${url}`);
        return Promise.reject();
      }
    };
  });

  it ("renders correctly", async () => {
 
    let el = await fixture(html`<sakai-lti-iframe></sakai-lti-iframe>`);
    await waitUntil(() => el.i18n);
    expect(el.querySelector("div.sakai-iframe-launcn")).to.not.exist;


    el = await fixture(html`<sakai-lti-iframe new-window-text="Eggs" launch-url="${launchUrl}"></sakai-lti-iframe>`);
    await waitUntil(() => el.i18n);
    expect(el.querySelector("div.sakai-iframe-launch")).to.exist;
    expect(document.getElementById(`sakai-lti-button-${el.randomId}`)).to.exist;
    expect(document.getElementById(`sakai-lti-iframe-${el.randomId}`)).to.exist;
    expect(el.querySelector(`iframe[src='${launchUrl}']`)).to.exist;

    el = await fixture(html`<sakai-lti-iframe new-window-text="Eggs" launch-url="${launchUrl}" allow-resize="true"></sakai-lti-iframe>`);
    await waitUntil(() => el.i18n);
    expect(el.querySelector("iframe[data-allow-resize='true']")).to.exist;
  });

  it ("is accessible", async () => {

    const el = await fixture(html`<sakai-lti-iframe new-window-text="Eggs" launch-url="${launchUrl}"></sakai-lti-iframe>`);

    await waitUntil(() => el.i18n);

    await expect(el).to.be.accessible();
  });
});
