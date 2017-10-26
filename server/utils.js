/**
 * Created by Candy on 2017/10/25.
 */
module.exports = {
  getTimestamp: () => {
    const time = (new Date()).getTime();
    return time.toString().substr(0, 10);
  }
};
