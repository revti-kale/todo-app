import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";

type paginationProp = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: paginationProp) {
    
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <Stack
    sx={{
        paddingTop: 4,
        paddingBottom: 4,
      }}
      alignItems="center"
      spacing={1}
      justifyContent="center"
      direction="row"
    >
      <Button
        variant="contained"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Typography>
        Page {currentPage} of {totalPages}
      </Typography>
      <Button
        variant="contained"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Stack>
  );
}
