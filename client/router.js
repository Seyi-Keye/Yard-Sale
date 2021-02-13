import Main from './components/main/Main.jsx';
import Login from './components/Login.jsx';
import Raffle from './components/raffle/Raffle.jsx';

export default [
  {
    name: 'dashboard',
    path: '/dashboard',
    secured: true,
    component: Main,
    exact: true
  },
  {
    name: 'login',
    path: '/',
    secured: false,
    component: Login,
    exact: true
  },
  {
    name: 'raffle',
    path: '/raffle',
    secured: true,
    component: Raffle,
    exact: true
  }
]