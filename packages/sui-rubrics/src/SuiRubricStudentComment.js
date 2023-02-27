import { RubricsElement } from "./RubricElement.js";
import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";

export class SuiRubricStudentComment extends RubricsElement {

  static get properties() {

    return {
      ...RubricsElement.properties,
      criterion: { type: Object },
    };
  }

  set criterion(value) {

    const oldValue = this._criterion;
    this._criterion = value;
    this._criterion.comments = value.comments && value.comments.indexOf("null") === 0 ? "" : value.comments;
    this.triggerId = `criterion-comment-${value.id}-trigger`;
    $(`#${this.triggerId}`).popover("hide");
    this.requestUpdate("criterion", oldValue);
    this.updateComplete.then(() => {

      $(`#${this.triggerId}`).popover({
        content: () => this.criterion.comments,
        html: true,
        title: () => this.criterion.title,
        placement: "auto",
      });
    });
  }

  get criterion() {
    return this._criterion;
  }

  handleClose() {

    $(`#${this.triggerId}`).popover("hide");
  }

  shouldUpdate() {
    return this.triggerId;
  }

  render() {

    return html`
      <div id="${ifDefined(this.triggerId)}"
          tabindex="0"
          style="${this.criterion.comments ? "cursor: pointer;" : ""}"
          class="comment-icon fa fa-2x fa-comments ${this.criterion.comments ? "active" : ""}">
      </div>
    `;
  }
}
