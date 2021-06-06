export class userLoginDTO {
  username: string;
  password: string;
}

export class userDTO {
  user_id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  is_activated: boolean;
}

export class profileDTO {
  user_id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  profilePicture: string;
  about: string;
  gender: string;
  dob: Date;
  occupation: string;
  phone: string;
  facebook_link: string;
  twitter_link: string;
  instagram_link: string;
  linekd_link: string;
  is_verified: boolean;
  created_on: Date;
}
