import * as Residents from "../layouts/dashboard/ResidentsLayout";
import * as Employees from "../layouts/dashboard/EmployeesLayout";
import * as Finance from "../layouts/dashboard/FinanceLayout";
import * as Storage from "../layouts/dashboard/StorageLayout";
import * as Appointments from "../layouts/dashboard/AppointmentsLayout";
import * as Charges from "../layouts/dashboard/ChargesLayout";
import * as Debts from "../layouts/dashboard/DebtsLayout";

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
        element: <Residents />,
        children: [
            { path: "", element: <ResidentsList /> },
            { path: "perfil", element: <Profile /> },
            { path: "cadastrar", element: <ResidentsRegister /> },
        ],
    },
    {
        path: "/agendamentos",
        element: <Appointments />,
        children: [
            { path: "", element: <Daily /> },
            { path: "calendario-mes", element: <Monthly /> },
        ],
    },
    {
        path: "/estoque",
        element: <Storage />,
        children: [
            { path: "", element: <StorageList /> },
            { path: "cadastrar", element: <StorageRegister /> },
        ],
    },
    {
        path: "/colaboradores",
        element: <Employees />,
        children: [
            { path: "", element: <EmployeesList /> },
            { path: "cadastrar", element: <EmployeesRegister /> },
        ],
    },
    {
        path: "/financeiro",
        element: <Finance />,
        children: [
            {
                path: "charges",
                element: <Charges />,
                children: [
                    { path: "overview", element: <ChargesOverview /> },
                    { path: "register", element: <ChargesRegister /> },
                ],
            },
            {
                path: "debts",
                element: <Debts />,
                children: [
                    { path: "overview", element: <DebtsOverview /> },
                    { path: "register", element: <DebtsRegister /> },
                ],
            },
        ],
    },
];
