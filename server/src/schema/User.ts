import { prop, getModelForClass } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ObjectType, Field } from "type-graphql";

// interface IUser {
//   name: string;
//   password: string;
// }

// const userSchema = new Schema<IUser>({
//   name: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// export const User = model<IUser>("User", userSchema);
@ObjectType()
export class User extends TimeStamps {
  @Field(() => String)
  @prop({ unique: true })
  name: string;

  @prop()
  password: string;
}

export const UserModel = getModelForClass(User);
