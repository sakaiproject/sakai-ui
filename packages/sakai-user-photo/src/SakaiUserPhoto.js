import { SakaiElement } from "@sakai-ui/sakai-element";
import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import "@sakai-ui/sakai-profile";

/**
 * A simple wrapper for Sakai's user profile picture.
 *
 * Usage:
 * <sakai-user-photo user-id="adrian">
 *
 * @element sakai-user-photo
 * @property {string} user-id - A Sakai user id
 * @property {string} [classes] - Extra classes to style the content
 * @property {string} [profile-popup] By default, profile popups are off. Set this to "on" if you want them
 * @property {boolean} [official] Set this if you want the official Sakai photo
 * @property {string} [site-id] Set this to trigger permissions checks on the photo
 * @property {string} [label] This will be used as the title and aria-label for the div
 * @property {boolean} [print] Set this to trigger the render of a print friendly img tag
 */
export class SakaiUserPhoto extends SakaiElement {

  constructor() {

    super();

    this.classes = "large-thumbnail";
    this.profilePopup = SakaiUserPhoto.OFF;
  }

  static get properties() {

    return {
      userId: { attribute: "user-id", type: String },
      classes: { type: String },
      profilePopup: { attribute: "profile-popup", type: String },
      official: { type: Boolean },
      siteId: { attribute: "site-id", type: String },
      label: { type: String },
      print: { type: Boolean },
      online: { type: Boolean },
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {

    super.attributeChangedCallback(name, oldValue, newValue);

    if (this.userId) {
      this.generatedId = `sakai-user-photo-${this.userId}-${Math.floor(Math.random() * 100)}`;

      this.url = `/direct/profile/${this.userId}/image/${this.official ? "official" : "thumb"}`
                  + (this.siteId ? `?siteId=${this.siteId}` : "");
    }

    if (this.profilePopup == SakaiUserPhoto.ON && this.generatedId) {
      this.updateComplete.then(() => {

        new bootstrap.Popover(document.getElementById(this.generatedId), {
          content: this.querySelector("sakai-profile"),
          html: true,
        });
      });
    }
  }

  shouldUpdate() {
    return this.userId;
  }

  render() {

    if (this.print) {
      return html`
        <img src="${ifDefined(this.url)}" alt="${ifDefined(this.label ? this.label : undefined)}" />
      `;
    }

    return html`
      <div id="${ifDefined(this.generatedId)}"
          data-user-id="${this.userId}"
          class="sakai-user-photo ${this.classes}"
          data-bs-toggle="popover"
          aria-label="${ifDefined(this.label ? this.label : undefined)}"
          title="${ifDefined(this.label ? this.label : undefined)}"
          style="background-image:url(${this.url}) ${this.profilePopup === SakaiUserPhoto.OFF ? "" : ";cursor: pointer;"}">
        ${this.online ? html`
        <span></span>
        ` : ""}
      </div>
      <div class="d-none">
      <sakai-profile user-id="${this.userId}"></sakai-profile>
      </div>
    `;
  }
}

SakaiUserPhoto.OFF = "off";
SakaiUserPhoto.ON = "on";
