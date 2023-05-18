export const i18nUrl = /getI18nProperties.*tasks$/;

export const i18n = `
filter_current=All Current
filter_priority_5=Priority: 5
filter_priority_4=Priority: 4
filter_priority_3=Priority: 3
filter_priority_2=Priority: 2
filter_priority_1=Priority: 1
filter_overdue=Overdue
priority_1_tooltip=Low (1) priority
priority_2_tooltip=Quite low (2) priority
priority_3_tooltip=Medium (3) priority
priority_4_tooltip=Quite high (4) priority
priority_5_tooltip=High (5) priority
sort_none=Sort
sort_due_latest_first=Due: Latest First
sort_due_earliest_first=Due: Earliest First
sort_priority_lowest_first=Priority: Lowest First
sort_priority_highest_first=Priority: Highest First
priority=Priority
task=Task
due=Due
no_due_date=No due date
no_tasks=No tasks at the moment !
options=Options
edit=Edit this task
hard_delete=Permanently delete this task
soft_delete=Send this task to the trash. You'll be able to restore it under the \'trash\' filter
close=Close
create_new_task=Create New Task
edit_task=Edit Task
description=Description of task:
due=Date Due:
priority=Priority
high=High
quite_high=Quite high
medium=Medium
quite_low=Quite low
low=Low
url=URL:
add=Add Task
cancel=Cancel
save=Save
save_failed=Failed to save task
restore=Restore this task from the trash
edit_task=Edit Task
trash=Trash
text=Text
task_url=Click to be taken to the task
add_task=Add a new task
more=More
less=Less
show_less=Show less detail about this task
show_more=Show more detail about this task
widget_title=Tasks
completed=Completed
complete_tooltip=Mark this task as complete
deliver_task=Deliver this task to
deliver_my_dashboard=My dashboard
deliver_site=Students on this site
deliver_group=Members of a group
task_assigned_to_user=Task delivered to my dashboard
task_assigned_to_site=Task delivered to students on this site
task_assigned_to_group=Task delivered to members of this groups:
alert_want_to_delete=Are you sure you want to delete this task?
groups=Groups
`;

export const dialogcontentI18nUrl = /getI18nProperties.*dialog-content$/;

export const userId = "adrian";
export const siteId = "xyz";
export const siteTitle = "XYZ Site";

export const vavavoom = "Vavavoom";
export const vavavoomSite = "Vavavoom Site";

export const tasksUrl= /api\/tasks/;

export const tasks = {
  canAddTask: true,
  tasks: [
    { priority: 5, due: 1674068901978, description: "Submit Ears", notes: "You need to submit the ears assignment", url: "/assn/ears", siteTitle: "Maths" },
    { priority: 3, due: 1674068901978, description: "Do the shopping", siteTitle: "Maths" },
  ],
};
