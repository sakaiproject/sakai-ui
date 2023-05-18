import { RubricsElement } from "./RubricsElement.js";
import { html } from "lit";
import { SakaiRubricsLanguage, tr } from "./SakaiRubricsLanguage.js";
import { SakaiRubricsHelpers } from "./SakaiRubricsHelpers.js";

export class SakaiRubricStudentPreviewButton extends RubricsElement {

  constructor() {

    super();

    this.display = "button";
    this.i18nPromise = SakaiRubricsLanguage.loadTranslations();
  }

  static get properties() {

    return {
      display: String,
      siteId: { attribute: "site-id", type: String },
      toolId: { attribute: "tool-id", type: String },
      entityId: { attribute: "entity-id", type: String },
      rubricId: String,
    };
  }

  set siteId(value) {

    this._siteId = value;
    this.i18nPromise.then(r => this.initLightbox(r, value));
  }

  get siteId() { return this._siteId; }

  attributeChangedCallback(name, oldValue, newValue) {

    super.attributeChangedCallback(name, oldValue, newValue);

    if (this.toolId && this.entityId) {
      this.getRubricId();
    }
  }

  shouldUpdate(changedProperties) {
    return changedProperties.has("rubricId");
  }

  render() {

    return html`
      ${this.display === "button" ?
      html`<h3><sr-lang key="grading_rubric"></sr-lang></h3>
      <button class="btn btn-link" aria-haspopup="dialog" @click="${this.showRubric}"><sr-lang key="preview_rubric"></sr-lang></button>`
      : html`<span class="si si-sakai-rubrics" style="cursor: pointer;" title="${tr("preview_rubric")}" @click="${this.showRubric}"></span>`
      }
    `;
  }

  getRubricId() {

    const url = `/api/sites/${this.siteId}/rubric-associations/tools/${this.toolId}/items/${this.entityId}`;

    SakaiRubricsHelpers.get(url,
      { params: { toolId: this.toolId, itemId: this.entityId } })
    .then(association => {

      if (association && !association.parameters.hideStudentPreview) {
        this.rubricId = association.rubricId;
      }
    });
  }

  showRubric(e) {

    e.preventDefault();

    this.showRubricLightbox(this.rubricId);
    return false;
  }
}
