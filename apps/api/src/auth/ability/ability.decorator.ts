import { SetMetadata } from '@nestjs/common';
import { Subjects } from './ability.factory';
import { Action } from './enum/ability.enum';

export interface RequireRule {
  action: Action | Action[];
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';
export const CheckAbilities = (...requirements: RequireRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
