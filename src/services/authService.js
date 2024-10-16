import API_ROUTES from "../constants/apiEndpoints";
import axiosInstance from "../utils/axiosInstance";

export const registerUser = async (data) => {
  try {
    const response = await axiosInstance.post(API_ROUTES.REGISTER, data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post(API_ROUTES.LOGIN, data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.get(API_ROUTES.LOGOUT);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const authenticateUser = async () => {
  try {
    const response = await axiosInstance.get(API_ROUTES.AUTH);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const fetchAllUser = async (page, limit) => {
  try {
    const response = await axiosInstance.get(
      `${API_ROUTES.GET_ALL_USERS}?page=${page}&limit=${limit}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
export const updateUserStatus = async (data) => {
  try {
    console.log("data is", data);
    const response = await axiosInstance.post(
      `${API_ROUTES.UPDATE_STATUS_USER}`,
      data
    );
    return response.data.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const toggleUserRole = async (data) => {
  try {
    console.log("data is", data);
    const response = await axiosInstance.post(
      `${API_ROUTES.UPDATE_ROLE_USER}`,
      data
    );
    return response.data.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const fetchAdminDashboardData = async () => {
  try {
    const response = await axiosInstance.get(
      `${API_ROUTES.GET_ADMIN_DASHBOARD_DATA}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getAllBookingsAdmin = async () => {
  try {
    const response = await axiosInstance.get(
      `${API_ROUTES.GET_ADMIN_BOOKING_DATA}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const changePassword = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${API_ROUTES.CHANGE_PASSWORD}`,
      data
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "error while changing passowrd please try again ",
    };
  }
};

export const updateUserProfile = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${API_ROUTES.UPDATE_USER_PROFILE}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      success: false,
      message: "error while updating please try again ",
    };
  }
};
