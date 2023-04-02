import { initializeApp } from "firebase/app";
import {getFirestore, collection, addDoc} from "firebase/firestore";

import {  mockFirebaseConfig } from "../../firebase/firebaseConfig";



describe('Firestore config tests', ()=> {
    beforeEach(()=> {
        initializeApp(mockFirebaseConfig);
    });

    test('Firestore should use mock config', ()=> {
       const db = getFirestore();
       
       expect(db.app.options).toEqual(mockFirebaseConfig);
    });

    /* test('Add doc should add document to Firestore', async ()=> {
        const mockAddDoc = jest.fn(()=> Promise.resolve());
        
        const mockCollection = () => jest.fn(()=> ({
            add: mockAddDoc
        }));
        collection.mockImplementation(mockCollection);
    }); */
});