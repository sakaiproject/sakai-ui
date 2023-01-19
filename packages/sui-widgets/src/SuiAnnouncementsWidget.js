import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import "@sui-ui/sui-announcements";
import { SuiDashboardWidget } from "./SuiDashboardWidget.js";

export class SuiAnnouncementsWidget extends SuiDashboardWidget {

  constructor() {

    super();

    this.widgetId = "announcements";
  }

  content() {

    return html`
      <sui-announcements
        user-id="${ifDefined(this.userId ? this.userId : undefined)}"
        site-id="${ifDefined(this.siteId ? this.siteId : undefined)}"
      >
      </sui-announcements>
    `;
  }
}
