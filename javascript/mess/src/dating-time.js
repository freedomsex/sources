 
// -- Время свиданий ---
var dating_time = {
     
    init: function () 
    {                            
        dating_time.show();
        dating_time.load();
    } ,
    
    show: function () 
    {                        
        if (online < 777) 
        {           
            $('#button_videochat').show();
        } 
        else 
        if (online < 500000 && dating != '00:00') 
        {    
            $('#user_dating_time').text(dating);
            $('#user_dating_time_block').show();
        }  
    } ,  
    
    load: function () 
    {    
        if( uid ) 
        {    
            $('#dating_time_post_button').on('click',dating_time.ajax.save);
         
            var dating_hour = cookie_storage.get_cookie('dating_hour');    
            if (dating_hour)     
                $("#dating_hour :contains('"+dating_hour+"')").attr("selected", "selected");
                
            var dating_minut = cookie_storage.get_cookie('dating_minut') ;  
            if (dating_minut)
                $("#dating_minut :contains('"+dating_minut+"')").attr("selected", "selected"); 
        }  
        else
            $('#set_dating_time input').prop("disabled",true);  
    
    } , 
    
    ajax: { 
    
        save: function () 
        {      
            var time_str = $('#dating_hour').val().trim() + ':' +  $('#dating_minut').val().trim() ; 
            $.get('/ajax/post_abuse.php',{dating_time: time_str, hash: hash},dating_time.ajax.success); 
        } ,    
    
        success: function (data) 
        {   
            cookie_storage.set_cookie('dating_hour', $('#dating_hour').val(), 259200);
            cookie_storage.set_cookie('dating_minut',$('#dating_minut').val(),259200); 
            $('#saved_dating').show('fade');
            $('#saved_dating').delay(2000).hide('fade'); 
        } 
    }  
}      

