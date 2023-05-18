import { RubricsElement } from "./RubricsElement.js";
import { html } from "lit";

export class SakaiRubricGradingButton extends RubricsElement {

  constructor() {

    super();

    this.hasEvaluation = false;
  }

  static get properties() {

    return {
      entityId: { attribute: "entity-id", type: String },
      siteId: { attribute: "site-id", type: String },
      toolId: { attribute: "tool-id", type: String },
      evaluatedItemId: { attribute: "evaluated-item-id", type: String },
      hasEvaluation: { attribute: false, type: Boolean },
      onlyShowIfEvaluated: { attribute: "only-show-if-evaluated", type: Boolean },
    };
  }

  attributeChangedCallback(name, oldVal, newVal) {

    super.attributeChangedCallback(name, oldVal, newVal);

    if (this.entityId && this.toolId && this.evaluatedItemId) {
      this.setHasEvaluation();
    }
  }

  render() {

    if (this.onlyShowIfEvaluated && !this.hasEvaluation) {
      return;
    }

    return html`
      <button class="btn btn-transparent">
        <span class="si si-sakai-rubrics"></span>
      </button>
    `;
  }

  setHasEvaluation() {

    const url = `/api/sites/${this.siteId}/rubric-evaluations/tools/${this.toolId}/items/${this.entityId}/evaluations/${this.evaluatedItemId}`;
    fetch(url, { credentials: "include" }).then(r => this.hasEvaluation = r.status !== 404);
  }
}
