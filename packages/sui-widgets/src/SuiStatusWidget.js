import { html } from "lit";
import { SuiDashboardWidget } from "./SuiDashboardWidget.js";

export class SuiStatusWidget extends SuiDashboardWidget {

  constructor() {

    super();

    this.title = "Status";
  }

  content() {

    return html`
      This is the status widget
    `;
  }
}
