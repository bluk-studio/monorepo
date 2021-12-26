import { EWidgetType } from "@app/shared";
import { registerEnumType } from "@nestjs/graphql";

registerEnumType(EWidgetType, { name: 'EWidgetType', description: "DashboardWidget's type (CONSOLE, PLAYERS, and so on...)" })