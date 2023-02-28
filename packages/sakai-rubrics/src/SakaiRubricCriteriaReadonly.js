import { RubricsElement } from "./RubricsElement.js";
import { html } from "lit";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export class SakaiRubricCriteriaReadonly extends RubricsElement {

  constructor() {

    super();

    this.criteria;
  }

  static get properties() {

    return {
      ...RubricsElement.properties,
      criteria: { type: Array },
      weighted: Boolean };
  }

  render() {

    return html`
      <div class="criterion style-scope sakai-rubric-criterion-readonly">
        <div id="sort-criterion">
          ${this.criteria.map(c => html`
            ${this.isCriterionGroup(c) ? html`
              <div id="criterion_row_${c.id}" class="criterion-row criterion-group">
                <div class="criterion-detail">
                  <h4 class="criterion-title">${c.title}</h4>
                  <p>${unsafeHTML(c.description)}</p>
                </div>
              </div>
            ` : html`
              <div id="criterion_row_${c.id}" class="criterion-row">
                <div tabindex="0" class="criterion-detail">
                  <h4 class="criterion-title">${c.title}</h4>
                  <p>${unsafeHTML(c.description)}</p>
                  ${this.weighted ? html`
                      <div class="criterion-weight">
                          <span>
                            <sr-lang key="weight">Weight</sr-lang>
                          </span>
                          <span>${c.weight.toLocaleString(this.locale)}</span>
                          <span>
                            <sr-lang key="percent_sign">%</sr-lang>
                          </span>
                      </div>`
                    : ""
                  }
                </div>
                <div class="criterion-ratings">
                  <div class="cr-table">
                    <div class="cr-table-row">
                    ${c.ratings.map(r => html`
                      <div tabindex="0" title="${this.i18n.rating_title}: ${r.title}. ${this.i18n.rating_description}: ${r.description}. ${this.i18n.point_value}: ${r.points.toLocaleString(this.locale)}" class="rating-item" id="rating_item_${r.id}">
                        <h5 class="criterion-item-title">${r.title}</h5>
                        <p>${r.description}</p>
                        <span class="points">
                          ${this.weighted && r.points > 0 ? html`
                              <b>
                                (${parseFloat((r.points * (c.weight / 100)).toFixed(2)).toLocaleString(this.locale)})
                              </b>`
                            : ""
                          }
                          ${r.points.toLocaleString(this.locale)}
                          <sr-lang key="points">Points</sr-lang>
                        </span>
                      </div>
                    `)}
                    </div>
                  </div>
                </div>
              </div>
            `}
          `)}
        </div>
      </div>
    `;
  }
}
