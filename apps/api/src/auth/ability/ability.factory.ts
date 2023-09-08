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
import { Product } from 'src/products/schemas/products.schema';

export type Subjects = InferSubjects<typeof User | typeof Product> | 'all';
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
      can(Action.Create, User);
      can(Action.Read, User);
      can(Action.Update, User);
      can(Action.Delete, User);

      can(Action.Create, Product);
      can(Action.Read, Product);
      can(Action.Update, Product);
      can(Action.Delete, Product);
    }

    // can(Action.Update, Article, { authorId: user.id });
    // cannot(Action.Delete, Article, { isPublished: true });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
