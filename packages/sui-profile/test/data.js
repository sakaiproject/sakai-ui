export const userId = "adrian";

export const profileUrl = `/api/users/${userId}/profile`;

export const profile = {
  name: "Adrian Fish",
  role: "maintain",
  pronouns: "He/Him",
  pronunciation: "aye-dree-an",
  hasPronunciationRecording: true,
  email: "bogus@bogus.com",
  url: "http://bogus.com",
};

export const profileI18nUrl = "/sakai-ws/rest/i18n/getI18nProperties?locale=en_GB&resourceclass=org.sakaiproject.i18n.InternationalizedMessages&resourcebundle=profile";

export const profileI18n = `
email=Email
name_pronunciation=Name Pronunciation
student_number=Student Number
view_full_profile=View full profile
`;
