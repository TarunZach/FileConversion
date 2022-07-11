import React from "react";
import "./css/pdf.css";
import userimg from '../images/user.png'
import work from '../images/work.png'
import certificate from '../images/certification.png'
import training from '../images/training.png'
// import Table from "react-bootstrap/Table";
import { useLocation, useNavigate } from "react-router-dom";
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
  let history = useNavigate()
  const location = useLocation();
  const user = location.state;

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
    doc.html(document.getElementById('displayPDF'), { callback: function (pdf) { pdf.save('candidate') } });
  }
  return (
    user != null ?
      <>
        <div className="pdf">
          <div className="content-wrapper">
            <div className="Post" id='displayPDF'>
              <header className="pdf-header">
                <div className="item-wrapper">
                  <div className="user-image">
                    <img
                      src={userimg}
                      alt="user"
                      className="profile-img"
                    />
                  </div>

                  <p className="header-text">
                    Name: {user.employee_name}
                  </p>
                  <p className="header-text">ID: {user.employee_id}</p>
                  <p className="header-text">Grade: {user.employee_grade}</p>
                  <p className="header-text">
                    Experience: {user.employee_experience}
                  </p>
                </div>
              </header>
              <div className="user-details">

                <div className="experience-table container experience">
                  <div className="box">
                    <img src={work} alt='experience' className="mini-img"/>
                    <div className="heading">
                      <p>Experience</p>
                    </div>
                    <div className="details">
                      <p className="detail-text">
                        {user.employee_primary_experience}
                        {user.employee_secondary_experience}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="experience-table container certification">
                  <div className="box">
                  <img src={certificate} alt='experience' className="mini-img"/>
                    <div className="heading">
                      <p >Certification and Achievements</p>
                    </div>
                    <div className="details">
                      <p className="detail-text">
                        {user.employee_certificates}</p>

                    </div>
                  </div>
                </div>

                <div className="chart experience-table">
                  <PolarArea data={data} />
                </div>

                <div className="experience-table container training-table">
                  <div className="box">
                  <img src={training} alt='experience' className="mini-img"/>
                    <div className="heading">
                      <p >Trainings and Assessments</p>
                    </div>
                    <div className="details">
                      <p className="detail-text">
                        {user.employee_trainings}</p>
                    </div>
                  </div>
                </div>


              </div>
              <div className="review-container">
                <p className="reviews">Reviews : testets</p>
              </div>
            </div>
          </div>
          <div className="generatePdf">
            <button onClick={generatePDF} className="btn btn-primary" type="primary">Generate PDF</button>
          </div>
          <div id='displayPDF' />

        </div>
      </>
      : <button onClick={() => { history('/') }} className="btn btn-primary" type="primary">Go Back</button>
  );
};

export default PDF;
