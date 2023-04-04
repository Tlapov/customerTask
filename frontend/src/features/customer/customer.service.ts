import { IAddCustomer } from "./customer.type";

const url: string = "http://localhost:8000/api/customer";

export const getCustomerApi = async () => {
  const response = await fetch(url)
  return await response.json();
};

export const createCustomerApi = async (data: IAddCustomer) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  console.log(await response.json())
  return await response.json();
};

export const updateCustomerApi = async (data: IAddCustomer, id: string) => {
  const response = await fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
};

export const deleteCustomerApi = async (id: string) => {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
};




