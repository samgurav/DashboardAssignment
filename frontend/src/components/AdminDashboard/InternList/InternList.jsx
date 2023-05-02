import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Breadcrumb, Container, Table } from "react-bootstrap";
import { getIntern } from "../../../config/config";
import usePagination from "../../Pagination";
import { Pagination } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function InternList() {
  const [intern, setIntern] = React.useState([]);
  const navigate = useNavigate();
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const count = Math.ceil(intern?.length / PER_PAGE);
  const _DATA = usePagination(intern, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getIntern()
      .then((res) => {
        setIntern(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!localStorage.getItem("isAdmin")) {
    window.location.replace("/");
    localStorage.clear();
  }

  return (
    <Container className="mt-5">
      <div className="d-flex mt-5">
        <ArrowBackIcon onClick={() => navigate(-1)} />
        &nbsp;&nbsp;
        <Breadcrumb>
          <Breadcrumb.Item href="/admindashboard">
            {" "}
            Admin Dashboard
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <h1>Intern Details</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr className="bg-light">
            <th>Sr.No</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {intern &&
            _DATA.currentData().map((value, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{value.name}</td>
                <td>{value.username}</td>
                <td>{value.email}</td>
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
    </Container>
  );
}
