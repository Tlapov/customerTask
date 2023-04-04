import { ChangeEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { IAddCustomer, IUpdateCustomer } from "../features/customer/customer.type";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {  updateCustomerAction } from "../features/customer/customerSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../app/store";

const EditCustomer = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");  
  const [city, setCity] = useState("");  
  const [date, setDate] = useState("");

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { list } = useAppSelector((state: RootState) => state.customer);
 
  const onEditCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const data: IAddCustomer = { name, surname, email, city, date }
    const editData: IUpdateCustomer = {id: id as string,  data};
    dispatch(updateCustomerAction(editData));
    navigate("/");
  ;}
  
  useEffect(() => {
     const customerData = list.filter(x => x._id === id);
     if(customerData.length){
        setName(customerData[0].name);
        setSurname(customerData[0].surname);
        setEmail(customerData[0].email);
        setCity(customerData[0].city);
        setDate(customerData[0].date);
     }
  },[])

  return (
    <Form className="d-flex flex-wrap flex-column w-50" onSubmit={onEditCustomer}>
        <Form.Group className="mb-3" controlId="formBasicName" >
            <Form.Label>Name</Form.Label>
            <Form.Control 
                type="text" 
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                }} 
                required 
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Surname" 
                required
                value={surname}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setSurname(e.target.value);
                }}  
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Email" 
                required
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                }}  
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="City" 
                required
                value={city}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setCity(e.target.value);
                }}  
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control 
                type="date"
                value={date}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setDate(e.target.value);
                }}
                required
            />
        </Form.Group>
        
        <Button className="mt-4" variant="primary" type="submit">
            Add customer
        </Button>
    </Form>
  )
}

export default EditCustomer