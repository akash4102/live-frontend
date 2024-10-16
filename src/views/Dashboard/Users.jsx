import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DataTable from "react-data-table-component";
import {
  fetchAllUser,
  updateUserStatus,
  toggleUserRole,
} from "../../services/authService";
import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import "./index.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [totalUserRows, setTotalUserRows] = useState(0);
  const [totalAdminRows, setTotalAdminRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const fetchUsers = async (page, limit) => {
    setLoading(true);
    try {
      const response = await fetchAllUser(page, limit);
      const adminsList = response.users.filter((user) => user.role === "admin");
      const usersList = response.users.filter((user) => user.role !== "admin");

      setAdmins(adminsList);
      setUsers(usersList);
      setTotalAdminRows(adminsList.length);
      setTotalUserRows(usersList.length);
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, limit);
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePerRowsChange = async (newLimit) => {
    setLimit(newLimit);
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await updateUserStatus({ userId, status: newStatus });
      fetchUsers(page, limit);
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const handleRoleToggle = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      await toggleUserRole({ userId, role: newRole });
      fetchUsers(page, limit);
    } catch (error) {
      console.error("Error toggling role", error);
    }
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <DropdownButton
          title={row.status === "active" ? "active" : "disable"}
          variant={row.status === "active" ? "success" : "danger"}
          onSelect={(newStatus) =>
            row._id !== currentUser._id &&
            handleStatusChange(row._id, newStatus)
          }
          disabled={row._id === currentUser._id}
        >
          <Dropdown.Item eventKey="active">Active</Dropdown.Item>
          <Dropdown.Item eventKey="disable">Disable</Dropdown.Item>
        </DropdownButton>
      ),
      sortable: true,
    },
    { name: "Phone", selector: (row) => row.phone, sortable: true },
    {
      name: "Role",
      selector: (row) => row.role,
      cell: (row) => (
        <Button
          variant={row.role === "admin" ? "warning" : "primary"}
          onClick={() =>
            row._id !== currentUser._id && handleRoleToggle(row._id, row.role)
          }
          disabled={row._id === currentUser._id}
        >
          {row.role === "admin" ? "Make User" : "Make Admin"}
        </Button>
      ),
      sortable: true,
    },
  ];

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10} className="users p-4">
            <h1 className="mb-4">All Registered Users</h1>
            <DataTable
              title="Users"
              columns={columns}
              data={users}
              progressPending={loading}
              pagination
              paginationServer
              paginationTotalRows={totalUserRows}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              paginationRowsPerPageOptions={[10, 20, 30]}
              className="table-striped"
            />
            <h1 className="mt-5 mb-4">All Admins</h1>
            <DataTable
              title="Admins"
              columns={columns}
              data={admins}
              progressPending={loading}
              pagination
              paginationServer
              paginationTotalRows={totalAdminRows}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              paginationRowsPerPageOptions={[10, 20, 30]}
              className="table-striped"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminUsers;
