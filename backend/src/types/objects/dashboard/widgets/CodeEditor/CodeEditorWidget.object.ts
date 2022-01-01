import { EWidgetType, ICodeEditorWidget } from "@app/shared";
import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType('CodeEditorWidget')
export class CodeEditorWidgetObject implements ICodeEditorWidget {
  @Field(type => String, { nullable: false, defaultValue: EWidgetType.CODE_EDITOR })
  type: EWidgetType.CODE_EDITOR;

  @Field(type => Boolean, { nullable: false, defaultValue: false })
  enabled: boolean;

  // Position
  @Field((type) => Number, { description: "X coordinate of DashboardWidget's position" })
  x: number;

  @Field((type) => Number, { description: "Y coordinate of DashboardWidget's position" })
  y: number;

  // Size
  @Field((type) => Number, { description: "DashboardWidget's width" })
  height: number;

  @Field((type) => Number, { description: "DashboardWidget's height" })
  width: number;

  // Other fields
};