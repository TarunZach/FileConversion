import React, { useState } from 'react';
import Pdf from "react-to-pdf";
import './css/pdf.css';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import * as XLSX from 'xlsx';

const ref = React.createRef();

const PDF = (props) => {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  return (
    <>
      <div>
        <input type="file" onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }} />
      </div>
      <div className='pdf'>
        <div className="content-wrapper">
          <div className="Post" ref={ref}>
            <header className='pdf-header'>
              <div className="item-wrapper">
                <div className="user-image">
                  <img src="http://demo.solwininfotech.com/wordpress/justica/wp-content/uploads/2016/07/Attorneys-5.png" alt="user" className="profile-img" />
                </div>

                <p className='header-text'>Employee Name: {props.name}</p>
                <p className='header-text'>Employee ID: {props.id}</p>
                <p className='header-text'>Grade: {props.grade}</p>
                <p className='header-text'>Experience: {props.years}</p>
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
                      <td colSpan={3}>{props.experience}</td>
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
                      <td colSpan={3}>{props.certification}</td>
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
                      <td colSpan={3}>{props.training}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <p>Reviews : testets</p>
            </div>
          </div>
        </div>
        <Pdf targetRef={ref} filename="post.pdf">
          {({ toPdf }) => <Button onClick={toPdf}>Download PDF</Button>}
        </Pdf>
      </div>
    </>
  );
}

export default PDF;