import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchHotelData,
  fetchRoomDetails,
  fetchUserBooking,
} from "../services/hotelService";
import { useAuthContext } from "./AuthContext";

const HotelContext = createContext();

export const useHotelContext = () => useContext(HotelContext);

export const HotelProvider = ({ children }) => {
  const { role, loggedIn } = useAuthContext();
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const fetchData = await fetchHotelData();

      const hotelsWithRoomDetails = await Promise.all(
        fetchData.data.map(async (hotel) => {
          const roomDetails = await Promise.all(
            hotel.rooms.map(async (roomId) => {
              try {
                const roomData = await fetchRoomDetails(roomId);
                if (
                  roomData.data.room.status === "available" ||
                  role == "admin"
                ) {
                  return roomData.data;
                }
                return null;
              } catch (error) {
                console.error(`Error fetching room ${roomId}:`, error);
                return null;
              }
            })
          );

          const availableRoomDetails = roomDetails.filter(
            (room) => room !== null
          );

          if (availableRoomDetails.length > 0) {
            setRooms((prevRooms) => [...prevRooms, ...availableRoomDetails]);
          }

          return { ...hotel, roomDetails: availableRoomDetails };
        })
      );

      setHotels(hotelsWithRoomDetails);
    } catch (error) {
      console.log(error, "Error fetching hotels and room details");
    } finally {
      setLoading(false);
    }
  };
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const fetchedBookings = await fetchUserBooking();
      if (fetchedBookings) {
        setBookings(fetchedBookings);
      }
      setLoading(false);
    } catch (error) {
      console.log(error, "fetch bookings error");
      setLoading(false);
    }
  };

  const bookHotel = async (hotelId, userId, checkInDate, checkOutDate) => {
    const newBooking = {
      id: bookings.length + 1,
      hotelId,
      userId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      status: "confirmed",
    };
    setBookings([...bookings, newBooking]);
  };
  useEffect(() => {
    if (loggedIn) {
      fetchBookings();
    }
    fetchHotels();
  }, []);

  return (
    <HotelContext.Provider
      value={{
        hotels,
        bookings,
        setBookings,
        bookHotel,
        fetchBookings,
        loading,
        rooms,
        fetchHotels,
        setLoading,
        setRooms,
      }}
    >
      {!loading && children}
    </HotelContext.Provider>
  );
};
