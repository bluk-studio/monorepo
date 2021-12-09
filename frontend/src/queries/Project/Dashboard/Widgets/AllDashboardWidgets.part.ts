// BaseWidget part
const BaseWidget = `
type
enabled
x
y
height
width
`;

// AllDashboardWidgets part
export const AllDashboardWidgets = `
widgets {
  __typename
  ...on ControlsWidget {
    ${BaseWidget}
  }
  ...on ConsoleWidget {
    ${BaseWidget}
  }
  ...on PlayersWidget {
    ${BaseWidget}
  }
  ...on LogsWidget {
    ${BaseWidget}
  }
}
`;