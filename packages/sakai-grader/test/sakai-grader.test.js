import "../sakai-grader.js";
import { expect, fixture, waitUntil } from "@open-wc/testing";
import { html } from "lit";
import * as data from "./data.js";
import fetchMock from "fetch-mock/esm/client";

describe("sakai-grader tests", () => {

  window.top.portal = { locale: "en_GB", siteId: data.siteId, siteTitle: data.siteTitle };
  window.top.sakai = {
    editor: { launch: function() { return { setData: function () {}, on: function () {} } } },
  };

  fetchMock
    .get(data.i18nUrl, data.i18n, { overwriteRoutes: true })
    .get(`/direct/assignment/gradable.json?gradableId=${data.gradableId}`, data.gradableData, { overwriteRoutes: true })
    .get(`/direct/assignment/grades.json?gradableId=${data.gradableId}&courseId=${data.siteId}`, data.gradesData, { overwriteRoutes: true })
    .post("/direct/assignment/setGrade.json", data.textSubmission, { overwriteRoutes: true })
    .get("*", 500, { overwriteRoutes: true });

  it ("renders a text submission correctly", async () => {
 
    const el = await fixture(html`<sakai-grader gradable-id="${data.gradableId}" submission-id="${data.textSubmissionId}"></sakai-grader>`);
    await waitUntil(() => el.i18n);

    expect(el.querySelector(".grader-nav")).to.exist;

    await waitUntil(() => el.grades);

    const feedbackText = el.querySelector("#grader-feedback-text");
    expect(feedbackText).to.exist;
    expect(feedbackText.innerHTML).to.contain(data.submittedText);

    const scoreGradeInput = el.querySelector("#score-grade-input");
    expect(scoreGradeInput).to.exist;

    scoreGradeInput.value = "50";
    const evt = document.createEvent("KeyboardEvent");
    evt.initEvent("keyup", false, true);
    scoreGradeInput.dispatchEvent(evt);
    expect(el.submission.grade).to.equal("50");

    const saveButton = el.querySelector("button[name='save']");
    expect(saveButton).to.exist;
    saveButton.click();
  });

  it ("renders settings correctly", async () => {
 
    const el = await fixture(html`<sakai-grader gradable-id="${data.gradableId}"></sakai-grader>`);
    await waitUntil(() => el.grades);

    el.querySelector("#grader-settings-link").click();
    const graderSettings = el.querySelector("#grader-settings");
    expect(graderSettings).to.exist;

    graderSettings.addEventListener("shown.bs.modal", async () => {

      graderSettings.querySelector("[type='checkbox']").click();
      await el.updateComplete;
      expect(el.submittedOnly).to.be.true;
      expect(el.querySelector("[class*='sak-banner-warn']").innerHTML).to.contain(el.i18n.filter_settings_warning);
      graderSettings.querySelector("[type='checkbox']").click();
      await el.updateComplete;
      expect(el.submittedOnly).to.be.false;
      expect(el.querySelector("[class*='sak-banner-warn']")).to.not.exist;
    });
  });

  /*
  it ("is accessible", async () => {

    const el = await fixture(html`<sakai-grader gradable-id="${data.gradableId}" submission-id="${data.textSubmissionId}"></sakai-grader>`);

    await waitUntil(() => el.i18n);
    await waitUntil(() => el.grades);
    await el.updateComplete;

    await expect(el).to.be.accessible();
  });
  */
});
