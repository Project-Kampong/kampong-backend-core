import { InputType, Field } from '@nestjs/graphql';
import { IsDateString, IsMongoId } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsMongoId()
  _id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  @IsDateString()
  dob?: Date;

  @Field({ nullable: true })
  occupation?: string;
}
