"use client";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfViewer({ pdfPath }: { pdfPath: string }) {
  const [totalPages, setTotalPages] = useState<number>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

  useEffect(() => {
    setCurrentPageNumber(1);
  }, [pdfPath]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setTotalPages(numPages);
  }

  const goToPrevPage = () => {
    setCurrentPageNumber((prev) => (prev <= 1 ? 1 : prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPageNumber((prev) =>
      prev >= totalPages! ? totalPages! : prev + 1
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {totalPages && (
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <IconButton onClick={goToPrevPage} disabled={currentPageNumber <= 1}>
            <ChevronLeft />
          </IconButton>
          <Typography>
            Page {currentPageNumber} of {totalPages}
          </Typography>
          <IconButton
            onClick={goToNextPage}
            disabled={currentPageNumber >= totalPages!}
          >
            <ChevronRight />
          </IconButton>
        </Stack>
      )}

      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 1,
          p: 2,
        }}
      >
        <Document file={pdfPath} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={currentPageNumber} />
        </Document>
      </Box>
    </Box>
  );
}
