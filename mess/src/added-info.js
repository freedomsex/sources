        
// -- Подстановка дополнительной информации в отправку сообщения ---
var added_info = {    
        
    init: function () 
    {     
        if (user_sex && (!user_name || !user_age || !user_city))
        {   
            $('#form_post_mess').append('<div id="added_info_block"></div>');//{ hash: 15234 }, 
            $('#added_info_block').load('/static/htm/added_info.html #added_load', added_info.onload); 
        } 
                                             
    } , 
    
    onload: function () 
    {              
        var post_form = $('#form_post_mess');                  
        $('#added_info_btn').click( function (){ added_info.show(); }); 
        
        added_info.generate(); 
        added_info.visible(); 
        name_suggest.init();   // [!!!]
    } ,  
    
    generate: function () 
    {                                
        var print_age  = user_age  ? user_age  : auto_gen.age(human_age);
        var print_name = user_name ? user_name : auto_gen.name(user_sex);
        var print_city = user_city ? user_city : human_city;   
                          
        $('#added_name').val(print_name);
        $('#added_city').val(print_city);
        $('#added_age').val(print_age);  
    } ,  
    
    visible: function () 
    {                                                  
        added_info.generate();  
        $('#added_info_btn').show();
    } ,
     
    show: function () 
    {                                                      
        $('#added_info_btn').hide('blind');                  
        $('#added_info').show('blind'); 
        
    }  

}

