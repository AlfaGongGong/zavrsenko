// API base URL — update this to your production domain when deploying
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'
  : `${window.location.protocol}//${window.location.host}`;
const APP_NAME = 'GG Gamestore';
