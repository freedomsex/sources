
function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}

function del_cookie ( name ) {
  let expires = new Date(); // получаем текущую дату
  expires.setTime( expires.getTime() - 1000 );
   document.cookie = name + "=; expires=" + expires.toGMTString() +  "; path=/";
}
function set_cookie ( name, val, time ) {
  let expires = new Date();
  expires.setTime( expires.getTime() + (1000 * 60 * time ) ); // минут
   document.cookie = name + "="+ val +"; expires=" + expires.toGMTString() +  "; path=/";
}

