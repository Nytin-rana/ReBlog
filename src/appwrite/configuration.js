import config from "../config/config";
import { Client, ID, TablesDB, Query, Storage } from "appwrite";

export class Service{
    client= new Client();
    tables;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
            this.tables = new TablesDB(this.client);
            this.bucket= new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.tables.createRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            });
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error);
            
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.tables.updateRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            });
        } catch (error) {
             console.log("Appwrite service :: updatePost :: error",error);
        }
    }

    async deletePost(slug) {
        try {
            await this.tables.deleteRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                rowId: slug
            });
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error);
            return false;
        }

    }

    async getPost(slug) {
        try {
            return await this.tables.getRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                rowId: slug
            });
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);
        }
    }

    async getPosts(queries= [Query.equal("status","active")]) {
            try {
                const posts =await this.tables.listRows({
                    databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId,
                queries
                });
                console.log(posts);
                return posts;
                
            } catch (error) {
                // Don't log 401 errors as they're expected when not authenticated
                if (error.code !== 401) {
                    console.log("Appwrite service :: getPosts :: error",error);
                }
                return null;
            }
    }

    //file upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId: config.appwriteBucketId,
                fileId: ID.unique(),
                file
            })
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error",error);
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile({
                bucketId: config.appwriteBucketId,
                fileId
            })
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFileView({
            bucketId: config.appwriteBucketId,
            fileId
        });
    }

}

const service = new Service();
export default service