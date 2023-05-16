import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tenants from "../views/Tenants/Tenants.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Users from "../views/Users/Users.vue";
import Onboarding from "../views/Onboarding.vue";

// const shouldLoggedIn = () => (to, from, next) => {
//   console.log(localStorage.getItem("accessToken"));
//   if (!localStorage.getItem("accessToken")) {
//     return next("sign-in");
//   } else {
//     return next();
//   }
// };


const routes = [
  {
    path: "/",
    name: "초기페이지",
    redirect: "/onboarding",
  },
  {
    path: "/onboarding",
    name: "온보딩",
    component: Onboarding,
    // beforeEnter: shouldLoggedIn(),
  },
  {
    path: "/dashboard",
    name: "대시보드",
    component: Dashboard,
    // beforeEnter: shouldLoggedIn(),
  },

  {
    path: "/tenant",
    name: "테넌트 관리",
    component: Tenants,
    // beforeEnter: shouldLoggedIn(),

  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
    // beforeEnter: shouldLoggedIn(),

  },
  {
    path: "/profile",
    name: "프로필",
    component: Profile,
    // beforeEnter: shouldLoggedIn(),

  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,

  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,


  },
  {
    path: "/users",
    name: "유저 관리",
    component: Users,
    // beforeEnter: shouldLoggedIn(),

  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
