import { IEditorCollaborator } from "./Collaboration";
import { IEditorContentChange } from "./Content";
import { IEditorStatusBar } from "./IEditorStatusBar.interface";

export interface IEditorSession {
  // Collaborators
  collaborators: IEditorCollaborator[],

  // Changes
  changes: IEditorContentChange[],

  // StatusBar
  statusBar: IEditorStatusBar,
};