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
          employee_relevant_experience:
            json["Relevant experience in primary skills"],
          employee_primary_experience: json["Primary Skills"],
          employee_secondary_experience:
            json[
              "Secondary Skills and Ratings(Trained, beginner, Intermediate, Expert)"
            ],
          employee_certificates:
            json["Certificates/Badges /challenges earned​ through learnings"],
          employee_trainings: json[`Training’s​ Completed (External/Internal)`],
          employee_htmlcss: json["HTML/CSS"],
          employee_js: json["JavaScript"],
          employee_angular: json["Angular"],
          employee_react: json["ReactJs"],
          employee_reactnative: json["React Native"]
        });
      });

      setData(filtered_json);
    });
  };

  
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
                              View
                            </button>
                          </Link>
                          {/* <Link to="/profile">Profile</Link> */}
                          {/* <button
                            id={list.employee_id}
                            className="btn btn-primary btn-sm"
                            onClick={showData}
                          >
                            PPT
                          </button> */}
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
