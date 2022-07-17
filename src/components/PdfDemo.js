import React from "react";
import jsPDF from "jspdf";
import user_image from "../images/user.png";
import te_logo from "../images/tata-elxsi-logo.png";
import experience_image from "../images/experience.png";
import skills_image from "../images/skills.png";
import trainings_image from "../images/trainings.png";
import certifications_image from "../images/certifications.png";
import star_image from "../images/star.png";
import one_star_image from "../images/one_star.jpeg";
import two_star_image from "../images/two_star.jpeg";
import three_star_image from "../images/three_star.jpeg";
import four_star_image from "../images/four_star.jpeg";
import five_star_image from "../images/five_star.jpeg";
function PdfDemo() {
  const generatePDF = () => {
    var doc = new jsPDF("l", "px", [1200, 700]);

    const toInches = (cms) => cms / 2.54;

    const details = {
      employee_id: "19439",
      employee_email: "sushmitha.kasaram@tataelxsi.co.in",
      employee_name: "Sushmitha Kasaram",
      employee_number: "19439",
      employee_experience: "4.3",
      employee_relevant_experience:
        "1.Project Name : Sonim Scout - 1.2 years Role : Android Developer Languages : Java 2.Project Name : Middle East Broadcasting Center(MBC) - POC: 7 Month Role: Android Developer Languages : Java 3. Project Name : SonyLIV- 1.9 Years Role: Android Developer Languages : Java 4.Project Name : Middle East Broadcasting Center(MBC) - POC: 7 Month Role: Android Developer Languages : Java 5. Project Name : SonyLIV- 1.9 Years Role: Android Developer Languages : Java",
      employee_grade: "E",
      employee_skills: [
        {
          skill_name: "Javascript",
          skill_type: "primary",
          skill_prof: "Intermediate"
        },
        { skill_name: "Java", skill_type: "primary", skill_prof: "Beginner" },
        {
          skill_name: "Kotlin:2",
          skill_type: "secondary",
          skill_prof: "Trained"
        }
      ],
      employee_primary_experience: "JavaScript;Java;",
      employee_secondary_experience: "Kotlin:2",
      employee_certificates:
        "Completed udemy and linkedln courses and earned certificates on MEAN, Bootstrap, Advanced angular and Azure Cloud. Completed Google Analytics Individual Qualification Certification. ",
      employee_trainings:
        "Kotlin for Java Developers,Kotlin for Android: Best Practices,Kotlin Essential Training",
      employee_reviews:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, deserunt! Explicabo blanditiis pariatur deserunt qui quo veritatis, facilis veniam sunt assumenda illo? Praesentium laudantium natus nulla distinctio error, alias consectetur?"
    };

    // doc meta properties
    doc.author = "MCV";
    doc.company = "Tata Elxsi";
    doc.subject = "Employee Profile";
    doc.title = "Employee Profile";

    //  doc Layout
    doc.layout = "LAYOUT_16x9";

    // doc Custom Layout
    // doc.defineLayout({
    //   name: "Tata Elxsi Default Layout",
    //   width: 10,
    //   height: 5.265
    // });
    // doc.layout = "Tata Elxsi Default Layout";

    // Watermark Logo(WorkAround)
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.1 }));

    doc.addImage(te_logo, 200, 150, 800, 500);
    doc.restoreGraphicsState();

    // Header Section of the doc
    // Add Shape and the text
    doc.setFillColor(42, 98, 131);
    doc.rect(0, 0, 1200, 130, "F");
    doc.addImage(user_image, 50, 5, 120, 120);
    doc.setTextColor("ffffff");
    doc.setFontSize(23);
    doc.text(`Name: ${details.employee_name}`, 250, 70);
    doc.text(`Emp Id: ${details.employee_id}`, 550, 70);
    doc.text(`Grade: ${details.employee_grade}`, 800, 70);
    doc.text(`Experience: ${details.employee_experience}`, 1000, 70);

    // //Relevant Experience Section

    // // Logic for relevant Experience Section:

    const project_head = details.employee_relevant_experience.match(
      /Project Name/g
    ); //Splitted Header
    let project_info = details.employee_relevant_experience.split(
      /Project Name/g
    ); //Splitted Content
    project_info.shift();
    let experience_merged_text = [];
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
      }
    }

    // console.log("Experienced Data: ", experience_data);
    doc.setFillColor(6, 163, 146);
    doc.ellipse(
      225,
      210,
      40,
      40,
      "F"
      // fill: { type: "solid", color: "06a392" },
    );
    doc.addImage(experience_image, 200, 185, 50, 50);
    doc.setTextColor("235169");
    doc.setFont(undefined, "bold");
    doc.setFontSize(25);
    doc.text("Experience", 175, 280);
    doc.setTextColor("444444");
    doc.setFont(undefined, "normal");
    doc.setFontSize(16);
    let experience_data = [];
    let xAxis = 25;
    let yAxis = 320;
    experience_merged_text.forEach((experience, index) => {
      experience_data.push(
        doc.setFont(undefined, "bold"),
        doc.text(
          `${index + 1}. ${experience[0]}.${experience[1]}`,
          xAxis,
          yAxis,
          { maxWidth: 350 }
        ),
        // doc.setFont(undefined, 'normal'),
        // doc.text(experience[1], xAxis, yAxis2)),
        (yAxis = yAxis + 55)
        // text: `${index + 1}. ${experience[0]}`,
        // options: { fontSize: 9, bold: true }
        // doc.setFont(undefined, 'normal'),
        //   doc.text(experience[1], xAxis, yAxis2),
        // options: { fontSize: 9, lineSpacingMultiple: 1, breakLine: true }
      );
    });
    doc.setLineWidth(1);
    doc.line(380, 620, 380, 200);
    // doc.text(experience_data, 150, 380);

    //Skills Section
    let skills;
    if (details.employee_skills) {
      skills = details.employee_skills;
    }

    doc.setFillColor(255, 152, 0);
    doc.ellipse(
      505,
      210,
      40,
      40,
      "F"
      // fill: { type: "solid", color: "06a392" },
    );
    doc.addImage(skills_image, 480, 185, 50, 50);
    doc.setTextColor("235169");
    doc.setFont(undefined, "bold");
    doc.setFontSize(25);
    doc.text("Skills", 480, 280);

    let initial_skill_x = 410;
    let initial_skill_y = 320;
    let initial_star_x = 410;
    let initial_star_y = 330;
    let skill_type_x = 550;
    let skill_type_y = 320;

    let skill_level = {
      Beginner: { path: one_star_image, w: 80, h: 30 },
      Trained: { path: two_star_image, w: 80, h: 30 },
      Intermediate: {
        path: three_star_image,
        w: 80,
        h: 30
      },
      Expert: { path: four_star_image, w: 100, h: 30 }
    };

    skills.forEach((skill) => {
      doc.setTextColor("444444");
      doc.setFontSize(16);
      doc.setFont(undefined, "bold");
      doc.text(skill.skill_name, initial_skill_x, initial_skill_y, {
        maxWidth: 70,
        maxHeight: 80
      });
      // doc.setTextColor(101,43,0);

      doc.text(skill.skill_type, skill_type_x, skill_type_y, {
        w: 90,
        h: 90,
        fill: {
          color: `${skill.skill_type === "primary" ? "ff9800" : "0080ff"}`
        },
        rectRadius: 5
      });
      doc.addImage(
        // skill_level[skill.skill_prof],
        four_star_image,
        "jpg",
        initial_star_x,
        initial_star_y,
        70,
        20
      );
      initial_skill_y += 80;
      initial_star_y += 80;
      skill_type_y += 80;
    });

    // // Logic for Training Section

    doc.setLineWidth(1);
    doc.line(630, 620, 630, 200);
    // //Training Section
    doc.setFillColor(230, 233, 5);
    doc.ellipse(
      755,
      210,
      40,
      40,
      "F"
      // fill: { type: "solid", color: "06a392" },
    );
    doc.addImage(trainings_image, 732, 187, 50, 50);
    doc.setTextColor("235169");
    doc.setFont(undefined, "bold");
    doc.setFontSize(25);
    doc.text("Training", 718, 280);
    let count = 1;
    let yAxisTraining = 320;
    let trainings = details.employee_trainings.split(",");
    let all_trainings = [];
    if (all_trainings) {
      doc.setTextColor("444444");
      doc.setFontSize(16);
      doc.setFont(undefined, "bold");
      trainings.forEach((training, index) => {
        all_trainings.push(
          doc.text(`${count}.${training}`, 660, yAxisTraining),
          {
            options: {
              fontSize: 9,
              breakLine: true,
              bullet: { indent: 15, type: "number", style: "arabicPeriod" }
            }
          },
          (count += 1),
          (yAxisTraining += 30)
        );
      });
    } else {
      all_trainings = "";
    }
    // doc.text(
    //   "test",

    //   toInches(14.2),
    //   toInches(5.3),
    //   toInches(5.3),
    //   toInches(6),
    //   "justify",
    //   {
    //     bullet: true,
    //     color: "444444",
    //     fontSize: 9,
    //     fontFace: "Calibri",
    //     lineSpacingMultiple: 1.2
    //   }
    //   // valign: "top"}
    // );

    doc.setLineWidth(1);
    doc.line(895, 620, 895, 200);

    // //Certification Section
    doc.setFillColor(6, 163, 146);
    doc.ellipse(
      1015,
      210,
      40,
      40,
      "F"
      // fill: { type: "solid", color: "06a392" },
    );
    doc.addImage(certifications_image, 990, 187, 50, 50);
    doc.setTextColor("235169");
    doc.setFont(undefined, "bold");
    doc.setFontSize(25);
    doc.text("Certifications", 955, 280);
    doc.setTextColor("444444");
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text(`${details.employee_certificates}`, 935, 320, {
      maxWidth: 250
    });

    // // Review Section
    doc.setDrawColor(42, 98, 131);
    doc.rect(500, 800, 300, 300);
    // doc.text(
    //   JSON.stringify([
    //     {
    //       text: "Reviews: ",
    //       options: { fontSize: 12, color: "235169", bold: true }
    //     },
    //     {
    //       text: details.employee_reviews,
    //       options: { fontSize: 9, color: "444444" }
    //     }
    //   ]),

    //   toInches(0.41),
    //   toInches(12.1),
    //   toInches(24.59),
    //   toInches(1.07),
    //   "justify",
    //   {
    //     fill: { color: "f9f9f9" },
    //     line: { color: "234567", width: "1", valign: "top" }
    //   }
    // );

    // // Line Differentiator
    // // Line 1
    // doc.line(1.5, 1.5, 0.1, 1, "S", {
    //   rotate: "1.81",
    //   line: { color: "aaaaaa", width: 1, dashType: "solid" }
    // });
    // doc.line(2, 1.5, 0.1, 1, "S", {
    //   rotate: "1.80",
    //   line: { color: "aaaaaa", width: 1, dashType: "solid" }
    // });
    // doc.line(3, 1.5, 0.1, 1, "S", {
    //   rotate: "1.80",
    //   line: { color: "aaaaaa", width: 1, dashType: "solid" }
    // });

    doc.save("demo.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF} type="primary">
        Download PDF
      </button>
    </div>
  );
}

export default PdfDemo;
