import { Model } from 'mongoose';
import { IUserDocument } from '../interfaces/IUserDocument';

export interface IUserModel extends Model<IUserDocument> {
    findByCredentials(login : string , password : string): Promise<IUserDocument>; 
}