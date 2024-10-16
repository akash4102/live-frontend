import API_ROUTES from "../constants/apiEndpoints";
import axiosInstance from "../utils/axiosInstance";

export const fetchHotelData = async () => {
  try {
    const response = await axiosInstance.get(API_ROUTES.ALL_HOTEL_DATA);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const fetchUserBooking = async () => {
  try {
    const response = await axiosInstance.get(API_ROUTES.FETCH_USER_BOOKING);
    if (response.data.success) {
      return response.data.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
export const fetchHotelsByCity = async (query) => {
  try {
    const response = await axiosInstance.get(
      `${API_ROUTES.SEARCH}?search=${query}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return false;
  }
};
export const fetchRoomDetails = async (roomId) => {
  try {
    const response = await axiosInstance.get(
      `${API_ROUTES.ROOM_DETAILS}/${roomId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return false;
  }
};

export const bookHotel = async (data) => {
  try {
    const response = await axiosInstance.post(`${API_ROUTES.BOOK_HOTEL}`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return false;
  }
};

export const updateHotelDetails = async (hotelId, data) => {
  try {
    console.log("api,data", data);
    const response = await axiosInstance.post(
      `${API_ROUTES.UPDATE_HOTEL_DETAILS}/${hotelId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return false;
  }
};
export const addRoom = async (hotelId, roomData) => {
  try {
    const response = await axiosInstance.post(
      `${API_ROUTES.ADD_ROOM}/${hotelId}`,
      roomData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return false;
  }
};

export const updateRoomById = async (roomId, roomData) => {
  try {
    console.log("room id", roomId);
    console.log("room id", roomData);
    const response = await axiosInstance.post(
      `${API_ROUTES.UPDATE_ROOM_DETAILS}/${roomId}`,
      roomData
    );
    console.log("response is ", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return false;
  }
};

export const deleteRoomById = async (roomId) => {
  try {
    const response = await axiosInstance.delete(
      `${API_ROUTES.DELETE_ROOM}/${roomId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return false;
  }
};

export const addNewHotel = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${API_ROUTES.ADD_NEW_HOTEL}`,
      data,
      {
        "Content-Type": "multipart/form-data",
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return false;
  }
};
export const removeHotel = async (hotelId) => {
  try {
    const response = await axiosInstance.delete(
      `${API_ROUTES.REMOVE_HOTEL}/${hotelId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return false;
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await axiosInstance.post(
      `${API_ROUTES.UPDATE_BOOKING_STATUS}/${bookingId}`,
      { status }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return false;
  }
};

export const updateBookingDetails = async (bookingId, data) => {
  try {
    const response = await axiosInstance.post(
      `${API_ROUTES.UPDATE_BOOKING_DETAILS}/${bookingId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return false;
  }
};

export const addHotelReview = async (data) => {
  try {
    const response = await axiosInstance.post(
      `${API_ROUTES.ADD_HOTEL_REVIEW}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return false;
  }
};
