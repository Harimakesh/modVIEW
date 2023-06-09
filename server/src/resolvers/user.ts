import { User, UserModel } from "../schema/User";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  ObjectType,
} from "type-graphql";
import argon2 from "argon2";

@InputType()
class UserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(@Arg("options") options: UserInput): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "length must be greater than 3",
          },
        ],
      };
    }
    if (options.password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 3",
          },
        ],
      };
    }

    const hashedpassword = await argon2.hash(options.password);
    const user = new UserModel({
      name: options.username,
      password: hashedpassword,
    });
    try {
      await user.save();
    } catch (err) {
      if (err.code == "11000") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
    }
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(@Arg("options") options: UserInput): Promise<UserResponse> {
    const user = await UserModel.findOne({ name: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "username doesnt exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      };
    }
    return {
      user,
    };
  }
  @Query(() => String)
  async hello() {
    return "hello";
  }
}
