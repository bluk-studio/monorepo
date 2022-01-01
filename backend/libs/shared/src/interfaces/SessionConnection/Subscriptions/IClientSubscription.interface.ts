// Importing different subscription payload
import { ContentEditorSubscriptionPayload } from './Payloads';

// Exporting TSubscriptionPayload type
export type TSubscriptionPayload = ContentEditorSubscriptionPayload;

// Exporting IClientSubscription interface
export interface IClientSubscription {
  name: string,
  payload: TSubscriptionPayload,
};