import { Schema, model } from 'mongoose';

export interface Customer {
    id: string;
    name: string;
    surname: string;
    email: string;
    city: string;
    date: Date;
}

export const CustumerSchema = new Schema<Customer>(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true },
        city: { type: String, required: true },
        date: { type: Date, required: true }
    }, {
    timestamps: true,
}
);

export const CustomerModel = model<Customer>('custumer', CustumerSchema);