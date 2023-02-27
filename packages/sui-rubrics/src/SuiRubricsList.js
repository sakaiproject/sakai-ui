import { RubricsElement } from "./RubricsElement.js";
import { html } from "lit";
import "../sui-rubric.js";
import { SharingChangeEvent } from "./SharingChangeEvent.js";

const rubricName = "name";
const rubricTitle = "title";
const rubricCreator = "creator";
const rubricModified = "modified";

export class SuiRubricsList extends RubricsElement {

  constructor() {

    super();

    this.enablePdfExport = false;
  }

  static get properties() {

    return {
      ...RubricsElement.properties,
      siteId: { attribute: "site-id", type: String },
      rubrics: { attribute: false, type: Array },
      enablePdfExport: { attribute: "enable-pdf-export", type: Boolean },
    };
  }

  set siteId(value) {

    this._siteId = value;
    this.getRubrics();
  }

  get siteId() { return this._siteId; }

  search(search) {

    this.querySelectorAll("sui-rubric, sui-rubric-readonly").forEach(rubric => {

      rubric.classList.remove("d-none");
      rubric.classList.toggle("d-none", !rubric.matches(search));
    });
  }

  shouldUpdate() {
    return this.rubrics && super.shouldUpdate();
  }

  render() {

    return html`
      <div role="presentation">
        <div role="tablist">
        ${this.rubrics.map(r => html`
          <sui-rubric @clone-rubric="${this.cloneRubric}" site-id="${this.siteId}" @delete-item="${this.deleteRubric}" rubric="${JSON.stringify(r)}" ?enable-pdf-export="${this.enablePdfExport}"></sui-rubric>
        `)}
        </div>
      </div>
      <br>
      <div class="act">
        <button class="active add-rubric" @click="${this.createNewRubric}">
            <span class="add fa fa-plus"></span>
            <sr-lang key="add_rubric">add_rubric</sr-lang>
        </button>
      </div>
    `;
  }

  refresh() {
    this.getRubrics();
  }

  getRubrics() {

    const url = `/api/sites/${this.siteId}/rubrics`;
    fetch(url, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
    .then(r => {

      if (r.ok) {
        return r.json();
      }
      throw new Error("Network error while loading rubrics");
    })
    .then(rubrics => this.rubrics = rubrics)
    .catch (error => console.error(error));
  }

  createRubricResponse(nr) {

    nr.new = true;

    // Make sure criterions are set, otherwise lit-html borks in sui-rubric-criterion.js
    if (!nr.criterions) {
      nr.criterions = [];
    }

    this.rubrics.push(nr);

    const tmp = this.rubrics;
    this.rubrics = [];
    this.rubrics = tmp;

    nr.expanded = true;

    this.requestUpdate();
  }

  deleteRubric(e) {

    e.stopPropagation();
    this.rubrics.splice(this.rubrics.map(r => r.id).indexOf(e.detail.id), 1);

    const tmp = this.rubrics;
    this.rubrics = [];
    this.rubrics = tmp;

    this.dispatchEvent(new SharingChangeEvent());

    this.requestUpdate();
  }

  cloneRubric(e) {

    const url = `/api/sites/${this.siteId}/rubrics/${e.detail.id}/copyToSite`;
    fetch(url, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
    .then(r => {

      if (r.ok) {
        return r.json();
      }
      throw new Error("Network error while copying rubric");
    })
    .then(rubric => this.createRubricResponse(rubric))
    .catch (error => console.error(error));
  }

  createNewRubric() {

    const url = `/api/sites/${this.siteId}/rubrics/default`;
    fetch(url, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
    .then(r => {

      if (r.ok) {
        return r.json();
      }
      throw new Error("Network error while creating rubric");
    })
    .then(rubric => this.createRubricResponse(rubric))
    .catch (error => console.error(error));
  }

  sortRubrics(rubricType, ascending) {

    switch (rubricType) {
      case rubricName:
        this.rubrics.sort((a, b) => ascending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
        break;
      case rubricTitle:
        this.rubrics.sort((a, b) => ascending ? a.siteTitle.localeCompare(b.siteTitle) : b.siteTitle.localeCompare(a.siteTitle));
        break;
      case rubricCreator:
        this.rubrics.sort((a, b) => ascending ? a.creatorDisplayName.localeCompare(b.creatorDisplayName) : b.creatorDisplayName.localeCompare(a.creatorDisplayName));
        break;
      case rubricModified:
        this.rubrics.sort((a, b) => ascending ? a.formattedModifiedDate.localeCompare(b.formattedModifiedDate) : b.formattedModifiedDate.localeCompare(a.formattedModifiedDate));
        break;
    }
    this.requestUpdate("rubrics");
  }
}
