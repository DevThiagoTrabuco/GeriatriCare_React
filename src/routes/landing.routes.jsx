import LandingPage from "../pages/landingPage/LandingPage";
import AboutUs from "../pages/landingPage/AboutUs";
import Pricing from "../pages/landingPage/Pricing";
import Support from "../pages/landingPage/Support";
import ContactUs from "../pages/landingPage/ContactUs";

export const routes = [
    { path: '/', element: <LandingPage /> },
    { path: '/about', element: <AboutUs /> },
    { path: '/pricing', element: <Pricing /> },
    { path: '/support', element: <Support /> },
    { path: '/contact', element: <ContactUs /> },
]