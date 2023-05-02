import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";

const InternDashboard = () => {
  if (!localStorage.getItem("isIntern")) {
    window.location.replace("/");
    localStorage.clear();
  }
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <div className="m-2">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://tallo.com/wp-content/uploads/internships-for-high-school-students.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <Button
                  variant="success"
                  onClick={() => navigate("/interndetails")}
                >
                  Get Started!
                </Button>

                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://openclass.co.in/wp-content/uploads/2021/11/High-school-internship-for-Teenagers.png"
                alt="Second slide"
              />

              <Carousel.Caption>
                <Button
                  variant="success"
                  onClick={() => navigate("/interndetails")}
                >
                  Get Started!
                </Button>

                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://trainingindustry.com/content/uploads/2019/05/psychology-social-learning-graphic_landing-page_ud.jpg"
                alt="Third slide"
              />

              <Carousel.Caption>
                <Button
                  variant="success"
                  onClick={() => navigate("/interndetails")}
                >
                  Get Started!
                </Button>

                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </Container>
    </div>
  );
};

export default InternDashboard;
