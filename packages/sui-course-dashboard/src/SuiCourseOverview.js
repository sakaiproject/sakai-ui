import { SuiElement } from "@sakai-ui/sui-element";
import { html } from "lit";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import "@sakai-ui/sui-editor";

export class SuiCourseOverview extends SuiElement {

  static get properties() {

    return {
      overview: { type: String },
      editing: { type: Boolean },
      editorShowing: Boolean,
    };
  }

  shouldUpdate() {
    return (typeof this.overview) !== "undefined";
  }

  render() {

    return html`
      ${this.editing && !this.editorShowing ? html`
        <sui-editor content="${this.overview}" toolbar="basic"></sui-editor>
      ` : html`
        <div id="sakai-course-overview-display">${unsafeHTML(this.overview)}</div>
      `}
    `;
  }
}
