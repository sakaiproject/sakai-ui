export const i18nUrl = "/sakai-ws/rest/i18n/getI18nProperties?locale=en_GB&resourceclass=org.sakaiproject.i18n.InternationalizedMessages&resourcebundle=widgetpanel";

export const i18n = `
add_a_widget=Add a Widget
`;

export const userId = "adrian";
export const siteUrl = "/sites/1";

export const userForumsUrl= `/api/users/${userId}/forums`;

export const userForums = [
  { messageUrl: "/forums/1/2", forumUrl: "/forums/1", forumCount: 2, messageCount: 3, siteUrl, siteTitle: "A" },
  { messageUrl: "/forums/2/2", forumUrl: "/forums/2", forumCount: 8, messageCount: 5, siteUrl, siteTitle: "Z" },
];
