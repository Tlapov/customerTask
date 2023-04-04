import './index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AddCustomer from './components/AddCustomer';
import TableCustomer from './components/TableCustomer';
import EditCustomer from './components/EditCustomer';
import ViewCustomer from './components/ViewCustomer';


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<TableCustomer />}></Route>
              <Route path='/addCustomer' element={<AddCustomer />}></Route>
              <Route path='/:id' element={<ViewCustomer/>}></Route>
              <Route path='/editCustomer/:id' element={<EditCustomer />}></Route>
            </Route>          
        </Routes>
    </BrowserRouter>
      
  );
}

export default App;