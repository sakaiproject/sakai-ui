import { html } from 'lit-html';

import '../sakai-date-picker.js';

export default {
  title: 'Sakai Date Picker',
  decorators: [storyFn => storyFn()],
  argTypes: {
    epochMillis: { control: 'number' },
    isoDate: { control: 'text' },
  },
};

export const ISODate = args => {

  return html`
    <sakai-date-picker label="birthday" iso-date="${args?.isoDate}"></sakai-date-picker>
  `;
};
ISODate.argTypes = {
  epochMillis: { table: { disable: true } },
};

export const EpochMillis = args => {

  return html`
    <sakai-date-picker label="birthday" epoch-millis="${args?.epochMillis}"></sakai-date-picker>
  `;
};
EpochMillis.argTypes = {
  isoDate: { table: { disable: true } },
};
