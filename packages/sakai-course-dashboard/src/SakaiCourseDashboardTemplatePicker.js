import { css, html } from "lit";
import { loadProperties } from "@sakai-ui/sakai-i18n";
import { SakaiDialogContent } from "@sakai-ui/sakai-dialog-content";
import "@sakai-ui/sakai-button";

export class SakaiCourseDashboardTemplatePicker extends SakaiDialogContent {

  static get properties() {

    return {
      i18n: Object,
      template: { type: Object },
    };
  }

  constructor() {

    super();
    loadProperties("dashboard").then(r => this.i18n = r);
  }

  select() {

    this.close();
    this.dispatchEvent(new CustomEvent("template-selected", { detail: { template: this.template }, bubbles: true }));
  }

  title() {
    return html`${this.i18n.template_picker_title}`;
  }

  shouldUpdate() {
    return this.i18n && this.template;
  }

  templateSelected(e) {
    this.template = e.target.dataset.template;
  }

  content() {

    console.log(this.template);

    return html`

      <div id="instruction">
        ${this.i18n.template_picker_instruction}
      </div>

      <div id="template-block">
        <div id="template1-block" class=${this.template.id == 1 ? "selected" : ""}>
          <a href="javascript:;" @click=${this.templateSelected} data-template="1">
            <img  data-template="1" src="${this.template.thumbnailUrl}" class="thumbnail" />
          </a>
          <h2>${this.i18n.option1}</h2>
        </div>
        <div id="template2-block" class=${this.template.id == 2 ? "selected" : ""}>
          <a href="javascript:;" @click=${this.templateSelected} data-template="2">
            <img data-template="2" src="${this.template.thumbnailUrl}" class="thumbnail" />
          </a>
          <h2>${this.i18n.option2}</h2>
        </div>
        <div id="template3-block" class=${this.template.id == 3 ? "selected" : ""}>
          <a href="javascript:;" @click=${this.templateSelected} data-template="3">
            <img data-template="3" src="${this.template.thumbnailUrl}" class="thumbnail" />
          </a>
          <h2>${this.i18n.option3}</h2>
        </div>
      </div>
    `;
  }

  buttons() {

    return html`
      <sakai-button @click=${this.select} primary>${this.i18n.select}</sakai-button>
    `;
  }

  static get styles() {

    return css`
      ${SakaiDialogContent.styles}

      #instruction {
        width: 745px;
        margin-bottom: 20px;
      }

      #template-block {
        display: flex;
      }
      #template-block div {
        flex: 1;
        text-align: center;
      }

      .thumbnail {
        width: 199px;
        height: 132px;
      }

      .selected {
        border: 3px black solid;
      }
    `;
  }
}
