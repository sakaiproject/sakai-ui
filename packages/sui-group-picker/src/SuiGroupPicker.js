import { SuiElement } from '@sakai-ui/sui-element';
import { html } from 'lit-element';

export class SuiGroupPicker extends SuiElement {

  constructor() {

    super();

    //this.groups = [];
    this.debug = false;
    this.loadTranslations("group-picker").then(t => { this.i18n = t; this.requestUpdate(); } );
  }

  static get properties() {

    return {
      siteId: { attribute: "site-id", type: String },
      groupRef: { attribute: "group-id", type: String },
      groups: { type: Array },
    };
  }

  set groups(value) {

    console.log("setting");

    this._groups = value;
    console.log(typeof value);
    console.log(value);
  }

  get groups() { return this._groups; }

  /**
   * If site-id is set, this means the caller wants us to pull the groups map from the server.
   */
  set siteId(newValue) {

    this._siteId = newValue;
    fetch(`/direct/site/${newValue}/groups.json`, { credentials: "same-origin" })
      .then(r => r.json())
      .then(groups => {

        this.groups = groups.map(g => ({reference: g.reference, title: g.title}));
        if (this.debug) {
          console.debug(this.groups);
        }
      });
  }

  get siteId() { return this._siteId; }

  groupChanged(e) {
    this.dispatchEvent(new CustomEvent("group-selected", { detail: { value: e.target.value }, bubbles: true }));
  }

  shouldUpdate() {
    return this.i18n && this.groups;
  }

  render() {

    return html`
      <select aria-label="${this.i18n.group_selector_label}" @change=${this.groupChanged}>
        <option value="/site/${this.siteId || portal.siteId}" ?selected=${this.groupRef === `/site/${this.siteId || portal.siteId}`}>
          ${this.i18n.site}
        </option>
        ${this.groups.map(g => html`<option value="${g.reference}" ?selected=${this.groupRef === g.reference}>${g.title}</option>`)}
      </select>
    `;
  }

}
