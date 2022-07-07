import React from "react";
import Pdf from "react-to-pdf";
import "./css/pdf.css";
import { Button, Table } from "react-bootstrap";
// import Table from "react-bootstrap/Table";
import { useLocation } from "react-router-dom";

const ref = React.createRef();

const PDF = (props) => {
  const location = useLocation();
  const user = location.state;

  console.log("user", user);
  return (
    <>
      <div className="pdf">
        <div className="content-wrapper">
          <div className="Post" ref={ref}>
            <header className="pdf-header">
              <div className="item-wrapper">
                <div className="user-image">
                  <img
                    src="http://demo.solwininfotech.com/wordpress/justica/wp-content/uploads/2016/07/Attorneys-5.png"
                    alt="user"
                    className="profile-img"
                  />
                </div>

                <p className="header-text">
                  Employee Name: {user.employee_name}
                </p>
                <p className="header-text">Employee ID: {user.employee_id}</p>
                <p className="header-text">Grade: {user.employee_grade}</p>
                <p className="header-text">
                  Experience: {user.employee_experience}
                </p>
              </div>
            </header>
            <div className="user-details">
              <div className="experience-table container">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Experience</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={3}>
                        {user.employee_primary_experience};
                        {user.employee_secondary_experience}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className="experience-table container">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th colSpan={3}>Certification and Achievements</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={3}>{user.employee_certificates}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className="experience-table container">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th colSpan={3}>Trainings and Assessments</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={3}>{user.employee_trainings}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <p>Reviews : testets</p>
            </div>
          </div>
        </div>
        <Pdf targetRef={ref} filename="post.pdf">
          {({ toPdf }) => (
            <Button className="pdf-download" onClick={toPdf}>
              Download PDF
            </Button>
          )}
        </Pdf>
      </div>
    </>
  );
};

export default PDF;
