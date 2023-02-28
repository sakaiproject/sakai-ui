import { html, LitElement } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { loadProperties } from "@sakai-ui/sakai-i18n";
import "@sakai-ui/sakai-icon";

/**
 * Renders a user's name pronunciation player.
 *
 * Usage: <sakai-pronunciation-player user-id="SOMEUSERID"></sakai-pronunciation-player>
 */
export class SakaiPronunciationPlayer extends LitElement {

  constructor() {

    super();

    loadProperties("pronunciation-player").then(r => { this.i18n = r; this.requestUpdate(); });
  }

  static get properties() {

    return {
      userId: { attribute: "user-id", type: String },
      playing: { attribute: false, type: Boolean },
      src: { attribute: false, type: String },
    };
  }

  set userId(value) {

    this._userId = value;
    this.src = `/direct/profile/${value}/pronunciation?v=${Math.floor(Math.random() * 100)}`;
  }

  get userId() { return this._userId; }

  shouldUpdate() {
    return this.i18n && this.src;
  }

  render() {

    return html`
      <div>
        <button id="play-button"
            class="transparent"
            aria-label="${this.i18n.play_pronunciation_tooltip}"
            title="${this.i18n.play_pronunciation_tooltip}"
            @click=${() => this.shadowRoot.getElementById("player").play()}>
          <sakai-icon type="${this.playing ? "volume_up" : "play"}"
              size="${this.playing ? "small" : "smallest"}">
          </sakai-icon>
        </button>
        <audio id="player"
            src="${ifDefined(this.src)}"
            @playing=${() => this.playing = true}
            @ended=${() => this.playing = false}>
        </audio>
      </div>
    `;
  }
}
