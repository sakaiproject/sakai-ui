import { SakaiElement } from "@sakai-ui/sakai-element";
import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export class SakaiEditor extends SakaiElement {

  static get properties() {

    return {
      elementId: { attribute: "element-id", type: String },
      debug: { type: Boolean },
      content: { attribute: "content", type: String },
      active: { type: Boolean },
      delay: { type: Boolean },
      textarea: { type: Boolean },
      toolbar: { attribute: "toolbar", type: String },
      setFocus: { attribute: "set-focus", type: Boolean },
    };
  }

  constructor() {

    super();

    if (this.debug) console.debug("Sakai Editor constructor");
    this.content = "";
    this.elementId = `editable_${Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1)}`;
  }

  getContent() {

    if (this.textarea) {
      return this.querySelector(`#${this.elementId}`).value;
    }
    return this.editor.getData();
  }

  setContent(text) {

    this.content = text;

    if (this.textarea) {
      this.querySelector(`#${this.elementId}`).value = this.content;
    } else {
      this.editor.setData(this.content);
    }
  }

  clear() {

    if (this.textarea) {
      this.querySelector(`#${this.elementId}`).value = "";
    } else {
      this.editor.setData("");
    }
  }

  shouldUpdate() {
    return (this.content || this.elementId);
  }

  set active(value) {

    this._active = value;
    if (!this.textarea) {
      if (value) {
        this.attachEditor();
      } else {
        this.editor.destroy();
      }
    }
  }

  get active() { return this._active; }

  attachEditor() {

    if (CKEDITOR.instances[this.elementId]) {
      CKEDITOR.instances[this.elementId].destroy();
    }

    if (sakai?.editor?.launch) {
      this.editor = sakai.editor.launch(this.elementId, {
        autosave: {
          delay: 10000000,
          messageType: "no"
        },
        toolbar: this.toolbar
      });
    } else {
      this.editor = CKEDITOR.replace(this.elementId, { toolbar: SakaiEditor.toolbars.get("basic") });
    }

    this.editor.on("change", (e) => {
      this.dispatchEvent(new CustomEvent("changed", { detail: { content: e.editor.getData() }, bubbles: true }));
    });

    if (this.setFocus) {
      this.editor.on("instanceReady", e => {
        e.editor.focus();
      });
    }
  }

  firstUpdated(changed) {

    super.firstUpdated(changed);

    if (!this.delay && !this.textarea) {
      this.attachEditor();
    }
  }

  render() {

    if (this.textarea) {
      return html `
        <textarea style="width: 100%" id="${this.elementId}" aria-label="Sakai editor textarea" tabindex="0" .value=${this.content}></textarea>
      `;
    }

    return html `
      <div id="${this.elementId}" tabindex="0" contenteditable=${ifDefined(this.type === "inline" && this.active ? "true" : undefined)}>${unsafeHTML(this.content)}</div>
    `;
  }
}

SakaiEditor.toolbars = new Map();
SakaiEditor.toolbars.set("basic", [ { name: "document", items : [ "Source", "-", "Bold", "Italic", "Underline", "-", "Link", "Unlink", "-", "NumberedList", "BulletedList", "Blockquote" ] } ]);
