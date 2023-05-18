import "../sakai-tasks-create-task.js";
import { html } from "lit";
import * as data from "./data.js";
import * as dialogContentData from "../../sakai-dialog-content/test/data.js";
import { expect, fixture, waitUntil, aTimeout } from "@open-wc/testing";
import fetchMock from "fetch-mock/esm/client";

describe("sakai-tasks-create-task tests", () => {

  window.top.portal = { locale: "en_GB" };
  window.moment = { duration: () => { return { humanize: () => "3 days ago" } } };

  fetchMock
    .get(data.i18nUrl, data.i18n, { overwriteRoutes: true })
    .get(data.dialogcontentI18nUrl, dialogContentData.i18n, { overwriteRoutes: true })
    .get(data.tasksUrl, data.tasks, { overwriteRoutes: true })
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
      <sakai-tasks-create-task user-id="${data.userId}"></sakai-tasks-create-task>
    `);

    const description = "Go to space";
    const notes = "This task is about going to space";
    const priority = "5";

    await waitUntil(() => el.i18n);

    const descriptionEl = el.shadowRoot.getElementById("description");
    expect(descriptionEl).to.exist;
    descriptionEl.value = description;

    const notesEl = el.shadowRoot.getElementById("notes");
    expect(notesEl).to.exist;
    notesEl.value = notes;

    const priorityEl = el.shadowRoot.getElementById("priority");
    expect(priorityEl).to.exist;
    priorityEl.value = priority;
    priorityEl.dispatchEvent(new Event("change"));

    const saveEl = el.shadowRoot.querySelector("sakai-button");
    expect(saveEl).to.exist;

    el.addEventListener("task-created", e => {

      expect(e.detail.task).to.exist;
      expect(e.detail.task.description).to.equal(description);
      expect(e.detail.task.notes).to.equal(notes);
      expect(e.detail.task.priority).to.equal(priority);
    });

    saveEl.click();
  });

  it ("is accessible", async () => {

    let el = await fixture(html`
      <sakai-tasks-create-task user-id="${data.userId}"></sakai-tasks-create-task>
    `);

    await waitUntil(() => el.i18n);

    expect(el.shadowRoot).to.be.accessible();
  });
});
