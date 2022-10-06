import { Schema, model, Types } from 'mongoose';
import { IUser } from '../Types/userType';

const schema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export default model('User', schema);
