import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  gender?: string;
  @Field({ nullable: true })
  profilePicture?: string;
  @Field({ nullable: true })
  dob?: Date;
  @Field({ nullable: true })
  occupation?: string;
}
