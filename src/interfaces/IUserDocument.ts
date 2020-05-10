import { Document } from 'mongoose';

export interface IUserDocument extends Document {
    age: string;
    email: string;
    name: string;
    password: string;
    avatarImg: string;
    recipes: string[];
    generateAuthToken(): Promise<string>;
}