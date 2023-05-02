import React, { useState } from "react";
import {
  Container,
  Button,
  Table,
  Modal,
  Form,
  Breadcrumb,
} from "react-bootstrap";
import CourseLesson from "./CourseLesson";
import { Grid, Paper } from "@mui/material";
import Courseassignments from "./Courseassignments";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const AssignedCourseDetails = () => {
  const navigate = useNavigate();
  const [lesson, SetLession] = useState(false);
  if (!localStorage.getItem("isTrainer")) {
    window.location.replace("/");
    localStorage.clear();
  }
  return (
    <>
      <Container>
        <div className="d-flex mt-5">
          <ArrowBackIcon onClick={() => navigate(-1)} />
          &nbsp;&nbsp;
          <Breadcrumb>
            <Breadcrumb.Item href="/trainerdashboard">
              {" "}
              Dashboard
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Button
          className="m-3"
          onClick={() => {
            SetLession(false);
          }}
          variant="success"
          size="lg"
        >
          Course Lesson
        </Button>
        <Button
          className="m-3"
          variant="primary"
          size="lg"
          onClick={() => {
            SetLession(true);
          }}
        >
          Course Assignment
        </Button>
        <div>{lesson ? <Courseassignments /> : <CourseLesson />}</div>
      </Container>
    </>
  );
};

export default AssignedCourseDetails;
