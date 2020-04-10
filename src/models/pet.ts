import { Schema ,model } from 'mongoose';
import { IPetDocument } from '../interfaces/IPetDocument';

  const petSchema = new Schema({
    name: {
        type: String,
        unique:true,
        required: true,
        trim: true
    }
})

export default model<IPetDocument>('Pet', petSchema);
  