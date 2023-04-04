import { Schema, model } from 'mongoose';

export interface Discount {
    id: string;
    discount: number;
    age: Array<number>;

}

export const DiscountSchema = new Schema<Discount>(
    {
        discount: { type: Number },
        age: [{ type: Array}]
    }, {
    timestamps: true,
    collection: "discount"
}
);

export const DiscountModel = model<Discount>('discount', DiscountSchema);