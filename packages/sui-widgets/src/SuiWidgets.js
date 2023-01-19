export const suiWidgets = {

  getIds: () => [ "announcements", "calendar", "forums", "grades", "tasks" ],
  getWidgets: () => {

    return [
      {
        id: "announcements",
        roles: [ "instructor", "student" ],
        tag: "sui-announcements-widget",
      },
      {
        id: "calendar",
        roles: [ "instructor", "student" ],
        tag: "sui-calendar-widget",
      },
      {
        id: "forums",
        roles: [ "instructor", "student" ],
        tag: "sui-forums-widget",
      },
      { id: "grades",
        roles: [ "instructor" ],
        tag: "sui-grades-widget",
      },
      {
        id: "tasks",
        roles: [ "instructor", "student" ],
        tag: "sui-tasks-widget",
      },
    ];
  },
};

