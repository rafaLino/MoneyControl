import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { modelBase } from '../core/models/model-base';


export abstract class ServiceBase<T extends modelBase> {

    private api: FirebaseFirestoreTypes.CollectionReference;

    constructor(collectionName: string) {
        if (collectionName)
            this.api = firestore().collection(collectionName);
        else
            throw new Error("collectionName not provide!")
    }

    public async get(): Promise<T[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const snapshot: FirebaseFirestoreTypes.QuerySnapshot = await this.api.get();
                const data: T[] = snapshot.docs.map(doc => {
                    return {
                        ...doc.data() as T,
                        id: doc.id
                    }
                });
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    }

    public async getById(id: string): Promise<T> {
        return new Promise(async (resolve, reject) => {
            try {
                const snapshot: FirebaseFirestoreTypes.DocumentSnapshot = await this.api.doc(id).get();
                if (snapshot.exists)
                    resolve({ ...snapshot.data() as T, id: snapshot.id });
                else
                    reject(new Error("document not found!"));
            } catch (error) {
                reject(error);
            }
        });
    }

    public async create(data: T): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                delete data.id;
                const snapshot = await this.api.add(data);
                resolve(snapshot.id);
            } catch (error) {
                reject(error);
            }
        });
    }

    public async update(id: string, data: T): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                delete data.id;
                await this.api.doc(id).update(data);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    public async delete(id: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.api.doc(id).delete();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
    public collection(): FirebaseFirestoreTypes.CollectionReference {
        return this.api;
    }
}