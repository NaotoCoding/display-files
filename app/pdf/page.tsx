"use client";

import {
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";

const PdfViewer = dynamic(() => import("./_PdfViewer"), {
  ssr: false,
});

export default function PdfPage() {
  const [selectedPdf, setSelectedPdf] =
    useState<keyof typeof pdfOptions>("mozilla.pdf");

  const pdfOptions = {
    "mozilla.pdf":
      "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
    "sample.pdf": "/sample.pdf",
  };

  return (
    <Stack sx={{ p: 2 }} spacing={2} alignItems="center">
      <FormControl sx={{ width: 300 }}>
        <InputLabel>PDF選択</InputLabel>
        <Select
          value={selectedPdf}
          label="PDF選択"
          onChange={(e) =>
            setSelectedPdf(e.target.value as keyof typeof pdfOptions)
          }
        >
          {Object.keys(pdfOptions).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <PdfViewer pdfPath={pdfOptions[selectedPdf]} />
    </Stack>
  );
}
