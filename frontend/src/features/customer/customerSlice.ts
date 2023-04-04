import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ApiStatus,
  IUpdateCustomer,
  IAddCustomer,
  ICustomerState,
} from "./customer.type";
import {
  createCustomerApi,
  deleteCustomerApi,
  getCustomerApi,
  updateCustomerApi,
} from "./customer.service";

const initialState: ICustomerState = {
  list: [],
  listStatus: ApiStatus.ideal,
  createUserFormStatus: ApiStatus.ideal,
  updateUserFormStatus: ApiStatus.ideal,
};

export const getCustomerAction = createAsyncThunk(
  "user/getCustomerAction",
  async () => {
    const api = await getCustomerApi();
    return api;
  }
);

export const createCustomerAction = createAsyncThunk(
  "user/createCustomerAction",
  async (data: IAddCustomer) => {
    const api = await createCustomerApi(data);
    return api.data;
  }
);

export const deleteCustomerAction = createAsyncThunk(
  "user/deleteCustomerAction",
  async (id:string) => {
    await deleteCustomerApi(id);
    return id;
  }
);

export const updateCustomerAction = createAsyncThunk(
  "user/updateCustomerAction",
  async ({data, id }: IUpdateCustomer) => {
    const api = await updateCustomerApi(data, id);
    return api.data;
  }
);


const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    resetCreateListStatus: (state) => {
      state.createUserFormStatus = ApiStatus.ideal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomerAction.pending, (state) => {
      state.listStatus = ApiStatus.loading;
    });
    builder.addCase(getCustomerAction.fulfilled, (state, action) => {
      state.listStatus = ApiStatus.ideal;
      state.list = action.payload;
    });
    builder.addCase(getCustomerAction.rejected, (state) => {
      state.listStatus = ApiStatus.error;
    });
    builder.addCase(createCustomerAction.pending, (state) => {
      state.createUserFormStatus = ApiStatus.loading;
    });
    builder.addCase(createCustomerAction.fulfilled, (state) => {
      state.createUserFormStatus = ApiStatus.success;
      // toastSuccess("User created");
    });
    builder.addCase(createCustomerAction.rejected, (state) => {
      state.createUserFormStatus = ApiStatus.error;
      // toastSuccess("Error while creating user");
    });
    builder.addCase(deleteCustomerAction.fulfilled, (state, action) => {
      const newList = state.list.filter((x) => x._id !== action.payload);
      state.list = newList;
    });
    builder.addCase(updateCustomerAction.pending, (state) => {
      state.updateUserFormStatus = ApiStatus.loading;
    });
    builder.addCase(updateCustomerAction.fulfilled, (state) => {
      state.updateUserFormStatus = ApiStatus.ideal;
      // toastSuccess("User updated");
    });
    builder.addCase(updateCustomerAction.rejected, (state) => {
      state.updateUserFormStatus = ApiStatus.error;
      // toastError("Error while updating user");
    });
  },
});

export default customerSlice.reducer;
export const { resetCreateListStatus } = customerSlice.actions;