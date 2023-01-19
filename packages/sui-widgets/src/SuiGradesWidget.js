import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { SuiDashboardWidget } from "./SuiDashboardWidget.js";
import "@sui-ui/sui-grades";

export class SuiGradesWidget extends SuiDashboardWidget {

  constructor() {

    super();

    this.widgetId = "grades";
  }

  content() {

    return html`

      <sui-grades
        user-id="${ifDefined(this.userId ? this.userId : undefined)}"
        site-id="${ifDefined(this.siteId ? this.siteId : undefined)}"
      >
      </sui-grades>
    `;
  }
}

SuiGradesWidget.roles = [ "instructor" ];
