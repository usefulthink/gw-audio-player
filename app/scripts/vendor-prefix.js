// adapted from Lea Verou: http://goo.gl/vl9mh
module.exports = (function () {
  var r = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
    s = document.getElementsByTagName('script')[0].style;

  for(var p in s) { if(r.test(p)) { return p.match(r)[0]; } }

  if('WebkitOpacity' in s) return 'Webkit';
  if('KhtmlOpacity' in s) return 'Khtml';

  return '';
} ());
