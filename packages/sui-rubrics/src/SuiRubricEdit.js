import { RubricsElement } from "./RubricsElement.js";
import { html } from "lit";

export class SuiRubricEdit extends RubricsElement {

  constructor() {

    super();

    this.popoverOpen = false;
    this.rubricClone = {};
  }

  static get properties() {

    return {
      ...RubricsElement.properties,
      rubric: { type: Object }
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {

    super.attributeChangedCallback(name, oldValue, newValue);

    if (name === "rubric") {
      this.rubricClone = JSON.parse(newValue);
      if (this.rubricClone.new) {
        this.updateComplete.then(() => this.querySelector(".edit").click() );
      }
    }
  }

  render() {

    return html`
      <a class="linkStyle edit fa fa-edit"
          role="button"
          aria-haspopup="true"
          aria-expanded="${this.popoverOpen ? "true" : "false"}"
          aria-controls="edit_rubric_${this.rubric.id}"
          tabindex="0"
          @keyup="${this.openEditWithKeyboard}"
          @click="${this.editRubric}"
          title="${this.i18n.edit_rubric} ${this.rubric.title}"
          aria-label="${this.i18n.edit_rubric} ${this.rubric.title}"
          href="#">
      </a>

      <div id="edit_rubric_${this.rubric.id}" @click="${this.eatEvent}" class="popover rubric-edit-popover bottom rubrics-popover">
        <div class="arrow-1"></div>
        <div class="popover-title">
          <div class="buttons act">
            <button class="active save" @click="${this.saveEdit}">
              <sr-lang key="save">Save</sr-lang>
            </button>
            <button class="btn btn-link btn-xs cancel" @click="${this.cancelEdit}">
              <sr-lang key="cancel">Cancel</sr-lang>
            </button>
          </div>
        </div>
        <div class="popover-content form">
          <div class="form-group">
            <label class="label-rubrics" for="rubric_title_edit">
              <sr-lang key="rubric_title">Rubric Title</sr-lang>
            </label>
            <input title="${this.i18n.rubric_title}" id="rubric_title_edit" type="text" class="form-control" value="${this.rubricClone.title}" maxlength="255">
          </div>
        </div>
      </div>
    `;
  }

  firstUpdated() {

    this.querySelector(".popover.rubric-edit-popover input").addEventListener("keydown", event => {

      if (event.keyCode == 9) {
        event.preventDefault();
        event.target.closest(".popover.rubric-edit-popover").querySelector(".save").focus();
      }
    });

    this.querySelector(".popover.rubric-edit-popover .save").addEventListener("keydown", event => {

      if (event.keyCode == 9) {
        event.preventDefault();
        event.target.closest(".popover.rubric-edit-popover").querySelector(".cancel").focus();
      }
    });

    this.querySelector(".popover.rubric-edit-popover .cancel").addEventListener("keydown", event => {

      if (event.keyCode == 9) {
        event.preventDefault();
        event.target.closest(".popover.rubric-edit-popover").querySelector("input").focus();
      }
    });
  }

  eatEvent(e) {
    e.stopPropagation();
  }

  openEditWithKeyboard(e) {

    if (e.keyCode == 32 || e.keyCode == 32 ) {
      this.editRubric(e);
    }
  }

  editRubric(e) {

    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent("show-tooltip", { detail: this.rubric }));

    if (!this.classList.contains("show-tooltip")) {
      this.closeOpen();
      this.popoverOpen = true;
      const target = this.querySelector(".fa-edit");

      this.classList.add("show-tooltip");

      const popover = this.querySelector(`#edit_rubric_${this.rubric.id}`);

      popover.style.top = `${target.offsetTop + 20 }px`;
      popover.style.left = `${target.offsetLeft - 125 }px`;

      popover.style.display = "block";
      const input = popover.querySelector("input[type='text']");
      input.setSelectionRange(0, input.value.length);
      input.focus();

    } else {
      this.popoverOpen = false;
      this.hideToolTip();
      this.querySelector(`#edit_rubric_${this.rubric.id}`).style.display = "none";
    }
  }

  closeOpen() {
    this.querySelector(".show-tooltip .cancel").click();
  }

  hideToolTip() {

    this.classList.remove("show-tooltip");
    this.dispatchEvent(new CustomEvent("hide-tooltip", { detail: this.rubric }));
  }

  cancelEdit(e) {

    e.stopPropagation();
    this.rubricClone.title = this.rubric.title;
    this.hideToolTip();
    const popover = this.querySelector(`#edit_rubric_${this.rubric.id}`);
    popover.querySelecto("input[type='text']").value = this.rubric.title;
    popover.style.display = "none";
  }

  saveEdit(e) {

    e.stopPropagation();
    const title = this.querySelector("#rubric_title_edit").value;
    this.dispatchEvent(new CustomEvent("update-rubric-title", { detail: title }));
    this.querySelector(`#edit_rubric_${this.rubric.id}`).style.display = "none";
    this.hideToolTip();
  }
}
