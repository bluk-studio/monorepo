import { EActionEventType } from '@app/shared';
import { ActionPayload } from './Actions';

export interface IActionEvent {
  type: EActionEventType,
  payload: ActionPayload,
};