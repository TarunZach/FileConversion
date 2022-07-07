import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import PptxGenJS from "pptxgenjs";
import Work from "../images/work.png";
import Certification from "../images/certification.png";
import Training from "../images/training.png";

//css
import "./css/excel.css";
import "./css/main.css";

// Importing User Image Statically for now.
import UserImage from "../images/user.png";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  // const [user,setUser] = useState([]);

  // Read Excel File to JSON on button Click
  const readExcel = () => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (file === null) {
        alert("please upload excel file");
      } else {
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const workbook = XLSX.read(bufferArray, { type: "buffer" });
          const worksheet = workbook.SheetNames[0];
          const wsdata = workbook.Sheets[worksheet];
          const data = XLSX.utils.sheet_to_json(wsdata);
          resolve(data);
        };

        fileReader.onerror = (err) => {
          reject(err);
        };
      }
    });
    promise.then((json_data) => {
      let filtered_json = [];

      // Filtered the array based on the Data needed
      json_data.forEach((json) => {
        // console.log(json['Name']);
        filtered_json.push({
          employee_id: json["Employee Number"],
          employee_email: json["Email"],
          employee_name: json["Name"],
          employee_number: json["Employee Number"],
          employee_experience: json["Total Work Experience in (years)"],
          employee_grade: json["Grade"],
          employee_primary_experience: json["Primary Skills"],
          employee_secondary_experience:
            json[
              "Secondary Skills and Ratings(Trained, beginner, Intermediate, Expert)"
            ],
          employee_certificates:
            json["Certificates/Badges /challenges earned​ through learnings"],
          employee_trainings: json[`Training’s​ Completed (External/Internal)`]
        });
      });

      setData(filtered_json);
    });
  };

  function showData(e) {
    let id = e.target.id;
    // console.log(data);
    let filtered = data.find((selected) => selected.employee_id === id);
    console.log(filtered);

    // Create A pptx
    // 1. Create a new Presentation
    let pres = new PptxGenJS();

    // 2. Add a Slide
    let slide = pres.addSlide();

    // Slide add Shape
    slide.addShape(pres.ShapeType.rect, {
      x: 0,
      y: 0,
      w: "100%",
      fill: { color: "0000DD" }
    });

    // Add USer Image(static for now)
    slide.addImage({
      x: "2%",
      y: "2%",
      w: "9%",
      h: "15%",
      path: UserImage,
      rounding: true
    });

    // 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
    let textboxName = `Name: ${filtered.employee_name}`;
    let textboxID = `ID: ${filtered.employee_id}`;
    let textboxGrade = `Grade: ${filtered.employee_grade}`;
    let textboxExperience = `Experience: ${filtered.employee_experience}`;
    // let textboxOpts = {y: 0.5, color: "ffffff",fontSize: 12};

    // Adding data to the Top Header
    slide.addText(textboxName, {
      x: "20%",
      y: 0.5,
      w: "20%",
      color: "ffffff",
      fontSize: 12
    });
    slide.addText(textboxID, {
      x: "40%",
      y: 0.5,
      w: "20%",
      color: "ffffff",
      fontSize: 12
    });
    slide.addText(textboxGrade, {
      x: "60%",
      y: 0.5,
      w: "20%",
      color: "ffffff",
      fontSize: 12
    });
    slide.addText(textboxExperience, {
      x: "80%",
      y: 0.5,
      w: "20%",
      color: "ffffff",
      fontSize: 12
    });

    // Add Image by Local URI:

    // Relevent Experience
    slide.addImage({ x: "2%", y: "23%", w: "3%", h: "5%", path: Work });
    slide.addText("Relevant Experience:", {
      x: "7%",
      y: "25%",
      w: "40%",
      color: "000000",
      fontSize: 14,
      underline: true
    });
    slide.addText(
      `${
        filtered.employee_primary_experience
          ? filtered.employee_primary_experience
          : "N/A"
      }`,
      { x: "7%", y: "30%", w: "40%", color: "000000", fontSize: 12 }
    );

    // Certifications
    slide.addImage({
      x: "50%",
      y: "23%",
      w: "3%",
      h: "5%",
      path: Certification
    });
    slide.addText("Certification and Badges:", {
      x: "55%",
      y: "25%",
      w: "40%",
      color: "000000",
      fontSize: 14,
      underline: true
    });
    slide.addText(
      `${
        filtered.employee_certificates ? filtered.employee_certificates : "N/A"
      }`,
      { x: "55%", y: "30%", w: "40%", color: "000000", fontSize: 12 }
    );

    // Trainings
    slide.addImage({ x: "50%", y: "53%", w: "3%", h: "5%", path: Training });
    slide.addText("Trainings:", {
      x: "55%",
      y: "55%",
      w: "40%",
      color: "000000",
      fontSize: 14,
      underline: true
    });
    slide.addText(
      `${filtered.employee_trainings ? filtered.employee_trainings : "N/A"}`,
      { x: "55%", y: "60%", w: "40%", color: "000000", fontSize: 12 }
    );

    // 4. Save the Presentation
    pres.writeFile({ fileName: `${filtered.employee_name}.pdf` });
  }
  return (
    <>
      <div className="page-wrapper">
        <div className="container">
          <div className="mt-3 mb-3">
            <input
              type="file"
              name="file"
              className="form-control"
              id="file"
              accept=".xlsx, .xls, .csv"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <div className="mb-3 mid-bar">
            <button
              className="btn btn-primary upload-btn"
              id="uploadFile"
              onClick={readExcel}
            >
              Submit
            </button>
            <div className="input-group rounded search-bar">
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <span className="input-group-text border-0" id="search-addon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </span>
            </div>
          </div>

          {/* Display Table */}
          <div id="displayData" className="displayData">
            <table
              id="dataTable"
              className="table table-bordered table-responsive thead-dark "
            >
              <thead className="thead-dark">
                <tr>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Employee Employee Email</th>
                  <th>Employee Experience</th>
                  <th>Employee Grade</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody id="tableBody">
                {data.map((list) => {
                  return (
                    <>
                      <tr key={list.employee_id}>
                        <td>{list.employee_id}</td>
                        <td>{list.employee_name}</td>
                        <td>{list.employee_email}</td>
                        <td>{list.employee_experience}</td>
                        <td>{list.employee_grade}</td>
                        <td>
                          <Link
                            to={"/preview/" + list.employee_id}
                            state={list}
                          >
                            <button className="btn btn-primary btn-sm">
                              PDF
                            </button>
                          </Link>
                          {/* <Link to="/profile">Profile</Link> */}
                          <button
                            id={list.employee_id}
                            className="btn btn-primary btn-sm"
                            onClick={showData}
                          >
                            PPT
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}

                {/* add Elements Dynamically */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
