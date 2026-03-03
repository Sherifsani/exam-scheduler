import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format, parseISO } from "date-fns";
import type { Exam } from "../types";

export const generateSchedulePDF = (
  exams: Exam[],
  currentTheme: "light" | "dark",
) => {
  const doc = new jsPDF();

  // Sort exams
  const sortedExams = [...exams].sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.startTime}`);
    const dateTimeB = new Date(`${b.date}T${b.startTime}`);
    return dateTimeA.getTime() - dateTimeB.getTime();
  });

  // Theme colors matching our aesthetic
  const isLight = currentTheme === "light";
  const headerBgColor: [number, number, number] = isLight
    ? [211, 97, 53]
    : [178, 102, 255]; // Accent colors
  const textColor: [number, number, number] = isLight
    ? [26, 33, 29]
    : [242, 235, 247];
  const pageBgColor: [number, number, number] = isLight
    ? [247, 245, 240]
    : [13, 10, 17];

  // Set page background
  doc.setFillColor(...pageBgColor);
  doc.rect(
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight(),
    "F",
  );

  doc.setTextColor(...textColor);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Exam Schedule", 14, 22);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated on ${format(new Date(), "MMM d, yyyy")}`, 14, 30);

  const tableData = sortedExams.map((exam) => [
    exam.courseCode
      ? `${exam.courseName} (${exam.courseCode})`
      : exam.courseName,
    format(parseISO(exam.date), "MMM d, yyyy"),
    `${exam.startTime} - ${exam.endTime}`,
    exam.location,
    exam.notes || "-",
  ]);

  autoTable(doc, {
    startY: 40,
    head: [["Course", "Date", "Time", "Location", "Notes"]],
    body: tableData,
    theme: "grid",
    headStyles: {
      fillColor: headerBgColor,
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    bodyStyles: {
      textColor: isLight ? [74, 86, 82] : [174, 161, 189], // text-secondary
      fillColor: isLight ? [255, 255, 255] : [30, 23, 38], // bg-surface
    },
    alternateRowStyles: {
      fillColor: isLight ? [235, 231, 223] : [20, 16, 26], // bg-secondary
    },
    styles: {
      cellPadding: 5,
      fontSize: 10,
      lineColor: isLight ? [44, 85, 69] : [178, 102, 255],
      lineWidth: 0.1,
    },
    margin: { top: 40 },
  });

  doc.save("exam-schedule.pdf");
};
