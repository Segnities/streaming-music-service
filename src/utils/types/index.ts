export interface UserFields {
 email: string;
 password: string;
 username: string;
 birthday: string;
 gender: string;
}
export interface UserDoc {
 id: string;
 data: UserFields;
}
