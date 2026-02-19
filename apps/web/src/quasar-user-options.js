import { Notify } from 'quasar';
import './css/app.scss';

export default {
  config: {
    notify: {
      position: 'top-right',
      timeout: 2800,
      classes: 'app-notify',
      icon: 'none'
    }
  },
  plugins: {
    Notify
  }
};
