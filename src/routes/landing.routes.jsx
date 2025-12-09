import LandingPage from "../pages/landingPage/LandingPage";
import AboutUs from "../pages/landingPage/AboutUs";
import Pricing from "../pages/landingPage/Pricing";
import ContactUs from "../pages/landingPage/ContactUs";

export const routes = [
    { path: '/', element: <LandingPage /> },
    { path: '/about', element: <AboutUs /> },
    { path: '/pricing', element: <Pricing /> },
    { path: '/contact', element: <ContactUs /> },
]