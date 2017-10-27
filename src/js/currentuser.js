import axios from 'axios';

(async () => {
  const result = await axios.post('/isLogin');
  console.log(2222222);
  if (!result.status) {
    window.location.href = '/login';
  }
})();
