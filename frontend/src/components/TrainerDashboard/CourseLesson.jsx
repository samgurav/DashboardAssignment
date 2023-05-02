import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Table,
  Modal,
  Form,
  Breadcrumb,
} from "react-bootstrap";
import { AddLesson, getLesson } from "../../config/config";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import usePagination from "../Pagination";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CourseLesson = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [lesson, setLesson] = useState([]);
  const [flag, setFlag] = useState(false);
  const [temp, setTemp] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { state } = useLocation();
  let [page, setPage] = useState(1);
  const navigate = useNavigate();
  const PER_PAGE = 6;

  const count = Math.ceil(lesson?.length / PER_PAGE);
  const _DATA = usePagination(lesson, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  const Submit = (e) => {
    e.preventDefault();
    AddLesson({ data: data, value: state })
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
    getLesson({ id: state?._id })
      .then((res) => {
        setLesson(res.data.data);
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
    
      <h4 className="mt-2">Explore {state.title} Course</h4>
      <Container>
        <div className=" m-2" style={{ float: "right" }}>
          <Button variant="secondary" size="lg" active onClick={handleShow}>
            Add Lesson
          </Button>{" "}
        </div>

        <div className="mt-5">
          {
            lesson.length>0?
           <div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr className="bg-light">
                <th>Sr.No</th>
                <th>Title</th>
                <th>Description</th>
                <th>view query raise by intern</th>
              </tr>
            </thead>
            <tbody>
              {lesson &&
                _DATA.currentData()?.map((value, index) => (
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
                        View
                      </Button>
                    </td>
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
         </div>
          :
          <>
            <div className="m-5">
                  <Container>
                    <img src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result_still_2x.gif?compress=1&resize=400x300"/>
                    <h4>Oops! NO RESULT FOUND.</h4>
                  </Container>
                </div>
          </>
          }
         
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

export default CourseLesson;
