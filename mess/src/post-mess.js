   
 /* -- Установка динамической отправки формы ---  
 if( uid && user_sex ) $('#form_post_mess').bind('submit', function(){
  return post_mess();
 });  
    
 function post_mess( user,text ) { 
   if( !text ) text = $('#mess_text_val').val();
   if( !user ) user = tid;
    simple_hash();
                     
    
   $.post("/mailer/post/", {mess: text, id: user, hash: hash},  
    onAjaxSuccess );           
   
   function onAjaxSuccess(data) {       //  alert (data)     
    if( !data ) return 0;  
     var mess = JSON.parse( data );  
     if( mess.error == 'captcha' ) { 
      $('#form_post_mess').unbind('submit');
      $('#form_post_mess').submit(); }
     if( mess.saved == '1' ) {  
      load_mess( user,'reload' );
      $('#mess_text_val').val('');
       } 
     if( mess.error == 'reload' ) {     
      ft = 0; //alert ('reload')  
      $('#form_post_mess').unbind('submit');
      $('#form_post_mess').submit();            
     }                      
   }            
    return false;
 }             */ 

