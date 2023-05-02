import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Container,
  Form,
  Modal,
  Breadcrumb,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import usePagination from "../../Pagination";
import {
  AddAnswer,
  GetUser,
  getLesson,
  getsinglelesson,
} from "../../../config/config";
import jwtDecode from "jwt-decode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Swal from "sweetalert2";
const QueryPage = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const state = useLocation();
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState([]);
  const [val, setValue] = useState();
  const [index, setIndex] = useState();
  const [doubtID, setDoubtID] = useState();
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;

  const count = Math.ceil(data?.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getsinglelesson({ id: state?.state?._id })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag]);
  const handler = (event) => {
    const { name, value } = event.target;
    setValue({ ...val, [name]: value });
  };
  

  const Submit = () => {
    let token = localStorage.getItem("_token");
    let decode = jwtDecode(token);
    AddAnswer({
      index: state?.state?._id,
      answer: val,
      doubtID: data[doubtID].ID,
      data: data[doubtID],
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: res.data.message,
          timer: 2000,
        });
        setData(res.data.data);
        setFlag(true);
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!localStorage.getItem("_token")) {
    window.location.replace("/");
    localStorage.clear();
  }
  return (
    <div>
      <Container className="mt-5">
        <div className="d-flex mt-5">
          <ArrowBackIcon onClick={() => navigate(-1)} />
          &nbsp;&nbsp; Back
          <Breadcrumb></Breadcrumb>
        </div>
        {data?.length > 0 ? (
          <div className="card mt-5">
            <h1>Look Into Query</h1>
            <div className="mt-5"></div>
            <h1>Review Queries Raised By You</h1>
            {data &&
              _DATA.currentData().map((val, index) => (
                <Accordion defaultActiveKey="0" className="m-5">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{val?.question}</Accordion.Header>
                    <Accordion.Body>
                      {val?.answer
                        ? val.answer
                        : "NO ANSWER HAS BEEN POSTED YET"}
                      <div>
                        {!localStorage.getItem("isTrainer") || val?.answer ? (
                          <></>
                        ) : (
                          <>
                            <Button
                              variant="success"
                              onClick={() => {
                                handleShow();
                                setIndex(val?._id);
                                setDoubtID(index);
                              }}
                            >
                              {" "}
                              Give Answer
                            </Button>
                          </>
                        )}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}

            <div className="d-flex justify-content-center m-3">
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
        ) : (
          <>
            <Container>
              <img src="https://cdn.dribbble.com/userupload/2905353/file/original-2022966da1fc3718d3feddfdc471ae47.png?resize=400x0" />
              <h4>NO QUERY HAS BEEN POSTED YET </h4>
              <h1>THANK YOU</h1>
            </Container>
          </>
        )}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Submit Answer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Answer</Form.Label>
                <Form.Control
                  type="text"
                  name="answer"
                  placeholder="Enter question"
                  onChange={handler}
                  required
                />
              </Form.Group>

              <Button variant="success" className="m-2" onClick={Submit}>
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

export default QueryPage;
