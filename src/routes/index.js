import DefaultLayout from "../layout/DefaultLayout";
import SettingLayout from "../layout/SettingLayout";
import Home from "../pages/Home";
import ProductsPage from "../pages/Products/Products";
import ProductsManagement from "../pages/setting/ProductsManagement";
import Profile from "../pages/setting/Profile";
import Cart from "../pages/Cart";
const publicRoutes = [
  {
    path: '/',
    component: Home,
    layout: DefaultLayout,
    index: true,
  },  
  {
    path: '/products',
    component: ProductsPage,
    layout: DefaultLayout,
  },
  {
    path:'/cart',
    component:Cart,
    layout: DefaultLayout,
  }
]

const privateRoutes = [
  {
    path: '/setting/profile',
    component: Profile,
    layout: DefaultLayout,
    subLayout: SettingLayout,
  },
  {
    path:'setting/products',
    component: ProductsManagement,
    layout: DefaultLayout,
    subLayout: SettingLayout,
  },

]

export { publicRoutes, privateRoutes };