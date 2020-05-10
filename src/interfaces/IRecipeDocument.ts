import { Document } from 'mongoose';

export interface IRecipeDocument extends Document {
    name: string;
    description: string;
    imagePath: string;
    ingredients: {name: string, amount: number}[];
}