import { SetMetadata } from '@nestjs/common';
import { Subjects } from './ability.factory';
import { User } from 'src/users/schemas/user.schema';
import { Action } from './enum/ability.enum';

export interface RequireRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';
export const CheckAbilities = (...requirements: RequireRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);

export class ReadUserAbility implements RequireRule {
  action = Action.Read;
  subject = User;
}

export class MerchantAbility implements RequireRule {
  action = Action.Manage;
  subject = User;
}
