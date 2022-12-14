import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import signup from '@/views/signup.vue'
import todo from '@/views/todo.vue'
import notFound from '@/views/notFoundPage.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
    path: '/',
    name: 'todo',
    component: todo,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/404",
    name: "notFound",
    component: notFound
  },
  {
    path: "/:catchAll(.*)",
    redirect: "404"
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//to keep user logged in on reload
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
        (user) => {
          removeListener();
          resolve(user);
        },
      reject
    )
  })
}

//navigation guard
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    }else{
      // alert("You do not have access!")
      next("/signup")
    }
  } else {
    next();
  }
})

export default router
