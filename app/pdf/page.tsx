"use client";

import { Stack } from "@mui/material";
import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("./_PdfViewer"), {
  ssr: false,
});

export default function PdfPage() {
  return (
    <Stack sx={{ p: 2 }}>
      <PdfViewer pdfPath="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf" />
    </Stack>
  );
}
