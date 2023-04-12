import { GRADE_CHECKED,
          LETTER_GRADE_TYPE,
          SCORE_GRADE_TYPE,
          PASS_FAIL_GRADE_TYPE,
          CHECK_GRADE_TYPE } from "../src/sakai-grader-constants.js";

export const i18nUrl = /getI18nProperties.*grader$/;

export const i18n = `
done=Done
no_submission=No submission
no_submission_for=No submission for
grading_rubric_tooltip=Grade this submission using a rubric
rubric=Rubric
add_feedback_tooltip=Write, or record, some feedback for this student
written_feedback_label=Write some feedback
recorded_feedback_label=Record some feedback
add_attachments_tooltip=Add some attachments to your grading
private_notes_tooltip=Add notes attached to this student submission, for yourself and other \
instructors and click Done when you've finished. Students will NOT be able to see these. You still \
need to save the grade
settings=Settings
only_ungraded=Only show ungraded submissions
only_submitted=Only show actual submissions
returned_tooltip=This grade has been returned to the student
grader_on_left=Dock the grader on the left
confirm_remove_attachment=This will remove the feedback attachment permanently. Do you want to continue?
confirm_discard_changes=You've made some changes. Do you want to discard them?
saved_successfully=The grade was saved successfully.
feedback_attachment_tooltip=Click to download this feedback attachment.
student_selector_label=Student selector
attempt_selector_label=Number of attempts selector
lettergrade_selector_label=Letter grade selector
passfail_selector_label=Pass/Fail grade selector
number_grade_label=Numeric grade input field
checkgrade_label=Checkmark grade input box
comment_present=There is a comment on this submission
unsaved_comment_present=The comment on this submission is not saved
notes_present=There are private notes on this submission
unsaved_notes_present=The private notes on this submission is not saved
unsaved_text_warning=Changes are not going to be saved. Click on 'Cancel' again to confirm.
profile_image='s profile image
inline_feedback_instruction=This is the submitted text, with your feedback. To add more feedback, click 'Add Feedback' at the bottom of the submission, then click 'Done' when you're finished. <strong>Your changes won't be saved until you click one of the save buttons in the grader.</strong>
confirm_exceed_max_grade=The grade you entered is greater than the max of {}. Is that okay?
unlimited=Unlimited
hide_history=Hide History
show_history=Show History
hide_history_tooltip=Hide the history for this submission
show_history_tooltip=Show the feedback comment and grade history for this submission
feedback_comments=Feedback Comments
previous_grades=Previous Grades
successful_save=You successfully saved this grade
failed_save=Grade saving failed
draft_submission=DRAFT
draft_not_submitted=Still a draft - not submitted.
lti_grade_launch_button=Go to External Tool
lti_grade_launch_instructions=The submissions for this assignment are stored in an External Tool (LTI).
lti_grade_not_automatic=<b>Note:</b> When the LTI tool sends a grade to the server, it is not automatically reflected in this user interface until you refresh the grading interface.
destroy_rubric_panel_log=Failed to destroy rubric panel. Maybe it wasn't showing in the first place.
submission_inline=Inline Submission
assign_grade_overrides=Assign Grade Overrides
feedback_instruction = Use the box below to enter additional summary comments about this \
submission and click Done when you've finished. You still need to save the grade
previous_submission_label=View the previous submission
next_submission_label=View the next submission
override_grade_with=Override with:
ungraded=Ungraded
filter_settings_warning=You've applied some settings. Click on the cogs icon below to view them.
`;

export const gradableId = "assignment1";
export const siteId = "site1";
export const siteTitle = "Site 1";
export const submittedText = "My submission";
export const textAttachmentUrl = "http://text.com";
export const textSubmission = {
  id: "submission1",
  dateSubmitted: "7 Feb 1971",
  assignmentCloseTime: { epochSecond: 1677672390 },
  properties: {
    allow_resubmit_number: 0,
  },
  resubmitsAllowed: -1,
  submitters: [
    {
      sortName: "Fish, Adrian",
      displayId: "fisha",
    },
  ],
  //submittedAttachments: [ textAttachment ],
  submittedText,
};
export const gradableData = {
  gradable: { title: "Assignment One", gradeScale:  SCORE_GRADE_TYPE, maxGradePoint: "100" },
  submissions: [ textSubmission ],
};
export const gradesData = {
  students: [],
  grades: [],
};

/*
this._submission.originalityShowing = true;
this._submission.originalityServiceName = "Turnitin";
const supplies = [
  {
    "1": "http://www.balls.com",
    "4": "balls",
  }
];
this._submission.originalitySupplies = supplies;
*/
