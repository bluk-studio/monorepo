import { IConsoleWidget } from '@app/shared';
import { InputType, Field } from '@nestjs/graphql';

// +todo change omit to something like
// https://stackoverflow.com/a/50837544
@InputType()
export class UpdateConsoleWidgetInput implements Partial<Omit<IConsoleWidget, 'type' | 'x' | 'y' | 'height' | 'width'>> {
  @Field({ nullable: true })
  enabled?: boolean;
};