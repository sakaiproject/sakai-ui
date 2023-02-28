import { RubricsElement } from "./RubricsElement.js";
import { html } from "lit";
import "../sakai-rubrics-list.js";
import "../sakai-rubrics-shared-list.js";

export class SakaiRubricsManager extends RubricsElement {

  constructor() {

    super();

    this.siteRubricsExpanded = true;
    this.sharedRubricsExpanded = false;
    this.enablePdfExport = false;
  }

  static get properties() {

    return {
      ...RubricsElement.properties,
      siteId: { attribute: "site-id", type: String },
      enablePdfExport: { attribute: "enable-pdf-export", type: Boolean },
    };
  }

  shouldUpdate() {
    return super.shouldUpdate();
  }

  render() {

    return html`
      <h1>${this.i18n.manage_rubrics}</h1>

      <div class="sak-banner-info"><span>${this.i18n.locked_message}</span></div>

      <div class="row">
        <div class="col-md-4 form-group">
          <label class="label-rubrics" for="rubrics-search-bar"><span>${this.i18n.search_rubrics}</span></label>
          <input type="text"
              id="rubrics-search-bar"
              name="rubrics-search-bar"
              class="form-control"
              @keyup="${this.filterRubrics}">
        </div>
      </div>

      <div role="tablist">
        <div id="site-rubrics-title" aria-expanded="${this.siteRubricsExpanded ? "true" : "false"}"
            role="tab" aria-multiselectable="true" class="manager-collapse-title"
            title="${this.i18n.toggle_site_rubrics}" tabindex="0" @click="${this.toggleSiteRubrics}">
          <div>
            <span class="collpase-icon fa fa-chevron-down"></span>
            <span>${this.i18n.site_rubrics}>site_rubrics</span>
          </div>
        </div>

        <div role="tabpanel" aria-labelledby="site-rubrics-title" id="site_rubrics">
          <div class="rubric-title-sorting">
            <div>
              <a href="javascript:void(0)"
                  style="text-decoration: none;"
                  @click="${this.sortRubrics}"
                  data-key="site-name">
                <span class="site-name">${this.i18n.site_name}</span>
                <span class="collpase-icon fa fa-chevron-up site-name sort-element-site"></span>
              </a>
            </div>
            <div>
              <a href="javascript:void(0)"
                  style="text-decoration: none;"
                  @click="${this.sortRubrics}"
                  data-key="site-title">
                <span class="site-title">${this.i18n.site_title}</span>
                <span class="collpase-icon fa site-title sort-element-site"></span>
              </a>
            </div>
            <div>
              <a href="javascript:void(0)"
                  style="text-decoration: none;"
                  @click="${this.sortRubrics}"
                  data-key="site-creator">
                <span class="site-creator">${this.i18n.creator_name}</span>
                <span class="collpase-icon fa site-creator sort-element-site"></span>
              </a>
            </div>
            <div>
              <a href="javascript:void(0)"
                  style="text-decoration: none;"
                  @click="${this.sortRubrics}"
                  data-key="site-modified">
                <span class="site-modified">${this.i18n.modified}</span>
                <span class="collpase-icon fa site-modified sort-element-site"></span>
              </a>
            </div>
            <div class="actions"><span>${this.i18n.actions}></span></div>
          </div>
          <br>
          <sakai-rubrics-list id="sakai-rubrics"
              site-id="${this.siteId}"
              @sharing-change="${this.handleSharingChange}"
              @copy-share-site="${this.copyShareSite}"
              ?enable-pdf-export=${this.enablePdfExport}>
          </sakai-rubrics-list>
        </div>
      
        <hr>
        <h3>${this.i18n.public_rubrics_title}</h3>
        <p>${this.i18n.public_rubrics_info}</p>

        <div id="shared-rubrics-title"
            aria-expanded="${this.sharedRubricsExpanded ? "true" : "false"}"
            role="tab"
            aria-multiselectable="true"
            class="manager-collapse-title"
            title="${this.i18n.toggle_shared_rubrics}"
            tabindex="0"
            @click="${this.toggleSharedRubrics}">
          <div>
            <span class="collpase-icon fa fa-chevron-right"></span>
            <span>${this.i18n.shared_rubrics}</span>
          </div>
        </div>

        <div role="tabpanel" aria-labelledby="shared-rubrics-title" id="shared_rubrics" style="display:none;">
          <div id="sharedlist">
            <div class="rubric-title-sorting">
            <div>
              <a href="javascript:void(0)"
                  style="text-decoration: none;"
                  @click="${this.sortRubrics}"
                  data-key="shared-name">
                <span class="shared-name">${this.i18n.site_name}</span>
                <span class="collpase-icon fa fa-chevron-up shared-name sort-element-shared"></span>
              </a>
            </div>
            <div>
              <a href="javascript:void(0)"
                  style="text-decoration: none;"
                  @click="${this.sortRubrics}"
                  data-key="shared-title">
                <span class="shared-title">${this.i18n.site_title}</span>
                <span class="collpase-icon fa shared-title sort-element-shared"></span>
              </a>
            </div>
            <div>
              <a href="javascript:void(0)"
                  style="text-decoration: none;"
                  @click="${this.sortRubrics}"
                  data-key="shared-creator">
                <span class="shared-creator">${this.i18n.creator_name}</span>
                <span class="collpase-icon fa shared-creator sort-element-shared"></span>
              </a>
            </div>
            <div>
              <a href="javascript:void(0)"
                  style="text-decoration: none;"
                  @click="${this.sortRubrics}"
                  data-key="shared-modified">
                <span class="shared-modified">${this.i18n.modified}</span>
                <span class="collpase-icon fa shared-modified sort-element-shared"></span>
              </a>
            </div>
            <div class="actions"><span>${this.i18n.actions}</span></div>
          </div>
          <br>
          <sakai-rubrics-shared-list id="sakai-rubrics-shared-list"
              site-id="${this.siteId}"
              @copy-share-site="${this.copyShareSite}"
              ?enable-pdf-export=${this.enablePdfExport}>
          </sakai-rubrics-shared-list>
        </div>
        <br>
        </div>
      </div>
    `;
  }

