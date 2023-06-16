import { SakaiElement } from "@sakai-ui/sakai-element";
import { html } from "lit";
import "@sakai-ui/sakai-notifications";
import { callSubscribeIfPermitted } from "@sakai-ui/sakai-portal-utils";

export class SakaiPWA extends SakaiElement {

  static get properties() {

    return {
      displayNotificationsButton: { attribute: false, type: Boolean },
      offline: { attribute: false, type: Boolean },
    };
  }

  constructor() {

    super();

    this.offline = !navigator.onLine;

    window.addEventListener("online", () => this.offline = false);
    window.addEventListener("offline", () => this.offline = true);

    this.loadTranslations("sakai-pwa").then(i18n => { this.i18n = i18n; this.requestUpdate(); });
  }

  _requestNotificationPermission() {

    callSubscribeIfPermitted().then(() => this.displayNotificationsButton = false, () => this.displayNotificationsButton = false);
  }

  shouldUpdate() {
    return this.i18n;
  }

  firstUpdated() {
    this.displayNotificationsButton = Notification.permission === "default";
  }

  render() {

    return html`
      ${this.offline ? html`
        <div class="sak-banner-info">You are offline</div>
      ` : ""}
      <h2 class="text-center">${this.i18n.notifications}</h2>
      <div class="text-center my-3 ${this.displayNotificationsButton ? "d-block" : "d-none"}">
        <span id="pwa-permission-information" class="text-center me-2">${this.i18n.allow_notifications_instruction}</span>
        <button @click=${this._requestNotificationPermission}
            class="btn btn-primary mt-2 mt-sm-0">
          ${this.i18n.allow_notifications}
        </button>
      </div>
      <div class="p-2">
        <sakai-notifications url="/direct/portal/notifications.json" ?offline=${this.offline} push></sakai-notifications>
      </div>
    `;
  }
}
