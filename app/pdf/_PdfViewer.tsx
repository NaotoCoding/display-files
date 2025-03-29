"use client";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import LoadingPage from "../components/LoadingPage";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfViewer({ pdfPath }: { pdfPath: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pdfLoaded, setPdfLoaded] = useState<boolean>(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setPdfLoaded(true);
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => (prev <= 1 ? 1 : prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => (prev >= numPages! ? numPages! : prev + 1));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {!pdfLoaded && <LoadingPage />}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <IconButton onClick={goToPrevPage} disabled={pageNumber <= 1}>
          <ChevronLeft />
        </IconButton>
        <Typography>
          Page {pageNumber} of {numPages}
        </Typography>
        <IconButton onClick={goToNextPage} disabled={pageNumber >= numPages!}>
          <ChevronRight />
        </IconButton>
      </Stack>

      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 1,
          p: 2,
        }}
      >
        <Document file={pdfPath} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </Box>
    </Box>
  );
}
