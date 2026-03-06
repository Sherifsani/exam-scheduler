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

  // Brutalist RetroUI Palette
  const headerBgColor: [number, number, number] = isLight
    ? [255, 219, 51] // Primary yellow
    : [255, 219, 51]; // Primary yellow in dark mode too for accent
  const headerTextColor: [number, number, number] = [0, 0, 0]; // Always black on primary

  const textColor: [number, number, number] = isLight
    ? [0, 0, 0] // Black
    : [245, 245, 245]; // Off-white

  const pageBgColor: [number, number, number] = isLight
    ? [255, 255, 255]
    : [26, 26, 26];

  const borderColor: [number, number, number] = isLight
    ? [0, 0, 0]
    : [58, 58, 58];

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
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text("EXAM SCHEDULE", 14, 22);

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
      textColor: headerTextColor,
      fontStyle: "bold",
      fontSize: 12,
      lineColor: borderColor,
      lineWidth: 0.5,
    },
    bodyStyles: {
      textColor: textColor,
      fillColor: isLight ? [255, 255, 255] : [36, 36, 36], // card bg
    },
    alternateRowStyles: {
      fillColor: isLight ? [250, 250, 250] : [42, 42, 42],
    },
    styles: {
      cellPadding: 6,
      fontSize: 10,
      lineColor: borderColor,
      lineWidth: 0.5,
      font: "helvetica",
    },
    margin: { top: 40 },
  });

  doc.save("exam-schedule.pdf");
};
