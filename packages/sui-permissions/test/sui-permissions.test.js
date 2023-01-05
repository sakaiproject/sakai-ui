import "../sui-permissions.js"
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit-element";
//import fetchMock from "fetch-mock";

describe("sui-permissions tests", () => {

  const siteId = "xyz";
  let groups = [];

  beforeEach(() =>  {

    window.top.portal = { locale: "en_GB", siteId: siteId };

    groups = [
      { reference: `/site/${siteId}/groups/tennis`, title: "Tennis" },
      { reference: `/site/${siteId}/groups/football`, title: "Football" },
    ];

    const groupPickerI18nUrl = "/sakai-ws/rest/i18n/getI18nProperties?locale=en_GB&resourceclass=org.sakaiproject.i18n.InternationalizedMessages&resourcebundle=group-picker";
    const groupPickerI18n = "group_selector_label=Groups";

    const permissionsI18nUrl = "/sakai-ws/rest/i18n/getI18nProperties?locale=en_GB&resourceclass=org.sakaiproject.i18n.InternationalizedMessages&resourcebundle=permissions-wc";
    const permissionsI18n = "group_selector_label=Groups";

    const toolI18nUrl = "/sakai-ws/rest/i18n/getI18nProperties?locale=en_GB&resourceclass=org.sakaiproject.i18n.InternationalizedMessages&resourcebundle=tool";
    const toolI18n = `
      perm-tool.create=Create
      perm-tool.delete=Delete
      perm-tool.read=Read
      perm-tool.update=Update
    `;

    const perms = {
      available: [ "tool.read", "tool.create", "tool.delete" ],
      on: {
        "maintain": [ "tool.read", "tool.create", "tool.delete" ],
        "access": [ "tool.read" ],
      },
      roleNameMappings: { maintain: "Maintain", access: "Access" }
    };

    window.fetch = url => {

      if (url === groupPickerI18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(groupPickerI18n)});
      } else if (url === permissionsI18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(permissionsI18n)});
      } else if (url === toolI18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(toolI18n) });
      } else if (url === `/direct/site/${siteId}/groups.json`) {
        return Promise.resolve({ json: () => Promise.resolve(groups) });
      } else if (url.startsWith(`/direct/permissions/${siteId}/getPerms/tool.json`)) {
        return Promise.resolve({ json: () => Promise.resolve(perms) });
      }
    };
  });

  it ("renders correctly", async () => {
 
    const el = await fixture(`<sui-permissions tool="tool" site-id="${siteId}"></sui-permissions>`);

    await waitUntil(() => el.i18n);

    expect(el.querySelectorAll("table tr").length).to.equal(4);
    expect(el.querySelectorAll("table tr:first-child th").length).to.equal(3);
    expect(el.querySelectorAll("table tr:nth-child(2) input:checked").length).to.equal(2);
    el.querySelector("table tr:nth-child(2) button").click();
    expect(el.querySelectorAll("table tr:nth-child(2) input:checked").length).to.equal(0);
    el.querySelector("table tr:nth-child(2) button").click();
    expect(el.querySelectorAll("table tr:nth-child(2) input:checked").length).to.equal(2);
    el.querySelector("table button:first-child").click();
    expect(el.querySelectorAll("table input:checked").length).to.equal(0);
    el.querySelector("table button:first-child").click();
    expect(el.querySelectorAll("table input:checked").length).to.equal(6);

    // Reset the permissions
    el.querySelector("button:first-child").click();
    await el.updateComplete;
    expect(el.querySelectorAll("table input:checked").length).to.equal(4);

    expect(el.querySelectorAll(".access-checkbox-cell input:checked").length).to.equal(1);
    el.querySelector("button[data-role='access']").click();
    expect(el.querySelectorAll(".access-checkbox-cell input:checked").length).to.equal(0);
    el.querySelector("button[data-role='access']").click();
    expect(el.querySelectorAll(".access-checkbox-cell input:checked").length).to.equal(3);
  });

  it ("is accessible", async () => {

    const el = await fixture(`<sui-permissions tool="tool" site-id="${siteId}"></sui-permissions>`);

    await waitUntil(() => el.i18n);

    await expect(el).to.be.accessible();
  });
});
