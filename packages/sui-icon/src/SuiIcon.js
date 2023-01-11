import { html, css, LitElement } from "lit";
import { icon, library } from "@fortawesome/fontawesome-svg-core";
import { faCompressArrowsAlt, faEyeSlash, faChalkboardTeacher, faExpandArrowsAlt, faLock, faStar, faEllipsisV, faBell, faCircle, faCog, faChevronUp, faChevronDown, faList, faThumbsUp, faThumbtack, faTimes, faCheckSquare, faCheckCircle, faComment, faComments, faBook, faFile, faFileAlt,
  faGripVertical, faLightbulb, faHeart, faUsers, faUserSecret, faMinus, faPlus, faQuestion, faQuestionCircle, faFlag, faAngleRight, faAngleLeft, faHourglass, faFileWord, faSync, faSmile,
  faTrash, faTrashRestore, faEdit, faKey, faArrowDown, faArrowLeft, faArrowRight, faArrowUp, faPlay, faVolumeUp, faSearch }
  from "@fortawesome/free-solid-svg-icons";

export class SuiIcon extends LitElement {

  static get properties() {

    return {
      hasAlerts: { attribute: "has-alerts", type: Boolean },
      type: String,
      size: String,
    };
  }

  constructor() {

    super();
    this.size = "medium";
  }

  shouldUpdate() {
    return this.type && this.type !== "undefined";
  }

  render() {
    return html`${icon(SuiIcon.lookups.get(this.type), { classes: `sakai-${this.size}-icon` }).node}${this.hasAlerts ? html`<div class="alert"></div>` : ""}`;
  }

  static get styles() {

    return css`
      :host(*) {
        display: inline-block;
      }
      .sakai-smallest-icon {
        pointer-events: none;
        width: var(--sakai-smallest-icon-width);
        height: var(--sakai-smallest-icon-height);
      }
      .sakai-small-icon {
        pointer-events: none;
        width: var(--sakai-small-icon-width);
        height: var(--sakai-small-icon-height);
      }
      .sakai-medium-icon {
        pointer-events: none;
        width: var(--sakai-medium-icon-width);
        height: var(--sakai-medium-icon-height);
      }
      .sakai-large-icon {
        pointer-events: none;
        width: var(--sakai-large-icon-width);
        height: var(--sakai-large-icon-height);
      }

      .alert {
        background-color: var(--sakai-icon-alert-color);
        width: var(--sakai-icon-alert-width);
        height: var(--sakai-icon-alert-width);
        position: absolute;
        margin-top: var(--sakai-icon-alert-margin-top);
        margin-left: var(--sakai-icon-alert-margin-left);
        -webkit-border-radius: calc(var(--sakai-icon-alert-width) / 2);
        -moz-border-radius: calc(var(--sakai-icon-alert-width) / 2);
        border-radius: calc(var(--sakai-icon-alert-width) / 2);
      }
    `;
  }

}

library.add(faEllipsisV); // Menu
library.add(faLock);
library.add(faStar); // Favourite
library.add(faBell); // General alerts
library.add(faCog); // Settings
library.add(faList);
library.add(faComment);
library.add(faComments); // Forums
library.add(faBook); // Gradebook
library.add(faCircle);
library.add(faCheckCircle);
library.add(faCheckSquare); // Gradebook
library.add(faChevronUp);
library.add(faChevronDown);
library.add(faFile);
library.add(faFileAlt); // Assignments
library.add(faGripVertical); // Drag gripper
library.add(faThumbsUp);
library.add(faThumbtack);
library.add(faPlus); // Drag gripper
library.add(faTimes); // Close
library.add(faFlag); // Priority
library.add(faAngleRight); // Right
library.add(faAngleLeft); // Left
library.add(faHourglass); // Deadline
library.add(faFileWord); // MS word
library.add(faTrash); // Delete
library.add(faTrashRestore); // Restore
library.add(faKey);
library.add(faEdit); // Edit
library.add(faArrowUp); // Up
library.add(faArrowDown); // Down
library.add(faArrowLeft); // Left
library.add(faArrowRight); // Right
library.add(faSync); // Refresh
library.add(faSmile);
library.add(faCompressArrowsAlt); //unfullscreen
library.add(faEyeSlash);
library.add(faChalkboardTeacher);
library.add(faExpandArrowsAlt); //fullscreen
library.add(faHeart);
library.add(faLightbulb);
library.add(faMinus);
library.add(faUsers);
library.add(faUserSecret);
library.add(faQuestion);
library.add(faQuestionCircle);

SuiIcon.lookups = new Map();
SuiIcon.lookups.set("favourite", faStar);
SuiIcon.lookups.set("lock", faLock);
SuiIcon.lookups.set("menu", faEllipsisV);
SuiIcon.lookups.set("cog", faCog);
SuiIcon.lookups.set("list", faList);
SuiIcon.lookups.set("alert", faBell);
SuiIcon.lookups.set("add", faPlus);
SuiIcon.lookups.set("comment", faComment);
SuiIcon.lookups.set("forums", faComments);
SuiIcon.lookups.set("gradebook", faBook);
SuiIcon.lookups.set("file", faFile);
SuiIcon.lookups.set("pin", faThumbtack);
SuiIcon.lookups.set("thumbs-up", faThumbsUp);
SuiIcon.lookups.set("assignments", faFileAlt);
SuiIcon.lookups.set("gripper", faGripVertical);
SuiIcon.lookups.set("close", faTimes);
SuiIcon.lookups.set("priority", faFlag);
SuiIcon.lookups.set("right", faAngleRight);
SuiIcon.lookups.set("left", faAngleLeft);
SuiIcon.lookups.set("deadline", faHourglass);
SuiIcon.lookups.set("word", faFileWord);
SuiIcon.lookups.set("delete", faTrash);
SuiIcon.lookups.set("restore", faTrashRestore);
SuiIcon.lookups.set("edit", faEdit);
SuiIcon.lookups.set("key", faKey);
SuiIcon.lookups.set("quizzes", faCheckSquare);
SuiIcon.lookups.set("up", faArrowUp);
SuiIcon.lookups.set("down", faArrowDown);
SuiIcon.lookups.set("left-arrow", faArrowLeft);
SuiIcon.lookups.set("right-arrow", faArrowRight);
SuiIcon.lookups.set("chevron-up", faChevronUp);
SuiIcon.lookups.set("chevron-down", faChevronDown);
SuiIcon.lookups.set("refresh", faSync);
SuiIcon.lookups.set("smile", faSmile);
SuiIcon.lookups.set("minus", faMinus);
SuiIcon.lookups.set("users", faUsers);
SuiIcon.lookups.set("secret", faUserSecret);
SuiIcon.lookups.set("heart", faHeart);
SuiIcon.lookups.set("lightbulb", faLightbulb);
SuiIcon.lookups.set("fs-expand", faExpandArrowsAlt);
SuiIcon.lookups.set("teacher", faChalkboardTeacher);
SuiIcon.lookups.set("hidden", faEyeSlash);
SuiIcon.lookups.set("fs-compress", faCompressArrowsAlt);
SuiIcon.lookups.set("question", faQuestion);
SuiIcon.lookups.set("questioncircle", faQuestionCircle);
SuiIcon.lookups.set("circle", faCircle);
SuiIcon.lookups.set("check_circle", faCheckCircle);
SuiIcon.lookups.set("volume_up", faVolumeUp);
SuiIcon.lookups.set("search", faSearch);
SuiIcon.lookups.set("play", faPlay);
