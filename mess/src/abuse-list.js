var abuse_list_component = new Vue({
    el: '#abuse_list_component',
    data: {
        message: 'Hello Vue!',
        isFormShow: false,
    },
    methods: {
        show_form: function (event) {
            console.log("isFormShow",this.isFormShow);
            this.isFormShow = !this.isFormShow;
        }
    }
});

// -- Список жалоб на пользователя ---
var abuse_list = {     
 
    is_load: null,  // abuse_is_load
    
    init: function () 
    {          
       //$('#abuse_button_show_link span').click( function (){ form_public.show_form(); });
       //$('#abuse_list_show_link').click( function (){ abuse_list.show_list();  }); 
                                        
       $('#abuse_button_post').click( function (){ form_public.abuse_post(); });
       $('#abuse_captcha_post').click( function (){ form_public.abuse_post(); });
       
       abuse_list.ajax_load();
                             
    },             
 
    ajax_load: function () 
    {      
        $.get( '/ajax/post_abuse.php',{ id: tid }, abuse_list.on_load); 
    } , 
     
    on_load: function (data) 
    {     
         abuse_list.is_load = 1;  // cache/public/user_abuse/abuse_'+tid+'.html   
         abuse_list.set_count();
           
         if( data.indexOf('div') > 0 )
         {  
             $('#abuse_list').html( data );                            
             $('.abuse_list_line').click( function ()
             {
                 $('i',this).show('fade') ;   
                 $.post( '/ajax/post_abuse.php',{ id: tid, agree: $(this).data('number') } ); 
                 $(this).unbind('click'); 
             });
                  
             abuse_list.set_count(); 
         }    
         
    } ,
 
    red_link: function (lock) 
    {   
        if (lock) 
        {
            $('#abuse_list_show_link').addClass('red_link');
        }
        else
            $('#abuse_list_show_link').removeClass('red_link');   
    },
 
    get_count: function () 
    {   
        return $('.abuse_list_line').length ;   
    },
 
    set_count: function (count) 
    {   
        if (abuse_list.get_count()) 
        {    
            $('#abuse_list_show_link').text('Есть замечания ('+ abuse_list.get_count() +')'); 
            abuse_list.red_link(1);
        }
        else
        {   
            $('#abuse_list_show_link').text('Замечаний нет'); 
            abuse_list.red_link(0);
         
        }    
    },
 
    show_list: function () 
    {   
        if (!$('#abuse_list').is(':visible')) 
        {                                
            $('#abuse_list').show('blind'); 
            form_public.public_button(1);   
        } 
        else 
        {                                
            $('#abuse_list').hide('blind');
            form_public.public_button(0); 
            form_public.hide_form(); 
        } 
    },    
 
    status_link: function (show) 
    {             
        if (show) 
        {        
            $('#abuse_list_show_link').show('blind'); 
        } 
        else
        {      
            $('#abuse_list_show_link').hide('blind'); 
        }         
    }    
    
        
     
}

