import LoginPage from "../pages/Login";
import AgreementsPage from "../pages/Agreements";
import ComingsPage from "../pages/Comings";
import LogoutPage from "../pages/Logout";
import Page404 from "../pages/Page404";
import CashboxPage from "../pages/Cashbox";


export const privateRoutes = [
  {
    'path': 'comings',
    'name': 'Приходы',
    'component': <ComingsPage />,
    'exact': true,
    'inMenu': true,
  },
  {
    'path': 'agreements',
    'name': 'Договоры',
    'component': <AgreementsPage />,
    'exact': true,
    'inMenu': true,
  },
  {
    'path': 'cashbox',
    'name': 'Касса',
    'component': <CashboxPage />,
    'exact': true,
    'inMenu': true,
  },
  {
    'path': 'logout',
    'name': 'Выход',
    'component': <LogoutPage />,
    'exact': true,
    'inMenu': false,
  },
  {
    'path': '*',
    'name': '404',
    'component': <Page404 />,
    'exact': true,
    'inMenu': false,
  },
]

export const publicRoutes = [
  {
    'path': 'auth',
    'name': 'Авторизация',
    'component': <LoginPage />,
    'exact': true,
    'inMenu': true,
  },
  // {
  //   'path': '*',
  //   'name': '404',
  //   'component': <LoginPage />,
  //   'exact': true,
  //   'inMenu': false,
  // },
]