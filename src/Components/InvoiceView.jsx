// // // src/Components/InvoiceView.jsx
// // import React from "react";
// // import { Box, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material";
// // import jsPDF from "jspdf";
// // import "jspdf-autotable";
// // import { getInvoiceById } from "../api/invoiceApi";

// // export default function InvoiceView({ data }) {
// //   if (!data) return null;

// //   const inv = data;

// //   return (
// //     <Box>
// //       <Typography variant="h6">Invoice: {inv.invoiceNumber}</Typography>
// //       <Typography variant="subtitle1">Date: {new Date(inv.invoiceDate).toLocaleDateString()}</Typography>

// //       <Box sx={{ mt: 2 }}>
// //         <Typography variant="subtitle2">Bill To</Typography>
// //         <div>{inv.customer?.name}</div>
// //         <div>{inv.customer?.companyName}</div>
// //         <div>{inv.customer?.address}</div>
// //         <div>GST: {inv.customer?.gstNumber}</div>
// //       </Box>

// //       <Table sx={{ mt: 2 }}>
// //         <TableBody>
// //           {inv.items.map((it, idx) => (
// //             <TableRow key={idx}>
// //               <TableCell>{it.name}</TableCell>
// //               <TableCell>₹{it.price}</TableCell>
// //               <TableCell>{it.quantity}</TableCell>
// //               <TableCell>₹{it.total}</TableCell>
// //             </TableRow>
// //           ))}
// //           <TableRow>
// //             <TableCell></TableCell>
// //             <TableCell></TableCell>
// //             <TableCell><strong>Subtotal</strong></TableCell>
// //             <TableCell>₹{inv.subtotal}</TableCell>
// //           </TableRow>
// //           <TableRow>
// //             <TableCell></TableCell>
// //             <TableCell></TableCell>
// //             <TableCell><strong>Tax</strong></TableCell>
// //             <TableCell>₹{inv.tax}</TableCell>
// //           </TableRow>
// //           <TableRow>
// //             <TableCell></TableCell>
// //             <TableCell></TableCell>
// //             <TableCell><strong>Grand Total</strong></TableCell>
// //             <TableCell>₹{inv.grandTotal}</TableCell>
// //           </TableRow>
// //         </TableBody>
// //       </Table>
// //     </Box>
// //   );
// // }

// // // Static helper to download PDF from already-loaded invoice object
// // InvoiceView.downloadPdf = function(inv) {
// //   if (!inv) return;
// //   const doc = new jsPDF({ unit: "pt", format: "a4" });
// //   let y = 40;
// //   const left = 40;
// //   doc.setFontSize(16);
// //   doc.text("INVOICE", left, y); y += 25;

// //   doc.setFontSize(11);
// //   doc.text(`Invoice No: ${inv.invoiceNumber}`, left, y); y += 16;
// //   doc.text(`Date: ${new Date(inv.invoiceDate).toLocaleDateString()}`, left, y); y += 16;

// //   if (inv.customer) {
// //     doc.text(`Bill To: ${inv.customer.name || ""}`, left, y); y += 14;
// //     if (inv.customer.companyName) { doc.text(`Company: ${inv.customer.companyName}`, left, y); y += 14; }
// //     if (inv.customer.address) { doc.text(`Address: ${inv.customer.address}`, left, y); y += 14; }
// //     if (inv.customer.gstNumber) { doc.text(`GST: ${inv.customer.gstNumber}`, left, y); y += 14; }
// //   }

// //   y += 8;

// //   const tableColumn = ["Item", "Price", "Qty", "Total"];
// //   const tableRows = inv.items.map(it => [it.name || "", `₹${it.price}`, it.quantity, `₹${it.total}`]);

// //   doc.autoTable({
// //     startY: y,
// //     head: [tableColumn],
// //     body: tableRows,
// //     theme: "grid",
// //     styles: { fontSize: 10 }
// //   });

// //   const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : y + 10;
// //   doc.text(`Subtotal: ₹${inv.subtotal}`, left, finalY);
// //   doc.text(`Tax: ₹${inv.tax}`, left, finalY + 14);
// //   doc.setFontSize(12);
// //   doc.text(`Grand Total: ₹${inv.grandTotal}`, left, finalY + 34);

// //   doc.save(`${inv.invoiceNumber}.pdf`);
// // };

// // // helper to download by id (fetches invoice first)
// // InvoiceView.downloadPdfById = async function(id) {
// //   try {
// //     const inv = await getInvoiceById(id);
// //     InvoiceView.downloadPdf(inv);
// //   } catch (err) {
// //     console.error(err);
// //   }
// // };


