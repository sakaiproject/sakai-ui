import { html } from "lit";
import "../sui-rubric-readonly.js";
import { SuiRubricsHelpers } from "./SuiRubricsHelpers.js";
import { SuiRubricsList } from "./SuiRubricsList.js";

const rubricName = "name";
const rubricTitle = "title";
const rubricCreator = "creator";
const rubricModified = "modified";

export class SuiRubricsSharedList extends SuiRubricsList {

  constructor() {

    super();

    this.getSharedRubrics();
  }

  static get properties() {

    return {
      siteId: { attribute: "site-id", type: String },
      rubrics: { attribute: false, type: Array },
      enablePdfExport: { attribute: "enable-pdf-export", type: Boolean },
    };
  }

  shouldUpdate() {
    return this.rubrics;
  }

  render() {

    return html`
      <div role="tablist">
      ${this.rubrics.map(r => html`
        <sui-rubric-readonly rubric="${JSON.stringify(r)}" @copy-to-site="${this.copyToSite}" ?enablePdfExport="${this.enablePdfExport}"></sui-rubric-readonly>
      `)}
      </div>
    `;
  }

  refresh() {
    this.getSharedRubrics();
  }

  getSharedRubrics() {

    const url = "/api/rubrics/shared";
    fetch(url, { credentials: "include" })
    .then(r => {

      if (r.ok) {
        return r.json();
      }
      throw new Error("Network error while getting shared rubrics");
    })
    .then(rubrics => this.rubrics = rubrics)
    .catch (error => console.error(error));
  }

  copyToSite(e) {

    SuiRubricsHelpers.get(`/api/sites/${this.siteId}/rubrics/${e.detail}/copyToSite`, {})
      .then(() => this.dispatchEvent(new CustomEvent("copy-share-site")));
  }

  sortRubrics(rubricType, ascending) {

    switch (rubricType) {
      case rubricName:
        this.rubrics.sort((a, b) => ascending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
        break;
      case rubricTitle:
        this.rubrics.sort((a, b) => ascending ? a.metadata.siteName.localeCompare(b.metadata.siteName) : b.metadata.siteName.localeCompare(a.metadata.siteName));
        break;
      case rubricCreator:
        this.rubrics.sort((a, b) => ascending ? a.metadata.creatorName.localeCompare(b.metadata.creatorName) : b.metadata.creatorName.localeCompare(a.metadata.creatorName));
        break;
      case rubricModified:
        this.rubrics.sort((a, b) => ascending ? a.metadata.modified.localeCompare(b.metadata.modified) : b.metadata.modified.localeCompare(a.metadata.modified));
        break;
    }
    this.requestUpdate("rubrics");
  }
}
