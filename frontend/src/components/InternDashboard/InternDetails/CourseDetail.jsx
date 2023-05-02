import { Paper, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import jwt_decode from "jwt-decode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
const url = "http://localhost:3000/coursedetail";
const CourseDetail = () => {
  const [registerflag, setRegisteredFlag] = useState(false);
  const state = useLocation();
  const navigate = useNavigate();
  if (!localStorage.getItem("isIntern")) {
    window.location.replace("/");
    localStorage.clear();
  }

  useEffect(() => {
    let token = localStorage.getItem("_token");
    let decode = jwt_decode(token);
    let arr = state?.state?.registeredStudents;
    if (arr?.some((obj) => obj.userID === decode.id)) {
      setRegisteredFlag(true);
    } else {
      setRegisteredFlag(false);
    }
  }, []);


  if (!localStorage.getItem("isIntern")) {
    window.location.replace("/");
    localStorage.clear();
  }
  return (
    <div>
      <Container className="mt-5">
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
        <Paper elevation={12}>
          <div className="container" style={{ padding: "20px" }}>
            <div className="row">
              <div className="col-6 text-left card" style={{ height: "400px" }}>
                <div className="d-flex justify-content-around pt-2 pb-2">
                  <div>
                    <img
                      alt="sofa"
                      src="https://th-i.thgim.com/public/education/6o6kn/article32659830.ece/alternates/LANDSCAPE_1200/21EPBSCODING"
                      style={{
                        width: "auto",
                        height: "300px",
                        marginTop: "30px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 card" style={{ paddingTop: "20px" }}>
                <h3 style={{ fontStyle: "italic" }}> {state?.state?.title}</h3>

                <hr />

                <h6 style={{ color: "green", fontSize: "25px" }}>
                  Price :-Rs.{state?.state?.fees}{" "}
                </h6>

                <h5 className="mt-3">
                  Share&nbsp;{" "}
                  <ShareIcon
                    style={{
                      fontSize: "32px",
                      color: "black",
                      borderRadius: "50%",
                      margin: "5px",
                    }}
                  />
                </h5>
                <center>
                  <Rating
                    name="simple-controlled"
                    value={"5"}
                    readOnly
                    // precision={0.5}
                  />
                </center>
                <h6 style={{ color: "red", fontSize: "15px" }}>
                  Know More About Course{" "}
                </h6>
                <p>{state?.state?.description}</p>
                <h4>Duration:{state?.state?.duration}</h4>

                <div>
                  <FacebookMessengerShareButton
                    url={url}
                    appId="598247578289958"
                    quote={
                      "Welcome to Campus to co-operate, Please find the below link to get exciting offer upto 50% and check this course" +
                      state?.state?.title +
                      "at Rs. " +
                      state?.state?.fees
                    }
                  >
                    <FacebookIcon size={32} round={true} />
                  </FacebookMessengerShareButton>{" "}
                  &nbsp;
                  <EmailShareButton
                    url={url}
                    subject={"Course Offeres"}
                    body={
                      "Welcome to Campus to co-operate, Please find the below link to get exciting offer upto 50% and check this course" +
                      state?.state?.title +
                      "at Rs. " +
                      state?.state?.fees
                    }
                  >
                    <EmailIcon size={32} round={true} />
                    &nbsp;
                  </EmailShareButton>
                  <WhatsappShareButton
                    url={url}
                    title={
                      "Welcome to Campus to co-operate, Please find the below link to get exciting offer upto 50% and check this course" +
                      state?.state?.title +
                      "at Rs. " +
                      state?.state?.fees
                    }
                    hashtag="#react"
                  >
                    <WhatsappIcon size={32} round={true} />
                  </WhatsappShareButton>
                  &nbsp;
                  <TwitterShareButton
                    url={url}
                    title={
                      "Welcome to Campus to co-operate, Please find the below link to get exciting offer upto 50% and check this course" +
                      state?.state?.title +
                      "at Rs. " +
                      state?.state?.fees
                    }
                  >
                    <TwitterIcon size={32} round={true} />
                    &nbsp;
                  </TwitterShareButton>
                  <div className="d-flex justify-content-left m-2">
                    {registerflag ? (
                      <Button
                        variant="success"
                        onClick={() => {
                          navigate("/querysection", { state: state?.state });
                        }}
                      >
                        Explore More
                      </Button>
                    ) : (
                      <>
                        <Button variant="success" disabled>
                          Explore More
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default CourseDetail;
