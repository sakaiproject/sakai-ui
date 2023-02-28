import { RubricsElement } from "./RubricsElement.js";
import { html } from "lit";

export class SakaiItemDelete extends RubricsElement {

  constructor() {

    super();

    this._rubric;
    this._criterion;

    this.popoverOpen = false;
  }

  static get properties() {

    return {
      ...RubricsElement.properties,
      rubricId: { attribute: "rubric-id", type: String },
      siteId: { attribute: "site-id", type: String },
      rubric: { type: Object },
      criterionId: { attribute: "criterion-id", type: String },
      criterion: { type: Object },
      popoverOpen: { attribute: false, type: String },
    };
  }

  set rubric(newValue) {

    this._rubric = newValue;
    this.item = newValue;
    this.type = "rubric";
  }

  get rubric() { return this._rubric; }

  set criterion(newValue) {

    this._criterion = newValue;
    this.item = newValue;
    this.type = "criterion";
  }

  get criterion() { return this._criterion; }

  shouldUpdate() {
    return super.shouldUpdate() && this.popoverOpen;
  }

  render() {

    return html`
      <button
        class="btn-transparent link-color delete"
        @focus="${this.onFocus}"
        @focusout="${this.focusOut}"
        aria-haspopup="true"
        aria-expanded="${this.popoverOpen ? "true" : "false"}"
        aria-controls="delete_${this.type}_${this.item.id}"
        title="${this.i18n.remove.replace("{}", this.item.title)}"
        aria-label="${this.i18n.remove.replace("{}", this.item.title)}"
        @keyup="${this.openEditWithKeyboard}"
        @click="${this.deleteItem}"
      >
        <span class="fa fa-times"></span>
      </button>

      <div id="delete_${this.type}_${this.item.id}" class="popover rubric-delete-popover left rubrics-popover">
        <div class="arrow-0"></div>
        <div class="popover-title" tabindex="0">${this.i18n.confirm_remove} ${this.item.title}</div>
        <div class="popover-content">
          <div class="buttons text-right act">
            <button title="${this.i18n.confirm_remove}" class="active save" @click="${this.saveDelete}">
              <sr-lang key="remove_label"></sr-lang>
            </button>
            <button class="btn btn-link btn-xs cancel" @click="${this.cancelDelete}">
              <sr-lang key="cancel">Cancel</sr-lang>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  onFocus(e) {

    const criterionRow = e.target.closest(".criterion-row");
    if (criterionRow != undefined) criterionRow.classList.add("focused");
  }

  focusOut(e) {

    const criterionRow = e.target.closest(".criterion-row");
    if (criterionRow != undefined) criterionRow.classList.remove("focused");
  }

  closeOpen() {

    $(".show-tooltip .cancel").click();
  }

  deleteItem(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.classList.contains("show-tooltip")) {
      this.closeOpen();
      this.popoverOpen = true;

      this.classList.add("show-tooltip");

      const popover = $(`#delete_${this.type}_${this.item.id}`);

      const target = this.querySelector(".fa-times");

      popover[0].style.left = `${target.offsetLeft - 280 }px`;
      popover[0].style.top = `${target.offsetTop - this.offsetHeight * 2 - 10 }px`;

      $(".btn-danger").focus();

      popover.show();

    } else {
      this.popoverOpen = false;
      this.hideToolTip();
      $(`#delete_${this.type}_${this.item.id}`).hide();
    }
  }

  hideToolTip() {
    this.classList.remove("show-tooltip");
  }

  cancelDelete(e) {

    e.stopPropagation();
    this.hideToolTip();
    $(`#delete_${this.type}_${this.item.id}`).hide();
  }

  saveDelete(e) {

    e.stopPropagation();
    let url = `/api/sites/${this.siteId}/rubrics/`;

    if (this.type === "criterion") {
      url += `${this.rubricId}/criterions/${this.criterion.id}`;
    } else {
      url += this.rubric.id;
    }

    fetch(url, {
      method: "DELETE",
      credentials: "include",
    })
    .then(r => {

      if (r.ok) {
        this.updateUi();
      } else {
        throw new Error("Network error while deleting rubric/criterion");
      }
    })
    .catch (error => console.error(error));
  }

  updateUi() {

    this.dispatchEvent(new CustomEvent("delete-item", { detail: this.item, bubbles: true, composed: true }));
    this.hideToolTip();
  }

  openEditWithKeyboard(e) {
    if (e.keyCode == 32) {
      this.deleteItem(e);
    }
  }
}
