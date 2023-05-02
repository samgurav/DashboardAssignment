import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Container, Form, Modal } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { GetUser, UpdateProfilePic, UpdateUser } from "../../config/config";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [newUser, setNewUser] = useState({
    photo: "",
    id: "",
  });
  const [flag1, setFlag1] = useState(false);
  const [temp, setTemp] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("_token");
    let decode = jwt_decode(token);
    let formData = new FormData();
    formData.append("photo", newUser.photo);
    formData.append("id", decode.id);
    UpdateProfilePic(formData)
      .then((res) => {
        alert(res.data.message);
        setTemp((prev) => !prev);
        setFlag1(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePhoto = (e) => {
    setNewUser({ ...newUser, photo: e.target.files[0] });
  };

  if (!localStorage.getItem("_token")) {
    window.location.replace("/login");
  }
  const handler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    let token = localStorage.getItem("_token");
    let decode = jwt_decode(token);
    GetUser({ id: decode.id })
      .then((res) => {
        setData(res.data.data);
        // setFlag1(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag1]);

  const UpdateDetails = (e) => {
    e.preventDefault();
    UpdateUser({ name: data.name, username: data.username, id: data._id })
      .then((res) => {
        alert(res.data.message);
        setTemp((prev) => !prev);
        setShow(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div>
      <Container>
        <div className="d-flex mt-5">
          <ArrowBackIcon onClick={() => navigate(-1)} />
          &nbsp;&nbsp;
          <Breadcrumb>
            <Breadcrumb.Item href="/admindashboard">
              {" "}
              Admin Dashboard
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="container card" style={{ marginTop: "40px" }}>
          <div className="col-12">
            <h1 className="mb-5"> User Profile</h1>
            <hr />
            <div>
              {data !== undefined && (
                <img
                  src={
                    data.photo
                      ? data.photo
                      : "https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg"
                  }
                  alt="userIcon"
                  height="100px"
                  style={{ borderRadius: "100%" }}
                />
              )}
              {flag1 ? (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="photo"
                    onChange={handlePhoto}
                  />
                  <div className="mb-2">
                    <Button
                      variant="primary"
                      style={{
                        marginLeft: "10px",
                        marginTop: "20px",
                        width: "200px",
                      }}
                      fullWidth
                      type="submit"
                    >
                      <AccountCircleIcon /> &nbsp;Submit
                    </Button>
                  </div>{" "}
                </form>
              ) : (
                <div>
                  {" "}
                  <div className="mb-2">
                    <Button
                      variant="primary"
                      onClick={() => setFlag1(true)}
                      style={{
                        marginLeft: "10px",
                        marginTop: "20px",
                        width: "200px",
                      }}
                      fullWidth
                    >
                      <AccountCircleIcon /> &nbsp;Change Profile
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <Button variant="primary" size="sm" onClick={handleShow}>
              Edit Details
            </Button>
            <div className="row mb-4 ">
              <div className="col-4 mt-4 mb-4">
                <p className="font-weight-bolder"> Name</p>
                <p className="font-weight-bolder">Username</p>
                <p className="font-weight-bolder">Email</p>
                <p className="font-weight-bolder">Role</p>
              </div>
              <div className="col-2"></div>
              <div className="col-6 mt-4 mb-4">
                {data != undefined && (
                  <>
                    <p>{data.name}</p>
                    <p>{data.username}</p>
                    <p>{data.email}</p>
                    <p>{data.role}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Lesson Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={UpdateDetails}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={data?.name}
                placeholder="Enter question"
                onChange={handler}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicpassword">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                defaultValue={data?.username}
                placeholder="Enter Username"
                onChange={handler}
                required
              />
            </Form.Group>

            <Button variant="success" className="m-2" type="submit">
              Submit
            </Button>

            <Button variant="primary" className="m-2" type="reset">
              Reset
            </Button>
            <br />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={()=>{handleClose();setData('')}}>
              Close
            </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
