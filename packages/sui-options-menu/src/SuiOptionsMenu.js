import { css, html, LitElement } from "lit";
import "@lion/dialog";

export class SuiOptionsMenu extends LitElement {

  constructor() {

    super();

    this.placementModeLocalConfig = { placementMode: "local", popperConfig: { placement: "right" } };
  }

  static get properties() {

    return {
      placement: { type: String },
    };
  }

  set placement(value) {

    this._placement = value;
    this.placementModeLocalConfig.popperConfig.placement = value;
  }

  get placement() { return this._placement; }

  render() {

    return html`
      <lion-dialog .config=${this.placementModeLocalConfig}>
        <a href="javascript:;" slot="invoker">
          <slot name="invoker"></slot>
        </a>
        <div slot="content" class="overlay">
          <slot name="content"></slot>
        </div>
      </lion-dialog>
    `;
  }

  static get styles() {

    return [
      css`
        .overlay {
          background-color: var(--sakai-options-menu-background-color, white);
          border: 1px solid var(--sakai-options-menu-border-color, #F1F2F3);
          border-radius: var(--sakai-options-menu-border-radius, 4px);
          width: 200px;
        }
        a {
          text-decoration: none;
          color: var(--sakai-options-menu-color, black);
        }
      `,
    ];
  }
}
