import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/delivery';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';

// Import components
import HomePage from './components/HomePage.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Order from './components/Order.vue';
import Checkout from './components/Checkout.vue';
import Delivery from './components/Delivery.vue';
import AboutUs from './components/AboutUs.vue';

const app = createApp(App);

// Register components globally
app.component('HomePage', HomePage);
app.component('Login', Login);
app.component('Register', Register);
app.component('Order', Order);
app.component('Checkout', Checkout);
app.component('Delivery', Delivery);
app.component('AboutUs', AboutUs);

// Configure axios defaults
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

// Get CSRF token from meta tag and set it as a default header
const token = document.querySelector('meta[name="csrf-token"]');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found');
}

// Add CSRF token to all requests
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').content;

// Add withCredentials for authentication
axios.defaults.withCredentials = true;

router.beforeEach((to, from, next) => {
  // If trying to access admin routes
  if (to.path.startsWith('/admin')) {
    if (to.path === '/admin/login') {
      next();
      return;
    }
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      next('/admin/login');
      return;
    }
    next();
    return;
  }

  // For non-admin routes
  const publicPages = ['/login', '/register', '/', '/about-us'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/login');
    return;
  }

  next();
});

// Use router and store
app.use(router);
app.use(store);

app.config.globalProperties.$axios = axios;

app.mount('#app');
