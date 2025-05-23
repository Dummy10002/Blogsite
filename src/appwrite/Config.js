import conf from "../configureVarible/conf";
import { Client, Account ,ID ,Databases,Storage,Query} from "appwrite";

export class Service  {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
// English:
// This method creates a new post in the Appwrite database.
// It takes an object with post details and an optional document ID.
// Returns the created document or logs an error.

async createPost({ title, content, userId, featuredImage, status, slug }) {
    try {
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                userId,
                featuredImage,
                status,
            }
        );
    } catch (error) {
        console.log("Appwrite service :: createPost :: error", error);
        return false;
    }

}
// English:
// This method updates an existing post in the Appwrite database.
// It takes the document ID (slug) and an object with updated post details.
// Returns the updated document or logs an error.

async updatePost(slug, { title, content, userId, featuredImage, status }) {
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                userId,
                featuredImage,
                status,
            }
        );
    } catch (error) {
        console.log("Appwrite service :: updatePost :: error", error);
        return false;
    }
}

async deletePost(slug) {
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        );
        return true;
    } catch (error) {
        console.log("Appwrite service :: deletePost :: error", error);
        return false;
    }
}

async getPost(slug) {
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log("Appwrite service :: getPost :: error", error);
        return false;
    }
}

async getPosts(queries = [Query.equal("status", "active")]) {
  try {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      queries
    );
  } catch (error) {
    console.log("Appwrite service :: getPosts :: error", error);
    // Log the specific error details
    console.error("Error details:", error.message, error.code);
    return false;
  }
}
//file upload
async uploadFile(file){
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        );
    } catch (error) {
        console.log("Appwrite service :: uploadFile :: error", error);
        return false
    }
}   

async deleteFile(fileId) {
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        );
        return true
    } catch (error) {
        console.log("Appwrite service :: deleteFile :: error", error);
        return false;
    }
}

// File preview service
async getFilePreview(fileId) {
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
    );
}

// // File download service
// async downloadFile(fileId) {
//     try {
//         // Get the file download URL from Appwrite
//         const response = await this.bucket.getFileDownload(
//             conf.appwriteBucketId,
//             fileId
//         );
//         // The response is a URL to the file download
//         return response;
//     } catch (error) {
//         console.log("Appwrite service :: downloadFile :: error", error);
//         return false;
//     }
// }


}

const service = new Service();
export default service;

