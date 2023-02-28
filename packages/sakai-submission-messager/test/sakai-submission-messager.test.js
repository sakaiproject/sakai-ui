import "../sakai-submission-messager.js";
import { html } from "lit";
import * as data from "./data.js";
import { expect, fixture, waitUntil } from "@open-wc/testing";

describe("sakai-submission-messager tests", () => {

  beforeEach(() =>  {

    window.top.portal = { locale: "en_GB", siteId: data.siteId };

    window.fetch = url => {

      if (url === data.i18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(data.i18n)});
      } else if (url === data.groupPickerI18nUrl) {
        return Promise.resolve({ text: () => Promise.resolve(data.groupPickerI18n)});
      } else if (url === data.groupsUrl) {
        return Promise.resolve({ json: () => Promise.resolve(data.groups) });
      } else if (url === "/direct/gbng/listMessageRecipients.json") {
        return Promise.resolve({ json: () => Promise.resolve(data.recipients) });
      } else if (url === "/direct/gbng/messageStudents.json") {
        return Promise.resolve({ ok: true, json: () => Promise.resolve("{\"result\": \"something\"}") });
      } else {
        console.error(`Miss on ${url}`);
        return Promise.reject();
      }
    };
  });

  it ("renders correctly", async () => {

    let el = await fixture(html`
      <sakai-submission-messager assignment-id="${data.assignmentId}" title="${data.title}"></sakai-submission-messager>
    `);

    await waitUntil(() => el.i18n);

    expect(document.getElementById(`submission-messager-${data.assignmentId}`)).to.exist;
    expect(el.querySelector("div.sm-title")).to.exist;
    expect(el.querySelector("div.sm-title").innerHTML).to.contain(data.title);

    expect(el.querySelector("input.subject-input")).to.exist;
    const subjectInput = el.querySelector("input.subject-input");
    expect(subjectInput.getAttribute("placeholder")).to.equal(el.i18n.subject_placeholder);
    subjectInput.value = data.subject;
    subjectInput.dispatchEvent(new Event("change"));
    expect(el.subject).to.equal(data.subject);

    const groupPicker = el.querySelector(`sakai-group-picker[site-id='${data.siteId}']`);
    expect(groupPicker).to.exist;
    groupPicker.dispatchEvent(new CustomEvent("group-selected", { detail: { value: data.selectedGroup } }));

    expect(el.querySelector(".group-select")).to.exist;
    const groupSelect = el.querySelector(".group-select");
    groupSelect.value = "2";
    groupSelect.dispatchEvent(new Event("change"));
    expect(el.action).to.equal("2");

    expect(el.querySelectorAll(".sm-score-block input").length).to.equal(2);

    const minScoreInput = el.querySelectorAll(".sm-score-block input").item(0);
    expect(minScoreInput).to.exist;
    minScoreInput.value = data.minScore;
    minScoreInput.dispatchEvent(new Event("input"));
    expect(el.minScore).to.equal(data.minScore);

    const maxScoreInput = el.querySelectorAll(".sm-score-block input").item(1);
    expect(maxScoreInput).to.exist;
    maxScoreInput.value = data.maxScore;
    maxScoreInput.dispatchEvent(new Event("input"));
    expect(el.maxScore).to.equal(data.maxScore);

    const messageInput = el.querySelector(".message-input");
    expect(messageInput).to.exist;
    messageInput.value = data.body;
    messageInput.dispatchEvent(new Event("change"));
    expect(el.body).to.equal(data.body);

    const showRecipientsButton = document.getElementById("sm-show-recipients-button");
    expect(showRecipientsButton).to.exist;
    showRecipientsButton.click();
    await waitUntil(() => el.querySelector(".sm-recipients"), "Element did not render results");
    const recipientDivs = el.querySelectorAll(".sm-recipients > div");
    expect(recipientDivs.length).to.equal(data.recipients.length);

    data.recipients.forEach((r, i) => {
      expect(recipientDivs.item(i).innerHTML).to.contain(data.recipients[i].displayName);
    });

    const sendButton = el.querySelector(".send-button-wrapper > button");
    expect(sendButton).to.exist;
    sendButton.click();
  });

  it ("is accessible", async () => {

    let el = await fixture(html`
      <sakai-submission-messager assignment-id="${data.assignmentId}" title="${data.title}"></sakai-submission-messager>
    `);

    expect(el).to.be.accessible();
  });
});
