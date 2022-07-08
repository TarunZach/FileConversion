import React from "react";
import "./css/pdf.css";
import { Button, Table } from "react-bootstrap";
// import Table from "react-bootstrap/Table";
import { useLocation } from "react-router-dom";
import jsPDF from 'jspdf';

import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
// import pptxgen from 'pptxgenjs'; 


const PDF = (props) => {
  const location = useLocation();
  const user = location.state;
  const name = user.employee_name;

  const data = {
    labels: ['HTML', 'CSS', 'JavaScript', 'React'],
    datasets: [
      {
        label: '# of Votes',
        data: [9, 5, 3, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)'
        ],
        borderWidth: 1,
      },
    ],
  };

  console.log("user", user);
  const generatePDF = () => {
    console.log('pdf button click');
    let doc = new jsPDF("l", "pt", "a3");
    doc.html(document.getElementById('displayPDF'), { callback: function (pdf) { pdf.save(name) } });
  }
  return (
    <>
      <div className="pdf">
        <div className="content-wrapper">
          <div className="Post" id='displayPDF'>
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
              <div className="first-row">
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
              </div>
              <div className="second-row">
                <div className="chart">
                  <PolarArea data={data} />
                </div>

                <div className="experience-table container training-table">
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
              </div>
              <p>Reviews : testets</p>
            </div>
          </div>
        </div>
        <div className="generatePdf">
          <button onClick={generatePDF} className="btn btn-primary" type="primary">Generate PDF</button>
        </div>
        <div id='displayPDF' />

      </div>
    </>
  );
};

export default PDF;
