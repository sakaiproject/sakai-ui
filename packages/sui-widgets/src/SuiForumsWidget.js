import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import "@sakai-ui/sui-forums";
import { SuiDashboardWidget } from "./SuiDashboardWidget.js";

export class SuiForumsWidget extends SuiDashboardWidget {

  constructor() {

    super();

    this.widgetId = "forums";
  }

  content() {

    return html`
      <sui-forums
        user-id="${ifDefined(this.userId ? this.userId : undefined)}"
        site-id="${ifDefined(this.siteId ? this.siteId : undefined)}"
      >
      </sui-forums>
    `;
  }
}
