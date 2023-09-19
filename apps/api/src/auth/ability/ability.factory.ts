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
import { Order } from 'src/order/schemas/order.schema';
import { Cart } from 'src/cart/schemas/cart.schema';
import { Order } from 'src/order/schemas/order.schema';
import { Rating } from 'src/rating/schemas/rating.schema';

export type Subjects =
  | InferSubjects<typeof User | typeof Product | typeof Cart | typeof Order | typeof Rating>
  | 'all';
export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  definedAbility(userType: string, authorId: string) {
    const { can, cannot, build } = new AbilityBuilder(
      PureAbility as AbilityClass<AppAbility>,
    );

    if (userType === Role.MERCHANT) {
      can(Action.Manage, 'all');
      can(Action.Create, Product);
      can(Action.Read, Product);
      can(Action.Update, Product);
      can(Action.Delete, Product);
    } else {
      // user
      can(Action.Create, User);
      can(Action.Read, User);
      can(Action.Update, User);
      can(Action.Delete, User);

      // product
      can(Action.Read, Product);

      // order
      can(Action.Read, Order);
      can(Action.Create, Order);

      // cart
      can(Action.Create, Cart);
      can(Action.Read, Cart);
      can(Action.Update, Cart);
      can(Action.Delete, Cart);

      // order
      can(Action.Create, Order);
      can(Action.Read, Order);
      can(Action.Update, Order);
      can(Action.Delete, Order);

      // rating
      can(Action.Create, Rating);
      can(Action.Read, Rating);
      can(Action.Update, Rating);
      can(Action.Delete, Rating);
    }

    // can(Action.Update, Article, { authorId: user.id });
    // cannot(Action.Delete, Article, { isPublished: true });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
