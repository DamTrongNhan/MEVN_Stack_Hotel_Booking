import { createWebHistory, createRouter } from "vue-router";
const routes = [
  {
    path: "/",
    name: "main",
    props: true,
    component: () => import("../views/pages/MainView.vue"),
    children: [
      {
        path: "",
        name: "booking",
        props: true,
        component: () => import("../views/pages/Booking.vue"),
      },
      {
        path: "/result",
        name: "result",
        props: true,
        component: () => import("../views/pages/RoomResults.vue"),
      },
      {
        path: "/detail",
        name: "detail",
        props: true,
        component: () => import("../views/pages/RoomDetails.vue"),
      },
      {
        path: "/reservation",
        name: "Reservation",
        props: true,
        component: () => import("../views/pages/Reservation.vue"),
      },
      {
        path: "/payment",
        name: "Payment",
        props: true,
        component: () => import("../views/pages/Payment.vue"),
      },
      {
        path: "/about",
        name: "about",
        component: () => import("../views/pages/AboutView.vue"),
      },
      {
        path: "/image",
        name: "image",
        component: () => import("../views/pages/PhotosView.vue"),
      },
    ],
  },
  {
    path: "/signIn",
    name: "signIn",
    component: () => import("../views/auth/SignInView.vue"),
  },
  {
    path: "/signUp",
    name: "signUp",
    component: () => import("../views/auth/SignUpView.vue"),
  },
  {
    path: "/changePassword",
    name: "changePassword",
    component: () => import("../views/auth/ChangePassword.vue"),
  },
  {
    path: "/admin",
    name: "admin-main",
    component: () => import("../views/admin/admin.main.vue"),
    children: [
      {
        path: "",
        name: "admin-home",
        component: () => import("../views/admin/admin.home.vue"),
      },
      {
        path: "/admin-photos",
        name: "admin-photos",
        component: () => import("../views/admin/admin.photos.vue"),
      },
      {
        path: "/admin-feedback",
        name: "admin-feedback",
        component: () => import("../views/admin/admin.feedback.vue"),
      },
      {
        path: "/admin-history",
        name: "admin-history",
        component: () => import("../views/admin/admin.history.vue"),
      },
      {
        path: "/admin-settings",
        name: "admin-settings",
        component: () => import("../views/admin/admin.settings.vue"),
      },
      {
        path: "/admin-users",
        name: "admin-users",
        component: () => import("../views/admin/admin.users.vue"),
      },
      {
        path: "/admin-users-create",
        name: "admin-users-create",
        component: () => import("../views/admin/admin.users.create.vue"),
      },
      {
        path: "/admin-users-detail/:id",
        name: "admin-users-detail",
        props: true,
        component: () => import("../views/admin/admin.users.detail.vue"),
      },
      {
        path: "/admin-users-edit/:id",
        name: "admin-users-edit",
        props: true,
        component: () => import("../views/admin/admin.users.edit.vue"),
      },
      {
        path: "/admin-users-adminList/",
        name: "admin-users-adminList",
        component: () => import("../views/admin/admin.users.adminList.vue"),
      },
      {
        path: "/admin-booking",
        name: "admin-booking",
        component: () => import("../views/admin/admin.booking.vue"),
      },
      {
        path: "/admin-booking-detail/:id",
        name: "admin-booking-detail",
        props: true,
        component: () => import("../views/admin/admin.booking.detail.vue"),
      },
      {
        path: "/admin-booking-edit/:id",
        name: "admin-booking-edit",
        props: true,
        component: () => import("../views/admin/admin.booking.edit.vue"),
      },
      {
        path: "/admin-booking-bin/",
        name: "admin-booking-bin",
        component: () => import("../views/admin/admin.booking.bin.vue"),
      },
      {
        path: "/admin-room",
        name: "admin-room",
        component: () => import("../views/admin/admin.room.vue"),
      },
      {
        path: "/admin-room-add",
        name: "admin-room-add",
        component: () => import("../views/admin/admin.room.add.vue"),
      },
      {
        path: "/admin-room-detail/:id",
        name: "admin-room-detail",
        props: true,
        component: () => import("../views/admin/admin.room.detail.vue"),
      },
      {
        path: "/admin-room-edit/:id",
        name: "admin-room-edit",
        props: true,
        component: () => import("../views/admin/admin.room.edit.vue"),
      },
    ],
  },
  {
    path: "/customer",
    name: "customer-main",
    component: () => import("../views/customer/customer.main.vue"),
    children: [
      {
        path: "",
        name: "customer-home",
        component: () => import("../views/customer/customer.home.vue"),
      },
      {
        path: "customer-personal",
        name: "customer-personal",
        props: true,
        component: () => import("../views/customer/customer.personal.vue"),
      },
      {
        path: "/customer-settings",
        name: "customer-settings",
        component: () => import("../views/customer/customer.settings.vue"),
      },
    ],
  },
  ,
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("../views/pages/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
