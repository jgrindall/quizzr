import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '@/components/LoginPage';
import HomePage from '@/components/HomePage';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage
    }
  ]
});

const loginRoute = '/login';

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = [loginRoute];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    return next({
      path: loginRoute,
      query: {
        returnUrl: to.path
      }
    });
  }
  next();
});

export default router;
