import Dashboard from './components/dashboard/Dashboard.jsx';
import Login from './components/Login.jsx';

export default [
  {
    name: 'dashboard',
    path: '/dashboard',
    secured: true,
    component: Dashboard,
    exact: true
  },
  {
    name: 'login',
    path: '/',
    secured: false,
    component: Login,
    exact: true
  }
]