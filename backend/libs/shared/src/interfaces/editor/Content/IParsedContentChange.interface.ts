import { EParsedContentChangeActionType } from "@app/shared";

export interface IParsedContentChange {
  type: EParsedContentChangeActionType,
  index: number,
  length?: number,
  text: string,
};