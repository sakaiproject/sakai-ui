export const i18nUrl = "/sakai-ws/rest/i18n/getI18nProperties?locale=en_GB&resourceclass=org.sakaiproject.i18n.InternationalizedMessages&resourcebundle=sui-notifications";

export const i18n = `
annc=Announcements
asn=Assignments
commons=Commons
profile=Social
mark_all_viewed=Mark all as viewed
clear_all=Clear All
no_notifications=No notifications
connection_request_received=You received a connection request from {0}
connection_request_accepted={0} accepted your connection request
message_received={0} sent you a message
`;

/*
export const siteId = "xyx";
export const assignmentId = "xyx101";
export const title = "XYX Assignment";
export const selectedGroup = "bears";
export const subject = "Submit!";
export const minScore = "55";
export const maxScore = "75";
export const body = "You need to submit this assignment, you schmuck";
export const recipients = [ 
  { displayName: "Englebert Humperdinck" },
  { displayName: "Flash Gordon" },
  { displayName: "Omar Sharif" },
];

export const groupPickerI18nUrl = "/sakai-ws/rest/i18n/getI18nProperties?locale=en_GB&resourceclass=org.sakaiproject.i18n.InternationalizedMessages&resourcebundle=group-picker";
export const groupPickerI18n = "group_selector_label=Groups";
*/
export const notificationsUrl = `/users/me/notifications`;
export const notifications = [
  { event: "assn.new", fromUser: "adrian", fromDisplayName: "Adrian Fish", formattedEventDate: "12 Feb, 2021", id: "noti1", title: "Bugs", url: "http://bogus.com/bugs" },
  { event: "annc.new", fromUser: "earle", fromDisplayName: "Earle Nietzel", formattedEventDate: "17 March, 2021", id: "noti2", title: "Worms", url: "http://bogus.com/worms" },
  { event: "profile.friend.request", fromUser: "earle", fromDisplayName: "Earle Nietzel", formattedEventDate: "27 November, 2021", id: "noti3", title: "Friend Me", url: "http://bogus.com/friend" },
  { event: "profile.friend.confirm", fromUser: "adrian", fromDisplayName: "Adrian Fish", formattedEventDate: "29 November, 2021", id: "noti4", title: "Friended", url: "http://bogus.com/friended" },
  { event: "profile.message.sent", fromUser: "adrian", fromDisplayName: "Adrian Fish", formattedEventDate: "30 November, 2021", id: "noti5", title: "Message", url: "http://bogus.com/friended" },
];
