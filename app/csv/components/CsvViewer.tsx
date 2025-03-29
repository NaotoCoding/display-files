"use client";

import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Papa from "papaparse";
import { useEffect, useState } from "react";

type CsvRow = Record<string, string>;

export default function CsvViewer({ csvPath }: { csvPath: string }) {
  const [data, setData] = useState<CsvRow[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    console.log(csvPath);
    Papa.parse(csvPath, {
      header: true,
      download: true,
      transformHeader: (header) => header.replace(/\./g, "_"),
      complete: (results) => {
        setData(results.data as CsvRow[]);
        const columnHelper = createColumnHelper<CsvRow>();
        const cols = Object.keys(results.data[0] as CsvRow).map((key) =>
          columnHelper.accessor(key, {
            header: key.replace(/_/g, "."),
            cell: (info) => info.getValue(),
          })
        );
        setColumns(cols);
      },
    });
  }, [csvPath]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Box
        sx={{
          mb: 3,
          width: 300,
          display: "flex",
          justifyContent: "center",
          mx: "auto",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="検索..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 1,
          p: 2,
        }}
      >
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table
            stickyHeader
            sx={{ minWidth: 650 }}
            aria-label="CSV data table"
          >
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table
                .getRowModel()
                .rows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{ "&:hover": { backgroundColor: "action.hover" } }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={table.getRowModel().rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="表示行数"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} / ${count}`
          }
        />
      </Box>
    </>
  );
}
