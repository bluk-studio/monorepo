export interface DeleteContentPayload {
  resourceId: string;
  collaboratorId: string;

  index: number;
  length: number;
};