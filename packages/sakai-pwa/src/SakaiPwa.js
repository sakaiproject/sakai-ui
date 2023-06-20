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
      showingTasksNotifications: { attribute: false, type: Boolean },
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
    this.showingTasks = false;

    bootstrap.Offcanvas.getInstance(document.getElementById("pwa-menu")).hide();
  }

  _showTasks() {

    this.showingTasks = true;
    this.showingNotifications = false;

    bootstrap.Offcanvas.getInstance(document.getElementById("pwa-menu")).hide();
  }

  _login() {

    const eid = this.querySelector("#pwa-login-eid").value;
    const pw = this.querySelector("#pwa-login-pw").value;

    console.log(eid);
    console.log(pw);

    const url = `/api/login?username=${eid}&password=${pw}`;
    fetch(url)
    .then(r => {

      if (r.ok) {
        return r.text();
      }

      throw new Error(`Network error while logging in at ${url}`);
    })
    .then(sessionId => {

      if (sessionId) {
        console.debug(`Logged in. Session ID: ${sessionId}`);
        window.location = "/pwa";
      } else {
        console.error("Failed to login.");
      }
    })
    .catch (error => console.error(error));
  }

  _logout() {

    navigator.serviceWorker.ready.then(reg => { console.log("balls"); reg.active.postMessage("CLEAR CACHE"); });
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
            title="${this.i18n.view_navigation}"
            ?disabled=${!portal.user.id && !this.offline}>
          <span class="bi bi-list"></span>
        </button>
        <div id="pwa-header-logo" class="d-flex align-items-center justify-content-between bg-primary">
          <a class="px-3 btn" href="/portal" title="${this.i18n.portal_home}">
            <button class="btn icon-button btn-logo-button" type="button">
              <img src="/library/skin/default-skin/images/sakaiLogo.png" alt="Sakai Logo">
            </button>
          </a>
        </div>
        ${portal.user.id ? html`
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
        ` : html`
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#pwa-login-modal" aria-controls="pwa-login-modal">Login</button>
        `}
      </header>

      <div id="pwa-login-modal" class="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Login</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label for="pwa-login-eid" class="form-label">${this.i18n.login_username}</label>
              <input id="pwa-login-eid" type="text" class="form-control mb-2 $!{hasErrorsClass}" autocomplete="username">

              <label for="pwa-login-pw" class="form-label">${this.i18n.login_password}</label>
              <div class="input-group mb-3 password-field">
                <input id="pwa-login-pw" type="password" class="form-control $!{hasErrorsClass}" autocomplete="current-password"></input>

                <input type="checkbox" class="btn-check" id="showPw" autocomplete="off">
                <label class="input-group-text" for="showPw">
                  <i class="bi bi-eye-slash-fill" aria-hidden="true"></i>
                  <span class="visually-hidden">${this.i18n.login_show_pw}</span>
                </label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" @click=${this._login} class="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center my-3 ${this.displayNotificationsButton ? "d-block" : "d-none"}">
        <div id="pwa-permission-information" class="text-center me-2">${this.i18n.allow_notifications_instruction}</div>
        <button @click=${this._requestNotificationPermission}
            class="btn btn-primary mt-2 mt-sm-0">
          ${this.i18n.allow_notifications}
        </button>
      </div>

      <div id="pwa-profile" class="offcanvas offcanvas-end">
        <div class="offcanvas-header">
          <div id="pwa-profile-label" class="fw-bold fs-1">Profile</div>
          <button type="button" class="btn-close fs-2" data-bs-dismiss="offcanvas" aria-label="Close"></button>
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
            <a href="logout" title="Logout button" id="loginLink1" @click=${this._logout} class="bi bi-box-arrow-right btn btn-primary w-100">
              <span class="Mrphs-login-Message">Logout</span>
            </a>
          </div>
        </div>
      </div>

      <div id="pwa-menu" class="offcanvas offcanvas-start">
        <div class="offcanvas-header">
          <div id="pwa-menu-label" class="fw-bold fs-1">Menu</div>
          <button type="button" class="btn-close fs-2" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="list-unstyled">
            <li>
              <button type="button" class="btn icon-button" @click=${this._showNotifications}>
                <span class="si si-alerts fs-2"></span>
                <span class="ms-2 fs-3">${this.i18n.notifications}</span>
              </button>
            </li>
            <li>
              <button type="button" class="btn icon-button" @click=${this._showTasks}>
                <span class="si si-alerts fs-2"></span>
                <span class="ms-2 fs-3">${this.i18n.tasks}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      ${this.offline ? html`
        <div class="sak-banner-info">You are offline</div>
      ` : ""}
      ${this.showingNotifications && portal.user.id ? html`
        <h2 class="text-center">${this.i18n.notifications}</h2>
        <div class="p-2">
          <sakai-notifications url="/direct/portal/notifications.json" ?offline=${this.offline} push></sakai-notifications>
        </div>
      ` : ""}
      ${this.showingTasks ? html`
        <h2 class="text-center">${this.i18n.tasks}</h2>
      ` : ""}
    `;
  }
}
