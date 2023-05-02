import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Table,
  Modal,
  Form,
  Breadcrumb,
} from "react-bootstrap";
import {
  AddAssignment,
  AddLesson,
  getAssignment,
  getCourse,
  getLesson,
} from "../../config/config";
import { useLocation, useNavigate } from "react-router-dom";
import usePagination from "../Pagination";
import { Pagination } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Courseassignments = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [assignment, setassignment] = useState([]);
  const [flag, setFlag] = useState(false);
  const [temp, setTemp] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const count = Math.ceil(assignment?.length / PER_PAGE);
  const _DATA = usePagination(assignment, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { state } = useLocation();
  const handler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  const Submit = (e) => {
    e.preventDefault();
    AddAssignment({ data: data, value: state })
      .then((res) => {
        alert(res.data.message);
        setData("");
        setFlag(true);
        setShow(false);
        setTemp(true);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  useEffect(() => {
    getAssignment({ id: state?._id })
      .then((res) => {
        setassignment(res?.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [temp]);
  if (!localStorage.getItem("isTrainer")) {
    window.location.replace("/");
    localStorage.clear();
  }
  return (
    <div>
      <Container>
    
        <h4>Explore {state.title} Course</h4>
        <div className=" m-2" style={{ float: "right" }}>
          <Button variant="secondary" size="lg" active onClick={handleShow}>
            Add Assignments
          </Button>{" "}
        </div>
              {
                assignment.length>0?

        <div className="mt-5">
          <Table striped bordered hover variant="dark">
            <thead>
              <tr className="bg-light">
                <th>Sr.NO</th>
                <th>Question</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {assignment &&
                _DATA.currentData()?.map((value, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{value?.question}</td>
                    <td>{value?.duration}</td>
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
        </div> :
        <div>
            <div className="m-5">
                  <Container>
                    <img src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result_still_2x.gif?compress=1&resize=400x300"/>
                    <h4>Oops! NO RESULT FOUND.</h4>
                  </Container>
                </div>
        </div>
              }

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
              <Form.Group className="mb-3" controlId="formBasicpassword">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  name="duration"
                  defaultValue={data?.duration}
                  placeholder="Enter Duration"
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
  );
};

export default Courseassignments;
