import ResidentsLayout from "../layouts/dashboard/ResidentsLayout";
import EmployeesLayout from "../layouts/dashboard/EmployeesLayout";
import FinanceLayout from "../layouts/dashboard/FinanceLayout";
import StorageLayout from "../layouts/dashboard/StorageLayout";
import AppointmentsLayout from "../layouts/dashboard/AppointmentsLayout";
import ChargesLayout from "../layouts/dashboard/ChargesLayout";
import DebtsLayout from "../layouts/dashboard/DebtsLayout";

import Overview from "../pages/dashboard/Overview";

import ResidentsList from "../pages/dashboard/residents/List";
import Profile from "../pages/dashboard/residents/Profile";
import ResidentsRegister from "../pages/dashboard/residents/Register";
import Monthly from "../pages/dashboard/appointments/MonthlyAppointments";
import Daily from "../pages/dashboard/appointments/DailyAppointments";
import StorageList from "../pages/dashboard/storage/List";
import StorageRegister from "../pages/dashboard/storage/Register";
import EmployeesList from "../pages/dashboard/employees/List";
import EmployeesRegister from "../pages/dashboard/employees/Register";
import ChargesOverview from "../pages/dashboard/finance/charges/Overview";
import ChargesRegister from "../pages/dashboard/finance/charges/Register";
import DebtsOverview from "../pages/dashboard/finance/debts/Overview";
import DebtsRegister from "../pages/dashboard/finance/debts/Register";

export const routes = [
    { path: "/dashboard", element: <Overview /> },
    {
        path: "/residentes",
        element: <ResidentsLayout />,
        children: [
            { path: "", element: <ResidentsList /> },
            { path: "perfil", element: <Profile /> },
            { path: "cadastrar", element: <ResidentsRegister /> },
        ],
    },
    {
        path: "/agendamentos",
        element: <AppointmentsLayout />,
        children: [
            { path: "", element: <Daily /> },
            { path: "calendario-mes", element: <Monthly /> },
        ],
    },
    {
        path: "/estoque",
        element: <StorageLayout />,
        children: [
            { path: "", element: <StorageList /> },
            { path: "cadastrar", element: <StorageRegister /> },
        ],
    },
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
            {
                path: "charges",
                element: <ChargesLayout />,
                children: [
                    { path: "overview", element: <ChargesOverview /> },
                    { path: "register", element: <ChargesRegister /> },
                ],
            },
            {
                path: "debts",
                element: <DebtsLayout />,
                children: [
                    { path: "overview", element: <DebtsOverview /> },
                    { path: "register", element: <DebtsRegister /> },
                ],
            },
        ],
    },
];
