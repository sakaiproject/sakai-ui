import { css, html, LitElement } from "lit";
import { loadProperties } from "@sakai-ui/sui-i18n";
import "@sakai-ui/sui-icon";

export class SuiFileList extends LitElement {

  constructor() {

    super();

    loadProperties("file-list").then(r => this.i18n = r);
  }

  static get properties() {

    return {
      files: { type: Array },
      i18n: { type: Object },
    };
  }

  shouldUpdate() {
    return this.i18n && this.files;
  }

  render() {

    return html`
      <div id="container">
      ${this.files.map(f => html`
        <div class="file">
          <div><sui-icon type="${SuiFileList.iconMapping.get(f.mimetype)}"></sui-icon></div>
          <div><a href="${f.url}">${f.name}</a></div>
          <div>${f.size}</div>
        </div>
      `)}
      </div>
    `;
  }

  static get styles() {

    return css`
      #container {
        padding: 14px;
      }
      .file {
        display: flex;
        align-items: center;
      }
        .file div {
          margin-left: 10px;
        }
    `;
  }
}

SuiFileList.iconMapping = new Map();
SuiFileList.iconMapping.set("application/vnd.openxmlformats-officedocument.wordprocessingml.document", "word");
