import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/home/index.vue';
import CompanyIntroduction from '@/views/about/company-introduction/index.vue';
import Algorithm from '@/views/algorithm/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      redirect: '/about/companyIntroduction',
      children: [
        {
          path: '/about/companyIntroduction',
          name: 'companyIntroduction',
          component: CompanyIntroduction,
        },
      ],
    },
    {
      path: '/algorithm',
      name: 'algorithm',
      component: Algorithm,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
