import { BaseWidget } from "../BaseWidget.part";

export const AllProjectWidgets = `
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
`;