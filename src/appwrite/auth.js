
import config from "../config/config";
import { Client,Account,ID } from "appwrite";

export class AuthService{
    client= new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account=new Account(this.client);    

    }

    async createAccount({email,password,name}) {
        const userAccount = await this.account.create(ID.unique(),email,password,name);
        if (userAccount) {
            //call another method
            return this.login({email,password});
        }
        return;
    }
    
    async login({email,password}) {
        return this.account.createEmailPasswordSession({ email, password });
    }
    async getCurrentUser() {
        return this.account.get();
    }
    async logout() {
        return this.account.deleteSessions();
    }
}

const authService =new AuthService();
export default authService