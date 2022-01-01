// Importing types
import { IProfile } from "../..";

export interface IEditorCollaborator extends Omit<IProfile, 'token' | 'projects'> {
  offset: number,
};