import { SakaiElement } from "@sakai-ui/sakai-element";
import { html } from "lit";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import "@sakai-ui/sakai-editor";

export class SakaiCourseOverview extends SakaiElement {

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
        <sakai-editor content="${this.overview}" toolbar="basic"></sakai-editor>
      ` : html`
        <div id="sakai-course-overview-display">${unsafeHTML(this.overview)}</div>
      `}
    `;
  }
}
