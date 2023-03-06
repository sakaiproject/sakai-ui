import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { loadProperties } from "@sakai-ui/sakai-i18n";
import { SakaiElement } from "@sakai-ui/sakai-element";
import "@sakai-ui/sakai-editor";

export class SakaiCommentEditor extends SakaiElement {

  static get properties() {

    return {
      comment: { type: Object },
      editing: { type: Boolean },
      postId: { attribute: "post-id", type: String },
      siteId: { attribute: "site-id", type: String },
      topicId: { attribute: "topic-id", type: String },
      i18n: { attribute: false, type: Object },
    };
  }

  constructor() {

    super();

    loadProperties("conversations").then(r => this.i18n = r);
  }

  set comment(value) {

    this._comment = value;
    this.editing = true;
  }

  get comment() { return this._comment; }

  commentOnPost() {

    this.comment = this.comment || { message: "" };

    const editor = this.querySelector("sakai-editor");

    this.comment.message = editor.getContent();

    const isNew = !this.comment.id;

    const postId = this.postId || this.comment.post;

    this.comment.post = postId;
    this.comment.topicId = this.topicId;

    const url = `/api/sites/${this.siteId}/topics/${this.topicId}/posts/${postId}/comments${ this.comment.id ? `/${this.comment.id}` : ""}`;
    fetch(url, {
      method: this.comment.id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(this.comment),
    })
    .then(r => {

      if (!r.ok) {
        throw new Error("Network error while saving comment.");
      }
      return r.json();
    })
    .then(comment => {

      this.dispatchEvent(new CustomEvent(isNew ? "comment-created" : "comment-updated", { detail: { comment }, bubbles: true }));
      this.editing = false;
      this.comment.message = "";
    })
    .catch (error => {
      console.error(error);
      //TODO: show error message to user here
    });
  }

  _startEditing() {
    this.editing = true;
  }

  cancelEditing() {

    this.editing = false;
    this.dispatchEvent(new CustomEvent("editing-cancelled", { bubbles: true }));
  }

  shouldUpdate() {
    return this.i18n && this.postId;
  }

  render() {

    return html`
      <div>
        ${this.editing ? html`
        <sakai-editor content=${ifDefined(this.comment ? this.comment.message : undefined)} set-focus></sakai-editor>
        <div class="act">
          <input type="button" class="active" @click=${this.commentOnPost} value="${this.i18n.publish}">
          <input type="button" @click=${this.cancelEditing} value="${this.i18n.cancel}">
        </div>
        ` : html`
        <input class="comment-editor-input"
            aria-label="${this.i18n.comment_editor_placeholder}"
            value="${this.i18n.add_a_comment}"
            @click="${this._startEditing}"
            @keydown="${this._startEditing}" />
        `}
      </div>
    `;
  }
}
