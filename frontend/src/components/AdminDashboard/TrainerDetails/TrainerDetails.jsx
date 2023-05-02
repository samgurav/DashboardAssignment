import React, { useEffect, useState } from "react";
import { Breadcrumb, Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  AddCourse,
  RegisterUser,
  deleteTrainer,
  getCourse,
  getTrainer,
  updateTrainer,
} from "../../../config/config";
import Table from "react-bootstrap/Table";
import usePagination from "../../Pagination";
import { Pagination } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const bcrypt = require("bcryptjs");

const TrainerDetails = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "trainer",
  });
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState([]);
  const [temp, setTemp] = useState(false);
  const [edit, setEdit] = useState(false);
  const [course, setCourse] = useState([]);
  const [flag, setFlag] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const count = Math.ceil(trainer?.length / PER_PAGE);
  const _DATA = usePagination(trainer, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    getCourse()
      .then((res) => {
        setCourse(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const DeleteTrainer = (value) => {
    let matchFound = course?.some((item) => item.trainer === value);
    if (matchFound) {
      Swal.fire({
        icon: "warning",
        text: "Trainer is Already Assigned to course",
        timer: 2000,
      });
    } else {
      deleteTrainer({ value: value })
        .then((res) => {
          setTrainer(res.data.data);
          Swal.fire({
            icon: "success",
            text: res.data.message,
            timer: 2000,
          });
          setFlag(true);
          setTemp((prev) => !prev);
          setShow(false);
          setEdit(false);
          // setTemp(true)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const Submit = (e) => {
    e.preventDefault();
    const saltRounds = 10;
    const myPlaintextPassword = data.password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync(myPlaintextPassword, salt);
    data.password = hashPass;
    RegisterUser({name:data.name,email:data.email,username:data.username,password:data.password,role:"trainer"})
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: res.data.message,
          timer: 2000,
        });
        setData("");
        setFlag(true);
        setTemp((prev) => !prev);
        setShow(false);
        setEdit(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    getTrainer()
      .then((res) => {
        setTrainer(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [temp]);

  const UpdateTrainerData = (e) => {
    e.preventDefault();
    const saltRounds = 10;
    const myPlaintextPassword = data.password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync(myPlaintextPassword, salt);
    data.password = hashPass;
    updateTrainer(data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: res.data.message,
          timer: 2000,
        });
        setData("");
        setFlag(true);
        setTemp((prev) => !prev);
        setShow(false);
        setEdit(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  if (!localStorage.getItem("isAdmin")) {
    window.location.replace("/");
    localStorage.clear();
  }
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
        <div className=" mt-2" style={{ float: "right" }}>
          <Button variant="secondary" size="lg" active onClick={handleShow}>
            Add Trainer
          </Button>{" "}
        </div>
        <br />
        <div className="mt-5">
          <div>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr className="bg-light">
                  <th>Sr.No</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {trainer &&
                  _DATA.currentData()?.map((value, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{value.name}</td>
                      <td>{value.username}</td>
                      <td>
                        <Button
                          variant="warning"
                          className="m-1"
                          onClick={() => {
                            handleShow();
                            setData({
                              id: value._id,
                              name: value.name,
                              username: value.username,
                              email: value.email,
                              password: value.password,
                            });
                            setEdit(true);
                          }}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          variant="danger"
                          onClick={() => {
                            DeleteTrainer(value._id);
                          }}
                        >
                          Delete
                        </Button>{" "}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "10px" }}
            >
              <Pagination
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title> Trainer Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={Submit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Trainer Name"
                  onChange={handler}
                  defaultValue={data.name}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  defaultValue={data.email}
                  placeholder="Enter Email"
                  onChange={handler}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  defaultValue={data.username}
                  placeholder="Enter Username"
                  onChange={handler}
                  required
                />
              </Form.Group>
              {edit ? (
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handler}
                    required
                    defaultValue={data.password}
                    disabled
                  />
                </Form.Group>
              ) : (
                <>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      onChange={handler}
                      required
                    />
                  </Form.Group>
                </>
              )}

              {edit ? (
                <Button
                  variant="success"
                  className="m-2"
                  onClick={UpdateTrainerData}
                >
                  Update
                </Button>
              ) : (
                <>
                  <Button variant="success" className="m-2" type="submit">
                    Submit
                  </Button>
                </>
              )}
              <Button variant="primary" className="m-2" type="reset">
                Reset
              </Button>
              <br />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                handleClose();
                setEdit(false);
                setData("");
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default TrainerDetails;
