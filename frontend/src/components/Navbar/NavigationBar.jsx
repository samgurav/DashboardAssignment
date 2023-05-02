import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown, Dropdown } from "react-bootstrap";
import { IMAGES } from "../../config/string";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function NavScrollExample() {
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();

    if (localStorage.getItem("isLogged")) {
      Swal.fire({
        icon: "success",
        color: '#228B22',
        text:"You have Successfully Logout from this device.",
        timer: 3000,
      });
      localStorage.clear();
      navigate("/", { replace: true });
    }
  };
  return (
    <Navbar bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={IMAGES.CLOGO} width="100px" height="50px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
           
          </Nav>
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-light"
              id="dropdown-basic"
              style={{ height: "40px", width: "120px", marginRight: "60px" }}
            >
              {/* <i class="fas fa-user-tie"></i> */}
              Get Started
            </Dropdown.Toggle>
            {localStorage.getItem("isLogged") ? (
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Profile
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={logout}>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Logout
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            ) : (
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Login
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    to="/signup"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Register
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            )}
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
