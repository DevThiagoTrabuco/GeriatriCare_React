import ResidentsLayout from "../layouts/dashboard/ResidentsLayout";
import EmployeesLayout from "../layouts/dashboard/EmployeesLayout";
import FinanceLayout from "../layouts/dashboard/FinanceLayout";
import Overview from "../pages/dashboard/Overview";
import Settings from "../pages/dashboard/Settings";

import ResidentsList from "../pages/dashboard/residents/List";
import Profile from "../pages/dashboard/residents/Profile";
import ResidentsRegister from "../pages/dashboard/residents/Register";
import Monthly from "../pages/dashboard/appointments/MonthlyAppointments";
import Daily from "../pages/dashboard/appointments/DailyAppointments";
import EmployeesList from "../pages/dashboard/employees/List";
import EmployeesRegister from "../pages/dashboard/employees/Register";
import DebtsOverview from "../pages/dashboard/finance/Overview";
import DebtsRegister from "../pages/dashboard/finance/Register";

export const routes = [
    { path: "/dashboard", element: <Overview /> },
    { path: "/configuracoes", element: <Settings /> },
    {
        path: "/residentes",
        element: <ResidentsLayout />,
        children: [
            { path: "", element: <ResidentsList /> },
            { path: "cadastrar", element: <ResidentsRegister /> },
            { path: "perfil/:id", element: <Profile /> },
        ],
    },
    { path: "/agendamentos/hoje", element: <Daily /> },
    { path: "/agendamentos/mes", element: <Monthly /> },
    {
        path: "/colaboradores",
        element: <EmployeesLayout />,
        children: [
            { path: "", element: <EmployeesList /> },
            { path: "cadastrar", element: <EmployeesRegister /> },
        ],
    },
    {
        path: "/financeiro",
        element: <FinanceLayout />,
        children: [
            { path: "", element: <DebtsOverview /> },
            { path: "cadastrar", element: <DebtsRegister /> },
        ],
    },
];