import React from 'react';
import Pdf from "react-to-pdf";
import './css/pdf.css';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const ref = React.createRef();

const PDF = (props) => {
  console.log(props);
  return (
    <>
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
                <p className='header-text'>Grade: A</p>
                <p className='header-text'>Experience: 10 Years</p>
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
                      <td colSpan={3}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lacinia sollicitudin massa, posuere aliquet nisi semper id. Vestibulum sit amet nibh porta, imperdiet turpis at, semper nulla. Cras feugiat consectetur arcu, id porta nunc. Vestibulum eleifend blandit diam sed luctus. Suspendisse potenti. Nullam fermentum nunc nibh, ullamcorper laoreet sapien pretium eget. Sed eu varius sapien, in ullamcorper tellus. Integer eleifend et dui non tempus. Praesent congue viverra ante vitae maximus. Nulla porta nunc in laoreet iaculis. Fusce turpis dui, efficitur ut nulla quis, dictum sagittis felis. Nulla quis purus ut enim bibendum tempus. Morbi elementum mi neque, eu dictum mauris auctor non. Suspendisse potenti. Suspendisse in justo sit amet lorem feugiat finibus.

                        Nulla pulvinar faucibus neque id dapibus. Duis et tincidunt dui, vel vehicula enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada, lacus sit amet consectetur dictum, erat risus consectetur quam, ac facilisis nibh tellus sit amet ligula. Mauris a massa cursus, eleifend ligula ac, bibendum enim. Curabitur lacinia purus ut dolor malesuada tempor. Donec tincidunt tempor enim auctor porttitor. Cras eget nibh dictum urna finibus maximus. Curabitur eu odio fringilla, pretium ante vitae, viverra mi.</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className="experience-table container">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th colSpan={3}>Certification</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td colSpan={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td colSpan={2}>Duis et tincidunt dui, vel vehicula enim.</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td colSpan={2}>Nulla pulvinar faucibus neque id dapibus. Duis et tincidunt dui.</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className="experience-table container">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th colSpan={3}>Trainings and Assessments Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td colSpan={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td colSpan={2}>Duis et tincidunt dui, vel vehicula enim.</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td colSpan={2}>Nulla pulvinar faucibus neque id dapibus. Duis et tincidunt dui.</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <p>Reviews : {props.message}</p>
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