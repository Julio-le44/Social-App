import {Client, Account, Databases, Storage, Avatars} from 'appwrite';


export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWIRTE_PROJECT_ID,
    url: import.meta.env.VITE_APPWIRTE_URL,
    databaseId: import.meta.env.VITE_APPWIRTE_DATABASE_ID,
    savesCollectionId: import.meta.env.VITE_APPWIRTE_SAVES_COLLECTION_ID,
    userCollectionId: import.meta.env.VITE_APPWIRTE_USER_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APPWIRTE_POST_COLLECTION_ID,
    storageId: import.meta.env.VITE_APPWIRTE_STORAGE_ID,
}

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);