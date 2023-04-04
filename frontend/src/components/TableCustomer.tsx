import { Button, Table } from "react-bootstrap";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { ApiStatus, ICustomer } from "../features/customer/customer.type";
import { deleteCustomerAction, getCustomerAction } from "../features/customer/customerSlice";
import { useNavigate } from "react-router-dom";

const TableCustomer = () => {
  const { list, listStatus } = useAppSelector((state: RootState) => state.customer);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCustomerAction());
  }, []);
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>City</th>
          <th>Date</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      {listStatus === ApiStatus.loading && <tbody>List is loading</tbody>}
      {listStatus === ApiStatus.error && (
        <tbody>Error while loading list</tbody>
      )}
      {listStatus === ApiStatus.ideal && list &&
        list.map((customer: ICustomer) => {
          return(
            <tbody>
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.surname}</td>
                <td>{customer.email}</td>
                <td>{customer.city}</td>
                <td>{customer.date}</td>
                <td><Button
                  onClick={() => {
                    navigate(`/${customer._id}`)
                  }}>
                  View details</Button></td>
                <td><Button onClick={() => {
                  navigate(`/editCustomer/${customer._id}`);
                }}>Edit customer</Button></td>
                <td><Button onClick={() => {
                  dispatch(deleteCustomerAction(customer._id))
                }}>Delete customer</Button></td>
              </tr>
            </tbody>
          )
        })}
    </Table>
  )
}

export default TableCustomer