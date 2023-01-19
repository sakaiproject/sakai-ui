import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { SuiDashboardWidget } from "./SuiDashboardWidget.js";
import "@sakai-ui/sui-tasks";

export class SuiTasksWidget extends SuiDashboardWidget {

  constructor() {

    super();

    this.widgetId = "tasks";
  }

  content() {

    return html`
      <sui-tasks
        user-id="${ifDefined(this.userId ? this.userId : "")}"
        site-id="${ifDefined(this.siteId ? this.siteId : "")}"
      >
      </sui-tasks>
    `;
  }
}
