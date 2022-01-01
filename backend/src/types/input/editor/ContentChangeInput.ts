import { IContentChange } from "@app/shared";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class ContentChangeInput implements IContentChange {
  @Field()
  index: number;

  @Field()
  text: string;
};