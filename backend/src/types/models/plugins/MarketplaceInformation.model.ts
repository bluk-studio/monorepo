import { IMarketplaceInformation } from '@app/shared';
import { Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class MarketplaceInformation implements IMarketplaceInformation {
  @Prop({ required: true, default: false })
  display: boolean;
};