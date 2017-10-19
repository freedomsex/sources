
// -- Получить новый хэш ---
function getTimestamp() {
  var now = new Date();
  return now.getTime();
}

var hash;
function simple_hash() {
  hash = getTimestamp();
}

function disabled_with_timeout(elem,time) {
 elem.prop("disabled",true);
 setTimeout( function (){
  elem.prop("disabled",false);
 },time * 1000);
}

