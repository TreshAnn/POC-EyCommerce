import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/guards/enum/role.enum';
import { User } from 'src/users/schemas/user.schema';
import { Action } from './enum/ability.enum';

export type Subjects = InferSubjects<typeof User> | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  definedAbility(userType: string, authorId: string) {
    const { can, cannot, build } = new AbilityBuilder(
      PureAbility as AbilityClass<AppAbility>,
    );

    if (userType === Role.MERCHANT) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, User);
    }

    // can(Action.Update, Article, { authorId: user.id });
    // cannot(Action.Delete, Article, { isPublished: true });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
