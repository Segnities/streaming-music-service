import { getUsers } from './getUsers';

import { DocumentData } from 'firebase/firestore';
import { UserDoc } from './@types';

export async function findUserByEmail(email: string | null | undefined):Promise<any> {
 const userList: DocumentData[] = await getUsers();

 return userList.find((usr: DocumentData) => usr.data.email === email);
}
