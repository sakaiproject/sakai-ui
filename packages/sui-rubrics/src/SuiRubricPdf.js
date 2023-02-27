import { RubricsElement } from "./RubricsElement.js";
import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";

export class SuiRubricPdf extends RubricsElement {

  static get properties() {

    return {
      ...RubricsElement.properties,
      rubricTitle: { attribute: "rubric-title", type: String },
      rubricId: { attribute: "rubric-id", type: String },
      siteId: { attribute: "site-id", type: String },
      toolId: { attribute: "tool-id", type: String },
      entityId: { attribute: "entity-id", type: String },
      evaluatedItemId: { attribute: "evaluated-item-id", type: String },
      url: { attribute: false, type: String },
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {

    super.attributeChangedCallback(name, oldValue, newValue);

    if (this.siteId && this.rubricId) {

      let url = `/api/sites/${this.siteId}/rubrics/${this.rubricId}/pdf`;
      if (this.toolId && this.entityId && this.evaluatedItemId) {
        url += `?toolId=${this.toolId}&itemId=${this.entityId}&evaluatedItemId=${this.evaluatedItemId}`;
      }
      this.url = url;
    }
  }

  shouldUpdate() {
    return this.url;
  }

  render() {

    return html`
      <a role="button"
        title="${this.i18n.export_title.replace("{}", this.rubricTitle)}"
        aria-label="${this.i18n.export_title.replace("{}", this.rubricTitle)}"
        href="${ifDefined(this.url)}"
        @click=${e => e.stopPropagation()}
        class="linkStyle pdf fa fa-file-pdf-o">
      </a>
    `;
  }
}
