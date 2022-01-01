import { IMarketplaceInformation } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('PluginMarketplaceInformation')
export class MarketplaceInformationObject implements IMarketplaceInformation {
  @Field({ description: 'Do we need to display this plugin in Marketplace?' })
  display: boolean;
};