import { Types } from 'mongoose';

export interface ITopUserMetric {
    _id: Types.ObjectId;
    userName: string;
    name: string;
    lastName: string;
    point: number;
    avatar: string;
    nivel: string;
    imgLevel: string;
}
