import React, { useEffect, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Accordion,
  Container,
  Form,
  FormControl,
  Button,
  Breadcrumb,
} from "react-bootstrap";
import Swal from "sweetalert2";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Pagination, Paper, Rating } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUserForCourse, getCourse } from "../../../config/config";
import axios from "axios";
import jwtDecode from "jwt-decode";
import usePagination from "../../Pagination";

const InternDetails = () => {
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState(false);
  let token = localStorage.getItem("_token");
  let decode = jwtDecode(token);
  let [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const count = Math.ceil(data?.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const searchCourse = () => {
    let arr = [];
    getCourse().then((res) => {
      arr = res.data.data;
      let selectedCourse = arr.filter((value) => {
        if (searchInput.current.value === "") {
          return value;
        } else if (
          value.title
            .toLowerCase()
            .includes(searchInput.current.value.toLowerCase())
        ) {
          return value;
        }
      });
      setData(selectedCourse);
    });
  };

  useEffect(() => {
    getCourse()
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [temp]);

  if (!localStorage.getItem("isIntern")) {
    window.location.replace("/");
    localStorage.clear();
  }
  const initPayment = (data) => {
    const options = {
      key: "rzp_test_EyIpfnVqNtaMpz",
      amount: data.amount,
      currency: data.currency,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:3001/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          // alert("payment done");
          Swal.fire({
            icon: "success",
            text: "Payment Done",
            timer: 2000,
          });
          setTemp((prev) => !prev);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
        padding: "10px",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const RegisterForCourse = (values, userID) => {
    const data = values?.registeredStudents;
    if (data.some((obj) => obj.userID === userID)) {
      Swal.fire({
        icon: "warning",
        text: "You have already Registered For this course",
        timer: 2000,
      });
    } else {
      RegisterUserForCourse({ values: values, id: userID })
        .then((res) => {
          initPayment(res.data.data);
          // setData(res.data.data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <div>
      <Container>
        <div className="d-flex mt-5">
          <ArrowBackIcon onClick={() => navigate(-1)} />
          &nbsp;&nbsp;
          <Breadcrumb>
            <Breadcrumb.Item href="/interndashboard"> Back</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div>
          <div className="row" style={{ marginLeft: "2%" }}>
            <div className="col-lg-12" style={{ marginTop: "30px" }}>
              <h1>Explore & Study</h1>

              <div>
                <div className="row mb-2" style={{ width: "100%" }}></div>
                <Form
                  style={{
                    marginTop: "20px",
                    marginLeft: "600px",
                    width: "320px",
                    boxShadow: "initial",
                  }}
                >
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    ref={searchInput}
                    onChange={searchCourse}
                  />
                </Form>

                <Container>
                  <div className="container ">
                    <div>
                      <div className="row d-flex justify-content-around">
                        {_DATA.currentData().map((ele) => (
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
                                <div
                                  onClick={() => {
                                    navigate("/coursedetail", { state: ele });
                                  }}
                                >
                                  <img
                                    src="https://th-i.thgim.com/public/education/6o6kn/article32659830.ece/alternates/LANDSCAPE_1200/21EPBSCODING"
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
                                <Button
                                  variant="danger"
                                  onClick={() => {
                                    RegisterForCourse(ele, decode.id);
                                  }}
                                >
                                  Buy Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

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
                </Container>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default InternDetails;
