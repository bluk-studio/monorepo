import { IConsoleWidget, IControlsWidget, ILogsWidget, IPlayersWidget, ICodeEditorWidget } from ".";

export type IDashboardWidget = 
  // Project widgets
  | IConsoleWidget 
  | IControlsWidget 
  | ILogsWidget 
  | IPlayersWidget

  // CodeEditor widgets
  | ICodeEditorWidget