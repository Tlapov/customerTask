import { Router } from "express";
import * as customerControllers from "../controllers/customerControllers";

const router = Router();

router.get("/api/customer", customerControllers.getCustomers);

router.get("/api/customer/:id", customerControllers.getCustomer);

router.post("/api/customer", customerControllers.createCustomer);

router.patch("/api/customer/:id", customerControllers.updateCostomer);

router.delete("/api/customer/:id", customerControllers.deleteCustomer);

router.get("/api/customer/amount/:id", customerControllers.getCustomerAmount)

export default router;