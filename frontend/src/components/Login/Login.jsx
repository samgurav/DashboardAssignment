import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useState, useEffect, useRef } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "../Signup/signup.module.css";
import { IMAGES } from "../../config/string";
import { LoginData } from "../../config/config";
// import {getAll,getUser} from '../Config/MyService'
import Swal from "sweetalert2";

function Login() {
  const [verified, setVerified] = useState(false);
  const [loginData, setLoginData] = useState();
  const [flag, setFlag] = useState(false);
  const [state, setstate] = useState([]);
  const navigate = useNavigate();

  const handleLoginData = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    LoginData({
      email: loginData.email,
      password: loginData.password,
      role: loginData.role,
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          color: '#228B22',
          text: res.data.message,
          timer: 2000,
        });
        if (loginData.role === "admin") {
          navigate("/admindashboard", { replace: true });
          localStorage.setItem("isLogged", true);
          localStorage.setItem("_token", res.data.data);
          localStorage.setItem("isAdmin", true);
        } else if (loginData.role === "intern") {
          localStorage.setItem("isLogged", true);
          localStorage.setItem("_token", res.data.data);
          localStorage.setItem("isIntern", true);
          navigate("/interndashboard", { replace: true });
        }
        if (loginData.role === "trainer") {
          localStorage.setItem("isLogged", true);
          localStorage.setItem("_token", res.data.data);
          localStorage.setItem("isTrainer", true);
          navigate("/trainerdashboard", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };
  function onChange(value) {
    setVerified(true);
  }

  return (
    <div>
      <div className="Form my-2 mx-2">
        <Container>
          <Row className="row">
            <Col className="col-lg-6">
              <img src={IMAGES.LOGINLOGO} height="550px" width="450px" />
            </Col>
            <Col className="col-lg-6 px-5 pt-5">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx9bV7JhT1pYwSXwaMgiSBYaj8hNWUsUli_A&usqp=CAU"
                class="img-fluid rounded-circle "
                width="80px"
                height="80px"
              />
              <h4>Login</h4>

              <Form onSubmit={submitLogin}>
                <Form.Select
                  aria-label="Default select example"
                  name="role"
                  onChange={handleLoginData}
                >
                  <option>Select user Role</option>
                  <option value="intern">Intern</option>
                  <option value="admin">Admin</option>
                  <option value="trainer">Trainer</option>
                </Form.Select>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleLoginData}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicpassword">
                  <Form.Label>Enter Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleLoginData}
                    required
                  />
                  <div className="d-flex mt-3">
                    <ReCAPTCHA
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={onChange}
                    />
                  </div>
                </Form.Group>

                <Button
                  variant="primary"
                  className="m-2"
                  type="submit"
                  disabled={
                    !verified || !loginData?.email || !loginData?.password
                  }
                >
                  Submit
                </Button>
                <br />

                <Link to="/signup">New User? Signup to continue.</Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Login;
