import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from "xlsx";

const ExcelTable = (props) => {
    const [file, setFile] = useState({});
    const [data, setData] = useState([]);

    const readExcel = () => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
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
        });
        promise.then((json_data) => {
            let filtered_json = [];

            json_data.forEach((json) => {
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
        console.log(e.target.id);
    }
    return (
        <>
            <div className="container">
                <div className="mt-3 mb-3">
                    <input
                        type="file"
                        name="file"
                        className="form-control"
                        id="file"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <button
                        className="btn btn-primary"
                        id="uploadFile"
                        onClick={readExcel}
                    >
                        Upload File
                    </button>
                </div>

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
                            {data.map((list,key) => {
                                return (
                                    <>
                                        <tr key={list.employee_id}>
                                            <td>{list.employee_id}</td>
                                            <td>{list.employee_name}</td>
                                            <td>{list.employee_email}</td>
                                            <td>{list.employee_experience}</td>
                                            <td>{list.employee_grade}</td>
                                            <td><Link to={"/preview/"+list.employee_id} state={list}>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={showData}
                                                >
                                                    PDF
                                                </button></Link>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={showData}
                                                >
                                                    PPT
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ExcelTable
