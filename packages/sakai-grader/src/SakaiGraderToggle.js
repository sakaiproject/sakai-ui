import { SakaiElement } from "@sakai-ui/sakai-element";
import { html } from "lit";
import { getViewPreferences, updateViewPreferences } from "../sakai-view-preferences.js";

export class SakaiGraderToggle extends SakaiElement {

  constructor() {

    super();

    this.i18n = {};
    this.loadTranslations("grader-toggle").then(i18n => this.i18n = i18n);
  }

  static get properties() {

    return {
      checked: { type: Boolean },
      uncheckedByDefault: { attribute: "unchecked-by-default", type: Boolean },
      i18n: { attribute: false, type: Object },
      tool: { type: String },
    };
  }

  set tool(newValue) {

    this._tool = newValue;
    getViewPreferences(newValue).then(prefs => {

      if (!prefs && !this.uncheckedByDefault) {
        this.checked = true;
      } else {
        this.prefs = JSON.parse(prefs);
        this.checked = this.prefs?.usegrader;
      }
    });
  }

  get tool() { return this._tool; }

  render() {

    return html`
      <label>
        <input type="checkbox" ?checked=${this.checked} @click=${this.toggleChecked} />
        ${this.i18n.use_grader}
      </label>
    `;
  }

  toggleChecked(e) {

    this.prefs = this.prefs || {};
    this.prefs.usegrader = e.target.checked;
    updateViewPreferences(this.tool, JSON.stringify(this.prefs));
  }
}
