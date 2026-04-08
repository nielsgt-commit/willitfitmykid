import type { Action as AgeAction } from './Months/montdshs.action.ts';
import type { Action as HeightAction } from './Height/height.action';
import type { Action as PercentileAction } from './Percentile/percentile.action';
import type { Action as SizeAction } from './Size/size.action';

export type Action = AgeAction | HeightAction | PercentileAction | SizeAction;
//export type { AgeAction, HeightAction, PercentileAction, SizeAction };