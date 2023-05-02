import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IMAGES } from "../../config/string";
import { getCourse, getIntern, getTrainer } from "../../config/config";
import { Rating } from "@mui/material";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const mdTheme = createTheme();
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Admindashboard() {
  const [open, setOpen] = React.useState(true);
  const [flag, setFlag] = useState();
  const [refresh, setrefresh] = useState(true);
  const [course, setCourse] = useState([]);
  const [intern, setIntern] = useState({
    InternCount: 0,
  });
  const [state, setstate] = useState({
    Coursecount: 0,
  });
  const [tcount, setTCount] = useState({
    trainerCount: 0,
  });

  const navigate = useNavigate();
  useEffect(() => {
    getCourse()
      .then((res) => {
        let arr = res?.data.data;
        arr.sort(
          (a, b) => b.registeredStudents.length - a.registeredStudents.length
        );
        const slicedArray = arr.slice(0, 6);
        setCourse(slicedArray);
        setstate({ Coursecount: res?.data?.data?.length });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!localStorage.getItem("isAdmin")) {
    window.location.replace("/");
    localStorage.clear();
  }
  useEffect(() => {
    getTrainer()
      .then((res) => {
        setTCount({ trainerCount: res?.data.data.length });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getIntern()
      .then((res) => {
        setIntern({ InternCount: res?.data.data.length });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
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
              <Grid container spacing={3}>
                <Grid item xs={12} md={3} lg={4} style={{ background: "" }}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 150,
                    }}
                    style={{ background: "#0096FF", color: "white" }}
                  >
                    <h5>
                      <b>Number Of Courses Available</b>
                    </h5>
                    <br />
                    <h1>{state.Coursecount ? state.Coursecount : 0}</h1>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 150,
                    }}
                    style={{ background: "#0096FF", color: "white" }}
                  >
                    <h5>
                      <b>Number of Trainers</b>
                    </h5>
                    <br />
                    <h1>{tcount.trainerCount ? tcount.trainerCount : 0}</h1>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 150,
                    }}
                    style={{ background: "#0096FF", color: "white" }}
                  >
                    <h5>
                      <b>Number of Interns</b>
                    </h5>
                    <br />
                    <h1>{intern.InternCount ? intern.InternCount : 0}</h1>
                  </Paper>
                </Grid>
              </Grid>
              <div className="mt-5">
                <h1>Features</h1>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={3} lg={4} style={{ background: "" }}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 150,
                      }}
                      //  style={{background:'#0096FF',color:'white'}}
                    >
                      <NavLink to={"/coursedetails"}>
                        <div>
                          <h5>
                            <b>Course Details</b>
                          </h5>
                          <img
                            src={IMAGES.COURSELOGO}
                            width={"70px"}
                            height={"70px"}
                          />
                        </div>
                      </NavLink>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={3} lg={4} style={{ background: "" }}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 150,
                      }}
                      //  style={{background:'#0096FF',color:'white'}}
                    >
                      <NavLink to={"/trainerdetails"}>
                        <div>
                          <h5>
                            <b>Trainer Details</b>
                          </h5>
                          <img
                            src={IMAGES.TrainerLOGO}
                            width={"70px"}
                            height={"70px"}
                          />
                        </div>
                      </NavLink>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={3} lg={4} style={{ background: "" }}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 150,
                      }}
                      //  style={{background:'#0096FF',color:'white'}}
                    >
                      <NavLink to={"/internlist"}>
                        <h5>
                          <b>Intern Details</b>
                        </h5>
                        <img
                          src={IMAGES.COURSELOGO}
                          width={"70px"}
                          height={"70px"}
                        />
                      </NavLink>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
              <div className="mt-5">
                <h1>Top 5 Popular course</h1>
                {/* <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Sr.NO</StyledTableCell>
                        <StyledTableCell align="right">Title</StyledTableCell>
                        <StyledTableCell align="right">
                          Description
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          duration
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          className="d-flex justify-content-center"
                        >
                          Registered Students Count
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {course.map((row, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component="th" scope="row">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.title}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.description}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.duration}
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            className="d-flex justify-content-center"
                          >
                            {row.registeredStudents?.length}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer> */}
                <Container>
                  <div className="container ">
                    <div>
                      <div className="row d-flex justify-content-around">
                        {course?.map((ele) => (
                          <div className="col-lg-4" key={ele._id}>
                            <div
                              className="card m-2"
                              style={{
                                width: "280px",
                                border: "1px solid grey",
                                padding: "10px",
                                marginTop: "10px",
                              }}
                            >
                              <div>
                                {" "}
                                {/* <Link to="/specificproduct">
                                 
                                </Link> */}
                              </div>
                              <div className="card-body">
                                <div>
                                  <img
                                    src="https://1.bp.blogspot.com/-aHbVSX37w5A/YILgMdBr9CI/AAAAAAAAS_Y/Lwt78O3uNA0weVdSPiqoyFtG5PkMTVoeQCLcBGAsYHQ/s1181/How-to-Learn-Computer-Programming-Languages.png"
                                    width="100px"
                                    height="100px"
                                  />
                                </div>
                                <h3
                                  className="card-title "
                                  style={{ fontSize: "15px" }}
                                >
                                  Name: {ele.title}
                                </h3>
                                <p>{ele.description}</p>

                                <span
                                  style={{
                                    fontSize: "20px",
                                    color: "green",
                                    fontWeight: "600",
                                  }}
                                >
                                  Price : Rs.{ele.fees}
                                </span>
                                <br />
                                <center>
                                  <Rating
                                    name="simple-controlled"
                                    value={"5"}
                                    readOnly
                                    // precision={0.5}
                                  />
                                </center>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default function Dashboard() {
  return <Admindashboard />;
}
