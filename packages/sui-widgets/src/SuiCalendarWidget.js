import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import "@sakai-ui/sui-calendar";
import { SuiDashboardWidget } from "./SuiDashboardWidget.js";

export class SuiCalendarWidget extends SuiDashboardWidget {

  constructor() {

    super();

    this.widgetId = "calendar";
  }

  shouldUpdate() {
    return this.siteId || this.userId;
  }

  content() {

    return html`
      <sui-calendar
        site-id=${ifDefined(this.siteId ? this.siteId : undefined)}
        user-id=${ifDefined(this.userId ? this.userId : undefined)}
      >
      </sui-calendar>
    `;
  }
}
