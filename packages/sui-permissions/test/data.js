export const siteId = "xyz";
export const groupsUrl = `/direct/site/${siteId}/groups.json`;
export const groupPickerI18nUrl = "/sakai-ws/rest/i18n/getI18nProperties?locale=en_GB&resourceclass=org.sakaiproject.i18n.InternationalizedMessages&resourcebundle=group-picker";
export const groupPickerI18n = "group_selector_label=Groups";
export const groups = [
  { reference: `/site/${siteId}/groups/tennis`, title: "Tennis" },
  { reference: `/site/${siteId}/groups/football`, title: "Football" },
];
export const permissionsI18nUrl = "/sakai-ws/rest/i18n/getI18nProperties?locale=en_GB&resourceclass=org.sakaiproject.i18n.InternationalizedMessages&resourcebundle=permissions-wc";
export const permissionsI18n = `per.lis.restoredef=Undo Changes`;
export const toolI18nUrl = "/sakai-ws/rest/i18n/getI18nProperties?locale=en_GB&resourceclass=org.sakaiproject.i18n.InternationalizedMessages&resourcebundle=tool";
export const toolI18n = `
perm-tool.create=Create
perm-tool.delete=Delete
perm-tool.read=Read
perm-tool.update=Update
`;
export const permsUrl = `/direct/permissions/${siteId}/getPerms/tool.json`;
export const perms = {
  available: [ "tool.read", "tool.create", "tool.delete" ],
  on: {
    "maintain": [ "tool.read", "tool.create", "tool.delete" ],
    "access": [ "tool.read" ],
  },
  roleNameMappings: { maintain: "Maintain", access: "Access" }
};
