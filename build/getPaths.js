/**
 * Created by wuhao on 2016/12/4.
 */
var glob = require('glob');
var path = require('path');
function getEntry(globPath) {
  var entries = {}, basename, relative;
  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    relative = entry.split('/').splice(3);
    relative.splice(relative.length - 1, 1);
    if (relative.length == 0) {
      entries['index'] = entry;
    } else {
      entries[relative.join('/') + '/' + basename] = entry;
    }
  });
  return entries;
}
module.exports = getEntry;
