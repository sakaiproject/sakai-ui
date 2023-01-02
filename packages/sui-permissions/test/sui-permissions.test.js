import '../sui-permissions.js'
import { expect, fixture, waitUntil } from '@open-wc/testing';
import { html } from "lit-element";

describe("sui-permissions tests", () => {

  it ("render", async () => {

    const siteId = "xyz";

    const groups = [
      { reference: `/site/${siteId}/groups/tennis`, title: "Tennis" },
      { reference: `/site/${siteId}/groups/football`, title: "Football" },
    ];

    const i18nUrl = "/sakai-ws/rest/i18n/getI18nProperties?locale=en_GB&resourceclass=org.sakaiproject.i18n.InternationalizedMessages&resourcebundle=group-picker";
    const label = 'Groups';

    window.top.portal = { locale: 'en_GB' };

    window.fetch = url => {

      if (url === i18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(`group_selector_label=${label}`)});
      } else if (url === `/direct/site/${siteId}/groups.json`) {
        return Promise.resolve({ json: () => Promise.resolve(groups) });
      }
    };

    const el = await fixture(`<sui-permissions site-id="${siteId}"></sui-permissions>`);
    await waitUntil(() => el.i18n);
    expect(el.querySelector("select").getAttribute("aria-label")).to.equal(label);
  });
});
