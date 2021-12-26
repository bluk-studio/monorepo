import { EDashboardType } from "@app/shared";
import { registerEnumType } from "@nestjs/graphql";

console.log('register EDashboardType enum');
registerEnumType(EDashboardType, { 
  name: 'EDashboardType', 
  description: "DashboardConfig Type (either PROJECT, CODE_EDITOR, VISUAL_EDITOR or similar...)" 
});