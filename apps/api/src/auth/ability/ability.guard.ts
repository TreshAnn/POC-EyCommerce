import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY, RequireRule } from './ability.decorator';
import { AbilityFactory } from './ability.factory';

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(
    private abilityFactory: AbilityFactory,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequireRule>(CHECK_ABILITY, context.getHandler()) ||
      [];
    const definedAbility = rules[0];
    const request = await context.switchToHttp().getRequest();
    const _id = request['_id'];
    const userType = request['userType'];
    const ability = this.abilityFactory.definedAbility(userType, _id);
    const isAllowed = ability.can(
      definedAbility.action,
      definedAbility.subject,
    );
    console.log(isAllowed);
    return isAllowed;
  }
}
