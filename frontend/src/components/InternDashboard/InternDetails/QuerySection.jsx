import React, { useState, useEffect } from "react";
import {
  Accordion,
  Button,
  Container,
  Form,
  Modal,
  Table,
  Breadcrumb,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import usePagination from "../../Pagination";
import { Pagination } from "@mui/material";
import { RaiseQuery, getLesson, getQuery } from "../../../config/config";
import jwt_decode from "jwt-decode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const QuerySection = () => {
  const [show, setShow] = useState(false);
  const state = useLocation();
  const [data, setData] = useState();
  const [lesson, setLesson] = useState([]);
  const [temp, setTemp] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(state?.state?.Assignments?.length / PER_PAGE);
  const _DATA = usePagination(state?.state?.Assignments, PER_PAGE);
  let [page1, setPage1] = useState(1);

  const count1 = Math.ceil(lesson?.length / PER_PAGE);
  const _DATA1 = usePagination(lesson, PER_PAGE);
 
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const handleChange1 = (e, p) => {
    setPage1(p);
    _DATA1.jump(p);
  };
 
  if (!localStorage.getItem("isIntern")) {
    window.location.replace("/");
    localStorage.clear();
  }
  const handler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  const Submit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("_token");
    let decode = jwt_decode(token);
 
    RaiseQuery({
      question: data.question,
      userID: decode.id,
      courseID: state.state._id,
      lessonID: data.lesson,
    })
      .then((res) => {

        alert(res.data.message);
        setShow(false);
        setData("");
        setTemp((prev) => !prev);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    getLesson({ id: state?.state?._id })
      .then((res) => {
        setLesson(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [temp]);

  return (
    <div>
      <div>
        <Container>
          <div className="d-flex mt-5">
            <ArrowBackIcon onClick={() => navigate(-1)} />
            &nbsp;&nbsp;
            <Breadcrumb>
              <Breadcrumb.Item href="/interndashboard">
                {" "}
                Dashboard
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <h4 className="mt-5">Available Assignments</h4>
          <div className=" m-2" style={{ float: "right" }}>
            <Button variant="secondary" size="lg" active onClick={handleShow}>
              Ask your Doubts Related to Lesson
            </Button>{" "}
          </div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr className="bg-light">
                <th>Sr. No</th>
                <th>Question</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {state?.state &&
                _DATA.currentData()?.map((value, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{value.question}</td>
                    <td>{value.duration}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center">
            <Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </div>

          <div>
            <h1>Available Lessons</h1>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr className="bg-light">
                  <th>Sr. No</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>view queries</th>
                </tr>
              </thead>
              <tbody>
                {state?.state &&
                  _DATA1.currentData()?.map((value, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{value.title}</td>
                      <td>{value.description}</td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => {
                            navigate("/querypage", { state: value });
                          }}
                        >
                          view queries
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-center">
              <Pagination
                count={count1}
                size="large"
                page={page1}
                variant="outlined"
                shape="rounded"
                onChange={handleChange1}
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
                setData("");
              }}
            >
              <Modal.Title>Lesson Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={Submit}>
                <Form.Select
                  aria-label="Default select example"
                  name="lesson"
                  onChange={handler}
                >
                  <option>Select user Role</option>
                  {lesson &&
                    lesson.map((ele, index) => (
                      <option value={ele._id}>{ele.title}</option>
                    ))}
                </Form.Select>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Assignment Question</Form.Label>
                  <Form.Control
                    type="text"
                    name="question"
                    defaultValue={data?.question}
                    placeholder="Enter question"
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
              <Button
                variant="secondary"
                onClick={() => {
                  handleClose();
                  setData("");
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </div>
  );
};

export default QuerySection;