// // src/Components/InvoiceView.jsx
// import React from "react";
// import { Box, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { getInvoiceById } from "../api/invoiceApi";

// // ======= STATIC COMPANY INFORMATION (You can change this later) =======
// const COMPANY = {
//   name: "Your Company Name",
//   address: "123 Business Street, Pune, India",
//   gst: "GSTIN: 22AAAAA0000A1Z5",
//   phone: "+91 9876543210",
//   email: "support@company.com",
// };

// export default function InvoiceView({ data }) {
//   if (!data) return null;

//   const inv = data;

//   return (
//     <Box sx={{ p: 1 }}>
//       <Typography variant="h6">Invoice: {inv.invoiceNumber}</Typography>
//       <Typography variant="subtitle1">
//         Date: {new Date(inv.invoiceDate).toLocaleDateString()}
//       </Typography>

//       <Box sx={{ mt: 2 }}>
//         <Typography variant="subtitle2">Bill To:</Typography>
//         <div>{inv.customer?.name}</div>
//         <div>{inv.customer?.companyName}</div>
//         <div>{inv.customer?.address}</div>
//         <div>GST: {inv.customer?.gstNumber}</div>
//       </Box>

//       <Table sx={{ mt: 2 }}>
//         <TableBody>
//           {inv.items.map((it, idx) => (
//             <TableRow key={idx}>
//               <TableCell>{it.name}</TableCell>
//               <TableCell>₹{it.price}</TableCell>
//               <TableCell>{it.quantity}</TableCell>
//               <TableCell>₹{it.total}</TableCell>
//             </TableRow>
//           ))}

//           <TableRow>
//             <TableCell colSpan={2}></TableCell>
//             <TableCell><strong>Subtotal</strong></TableCell>
//             <TableCell>₹{inv.subtotal}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell colSpan={2}></TableCell>
//             <TableCell><strong>Tax</strong></TableCell>
//             <TableCell>₹{inv.tax}</TableCell>
//           </TableRow>

//           <TableRow>
//             <TableCell colSpan={2}></TableCell>
//             <TableCell><strong>Grand Total</strong></TableCell>
//             <TableCell><strong>₹{inv.grandTotal}</strong></TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </Box>
//   );
// }

// // ============================================================
// // PROFESSIONAL PDF GENERATOR
// // ============================================================
// export async function downloadInvoicePdfById(id) {
//   const inv = await getInvoiceById(id);
//   downloadInvoicePdf(inv);
// }

// export function downloadInvoicePdf(inv) {
//   const doc = new jsPDF({ unit: "pt", format: "a4" });
//   const left = 40;
//   let y = 40;

//   // ===== COMPANY HEADER =====
//   doc.setFontSize(18);
//   doc.text(COMPANY.name, left, y);
//   y += 18;

//   doc.setFontSize(11);
//   doc.text(COMPANY.address, left, y); y += 14;
//   doc.text(COMPANY.phone, left, y); y += 14;
//   doc.text(COMPANY.email, left, y); y += 14;
//   doc.text(COMPANY.gst, left, y); y += 20;

//   // Divider
//   doc.line(left, y, 550, y);
//   y += 25;

//   // ===== INVOICE HEADER =====
//   doc.setFontSize(16);
//   doc.text("INVOICE", left, y);
//   y += 25;

//   doc.setFontSize(11);
//   doc.text(`Invoice No: ${inv.invoiceNumber}`, left, y); y += 14;
//   doc.text(`Invoice Date: ${new Date(inv.invoiceDate).toLocaleDateString()}`, left, y); y += 25;

//   // ===== CUSTOMER BLOCK =====
//   doc.setFontSize(12);
//   doc.text("Bill To:", left, y);
//   y += 16;

//   doc.setFontSize(11);
//   doc.text(inv.customer?.name || "-", left, y); y += 14;
//   inv.customer?.companyName && doc.text(inv.customer.companyName, left, y) && (y += 14);
//   inv.customer?.address && doc.text(inv.customer.address, left, y) && (y += 14);
//   inv.customer?.gstNumber && doc.text(`GST: ${inv.customer.gstNumber}`, left, y) && (y += 20);

//   // ===== ITEM TABLE =====
//   const tableRows = inv.items.map((it) => [
//     it.name,
//     `₹${it.price}`,
//     it.quantity,
//     `₹${it.total}`,
//   ]);

//   doc.autoTable({
//     head: [["Item", "Price", "Qty", "Total"]],
//     body: tableRows,
//     startY: y,
//     theme: "grid",
//     headStyles: { fillColor: [33, 150, 243] }, // Blue header
//     styles: { fontSize: 10 },
//   });

