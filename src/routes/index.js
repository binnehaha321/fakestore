import DefaultLayout from "../layout/DefaultLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductsPage from "../pages/Products";
import Profile from "../pages/Profile";

const publicRoutes = [
  {
    path: '/',
    component: Home,
    layout: DefaultLayout,
    index: true
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/products',
    component: ProductsPage,
    layout: DefaultLayout
  },
]

const privateRoutes = [
  {
    path: '/profile',
    component: Profile,
    layout: DefaultLayout
  },
]

export { publicRoutes, privateRoutes }