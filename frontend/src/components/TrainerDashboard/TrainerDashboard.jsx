import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Modal, Table } from "react-bootstrap";
import { GetAssignedCourse, getregisteredstudent } from "../../config/config";
import jwt_decode from "jwt-decode";
import { Pagination } from "@mui/material";
import usePagination from "../Pagination";
const mdTheme = createTheme();
const TrainerDashboard = () => {
  const [show, setShow] = useState(false);
  const [courseID, setCourseID] = useState("");
  const [student, setStudent] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const count = Math.ceil(course?.length / PER_PAGE);
  const _DATA = usePagination(course, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  useEffect(() => {
    let token = localStorage.getItem("_token");
    let decode = jwt_decode(token);
    GetAssignedCourse({ id: decode.id })
      .then((res) => {
        setCourse(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    getregisteredstudent({ id: courseID })
      .then((res) => {
        setStudent(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [show]);

  if (!localStorage.getItem("isTrainer")) {
    window.location.replace("/");
    localStorage.clear();
  }
  return (
    <div>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            {/* <Toolbar /> */}
            <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }}>
              <div className="mt-5">
                <h1>Assigned Courses</h1>
                {
                  course.length>0?
               <div>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr className="bg-light">
                      <th>Sr. No</th>
                      <th>Title</th>
                      <th>Fees</th>
                      <th>Durataion</th>
                      <th>Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course &&
                      _DATA.currentData()?.map((value, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{value.title}</td>
                          <td>{value.fees}</td>
                          <td>{value.duration}</td>
                          <td>
                            <Button
                              variant="primary"
                              className="m-1"
                              onClick={() => {
                                navigate("/assigncoursedetails", {
                                  state: value,
                                });
                              }}
                            >
                              View
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => {
                                handleShow();
                                setCourseID(value._id);
                              }}
                            >
                              View Registered Students
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
                /> </div>
                </div>
                :
                <>
                <div>
                  <Container>
                    <img src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result_still_2x.gif?compress=1&resize=400x300"/>
                    <h4>Oops! NO COURSE HAS BEEEN ASSIGNED TO YOU YET.</h4>
                  </Container>
                </div>
                </>
                }
              </div>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registered Students</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            student.length>0?

          <Table striped bordered hover variant="light">
            <thead>
              <tr className="bg-light">
                <th>Sr. No</th>
                <th>name</th>
                <th>username</th>
                <th>email</th>
              </tr>
            </thead>
            {student &&
              student?.map((value, index) => (
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{value.userID.name}</td>
                    <td>{value.userID.username}</td>
                    <td>{value.userID.email}</td>
                  </tr>
                </tbody>
              ))}
          </Table>:
          <>
            <div>
                  <Container>
                    <img src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result_still_2x.gif?compress=1&resize=400x300"/>
                  <center><h4>Oops! NO RESULT FOUND.</h4></center>  
                  </Container>
                </div>
          </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TrainerDashboard;
