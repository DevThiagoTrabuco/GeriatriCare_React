import Login from '../pages/auth/Login'
import ForgotPassword from '../pages/auth/ForgotPassword'

export const routes = [
    { path: '/login', element: <Login /> },
    { path: '/recovery', element: <ForgotPassword /> },
]