import React from "react";
import "./css/pdf.css";
import userimg from "../images/user.png";
import work from "../images/work.png";
import experience from "../images/experience.png";
import skills from "../images/skills.png";
import certificate from "../images/certifications.png";
import training from "../images/trainings.png";
import tatalogo from "../images/tata-elxsi-logo.png";

// Import By Abnit
import PptxGenJS from "pptxgenjs";
import user_image from "../images/user.png";
import te_logo from "../images/tata-elxsi-logo.png";
import experience_image from "../images/experience.png";
import skills_image from "../images/skills.png";
import trainings_image from "../images/trainings.png";
import certifications_image from "../images/certifications.png";
// Import By Abnit Ends

//
// import Table from "react-bootstrap/Table";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   ArcElement,
//   Tooltip,
//   Legend
// } from "chart.js";
// import { PolarArea } from "react-chartjs-2";

// ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
// import pptxgen from 'pptxgenjs';

const PDF = (props) => {
  let history = useNavigate();
  const location = useLocation();
  const user = location.state;

  // const data = {
  //   labels: ["HTML", "CSS", "JavaScript", "React"],
  //   datasets: [
  //     {
  //       label: "# of Votes",
  //       data: [9, 5, 3, 5],
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.5)",
  //         "rgba(54, 162, 235, 0.5)",
  //         "rgba(255, 206, 86, 0.5)",
  //         "rgba(75, 192, 192, 0.5)"
  //       ],
  //       borderWidth: 1
  //     }
  //   ]
  // };

  console.log("user", user);

  // Changes Made By Abnit
  const generatePPT = () => {
    const toInches = (cms) => cms / 2.54;

    // Create A pptx
    // 1. Create a new pptxentation
    let pptx = new PptxGenJS();

    // PPTX meta properties
    pptx.author = "MCV";
    pptx.company = "Tata Elxsi";
    pptx.subject = "Employee Profile";
    pptx.title = "Employee Profile";

    //  PPTX Layout
    pptx.layout = "LAYOUT_16x9";

    // PPTX Custom Layout
    pptx.defineLayout({
      name: "Tata Elxsi Default Layout",
      width: 10,
      height: 5.265
    });
    pptx.layout = "Tata Elxsi Default Layout";

    // 2. Add a Slide
    let slide = pptx.addSlide();

    // Watermark Logo(WorkAround)
    slide.addImage({
      path: te_logo,
      x: toInches(4.82),
      y: toInches(3),
      w: toInches(16.05),
      h: toInches(8.81),
      transparency: 90
    });

    // Header Section of the Slide
    // Add Shape and the text
    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.9,
      fill: { color: "2a6283" }
    });
    slide.addImage({
      path: user_image,
      x: toInches(0.3),
      y: toInches(0.2),
      w: toInches(1.9),
      h: toInches(1.9)
    });
    slide.addText(`Name: ${user.employee_name}`, {
      x: 1,
      y: 0.3,
      w: "24%",
      h: toInches(1),
      align: "center",
      fontSize: 12,
      color: "ffffff",
      isTextBox: true,
      autoFit: true,
      valign: "top"
    });
    slide.addText(`Emp Id: ${user.employee_id}`, {
      x: 3.5,
      y: 0.3,
      w: "20%",
      h: toInches(1),
      align: "center",
      fontSize: 12,
      color: "ffffff",
      valign: "top"
    });
    slide.addText(`Grade: ${user.employee_grade}`, {
      x: 6,
      y: 0.3,
      w: "20%",
      h: toInches(1),
      align: "center",
      fontSize: 12,
      color: "ffffff",
      valign: "top"
    });
    slide.addText(`Experience: ${user.employee_experience}`, {
      x: 8,
      y: 0.3,
      w: "20%",
      h: toInches(1),
      align: "center",
      fontSize: 12,
      color: "ffffff",
      valign: "top"
    });

    //Relevant Experience Section
    slide.addShape(pptx.shapes.OVAL, {
      x: toInches(3.54),
      y: toInches(2.7),
      w: toInches(1.5),
      h: toInches(1.5),
      fill: { type: "solid", color: "06a392" },
      valign: "top"
    });
    slide.addImage({
      path: experience_image,
      x: toInches(3.84),
      y: toInches(3.0),
      w: toInches(0.96),
      h: toInches(0.96)
    });
    slide.addText("Experience", {
      x: toInches(1.8),
      y: toInches(4.4),
      w: toInches(5),
      h: toInches(0.6),
      color: "235169",
      bold: true,
      fontSize: 14,
      fontFace: "Source Sans Pro Black",
      align: "center"
    });
    slide.addText(`${user.employee_relevant_experience}`, {
      x: toInches(0.5),
      y: toInches(5.3),
      w: toInches(7.5),
      h: toInches(6.8),
      color: "444444",
      fontSize: 10,
      fontFace: "Calibri",
      valign: "top"
    });

    //Skills Section

    // Skills Logic
    let skills = user.employee_primary_experience.concat(
      user.employee_secondary_experience
    );

    let all_skills = [];
    if (skills) {
      skills = skills.split(";");
      console.log(`Skills: `, skills);
      skills.forEach((skill, index) => {
        all_skills.push({
          text: `${index + 1}. ${skill}`,
          options: { fontSize: 10, breakLine: true }
        });
      });
    } else {
      all_skills = "N/A";
    }
    console.log(`All Skills: `, all_skills);

    slide.addShape(pptx.shapes.OVAL, {
      x: toInches(10.6),
      y: toInches(2.7),
      w: toInches(1.5),
      h: toInches(1.5),
      fill: { type: "solid", color: "ff9800" },
      valign: "top"
    });
    slide.addImage({
      path: skills_image,
      x: toInches(10.9),
      y: toInches(3),
      w: toInches(0.96),
      h: toInches(0.96)
    });
    slide.addText("Skills", {
      x: toInches(9.9),
      y: toInches(4.4),
      w: toInches(3),
      h: toInches(0.6),
      color: "235169",
      bold: true,
      fontSize: 14,
      fontFace: "Source Sans Pro Black",
      align: "center"
    });
    slide.addText(all_skills, {
      x: toInches(8.7),
      y: toInches(5.3),
      w: toInches(5.3),
      h: toInches(6.8),
      color: "444444",
      fontSize: 10,
      fontFace: "Calibri",
      valign: "top"
    });

    // Logic for Training Section

    let all_trainings = [];
    if (user.employee_trainings) {
      let trainings = user.employee_trainings.split(",");

      trainings.forEach((training, index) => {
        all_trainings.push({
          text: `${index + 1}. ${training}`,
          options: { fontSize: 10, breakLine: true }
        });
      });
    } else {
      all_trainings = "N/A";
    }
    //Training Sectio n
    slide.addShape(pptx.shapes.OVAL, {
      x: toInches(16.04),
      y: toInches(2.7),
      w: toInches(1.5),
      h: toInches(1.5),
      fill: { type: "solid", color: "e6e905" },
      valign: "top"
    });
    slide.addImage({
      path: trainings_image,
      x: toInches(16.34),
      y: toInches(3),
      w: toInches(0.96),
      h: toInches(0.96)
    });
    slide.addText("Training", {
      x: toInches(14.78),
      y: toInches(4.4),
      w: toInches(4),
      h: toInches(0.6),
      color: "235169",
      bold: true,
      align: "center",
      fontSize: 14,
      fontFace: "Source Sans Pro Black"
    });
    slide.addText(all_trainings, {
      x: toInches(14.2),
      y: toInches(5.3),
      w: toInches(5.3),
      h: toInches(6),
      color: "444444",
      fontSize: 10,
      fontFace: "Calibri",
      lineSpacingMultiple: 1,
      valign: "top"
    });

    //Certification Section
    slide.addShape(pptx.shapes.OVAL, {
      x: toInches(21.84),
      y: toInches(2.7),
      w: toInches(1.5),
      h: toInches(1.5),
      fill: { type: "solid", color: "06a392" },
      valign: "top"
    });
    slide.addImage({
      path: certifications_image,
      x: toInches(22.14),
      y: toInches(3),
      w: toInches(0.96),
      h: toInches(0.96)
    });
    slide.addText("Certifications", {
      x: toInches(20.6),
      y: toInches(4.4),
      w: toInches(4),
      h: toInches(0.6),
      color: "235169",
      bold: true,
      fontSize: 14,
      fontFace: "Source Sans Pro Black",
      align: "center"
    });
    slide.addText(
      `${user.employee_certificates ? user.employee_certificates : "N/A"}`,
      {
        x: toInches(19.9),
        y: toInches(5.3),
        w: toInches(5.3),
        h: toInches(6),
        color: "444444",
        fontSize: 10,
        fontFace: "Calibri",
        valign: "top"
      }
    );

    // Review Section
    slide.addText(
      [
        {
          text: "Reviews: ",
          options: { fontSize: 12, color: "235169", bold: true }
        },
        {
          text:
            "This is a demo review Section to check how the review is working with the presentation",
          options: { fontSize: 10, color: "444444" }
        }
      ],
      {
        x: toInches(0.41),
        y: toInches(12.3),
        w: toInches(24.59),
        h: toInches(0.8),
        fill: { color: "f9f9f9" },
        line: { color: "234567", width: "1" }
      }
    );

    // Line Differentiator
    // Line 1
    slide.addShape(pptx.shapes.LINE, {
      x: "33%",
      y: 1.5,
      w: 0.1,
      h: "60%",
      rotate: "1.81",
      line: { color: "aaaaaa", width: 1, dashType: "solid" }
    });
    slide.addShape(pptx.shapes.LINE, {
      x: "55%",
      y: 1.5,
      w: 0.1,
      h: "60%",
      rotate: "1.80",
      line: { color: "aaaaaa", width: 1, dashType: "solid" }
    });
    slide.addShape(pptx.shapes.LINE, {
      x: "77%",
      y: 1.5,
      w: 0.1,
      h: "60%",
      rotate: "1.80",
      line: { color: "aaaaaa", width: 1, dashType: "solid" }
    });

    // 4. Save the pptxentation
    pptx.writeFile({ fileName: `${user.employee_name}` });
  };

  const generatePDF = () => {
    console.log("pdf button click");
    let doc = new jsPDF("l", "pt", "a3");
    doc.html(document.getElementById("displayPDF"), {
      callback: function (pdf) {
        pdf.save("candidate");
      }
    });
  };
  return user != null ? (
    <>
      <div className="pdf">
        <div className="content-wrapper">
          <div className="Post" id="displayPDF">
            <header className="pdf-header">
              <div className="item-wrapper">
                <div className="user-image">
                  <img src={userimg} alt="user" className="profile-img" />
                </div>

                <p className="header-text">Name: {user.employee_name}</p>
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
                  <img src={experience} alt="experience" className="mini-img" />
                  <div className="heading">
                    <p className="skill-title">Experience</p>
                  </div>
                  <div className="details">
                    <p className="detail-text">
                      {user.employee_primary_experience}
                      {user.employee_secondary_experience}
                    </p>
                  </div>
                </div>
              </div>

              <div className="experience-table container skills">
                <div className="box">
                  <img
                    src={skills}
                    alt="experience"
                    className="mini-img skillimg"
                  />
                  <div className="heading">
                    <p className="skill-title">Skills</p>
                  </div>
                  <div className="details">
                    <p className="detail-text">
                      HTML/CSS: {user.employee_htmlcss}
                    </p>
                    <p className="detail-text">
                      JavaScript: {user.employee_js}
                    </p>
                    <p className="detail-text">
                      Angular: {user.employee_angular}
                    </p>
                    <p className="detail-text">React: {user.employee_react}</p>
                    <p className="detail-text">
                      React Native: {user.employee_reactnative}
                    </p>
                  </div>
                </div>
              </div>

              <div className="experience-table container training-table">
                <div className="box">
                  <img
                    src={training}
                    alt="experience"
                    className="mini-img  trainingimg"
                  />
                  <div className="heading">
                    <p className="skill-title">Trainings and Assessments</p>
                  </div>
                  <div className="details">
                    <p className="detail-text">{user.employee_trainings}</p>
                  </div>
                </div>
              </div>

              <div className="experience-table container certification">
                <div className="box">
                  <img
                    src={certificate}
                    alt="experience"
                    className="mini-img"
                  />
                  <div className="heading">
                    <p className="skill-title">
                      Certification and Achievements
                    </p>
                  </div>
                  <div className="details">
                    <p className="detail-text">{user.employee_certificates}</p>
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
          <button
            onClick={generatePDF}
            className="btn btn-primary"
            type="primary"
          >
            Generate PDF
          </button>
          {/* Changes Made By Abnit */}
          <button
            onClick={generatePPT}
            className="btn btn-primary"
            type="primary"
          >
            Generate PPT
          </button>
          {/* Changes Made by Abnit Ends */}
        </div>
        <div id="displayPDF" />
      </div>
    </>
  ) : (
    <button
      onClick={() => {
        history("/");
      }}
      className="btn btn-primary"
      type="primary"
    >
      Go Back
    </button>
  );
};

export default PDF;
