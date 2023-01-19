import { css, html } from "lit";
import { SuiDashboardWidget } from "./SuiDashboardWidget.js";
import { suiWidgets } from "./SuiWidgets.js";
import { loadProperties } from "@sui-ui/sui-i18n";

export class SuiWidgetPicker extends SuiDashboardWidget {

  constructor() {

    super();

    this.widgetId = "widget-picker";
    this.all = suiWidgets.getIds();
    this.current = [];
    this.available = [];
    this.draggable = false;
    this.hasOptions = false;

    this.loadTranslations(this.widgetId);
    loadProperties("toolnames").then(r => this.toolnames = r);
  }

  static get properties() {

    return {
      all: { type: Array },
      current: { type: Array },
      available: { type: Array },
      toolnames: { type: Object },
    };
  }

  set all(value) {

    this._all = value;

    if (this.current) {
      this.available = value.filter(v => !this.current.includes(v));
    }
  }

  get all() { return this._all; }

  set current(value) {

    this._current = value;
    if (this.all) {
      this.available = this.all.filter(v => !value.includes(v));
    }
  }

  get current() { return this._current; }

  lookupWidgetName(id) {
    return this.toolnames[id] || this.toolnames.unknown;
  }

  widgetPicked(e) {
    this.dispatchEvent(new CustomEvent("widget-picked", { detail: { id: e.target.id }, bubbles: true }));
  }

  remove() {
    this.dispatchEvent(new CustomEvent("remove", { detail: { newState: "view" }, bubbles: true }));
  }

  shouldUpdate(changed) {
    return super.shouldUpdate(changed) && this.toolnames;
  }

  content() {

    return html`
      ${this.available.length ? html`
        <div id="topbar">${this.i18n.pick_instruction}</div>
        ${this.available.map(w => html`
          <div class="widget-option"><a href="javascript:;" id="${w}" @click=${this.widgetPicked}>${this.lookupWidgetName(w)}</a></div>
        `)}
      ` : html`
        <div class="widget-option">${this.i18n.all_displayed}</div>
      `}
    `;
  }

  static get styles() {

    return [
      ...super.styles,
      css`
        .widget-option {
          margin-left: 12px;
        }
        .widget-option a {
          text-decoration: none;
          color: black;
          font-size: 18px;
        }
      `,
    ];
  }
}