import { use } from "react";
import conf from "../configureVarible/conf";
import { Client, Account ,ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        
    }

async createAccount({email,password,name}){
    try{
        const userAccount = await this.account.create(ID.unique(),email,password,name);
        if(userAccount){
            // Call login only once and return its result
            return this.login({email,password});
        }
        return null; // Account creation failed
    }
    catch(error){
        console.log("appwrite service :: createAccount :: error",error);
        throw error; // Re-throw the error so the UI can handle it
    }
}
    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }
        catch(error){
            console.log("appwrite service :: login :: error",error);
        }
    }
    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log("appwrite service :: getCurrentUser :: error",error);
        }
    }
    async logout(){
        try{
            return await this.account.deleteSessions();
        }
        catch(error){
            console.log("appwrite service :: logout :: error",error);
        }

    }
}

const authService = new AuthService();

export default authService;
