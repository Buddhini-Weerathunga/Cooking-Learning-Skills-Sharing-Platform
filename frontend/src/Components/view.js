import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function View() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/courses/${id}`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
      });
  }, [id]);

  const downloadPDF = () => {
    const input = printRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Course-${course.title}.pdf`);
    });
  };

  if (!course) {
    return <p className="text-center mt-5">Loading course details...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4" ref={printRef}>
        <h2 className="mb-4 text-center text-primary">Course Details</h2>
        <p>
          <strong>Title:</strong> {course.title}
        </p>
        <p>
          <strong>Description:</strong> {course.description}
        </p>
        <p>
          <strong>Content:</strong> {course.content}
        </p>
        <p>
          <strong>Price:</strong> ${course.price}
        </p>
        <p>
          <strong>Start Date:</strong> {course.startDate}
        </p>
        <p>
          <strong>End Date:</strong> {course.endDate}
        </p>
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-success"
          onClick={downloadPDF}
          style={{
            padding: "10px 30px",
            fontWeight: "bold",
            backgroundColor: "rgb(245, 144, 77)",
          }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
