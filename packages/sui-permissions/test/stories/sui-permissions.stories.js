import { html } from 'lit-element';
import fetchMock from "fetch-mock";
import * as data from "../data.js";

import '../../sui-permissions.js';

export default {
  title: 'Sui Permissions',
  decorators: [storyFn => {

    fetchMock
      .get(data.permissionsI18nUrl, data.permissionsI18n, { overwriteRoutes: true })
      .get(data.toolI18nUrl, data.toolI18n, { overwriteRoutes: true })
      .get(data.groupPickerI18nUrl, data.groupPickerI18n, { overwriteRoutes: true })
      .get(data.permsUrl, data.perms, { overwriteRoutes: true })
      .get(data.groupsUrl, data.groups, { overwriteRoutes: true })
      .get("*", 500, {overwriteRoutes: true});

    return storyFn();
  }],
};

export const BasicDisplay = () => {

  return html`
    <div>
      <sui-permissions tool="tool"></sui-permissions>
    </div>
  `;
};
