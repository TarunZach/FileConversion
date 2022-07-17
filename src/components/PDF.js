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
// import star_image from '../images/star.png';
import one_star_image from "../images/one_star.jpeg";
import two_star_image from "../images/two_star.jpeg";
import three_star_image from "../images/three_star.jpeg";
import four_star_image from "../images/four_star.jpeg";
// import five_star_image from '../images/five_star.jpeg';

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
  const toInches = (cms) => cms / 2.54;

  const generatePPT = () => {
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

    // Logic for relevant Experience Section:

    let experience_merged_text = [];
    let experience_data = [];
    let employee_relevant_experience = user.employee_relevant_experience;

    let project_head = employee_relevant_experience.match(/Project Name/g); //Splitted Header
    let project_info = employee_relevant_experience.split(/Project Name/g); //Splitted Content
    project_info.shift();
    let project_data = [];
    project_info.forEach((project) => {
      project_data.push(
        project.replace(/Role/g, "\nRole").replace(/Languages/g, "\nLanguages")
      );
    });
    if (project_head && project_data) {
      if (project_head.length === project_data.length) {
        for (let i = 0; i < project_head.length && project_data.length; i++) {
          experience_merged_text.push([project_head[i], project_data[i]]);
        }

        experience_merged_text.forEach((experience, index) => {
          experience_data.push(
            {
              text: `${index + 1}. ${experience[0]}`,
              options: { fontSize: 9, bold: true }
            },
            {
              text: experience[1],
              options: { fontSize: 9, lineSpacingMultiple: 1, breakLine: true }
            }
          );
        });
      }
    } else {
      experience_data = employee_relevant_experience;
    }
    console.log(experience_data);
    console.log("Experienced Data: ", experience_data);
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
    slide.addText(experience_data, {
      x: toInches(0.5),
      y: toInches(5.3),
      w: toInches(7.5),
      h: toInches(6.8),
      color: "444444",
      fontSize: 9,
      fontFace: "Calibri",
      lineSpacingMultiple: 1.2,
      valign: "top"
    });

    //Skills Section

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

    let initial_skill_x = 8.69;
    let initial_skill_y = 5.3;
    let initial_star_x = 9;
    let initial_star_y = 5.96;
    let skill_type_x = 11.4;
    let skill_type_y = 5.4;

    let skill_level = {
      Beginner: { path: one_star_image, w: toInches(0.45), h: toInches(0.4) },
      Trained: { path: two_star_image, w: toInches(0.9), h: toInches(0.4) },
      Intermediate: {
        path: three_star_image,
        w: toInches(1.3),
        h: toInches(0.4)
      },
      Expert: { path: four_star_image, w: toInches(1.7), h: toInches(0.4) }
    };

    let skills;
    if (user.employee_skills) {
      skills = user.employee_skills;
      console.log(skills);

      skills.forEach((skill) => {
        slide.addText(skill.skill_name, {
          x: toInches(initial_skill_x),
          y: toInches(initial_skill_y),
          w: toInches(2.82),
          h: toInches(0.6),
          fontSize: 9,
          bold: true
        });
        slide.addText(skill.skill_type, {
          x: toInches(skill_type_x),
          y: toInches(skill_type_y),
          w: toInches(1.82),
          h: toInches(0.5),
          fontSize: 8,
          align: "center",
          color: "ffffff",
          valign: "center",
          bold: true,
          fill: {
            color: `${skill.skill_type === "primary" ? "ff9800" : "0080ff"}`
          },
          rectRadius: 3
        });
        slide.addImage({
          ...skill_level[skill.skill_prof],
          x: toInches(initial_star_x),
          y: toInches(initial_star_y)
        });
        initial_skill_y += 1.2;
        initial_star_y += 1.2;
        skill_type_y += 1.2;
      });
    } else {
      skills = [
        user.employee_primary_experience,
        user.employee_secondary_experience
      ];
      console.log(skills);
    }
    // Logic for Training Section

    let all_trainings = [];
    if (user.employee_trainings) {
      let trainings = user.employee_trainings.split(",");
      if (trainings) {
        trainings.forEach((training, index) => {
          all_trainings.push({
            text: `${training}`,
            options: {
              fontSize: 9,
              breakLine: true,
              bullet: { indent: 15, type: "number", style: "arabicPeriod" }
            }
          });
        });
      } else {
        all_trainings = "";
      }
    } else {
      all_trainings = "";
    }
    //Training Section
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
      x: toInches(15.6),
      y: toInches(4.4),
      w: toInches(5),
      h: toInches(0.6),
      color: "235169",
      bold: true,
      fontSize: 14,
      fontFace: "Source Sans Pro Black"
    });
    slide.addText(all_trainings, {
      bullet: true,
      x: toInches(14.2),
      y: toInches(5.3),
      w: toInches(5.3),
      h: toInches(6),
      color: "444444",
      fontSize: 9,
      fontFace: "Calibri",
      lineSpacingMultiple: 1.2,
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
    slide.addText(`${user.employee_certificates}`, {
      x: toInches(19.9),
      y: toInches(5.3),
      w: toInches(5.3),
      h: toInches(6),
      color: "444444",
      fontSize: 9,
      fontFace: "Calibri",
      valign: "top"
    });

    // Review Section
    slide.addText(
      [
        {
          text: "Reviews: ",
          options: { fontSize: 12, color: "235169", bold: true }
        },
        {
          text: user.employee_reviews,
          options: { fontSize: 9, color: "444444" }
        }
      ],
      {
        x: toInches(0.41),
        y: toInches(12.1),
        w: toInches(24.59),
        h: toInches(1.07),
        fill: { color: "f9f9f9" },
        line: { color: "234567", width: "1", valign: "top" }
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
    let doc = new jsPDF("l", "px", [1200, 700]);
    doc.html(document.getElementById("displayPDF"), {
      callback: function (pdf) {
        var PageCount = doc.internal.getNumberOfPages();
        pdf.deletePage(PageCount);
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
                      {user.employee_secondary_experience},
                      {user.employee_relevant_experience}
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
                      <b>HTML &nbsp; CSS </b> : {user.employee_htmlcss}
                    </p>
                    <p className="detail-text">
                      <b>JavaScript</b>: {user.employee_js}
                    </p>
                    <p className="detail-text">
                      <b>Angular</b>: {user.employee_angular}
                    </p>
                    <p className="detail-text">
                      <b>React</b>: {user.employee_react}
                    </p>
                    <p className="detail-text">
                      <b>React Native</b>: {user.employee_reactnative}
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
                    <p className="skill-title">Trainings</p>
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
                    <p className="skill-title">Certification</p>
                  </div>
                  <div className="details">
                    <p className="detail-text">{user.employee_certificates}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="review-container">
              <p className="reviews">Reviews : test</p>
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
    <>
      <div className="go-backwrapper">
        <p className="go-backtext">File Not Found!</p>
        <button
          onClick={() => {
            history("/");
          }}
          className="btn btn-primary g0-backbtn"
          type="primary"
        >
          Go Back
        </button>
      </div>
    </>
  );
};

export default PDF;
