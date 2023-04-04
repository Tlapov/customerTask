import { useParams } from "react-router-dom";
import {  useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const url: string = "http://localhost:8000/api/customer";
const insuranceUrl: string = "amount";


const ViewCustomer = () => {
    const { list } = useAppSelector((state: RootState) => state.customer);
    const { id } = useParams();

    const customer = list.filter(x => x._id == id);
    const dateLocale = new Date(customer[0].date).toLocaleDateString();

    const showInsurance = async () => {
        const response = await fetch(`${url}/${insuranceUrl}/${id}`);
        const data = await response.json();
        toast(`Your amount: ${data.amount}`)    
    }

    return (
        <>
        <div className="cutomer-details">
            <h1>Custumer details</h1>
            <h4><span>Name: </span>{customer[0].name}</h4>
            <h4><span>Surname: </span>{customer[0].surname}</h4>
            <h4><span>Email: </span>{customer[0].email}</h4>
            <h4><span>City: </span>{customer[0].city}</h4>
            <h4><span>Date : </span>{dateLocale}</h4>
            <Button onClick={showInsurance}>insurance</Button>
        </div>
        <ToastContainer />
        </>
    )
}
export default ViewCustomer