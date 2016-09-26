
// -- Получить новый хэш ---
var hash; 
function simple_hash() { 
  var now = new Date(); 
   hash = now.getTime();  
}
     
function disabled_with_timeout(elem,time) {  
 elem.prop("disabled",true);
 setTimeout( function (){
  elem.prop("disabled",false);
 },time * 1000); 
}
     
