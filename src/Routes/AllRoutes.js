import Home from "../views/Home";
import Contact from "../views/Contact";
import About from "../views/About";
import AllHotels from "../views/AllHotel";
import HotelDetails from "../views/HotelDetails";
import Profile from "../views/Profile";
import Bookings from "../views/Bookings";
import Register from "../views/Register";
import Login from "../views/Login";
import NotFound from "../views/NotFound";
import RoomListing from "../views/room/RoomListing";
import AdminDashboard from "../views/Dashboard";
import AdminBookings from "../views/Dashboard/Bookings";
import AdminHotels from "../views/Dashboard/Hotels";
import AdminUsers from "../views/Dashboard/Users";
import HotelManagement from "../views/HotelManagement";
import RoomManagement from "../views/RoomManagement";
import AddHotel from "../views/AddHotel";
import AdminProfile from "../views/Dashboard/Profile";

export const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/browse-all-rooms",
    component: RoomListing,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/about-us",
    component: About,
  },
  {
    path: "/all-hotels",
    component: AllHotels,
  },
  {
    path: "/hotel/:hotelId",
    component: HotelDetails,
  },
  {
    path: "*",
    component: NotFound,
  },
];

export const privateRoutes = [
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/find-booking",
    component: Bookings,
  },
];

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    component: AdminDashboard,
  },
  {
    path: "/admin/bookings",
    component: AdminBookings,
  },
  {
    path: "/admin/hotels",
    component: AdminHotels,
  },
  {
    path: "/admin/users",
    component: AdminUsers,
  },
  {
    path: "/admin/edit-hotel/:hotelId",
    component: HotelManagement,
  },
  {
    path: "/admin/edit-room/:hotelId",
    component: RoomManagement,
  },
  {
    path: "/admin/add-new-hotel",
    component: AddHotel,
  },
  {
    path: '/admin/profile',
    component: AdminProfile,
  }
];

export const restrictedRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
];
