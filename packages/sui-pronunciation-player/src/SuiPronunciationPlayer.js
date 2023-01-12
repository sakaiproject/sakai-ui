import { html, LitElement } from "lit";
import { loadProperties } from "@sakai-ui/sui-i18n";
import "@sakai-ui/sui-icon";

/**
 * Renders a user's name pronunciation player.
 *
 * Usage: <sui-pronunciation-player user-id="SOMEUSERID"></sui-pronunciation-player>
 */
export class SuiPronunciationPlayer extends LitElement {

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
          <sui-icon type="${this.playing ? "volume_up" : "play"}"
              size="${this.playing ? "small" : "smallest"}">
          </sui-icon>
        </button>
        <audio id="player"
            src="${this.src}"
            @playing=${() => this.playing = true}
            @ended=${() => this.playing = false}>
        </audio>
      </div>
    `;
  }
}
