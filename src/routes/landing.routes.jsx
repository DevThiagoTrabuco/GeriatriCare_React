import LandingPage from "../pages/landingPage/LandingPage";
import ContactUs from "../pages/landingPage/ContactUs";

export const routes = [
    { path: '/', element: <LandingPage /> },
    { path: '/contact', element: <ContactUs /> },
]