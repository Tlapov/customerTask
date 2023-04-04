import { NextFunction, RequestHandler, Request, Response } from "express";
import { CustomerModel } from "../models/custumer.model";
import { BasePriceModel } from "../models/base_price.model";
import { DiscountModel } from "../models/discount.model";

export const getCustomers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = await CustomerModel.find().exec();
        res.status(200).json(customer);
    } catch (error) {
        next(error);
    }
}

export const getCustomer: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    console.log(id);
    try {
        const customer = await CustomerModel.findById(id).exec();
        if (!customer) {
            res.status(404).json({ error: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        next(error)
    }
}

export const createCustomer: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { name, surname, email, city, date } = req.body;

    try {
        if (!name && surname && email && city && date) {
            res.status(400).json({ error: "All fields are required" })
        }
        const newCustomer = await CustomerModel.create({
            name: name,
            surname: surname,
            email: email,
            city: city,
            date: date
        });

        res.status(200).json(newCustomer);
    } catch (error) {
        next(error);
    }
}

export const updateCostomer: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { name, surname, email, city, date } = req.body;
    const { id } = req.params;
    try {
        const customer = await CustomerModel.findById(id).exec();

        if (!name && surname && email && city && date) {
            res.status(400).json({ error: "All fields are required" })
        }

        if (!customer) {
            res.status(400).json({ error: "Not found customer" })
        }
        customer.name = name;
        customer.surname = surname;
        customer.email = email;
        customer.city = city;
        customer.date = date;

        const updateCustomer = await customer.save();
        res.status(201).json(updateCustomer)

    } catch (error) {
        next(error)
    }
}
export const deleteCustomer: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const customer = await CustomerModel.findByIdAndDelete(id).exec();
        if (!customer) {
            res.status(400).json({ error: "Customer not found" })
        }
        res.status(204).send("Deleted")
    } catch (error) {
        next(error)
    }
}

export const getCustomerAmount: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const dateNow = new Date().getFullYear();
    let amount: number = 700;
    try {
        const basePrice = await BasePriceModel.find().exec();
        const discount = await DiscountModel.find().exec();
        const customer = await CustomerModel.findById(id).exec();
        if (!basePrice && !discount && !customer) {
            res.status(500).json({ error: "Unexpected error" })
        }
        const yearCustumer = dateNow - customer.date.getFullYear();
        const priceByCity = await BasePriceModel.findOne({ city: customer.city }).exec();
        if (priceByCity) {
            amount = priceByCity.amount;
        };
        const filterByYear = (await DiscountModel.where("age").gte(yearCustumer).lte(yearCustumer)).map(d => d.discount);
        const discountSum = amount - ((filterByYear[0] / 100) * amount)
        res.status(200).json({ amount: discountSum })

    } catch (error) {
        next(error);
    }

}
