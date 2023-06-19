import { SakaiElement } from "@sakai-ui/sakai-element";
import { html } from "lit";
import "@sakai-ui/sakai-notifications";
import { callSubscribeIfPermitted } from "@sakai-ui/sakai-portal-utils";

export class SakaiPWA extends SakaiElement {

  static get properties() {

    return {
      displayNotificationsButton: { attribute: false, type: Boolean },
      offline: { attribute: false, type: Boolean },
      showingNotifications: { attribute: false, type: Boolean },
    };
  }

  constructor() {

    super();

    this.offline = !navigator.onLine;

    this.showingNotifications = true;

    window.addEventListener("online", () => this.offline = false);
    window.addEventListener("offline", () => this.offline = true);

    this.loadTranslations("sakai-pwa").then(i18n => { this.i18n = i18n; this.requestUpdate(); });
  }

  _requestNotificationPermission() {

    callSubscribeIfPermitted().then(() => this.displayNotificationsButton = false, () => this.displayNotificationsButton = false);
  }

  _showNotifications() {

    this.showingNotifications = true;

    bootstrap.Offcanvas.getInstance(document.getElementById("pwa-menu")).hide();

  }

  shouldUpdate() {
    return this.i18n;
  }

  firstUpdated() {
    this.displayNotificationsButton = Notification.permission === "default";
  }

  render() {

    return html`

      <header id="pwa-header" class="d-flex align-items-center justify-content-between" role="banner">
        <button id="pwa-menu-button" class="btn icon-button m-1"
            data-bs-toggle="offcanvas"
            data-bs-target="#pwa-menu"
            aria-controls="pwa-menu"
            aria-label="${this.i18n.view_navigation}"
            aria-expanded="false"
            title="${this.i18n.view_navigation}">
          <span class="bi bi-list"></span>
        </button>
        <div id="pwa-header-logo" class="d-flex align-items-center justify-content-between bg-primary">
          <a class="px-3 btn" href="/portal" title="${this.i18n.portal_home}">
            <button class="btn icon-button btn-logo-button" type="button">
              <img src="/library/skin/default-skin/images/sakaiLogo.png" alt="Sakai Logo">
            </button>
          </a>
        </div>
        <button class="btn icon-button sak-sysInd-account"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#pwa-profile"
            aria-controls="pwa-profile"
            title="${this.i18n.mainnav_btn_account}">
          <img id="profile-image" class="rounded-circle"
            src="/direct/profile/${portal.user.id}/image/thumb"
            alt="${this.i18n.profile_image_alt}">
        </button>
      </header>

      <div class="text-center my-3 ${this.displayNotificationsButton ? "d-block" : "d-none"}">
        <div id="pwa-permission-information" class="text-center me-2">${this.i18n.allow_notifications_instruction}</div>
        <button @click=${this._requestNotificationPermission}
            class="btn btn-primary mt-2 mt-sm-0">
          ${this.i18n.allow_notifications}
        </button>
      </div>

      <div id="pwa-profile" class="offcanvas offcanvas-end">
        <div class="offcanvas-header">
          <div id="pwa-profile-label" class="fw-bold">Profile</div>
          <button type="button" class="btn-close fs-1" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body d-flex flex-column">
          <div class="text-center mb-3 pb-2">
            <div id="sakai-profile-image-block">
              <button class="btn only-icon" data-bs-toggle="modal" data-bs-target="#profile-image-upload">
                <img class="sakai-accountProfileImage rounded-circle" width="100" src="/direct/profile/${portal.user.id}/image/thumb" alt="Profile image">
                <div id="sakai-profile-image-change">Change</div>
              </button>
            </div>
          </div>
          <div class="text-center pt-3 mt-auto">
            <a href="logout" title="Logout button" id="loginLink1" class="bi bi-box-arrow-right btn btn-primary w-100">
              <span class="Mrphs-login-Message">Logout</span>
            </a>
          </div>
        </div>
      </div>

      <div id="pwa-menu" class="offcanvas offcanvas-start">
        <div class="offcanvas-header">
          <div id="pwa-menu-label" class="fw-bold">Menu</div>
          <button type="button" class="btn-close fs-1" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="list-unstyled">
            <li>
              <button type="button" class="btn icon-button" @click=${this._showNotifications}>
                <span class="si si-alerts fs-1"></span>
                <span class="ms-2 fs-1">${this.i18n.notifications}</span>
              </button>
            </li>
            <li>
              <button type="button" class="btn icon-button" @click=${this._showTasks}>
                <span class="si si-alerts fs-1"></span>
                <span class="ms-2 fs-1">${this.i18n.tasks}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      ${this.offline ? html`
        <div class="sak-banner-info">You are offline</div>
      ` : ""}
      ${this.showingNotifications ? html`
        <h2 class="text-center">${this.i18n.notifications}</h2>
        <div class="p-2">
          <sakai-notifications url="/direct/portal/notifications.json" ?offline=${this.offline} push></sakai-notifications>
        </div>
      ` : ""}
    `;
  }
}
