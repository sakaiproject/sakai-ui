import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { SakaiDashboardWidget } from "./SakaiDashboardWidget.js";
import "@sakai-ui/sakai-tasks";

export class SakaiTasksWidget extends SakaiDashboardWidget {

  constructor() {

    super();

    this.widgetId = "tasks";
  }

  content() {

    return html`
      <sakai-tasks
        user-id="${ifDefined(this.userId ? this.userId : "")}"
        site-id="${ifDefined(this.siteId ? this.siteId : "")}"
      >
      </sakai-tasks>
    `;
  }
}