  handleSharingChange() {
    document.getElementById("sakai-rubrics-shared-list").refresh();
  }

  copyShareSite() {
    this.querySelector("sakai-rubrics-list").refresh();
  }

  toggleSiteRubrics() {

    const siteRubrics = $("#site_rubrics");
    siteRubrics.toggle();
    const icon = $("#site-rubrics-title .collpase-icon");
    if (siteRubrics.is(":visible")) {
      this.siteRubricsExpanded = true;
      icon.removeClass("fa-chevron-right").addClass("fa-chevron-down");
    } else {
      this.siteRubricsExpanded = false;
      icon.removeClass("fa-chevron-down").addClass("fa-chevron-right");
    }
  }

  toggleSharedRubrics() {

    const sharedRubrics = $("#shared_rubrics");
    sharedRubrics.toggle();
    const icon = $("#shared-rubrics-title .collpase-icon");
    if (sharedRubrics.is(":visible")) {
      this.sharedRubricsExpanded = true;
      icon.removeClass("fa-chevron-right").addClass("fa-chevron-down");
    } else {
      this.sharedRubricsExpanded = false;
      icon.removeClass("fa-chevron-down").addClass("fa-chevron-right");
    }
  }

  filterRubrics() {

    const search = document.getElementById("rubrics-search-bar").value.toLowerCase();

    this.querySelectorAll("sakai-rubrics-list, sakai-rubrics-shared-list").forEach(rubricList => {

      rubricList.search(search);
    });
  }

  sortRubrics(event) {

    const sortInput = event.currentTarget.dataset.key;

    if (!sortInput) {
      return;
    }

    const [ rubricClass, rubricType ] = sortInput.split("-");
    const query = `.${sortInput}.sort-element-${rubricClass}`;
    const arrowUpIcon = "fa-chevron-up";
    const arrowDownIcon = "fa-chevron-down";
    let ascending = this.querySelector(query).classList.contains(arrowUpIcon);
    this.querySelectorAll(`.sort-element-${rubricClass}`).forEach(item => {

      item.classList.remove(arrowDownIcon);
      item.classList.remove(arrowUpIcon);
    });
    this.querySelector(query).classList.add(ascending ? arrowDownIcon : arrowUpIcon);
    ascending = !ascending;

    const list = this.querySelector(rubricClass === "site" ? "sakai-rubrics-list" : "sakai-rubrics-shared-list");
    list.sortRubrics(rubricType, ascending);
  }
}
