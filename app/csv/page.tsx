"use client";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";

const CsvViewer = dynamic(() => import("./components/CsvViewer"), {
  ssr: false,
});

export default function CsvPage() {
  const [selectedCsv, setSelectedCsv] =
    useState<keyof typeof csvOptions>("mtcars.csv");

  const csvOptions = {
    "mtcars.csv":
      "https://vincentarelbundock.github.io/Rdatasets/csv/datasets/mtcars.csv",
    "airtravel.csv":
      "https://raw.githubusercontent.com/vincentarelbundock/Rdatasets/master/datasets.csv",
  };

  return (
    <Stack sx={{ p: 2 }} spacing={2} alignItems="center">
      <FormControl sx={{ width: 300 }}>
        <InputLabel>CSV選択</InputLabel>
        <Select
          value={selectedCsv}
          label="CSV選択"
          onChange={(e) =>
            setSelectedCsv(e.target.value as keyof typeof csvOptions)
          }
        >
          {Object.keys(csvOptions).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ width: "100%", maxWidth: 1200 }}>
        <CsvViewer csvPath={csvOptions[selectedCsv]} />
      </Box>
    </Stack>
  );
}
