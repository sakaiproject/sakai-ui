import '../sui-group-picker.js'
import { expect, fixture, waitUntil } from '@open-wc/testing';
import { html } from "lit-element";

describe("sui-group-picker tests", () => {

  it ("render with site and group id", async () => {

    const siteId = "xyz";

    const footballRef = `/site/${siteId}/groups/football`;
    const tennisRef = `/site/${siteId}/groups/tennis`;
    const groups = [
      { reference: tennisRef, title: "Tennis" },
      { reference: footballRef, title: "Football" },
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

    const el = await fixture(`<sui-group-picker site-id="${siteId}" group-id="${tennisRef}"></sui-group-picker>`);

    await waitUntil(() => el.i18n);

    const select = el.querySelector("select");
    expect(select.getAttribute("aria-label")).to.equal(label);
    expect(select.children.length).to.equal(3);
    expect(select.querySelector(`option[value='${footballRef}']`)).to.exist;
    expect(select.querySelector(`option[value='${tennisRef}']`)).to.exist;
    expect(select.querySelector(`option[value='${tennisRef}']`).hasAttribute('selected')).to.be.true;
  });
});
