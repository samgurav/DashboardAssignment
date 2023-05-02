import React, { useState, useEffect } from "react";
import { Breadcrumb, Container, Form, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  AddCourse,
  deleteCourse,
  getCourse,
  getTrainer,
  updateCourse,
} from "../../../config/config";
import { Link, Pagination, PaginationItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import usePagination from "../../Pagination";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseDetails = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [trainerdata, setTrainer] = useState("trainer");
  const [course, setCourse] = useState([]);
  const [trainer, setTrainerData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [temp, setTemp] = useState(false);
  const [edit, setEdit] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const count = Math.ceil(course?.length / PER_PAGE);
  const _DATA = usePagination(course, PER_PAGE);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };


  //add course
  const Submit = (e) => {
    e.preventDefault();
    AddCourse(data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: res.data.message,
          timer: 2000,
        });
        setData("");
        setFlag(true);
        setShow(false);
        setTemp(true);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  //update course
  const UpdateCourse = (e) => {
    e.preventDefault();
    updateCourse(data)
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

  //delete course
  const Deletecourse = (index, value) => {
    if (value.registeredStudents >= 0) {
      deleteCourse({ index: index, value: value._id })
        .then((res) => {
          setCourse(res.data.data);
          toast(res.data.message);
          setFlag(true);
          setTemp((prev) => !prev);
          setShow(false);
          setEdit(false);
          // setTemp(true)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        icon: "warning",
        text:  `${value.registeredStudents?.length} Registeration has been done for this Course.`,
        timer: 2000,
      });
    }
  };


  //get course
  const getCourseData = () => {
    getCourse()
      .then((res) => {
        setCourse(res.data.data);
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTrainer()
      .then((res) => {
        setTrainerData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getCourseData();
  }, [temp]);
  if (!localStorage.getItem("isAdmin")) {
    window.location.replace("/");
    localStorage.clear();
  }
  return (
    <div className="mt-5">
      <Container>
        <div className="d-flex">
          <ArrowBackIcon onClick={() => navigate(-1)} />
          &nbsp;&nbsp;
          <Breadcrumb>
            <Breadcrumb.Item href="/admindashboard">
              {" "}
              Admin Dashboard
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className=" m-2" style={{ float: "right" }}>
          <Button variant="secondary" size="lg" active onClick={handleShow}>
            Add Course
          </Button>{" "}
        </div>

        <div className="mt-5">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr className="bg-light">
                <th>Number</th>
                <th>Title</th>
                <th>Fees</th>
                <th>Durataion</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {course &&
                _DATA.currentData().map((value, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{value.title}</td>
                    <td>{value.fees}</td>
                    <td>{value.duration}</td>
                    <td>
                      <Button
                        variant="warning"
                        className="m-1"
                        onClick={() => {
                          handleShow();
                          setData({
                            title: value.title,
                            fees: value.fees,
                            duration: value.duration,
                            decription: value.description,
                            trainer: value.trainer,
                            id: value._id,
                          });
                          setEdit(true);
                        }}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => {
                          Deletecourse(index, value);
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

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header
            closeButton
            onClick={() => {
              setEdit(false);
              setData("");
            }}
          >
            <Modal.Title>Course Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={Submit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  defaultValue={data?.title}
                  placeholder="Enter Title"
                  onChange={handler}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicpassword">
                <Form.Label>Enter Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  defaultValue={data?.decription}
                  placeholder="Enter Description"
                  onChange={handler}
                  required
                />

              </Form.Group>
              <Form.Select
                aria-label="Default select example"
                name="duration"
                onChange={handler}
                defaultValue={data?.duration}
              >
                <option>Select Duration</option>
                <option value="1 month">1 Month</option>
                <option value="3 months">3 Months</option>
                <option value="6 months">6 Months</option>
              </Form.Select>
              <Form.Group className="mb-3" controlId="formBasicpassword">
                <Form.Label>Enter Fees</Form.Label>
                <Form.Control
                  type="number"
                  name="fees"
                  defaultValue={data?.fees}
                  placeholder="Enter Fees"
                  onChange={handler}
                  required
                />
              </Form.Group>

              <Form.Select
                aria-label="Default select example"
                name="trainer"
                onChange={handler}
                defaultValue={data?.trainer}
              >
                <option>Select Trainer</option>
                {trainer.map((value) => (
                  <option value={value._id}>{value.name}</option>
                ))}
              </Form.Select>
              {edit ? (
                <Button
                  variant="success"
                  className="m-2"
                  onClick={UpdateCourse}
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
      <ToastContainer />
    </div>
  );
};

export default CourseDetails;
