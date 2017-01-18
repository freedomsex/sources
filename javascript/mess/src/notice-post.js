          
// -- Предупреждение ф форме отправки сообщения ---        
var notice_post = {
      
    show: function () 
    {       
        //if ($.urlParam('notice_alert')) notice_post.alert(); 
        if ($('#notice_post').text().trim().length > 5) 
            $('#notice_post').show('clip'); 
    }, 
    
    alert: function () 
    {       
        $('#notice_post').toggleClass("notice_post notice_alert"); 
    } 
      
} 

