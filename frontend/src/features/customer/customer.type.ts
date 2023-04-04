export interface ICustomer {
    _id: string;
    name: string;
    surname: string;
    email: string;
    city: string;
    date: string;
  }
  
  export enum ApiStatus {
    "loading",
    "ideal",
    "success",
    "error",
  }
  
  export interface ICustomerState {
    list: ICustomer[];
    listStatus: ApiStatus;
    createUserFormStatus: ApiStatus;
    updateUserFormStatus: ApiStatus;
  }
  
  export interface IAddCustomer {
    name: string;
    surname: string;
    email: string;
    city: string;
    date: string;
  
  }
  
  export interface IUpdateCustomer {
    id: string;
    data: IAddCustomer;
  }