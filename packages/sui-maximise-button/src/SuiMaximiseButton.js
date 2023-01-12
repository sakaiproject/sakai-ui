import { SuiElement } from "@sakai-ui/sui-element";
import { html } from "lit";
import "@sakai-ui/fa-icon";
import "@sakai-ui/sui-icon";

export class SuiMaximiseButton extends SuiElement {

  constructor() {

    super();

    this.loadTranslations("maximise-button").then(t => { this.i18n = t; this.requestUpdate(); });
  }

  static get properties() {

    return {
      fullScreen: { attribute: "full-screen", type: Boolean },
    };
  }

  shouldUpdate() {
    return this.i18n;
  }

  render() {

    return html`
      ${this.fullScreen ? html`
        <a class="Mrphs-toolTitleNav__link" href="javascript;" title="${this.i18n.normal_view}" aria-label="${this.i18n.normal_view}" @click=${this.minimise}>
          <sui-icon type="fs-compress" size="small"></sui-icon>
        </a>
      ` : html`
        <a class="Mrphs-toolTitleNav__link" href="javascript;" title="${this.i18n.fullscreen_view}" aria-label="${this.i18n.fullscreen_view}" @click=${this.maximise}>
          <sui-icon type="fs-expand" size="small"></sui-icon>
        </a>
      `}
    `;
  }

  maximise(e) {

    e.preventDefault();

    portal.maximiseTool();

    this.dispatchEvent(new CustomEvent("maximise-tool", { bubbles: true, composed: true }));
    this.fullScreen = true;
  }

  minimise(e) {

    if (e) {
      e.preventDefault();
    }

    portal.minimiseTool();

    this.dispatchEvent(new CustomEvent("minimise-tool", { bubbles: true, composed: true }));
    this.fullScreen = false;
  }

  setMinimised() {
    this.fullScreen = false;
  }

  setMaximised() {
    this.fullScreen = true;
  }
}
