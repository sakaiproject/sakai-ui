import "../sui-tasks.js";
import { html } from "lit";
import * as data from "./data.js";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import fetchMock from "fetch-mock/esm/client";

describe("sui-tasks tests", () => {

  window.moment = { duration: () => { return { humanize: () => "3 days ago" } } };
  window.top.portal = { locale: "en_GB" };

  fetchMock
      .get(data.i18nUrl, data.i18n, {overwriteRoutes: true})
      .get(data.dialogcontentI18nUrl, data.dialogcontentI18n, {overwriteRoutes: true})
      .get(data.tasksUrl, data.tasks, {overwriteRoutes: true})
      .post(data.tasksUrl, (url, opts) => {

        return Object.assign({
          id: "" + Math.floor(Math.random() * 20) + 1,
          creator: "adrian",
          created: Date.now(),
          creatorDisplayName: "Adrian Fish",
        }, JSON.parse(opts.body));
      }, {overwriteRoutes: true})
      .get("*", 500, {overwriteRoutes: true});

  it ("renders in user mode correctly", async () => {

    // In user mode, we'd expect to get announcements from multiple sites.
    let el = await fixture(html`
      <sui-tasks user-id="${data.userId}"></sui-tasks>
    `);

    await waitUntil(() => el.data);

    expect(el.shadowRoot.getElementById("controls")).to.exist;
    expect(el.shadowRoot.getElementById("add-block")).to.exist;
    expect(el.shadowRoot.getElementById("add-edit-dialog")).to.exist;

    el.canAddTask = false;
    await el.updateComplete;
    expect(el.shadowRoot.getElementById("add-block")).to.not.exist;
    el.canAddTask = true;
    await el.updateComplete;
    expect(el.shadowRoot.getElementById("add-block")).to.exist;

    expect(el.shadowRoot.querySelectorAll("#tasks > .cell").length).to.equal(6);
    const addTaskButton = el.shadowRoot.querySelector(".add-task-button");
    expect(addTaskButton).to.exist;
  });

  it ("is accessible", async () => {

    let el = await fixture(html`
      <sui-tasks user-id="${data.userId}"></sui-tasks>
    `);

    await waitUntil(() => el.data);

    expect(el.shadowRoot).to.be.accessible();
  });
});
