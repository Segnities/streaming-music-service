import { DocumentData } from "firebase/firestore";

export interface UserDoc {
  id: string;
  data: DocumentData;
}