//   const finalY = doc.lastAutoTable.finalY + 20;

//   // ===== TOTAL BOX =====
//   doc.setFontSize(11);

//   doc.text(`Subtotal: ₹${inv.subtotal}`, left, finalY);
//   doc.text(`Tax: ₹${inv.tax}`, left, finalY + 16);
//   doc.setFontSize(13);
//   doc.text(`Grand Total: ₹${inv.grandTotal}`, left, finalY + 40);

//   // ===== FOOTER =====
//   doc.setFontSize(10);
//   doc.text("This is a computer-generated invoice.", left, 780);

//   doc.save(`${inv.invoiceNumber}.pdf`);
// }


import React from "react";
import { Box, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getInvoiceById } from "../api/invoiceApi";

const COMPANY = {
  name: "Your Company Name",
  address: "123 Business Street, Pune, India",
  gst: "GSTIN: 22AAAAA0000A1Z5",
  phone: "+91 9876543210",
  email: "support@company.com",
};

export default function InvoiceView({ data }) {
  if (!data) return null;
  const inv = data;

  return (
    <Box>
      <Typography variant="h6">Invoice #{inv.invoiceNumber}</Typography>
      <Typography>Date: {new Date(inv.invoiceDate).toLocaleDateString()}</Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2">Bill To:</Typography>
        <div>{inv.customer?.name}</div>
        <div>{inv.customer?.companyName}</div>
        <div>{inv.customer?.address}</div>
        <div>GST: {inv.customer?.gstNumber}</div>
      </Box>

      <Table sx={{ mt: 3 }}>
        <TableBody>
          {inv.items.map((it,i)=>(
            <TableRow key={i}>
              <TableCell>{it.name}</TableCell>
              <TableCell>₹{it.price}</TableCell>
              <TableCell>{it.quantity}</TableCell>
              <TableCell>₹{it.total}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={2}></TableCell>
            <TableCell><strong>Subtotal</strong></TableCell>
            <TableCell>₹{inv.subtotal}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2}></TableCell>
            <TableCell><strong>Tax</strong></TableCell>
            <TableCell>₹{inv.tax}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2}></TableCell>
            <TableCell><strong>Grand Total</strong></TableCell>
            <TableCell><strong>₹{inv.grandTotal}</strong></TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </Box>
  )
}


// ======================= PDF GENERATOR =========================

export async function downloadInvoicePdfById(id){
  const inv = await getInvoiceById(id);
  downloadInvoicePdf(inv);
}

export function downloadInvoicePdf(inv){
  const doc = new jsPDF({ unit:"pt", format:"a4" });
  let left=40, y=40;

  doc.setFontSize(18);
  doc.text(COMPANY.name, left, y); y+=18;
  doc.setFontSize(11);
  doc.text(COMPANY.address, left, y); y+=14;
  doc.text(COMPANY.phone, left, y); y+=14;
  doc.text(COMPANY.email, left, y); y+=14;
  doc.text(COMPANY.gst, left, y); y+=20;

  doc.line(left, y, 550, y); y+=25;

  doc.setFontSize(16);
  doc.text("INVOICE", left, y); y+=25;

  doc.setFontSize(11);
  doc.text(`Invoice No: ${inv.invoiceNumber}`, left, y); y+=14;
  doc.text(`Date: ${new Date(inv.invoiceDate).toLocaleDateString()}`, left, y); y+=20;

  doc.text("Bill To:", left, y); y+=16;
  doc.text(inv.customer?.name || "", left, y); y+=14;
  inv.customer?.companyName && doc.text(inv.customer.companyName, left, y) && (y+=14);
  inv.customer?.address && doc.text(inv.customer.address, left, y) && (y+=14);
  inv.customer?.gstNumber && doc.text("GST: " + inv.customer.gstNumber, left, y) && (y+=20);

  const tableBody = inv.items.map(i => [
    i.name, `₹${i.price}`, i.quantity, `₹${i.total}`
  ]);

  doc.autoTable({
    head: [["Item","Price","Qty","Total"]],
    body: tableBody,
    startY: y,
    theme:"grid",
    headStyles:{ fillColor:[33,150,243] }
  });

  const final = doc.lastAutoTable.finalY + 20;

  doc.text(`Subtotal: ₹${inv.subtotal}`, left, final);
  doc.text(`Tax: ₹${inv.tax}`, left, final+16);
  doc.setFontSize(13);
  doc.text(`Grand Total: ₹${inv.grandTotal}`, left, final+40);

  doc.setFontSize(10);
  doc.text("This is a system-generated invoice.", left, 780);

  doc.save(inv.invoiceNumber + ".pdf");
}
