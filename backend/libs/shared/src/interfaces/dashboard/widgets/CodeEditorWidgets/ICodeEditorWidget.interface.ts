import { IBaseDashboardWidget } from '../';
import { EWidgetType } from "../../../../enums";

export interface ICodeEditorWidget extends IBaseDashboardWidget {
  type: EWidgetType.CODE_EDITOR,

  // Configuration section
};