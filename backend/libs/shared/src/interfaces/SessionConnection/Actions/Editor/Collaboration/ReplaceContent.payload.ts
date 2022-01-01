export interface ReplaceContentPayload {
  resourceId: string;
  collaboratorId: string;

  index: number;
  length: number;
  text: string;
};