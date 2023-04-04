import { Container, Nav, Navbar } from "react-bootstrap"
import { Outlet, NavLink } from "react-router-dom"

const Layout = () => {
  const year = new Date().getFullYear();
  return (
    <>
    <main>
    <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand><NavLink to={"/"}>List of customer</NavLink></Navbar.Brand>
        <div className="mr-auto">
            <Nav.Link ><NavLink to={"/addCustomer"}>Add Customer</NavLink></Nav.Link>
        </div>
        </Container>
    </Navbar>
    <Container className="table-container">
        <Outlet></Outlet>
    </Container>
    <footer>
        <h4>Izradio: <span>Toni Lapov</span> <span>&copy; {year}</span></h4>
    </footer>
    </main>  
  </>
  )
}

export default Layout