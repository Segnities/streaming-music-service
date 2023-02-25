import { getUsers } from "./getUsers";

import { UserDoc } from "./@types";

export async function getUser(email: string | null | undefined) {
  const userList: UserDoc[] = await getUsers();

  return userList.find((usr: UserDoc) => usr.data.email === email);
}
