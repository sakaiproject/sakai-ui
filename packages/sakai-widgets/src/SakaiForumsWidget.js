import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import "@sakai-ui/sakai-forums";
import { SakaiDashboardWidget } from "./SakaiDashboardWidget.js";

export class SakaiForumsWidget extends SakaiDashboardWidget {

  constructor() {

    super();

    this.widgetId = "forums";
  }

  content() {

    return html`
      <sakai-forums
        user-id="${ifDefined(this.userId ? this.userId : undefined)}"
        site-id="${ifDefined(this.siteId ? this.siteId : undefined)}"
      >
      </sakai-forums>
    `;
  }
}
