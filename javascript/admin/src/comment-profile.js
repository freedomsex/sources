
var comment_profile = {    
         
    init: function () 
    {                               
        comment_profile.ajax.load();  
    } ,  
    
    ajax: {   
    
        load: function () 
        {            
            $("#comment_hint_block").load(
                "/static/htm/admin/userinfo_comment_line.html #comment_hint_cont",
                comment_profile.ajax.on_load
            );  
        } ,
        
        on_load: function () 
        {                                  
            var elem = $('#comment_hint_cont');
            elem.detach();
            elem.appendTo($('#comment_hint_block'));
            $('#comment_input_send').on('click',comment_profile.ajax.post);
            $('#comment_hint_button').on('click',comment_profile.option.toggle);
            $('#comment_hint_cont div').on('click',comment_profile.action.print);                            
        } ,  
    
        post: function () 
        {            
            var text = $('#comment_input_text').val();   
            var user = $('#comment_input_user').val();
            
            $.post("/userinfo/setcomm/", { text: text, id: user } );
            comment_profile.option.saved();  
        }     
          
    } ,
     
    option:  {   
     
        toggle: function () 
        {                           
            $('#comment_hint_cont').toggle(); 
        } , 
     
        saved: function () 
        {                             
            $('#comment_hint_saved').show('fade');
            $('#comment_hint_saved').delay(2000).hide('fade');
        }  
    } ,
     
    action:  {  
          
        print: function () 
        {   
            $('#comment_input_text').val($(this).text()); 
            $('#comment_hint_button').click();
        }
      
    }

}   

