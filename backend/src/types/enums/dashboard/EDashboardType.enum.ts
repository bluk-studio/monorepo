import { EDashboardType } from "@app/shared";
import { registerEnumType } from "@nestjs/graphql";

registerEnumType(EDashboardType, { 
  name: 'EDashboardType', 
  description: "DashboardConfig Type (either PROJECT, CODE_EDITOR, VISUAL_EDITOR or similar...)" 
});