// Importing types
import { Types } from "mongoose";
import { IParsedContentChange } from "./IParsedContentChange.interface";

export interface IEditorContentChange {
  id: number,
  collaboratorId: Types.ObjectId,
  change: IParsedContentChange,
};