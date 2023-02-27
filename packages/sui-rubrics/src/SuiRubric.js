import { RubricsElement } from "./RubricsElement.js";
import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import "../sui-rubric-criteria.js";
import "../sui-rubric-criteria-readonly.js";
import "../sui-rubric-edit.js";
import "../sui-item-delete.js";
import "../sui-rubric-pdf.js";
import { SharingChangeEvent } from "./SharingChangeEvent.js";

export class SuiRubric extends RubricsElement {

  constructor() {

    super();

    this.updateRubricOptions = {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json-patch+json",
      },
    };
    this.enablePdfExport = false;
  }

  static get properties() {

    return {
      ...RubricsElement.properties,
      rubric: { type: Object },
      siteId: { attribute: "site-id", type: String },
      shareIcon: { attribute: false, type: String },
      enablePdfExport: { attribute: "enable-pdf-export", type: Boolean },
      weightedIcon: { attribute: false, type: String },
      totalWeight: { attribute: false, type: String },
      validWeight: { attribute: false, type: Boolean },
      maxPoints: { attribute: false, type: String },
      minPoints: { attribute: false, type: String },
    };
  }

  set rubric(newValue) {

    const oldValue = this._rubric;
    this._rubric = newValue;
    if (!this._rubric.criteria) this._rubric.criteria = [];
    this.handleRefreshTotalWeight();
    this.handleDraftBtn();
    this.handleWeightBtn();
    this.handleShareBtn();
    this.requestUpdate("rubric", oldValue);
    this.updateComplete.then(() => newValue.expanded && this.toggleRubric());
  }

  get rubric() { return this._rubric; }

  matches(search) {

    const rubricTitle = this.querySelector(".rubric-name").textContent;
    const rubricAuthor = this.querySelector(".rubric-creator-name").textContent;
    const rubricSite = this.querySelector(".rubric-site-title").textContent;

    return rubricAuthor.toLowerCase().includes(search) ||
            rubricTitle.toLowerCase().includes(search) ||
            rubricSite.toLowerCase().includes(search);
  }

  shouldUpdate() {
    return this.rubric && super.shouldUpdate();
  }

  render() {

    return html`
      <div class="rubric-title" @click="${this.toggleRubric}">
        <div>
          <a href="#"
            class="rubric-name"
            id="rubric_toggle_${this.rubric.id}"
            aria-expanded="${this.rubricExpanded ? "true" : "false"}"
            role="tab"
            title="${this.i18n.toggle_details} ${this.rubric.title}"
          >
            <span class="fa fa-chevron-right"></span>
            ${this.rubric.title}
          </a>
          ${this.rubric.locked ? html`
            ${this.rubric.weighted ? html`
              <span
                tabindex="0"
                role="tooltip"
                title="${this.i18n.weighted_status}"
                aria-label="${this.i18n.weighted_status}"
                class="fa fa-percent icon-spacer">
              </span>`
              : ""
            }
            <span
              tabindex="0"
              role="tooltip"
              title="${this.rubric.title} ${this.i18n.is_locked}"
              aria-label="${this.rubric.title} ${this.i18n.is_locked}"
              class="locked fa fa-lock icon-spacer">
            </span>`
            : ""
          }
          <sui-rubric-edit
            @show-tooltip="${this.showToolTip}"
            @update-rubric-title="${this.updateRubricTitle}"
            rubric="${JSON.stringify(this.rubric)}"
            class="icon-spacer">
          </sui-rubric-edit>
          ${this.rubric.draft ? html`
            <span
              tabindex="0"
              role="tooltip"
              title="${this.i18n.draft_info}"
              aria-label="${this.i18n.draft_info}"
              class="highlight bold icon-spacer"
            >
              ${this.i18n.draft_label}
            </span>`
            : ""
          }
        </div>

        <div class="d-none d-sm-block rubric-site-title">${this.rubric.siteTitle}</div>
        <div class="d-none d-sm-block rubric-creator-name">${this.rubric.creatorDisplayName}</div>
        <div class="d-none d-sm-block">${this.rubric.formattedModifiedDate}</div>

        <div class="actions">
          ${!this.rubric.locked ? html`
            <div class="action-container">
              <button
                class="btn-transparent ${(this.rubric.draft && this.rubric.weighted && !this.validWeight) ? "disabled" : "link-color"} draft"
                title="${this.draftLabel}"
                aria-label="${this.draftLabel}"
                @keyup="${this.openEditWithKeyboard}"
                @click="${this.draftChange}"
              >
                <span class="fa ${this.draftIcon}"></span>
              </button>
            </div>
            <div class="action-container">
              <button
                class="btn-transparent link-color weighted"
                title="${this.weightLabel}"
                aria-label="${this.weightLabel}"
                @keyup="${this.openEditWithKeyboard}"
                @click="${this.weightedChange}"
              >
                <span class="fa ${this.weightedIcon}"></span>
              </button>
            </div>`
            : ""
          }
          <div class="action-container">
            <button
              class="btn-transparent link-color share"
              title="${this.i18n[this.shareTitleKey].replace("{}", this.rubric.title)}"
              aria-label="${this.i18n[this.shareTitleKey].replace("{}", this.rubric.title)}"
              @keyup="${this.openEditWithKeyboard}"
              @click="${this.sharingChange}"
            >
              <span class="fa ${this.shareIcon}"></span>
            </button>
          </div>
          <div class="action-container">
            <button
              class="btn-transparent link-color clone"
              title="${this.i18n.copy} ${this.rubric.title}"
              aria-label="${this.i18n.copy} ${this.rubric.title}"
              @keyup="${this.openEditWithKeyboard}"
              @click="${this.cloneRubric}"
            >
              <span class="fa fa-copy"></span>
            </button>
          </div>
          ${!this.rubric.locked ? html`
            <div class="action-container">
              <sui-item-delete
                rubric="${JSON.stringify(this.rubric)}"
                site-id="${this.siteId}"
                class="sakai-rubric">
              </sui-item-delete>
            </div>`
            : ""
          }
          ${this.enablePdfExport ? html`
            <div class="action-container">
              <sui-rubric-pdf
                site-id="${this.siteId}"
                rubric-title="${this.rubric.title}"
                rubric-id="${this.rubric.id}">
              </sui-rubric-pdf>
            </div>`
            : ""
          }
        </div>
      </div>

      <div class="collapse-details" role="tabpanel" aria-labelledby="rubric_toggle_${this.rubric.id}" id="collapse_${this.rubric.id}">
        <div class="rubric-details style-scope sakai-rubric">
          <sui-rubric-criteria
            rubric-id="${this.rubric.id}"
            site-id="${this.rubric.ownerId}"
            .criteria="${this.rubric.criteria}"
            @save-weights="${this.handleSaveWeights}"
            @weight-changed="${this.handleCriterionWeightChange}"
            @refresh-total-weight="${this.handleRefreshTotalWeight}"
            .weighted=${this.rubric.weighted}
            total-weight="${this.totalWeight}"
            ?valid-weight="${this.validWeight}"
            max-points="${ifDefined(this.maxPoints)}"
            min-points="${ifDefined(this.minPoints)}"
            ?is-locked="${this.rubric.locked}"
            ?is-draft="${this.rubric.draft}"
          >
          </sui-rubric-criteria>
        </div>
      </div>
    `;
  }

  toggleRubric(e) {

    e && e.preventDefault();

    const titlecontainer = this.querySelector(".rubric-title");

    const collapse = $(`#collapse_${this.rubric.id}`);
    collapse.toggle();

    const icon = $(`#rubric_toggle_${this.rubric.id} span`);

    if (collapse.is(":visible")) {
      this.rubricExpanded = "true";
      titlecontainer.classList.add("active");
      icon.removeClass("fa-chevron-right").addClass("fa-chevron-down");
    } else {
      this.rubricExpanded = "false";
      titlecontainer.classList.remove("active");
      icon.removeClass("fa-chevron-down").addClass("fa-chevron-right");
    }

    this.handleRefreshTotalWeight(e);
  }

  cloneRubric(e) {

    e.stopPropagation();
    this.dispatchEvent(new CustomEvent("clone-rubric", { detail: this.rubric, bubbles: true, composed: true }));
  }

  updateRubricTitle(e) {

    this.updateRubricOptions.body = JSON.stringify([ { "op": "replace", "path": "/title", "value": e.detail } ]);
    const url = `/api/sites/${this.rubric.ownerId}/rubrics/${this.rubric.id}`;
    fetch(url, this.updateRubricOptions)
    .then(r => {

      if (r.ok) {
        this.rubric.title = e.detail;
        this.rubric.new = false;
        this.requestUpdate();
        this.updateItemDelete();
        this.dispatchEvent(new SharingChangeEvent());
      } else {
        throw new Error("Network error while updating rubric title");
      }
    })
    .catch (error => console.error(error));
  }

  handleSaveWeights() {

    const saveWeightsBtn = document.querySelector(`[rubric-id='${this.rubric.id}'] .save-weights`);
    const saveSuccessLbl = document.querySelector(`[rubric-id='${this.rubric.id}'] .save-success`);

    if (saveWeightsBtn) saveWeightsBtn.setAttribute("disabled", true);

    this.rubric.criteria.forEach(cr => {

      this.updateRubricOptions.body = JSON.stringify([ { "op": "replace", "path": "/weight", "value": cr.weight } ]);
      const url = `/api/sites/${this.rubric.ownerId}/rubrics/${this.rubric.id}/criteria/${cr.id}`;
      fetch(url, this.updateRubricOptions)
      .then(r => {

        if (r.ok) {

          if (saveSuccessLbl) {
            saveSuccessLbl.classList.remove("d-none");
            saveSuccessLbl.classList.add("in");
          }

          setTimeout(() => {
            if (saveWeightsBtn) saveWeightsBtn.removeAttribute("disabled");
          }, 1000);

          setTimeout(() => {
            if (saveSuccessLbl) {
              saveSuccessLbl.classList.remove("in");
              saveSuccessLbl.classList.add("d-none");
            }
          }, 5000);

          this.requestUpdate();
          this.dispatchEvent(new SharingChangeEvent());
        } else {
          throw new Error("Network error while setting criterion weight");
        }
      })
      .catch (error => console.error(error));
    });
  }

  handleCriterionWeightChange(e) {

    const payload = e.detail;

    this.rubric.criteria = payload.criteria;
    const criterionModified = this.rubric.criteria.find(el => el.id === payload.criterionId);
    const oldValue = criterionModified.weight;

    criterionModified.weight = payload.value;
    if (oldValue === payload.value) {
      return;
    }

    const total = this.rubric.criteria.reduce((acc, el) => acc + el.weight, 0);

    this.validWeight = total == 100;
    this.totalWeight = total.toLocaleString(this.locale);
    this.maxPoints = this.getMaxPoints(this.rubric.criteria);
    this.minPoints = this.getMinPoints(this.rubric.criteria);
    this.requestUpdate();
    this.handleDraftBtn();
  }

  handleRefreshTotalWeight(e) {

    if (e && e.detail.criteria) {
      this.rubric.criteria = e.detail.criteria;
    }
    this.totalWeight = 0;
    this.rubric.criteria.forEach(cr => {
      this.totalWeight = this.totalWeight + cr.weight;
    });
    this.validWeight = this.totalWeight == 100;
    this.maxPoints = this.getMaxPoints(this.rubric.criteria);
    this.minPoints = this.getMinPoints(this.rubric.criteria);
  }

  draftChange(e) {

    e.stopPropagation();
    e.preventDefault();
    // Draft mode can't be turned off if the total weight doesn't match 100%,
    // this way (+css) also prevents the rubric to be toggled when pressing the disabled button.
    if (this.rubric.draft && this.rubric.weighted && !this.validWeight) {
      return;
    }
    this.rubric.draft = !this.rubric.draft;

    this.updateRubricOptions.body = JSON.stringify([ { "op": "replace", "path": "/draft", "value": this.rubric.draft } ]);
    const url = `/api/sites/${this.rubric.ownerId}/rubrics/${this.rubric.id}`;
    fetch(url, this.updateRubricOptions)
    .then(r => {

      if (r.ok) {
        this.handleSaveWeights();
        this.handleDraftBtn();
        this.requestUpdate();
      }
    });
  }

  weightedChange(e) {

    e.stopPropagation();
    e.preventDefault();
    this.rubric.weighted = !this.rubric.weighted;
    if (this.rubric.weighted) {
      this.rubric.criteria.forEach(cr => cr.weight = 0);
      //Try to get first criterion, that is not a criterion group
      const firstCriterion = this.rubric.criteria.find(criteria => criteria.ratings?.length > 0);
      if (firstCriterion) {
        //Set weight of first criterion to 100 (%)
        firstCriterion.weight = 100;
        this.handleSaveWeights(e);
      }
      this.handleRefreshTotalWeight();
    }

    this.updateRubricOptions.body = JSON.stringify([ { "op": "replace", "path": "/weighted", "value": this.rubric.weighted } ]);
    const url = `/api/sites/${this.rubric.ownerId}/rubrics/${this.rubric.id}`;
    fetch(url, this.updateRubricOptions)
    .then(r => {

      if (r.ok) {
        this.handleWeightBtn();
        this.requestUpdate();
      }
    });
  }

  sharingChange(e) {

    e.stopPropagation();

    this.rubric.shared = !this.rubric.shared;

    this.updateRubricOptions.body = JSON.stringify([ { "op": "replace", "path": "/shared", "value": this.rubric.shared } ]);
    const url = `/api/sites/${this.rubric.ownerId}/rubrics/${this.rubric.id}`;
    fetch(url, this.updateRubricOptions)
    .then(r => {

      if (r.ok) {
        this.dispatchEvent(new SharingChangeEvent());
        this.handleShareBtn();
      } else {
        throw new Error("Network error while updating rubric");
      }
    })
    .catch (error => console.error(error));
  }

  handleDraftBtn() {

    if (this.rubric.draft) {
      this.draftIcon = "fa-eye-slash highlight";
      if (this.rubric.weighted) {
        if (!this.validWeight) {
          this.draftLabel = this.i18n.draft_invalid_weight_publish + this.i18n.total_weight_wrong;
        } else {
          this.draftLabel = this.i18n.draft_turn_off + this.i18n.draft_save_weights;
        }
      } else {
        this.draftLabel = this.i18n.draft_turn_off;
      }
    } else {
      this.draftIcon = "fa-eye";
      if (this.rubric.weighted) {
        this.i18nLoaded.then(() => this.draftLabel = this.i18n.draft_turn_on + this.i18n.draft_save_weights);
      } else {
        this.i18nLoaded.then(() => this.draftLabel = this.i18n.draft_turn_on);
      }
    }
  }

  handleWeightBtn() {

    if (this.rubric.weighted) {
      this.weightedIcon = "fa-percent";
      this.i18nLoaded.then(() => this.weightLabel = this.i18n.weighted_label);
    } else {
      this.weightedIcon = "fa-hashtag";
      this.i18nLoaded.then(() => this.weightLabel = this.i18n.standard_label);
    }

    this.dispatchEvent(new SharingChangeEvent());
  }

  handleShareBtn() {

    if (this.rubric.shared) {
      this.shareTitleKey = "revoke";
      this.shareIcon = "fa-users";
    } else {
      this.shareTitleKey = "share";
      this.shareIcon = "fa-user";
    }
    this.shareValues = this.rubric.title;
  }

  updateItemDelete() {

    const sakaiItemDelete = this.querySelector("sui-item-delete");
    if (sakaiItemDelete) {
      sakaiItemDelete.requestUpdate("item", this.rubric);
      sakaiItemDelete.requestUpdate("rubric", this.rubric);
    }
  }

  openEditWithKeyboard(e) {

    const spaceBarKeyCode = (e.keyCode == 32);

    if (spaceBarKeyCode && e.target.classList.contains("weighted")) {
      this.weightedChange(e);
    }

    if (spaceBarKeyCode && e.target.classList.contains("share")) {
      this.sharingChange(e);
    }

    if (spaceBarKeyCode && e.target.classList.contains("clone")) {
      this.cloneRubric(e);
    }

    if (spaceBarKeyCode && e.target.classList.contains("draft")) {
      this.draftChange(e);
    }
  }

  // SAK-47640 - Get the maximum and minimum possible grade of the whole rubric,
  // multiplying the max-min rating points of each criterion by the criterion weight, and adding them up
  getMaxPoints(criterions) {
    return this.getPoints(criterions, Math.max);
  }

  getMinPoints(criterions) {
    return this.getPoints(criterions, Math.min);
  }

  getPoints(criterions, minOrMax) {

    let totalPoints = 0;

    criterions
    .filter( (criterion) => criterion.ratings.length > 0)
    .forEach( (criterion) => {
      totalPoints += minOrMax(...criterion.ratings.map(rating => {
        return rating.points * (criterion.weight / 100);
      }));
    });
    return parseFloat(totalPoints).toLocaleString(this.locale);
  }
}
