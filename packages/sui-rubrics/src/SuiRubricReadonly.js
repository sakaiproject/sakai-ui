import { SuiRubric } from "./SuiRubric.js";
import { html } from "lit";
import "../sui-rubric-criteria-readonly.js";
import "../sui-rubric-pdf.js";

export class SuiRubricReadonly extends SuiRubric {

  constructor() {

    super();

    this.rubricExpanded = true;
    this.enablePdfExport = false;
  }

  static get properties() {

    return {
      rubric: { type: Object },
      enablePdfExport: { attribute: "enable-pdf-export", type: Boolean },
    };
  }

  shouldUpdate() {
    return this.rubric;
  }

  render() {

    return html`
      <div class="rubric-title" @click="${this.toggleRubric}">
        <div>
          <span class="rubric-name" id="rubric_toggle_shared_${this.rubric.id}" aria-expanded="${this.rubricExpanded}" role="tab" title="${this.i18n.toggle_details} ${this.rubric.title}" tabindex="0" >
            <span class="fa fa-chevron-right"></span>
            ${this.rubric.title}
          </span>
        </div>

        <div class="d-none d-sm-block rubric-site-title">${this.rubric.siteTitle}</div>
        <div class="d-none d-sm-block rubric-creator-name">${this.rubric.creatorDisplayName}</div>
        <div class="d-none d-sm-block">${this.rubric.formattedModifiedDate}</div>

        <div class="actions">
          <div class="action-container">
            <span class="d-none d-sm-none d-md-block visually-hidden"><sr-lang key="copy"></sr-lang></span>
            <span role="button" title="${this.i18n.copy_to_site.replace("{}", this.rubric.title)}" tabindex="0" class="clone fa fa-copy" @click="${this.copyToSite}"></span>
          </div>
          ${this.enablePdfExport ? html`
            <div class="action-container">
              <sui-rubric-pdf
                  site-id="${this.siteId}"
                  rubric-title="${this.rubric.title}"
                  rubricId="${this.rubric.id}"
              >
              </sui-rubric-pdf>
            </div>
          ` : ""}
        </div>
      </div>

      <div class="collapse-details" role="tabpanel" aria-labelledby="rubric_toggle_${this.rubric.id}" id="collapse_shared_${this.rubric.id}">
        <div class="rubric-details style-scope sakai-rubric">
          <sui-rubric-criteria-readonly .criteria="${this.rubric.criteria}" .weighted=${this.rubric.weighted}></sui-rubric-criteria-readonly>
        </div>
      </div>
    `;
  }

  copyToSite(e) {

    e.stopPropagation();
    this.dispatchEvent(new CustomEvent("copy-to-site", { detail: this.rubric.id }));
  }
}
