import React from "react";
import DataTable from "react-data-table-component";
import { usePagination } from "./usePagination";

const UserTable = () => {
  const { users, totalRows, limit, setPage } = usePagination();

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
  ];

  return (
    <div>
      <DataTable
        title="Users"
        columns={columns}
        data={users}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        paginationPerPage={limit}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default UserTable;
