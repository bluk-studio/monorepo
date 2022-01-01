import { IMarketplaceInformation, IRawPlugin } from '@app/shared';
import { ObjectType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Profile } from 'src/types';
import { MarketplaceInformationObject } from '..';
import { ProfileObject, ProjectObject } from '../..';

@ObjectType('RawPlugin')
export class RawPluginObject implements IRawPlugin {
  @Field(type => String)
  _id: Types.ObjectId;

  // Visual
  @Field({ description: "RawPlugin's title" })
  title: string;

  @Field({ nullable: true, description: "RawPlugin's description" })
  description?: string;

  // Marketplace-related
  @Field((type) => MarketplaceInformationObject, { description: "Marketplace information" })
  marketplace: MarketplaceInformationObject;

  // Technical
  @Field((type) => [String], { description: "JavaScript code of this RawPlugin" })
  code: string[];

  @Field(type => ProfileObject, { description: "RawPlugin's creator" })
  creator: Profile

  @Field(type => ProjectObject, { description: "Project, to which this plugin belongs. (If set)", nullable: true })
  project?: ProjectObject;

  // Unnecessary
  creatorId: Types.ObjectId;
  projectId: Types.ObjectId;
};