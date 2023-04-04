import { Schema, model } from 'mongoose';

export interface BasePrice {
    id: string;
    amount: number,
    city: string

}

export const BasePriceSchema = new Schema<BasePrice>(
    {
        amount: { type: Number },
        city: { type: String }
    }, {
    timestamps: true,
    collection: "base_price"
}
);

export const BasePriceModel = model<BasePrice>('base_price', BasePriceSchema);