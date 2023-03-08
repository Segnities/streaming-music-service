import { getUsers } from './getUsers';

import { UserDoc } from './@types';
import { DocumentData } from 'firebase/firestore';

export async function findUserByEmail(email: string | null | undefined) {
 const userList: UserDoc[] = await getUsers();

 return userList.find((usr: DocumentData) => usr.data.email === email);
}
