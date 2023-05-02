import React from "react";
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
import Swal from "sweetalert2";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import styles from "./signup.module.css";
import { RegisterUser, addSocialUser } from "../../config/config";
import SocialButton from "./SocialButton";
// import {addUser} from '../Config/MyService'
// import Swal from 'sweetalert2'
const bcrypt = require("bcryptjs");
const regForName = RegExp(/^[A-Za-z]{2,10}$/);
const regForUName = RegExp(/^[A-Za-z]{2,12}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp(
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
);
function Signup() {
  const navigate = useNavigate();
  //     const pass =useRef()
  const [select, setSelect] = useState();
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "intern",
  });
  const [Errors, SetError] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [img, setImage] = useState({
    photo: "",
  });
  const handlePhoto = (e) => {
    setImage({ ...img, photo: e.target.files[0] });
  };
  const handler = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        Errors.name = regForName.test(value)
          ? ""
          : " name should be between 2 to 10 letters";
        break;
      case "username":
        Errors.username = regForName.test(value)
          ? ""
          : " Username should be between 2 to 10 letters";
        break;

        break;

      case "email":
        Errors.email = regForEmail.test(value) ? "" : "invalid email";
        break;

      case "password":
        Errors.password = regForPass.test(value)
          ? ""
          : "Password must be between 6 to 16 characters and must contain one number and one special character";
        break;
    }
    setSelect({ Errors, [name]: value }, () => {
      console.log(Errors);
    });

    setData({ ...data, [name]: value });
  };

  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const saltRounds = 10;
    const myPlaintextPassword = data.password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync(myPlaintextPassword, salt);
    data.password = hashPass;
    if (validate(Errors)) {
      RegisterUser(data)
        .then((res) => {
          if (res.data.status === true) {
            // alert(res.data.message)
            Swal.fire({
              icon: "success",
              text: res.data.message,
              timer: 2000,
            });
          }
          navigate("/login", { replace: true });
        })

        .catch((err) => {
          alert(err.response.data.message);
          navigate("/", { replace: true });
        });
    }
  };

  const handleSocialLogin = (user) => {
    let password = "Sam@1234";
    const saltRounds = 10;
    const myPlaintextPassword = password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync(myPlaintextPassword, salt);
    password = hashPass;
    addSocialUser({
      name: user.profile.name,
      username: user.profile.name,
      email: user.profile.email,
      role: "intern",
      photo: user.profile.profilePicURL,
      password: password,
    })
      .then((res) => {
        if (res.data.status == true) {
          localStorage.setItem("isLogged", true);
          localStorage.setItem("_token", res.data.data);
          localStorage.setItem("isIntern", true);
          Swal.fire({
            icon: "success",
            text: res.data.message,
            timer: 2000,
          });
          navigate("/interndashboard", { replace: true });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
    alert("Sorry wrong user");
  };

  return (
    <div>
      <div className="Form my-2 mx-2">
        <Container>
          <Row className="row">
            <Col className="col-lg-6">
              <img
                src="https://www.visualcv.com/static/6438263d0dbc0eb996443d63e54edd7d/e3663/Resources_2x.png"
                height="700px"
                width="450px"
              />
            </Col>

            <Col className="col-lg-6 px-5 pt-5 ">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx9bV7JhT1pYwSXwaMgiSBYaj8hNWUsUli_A&usqp=CAU"
                class="img-fluid rounded-circle "
                width="50px"
                height="50px"
              />
              <h4>Signup</h4>

              <Form encType="multipart/form-data" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicfirstName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter First Name"
                    onChange={handler}
                    required
                  />
                  {Errors.name.length > 0 && (
                    <span style={{ color: "red" }}>{Errors.name}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicfirstName">
                  <Form.Label>UserName</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    onChange={handler}
                    required
                  />
                  {Errors.username.length > 0 && (
                    <span style={{ color: "red" }}>{Errors.username}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handler}
                    required
                  />
                  {Errors.email.length > 0 && (
                    <span style={{ color: "red" }}>{Errors.email}</span>
                  )}
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicpassword">
                  <Form.Label>Enter Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handler}
                    required
                  />
                  {Errors.password.length > 0 && (
                    <span style={{ color: "red" }}>{Errors.password}</span>
                  )}
                </Form.Group>
              
                <Button variant="primary" className="m-2" type="submit">
                  Submit
                </Button>
                {/* {flag? navigate('/login'):null}   */}
                <Button variant="success" className="m-2" type="reset">
                  Reset
                </Button>
                <br />
                <Link to="/login">
                  already have an account? Login to continue
                </Link>
              </Form>
              <div className="d-flex">
                <SocialButton
                  className="btn btn-danger"
                  style={{
                    height: 60,
                    width: 300,
                    marginTop: "20px",
                    marginRight: "20px",
                  }}
                  provider="google"
                  appId="552530164250-085dqcdp3mjb18nl3nknl0u96p9mnf7c.apps.googleusercontent.com"
                  onLoginSuccess={handleSocialLogin}
                  onLoginFailure={handleSocialLoginFailure}
                >
                  <i class="fab fa-google fa-1x"></i> Login with Google
                </SocialButton>
                <SocialButton
                  className="btn btn-primary"
                  style={{ height: 60, width: 300, marginTop: "20px" }}
                  provider="facebook"
                  appId="598247578289958"
                  onLoginSuccess={handleSocialLogin}
                  onLoginFailure={handleSocialLoginFailure}
                >
                  <i class="fab fa-facebook fa-1x"></i> Login with Facebook
                </SocialButton>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Signup;
