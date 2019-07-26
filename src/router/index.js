import Vue from 'vue'
import Router from 'vue-router'
import {routes,appRouter} from './routes'

Vue.use(Router);
const router = new Router({
  routes: routes,
  mode: 'history',
  beforeEnter: (to, from, next) => {

  }
});
router.beforeEach((to, from ,next) => {
  console.log(to);
  // if(to.name === 'login'){
  //   if(typeof sessionStorage.user_name !== 'undefined'){
  //     sessionStorage.clear();
  //     window.location.href = '/HelloWorld';
  //     return;
  //   }else{
  //     next();
  //   }
  //   return;
  // }
  // if(to.name !== 'login' && typeof sessionStorage.user_name === 'undefined'){
  //   sessionStorage.clear();
  //   next({name: 'login'});
  // }
  next();
});

router.afterEach(to => {

});

export default router;

// export default new Router({
//   mode: 'history',
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
