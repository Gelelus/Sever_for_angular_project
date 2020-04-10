import { Document } from 'mongoose';

export interface IPetDocument extends Document {
    name: string;
}