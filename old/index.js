
   
$( document ).ready(function() 
{                       
    storage.init();
    result_list.init();  
    visited.init();
});



// -- Список контактов ---
var result_list = {
                  
    init: function () 
    {                                   
        //result_list.ajax.load_visited(); 
    } , 
    
    ajax: {   
    
        load_visited: function () 
        {                               
            $.get( '/contact/visited/'+ 'uid' +'/', result_list.ajax.parse_visited);
        } ,  
    
        parse_visited: function (data) 
        {                                            // alert(typeof(result_list.visited))
            if (data) {
                result_list.visited = JSON.parse(data);
            }                    
        }  
    } ,
 
    action: {
    
        visited: function (list) 
        {                  
            if (list && list.length)
                $('.user').each(result_list.action.select);       
        } , 
    
        select: function (i,element) 
        {                 
            var tid = $(element).data('num')+'';
            if (tid != uid)               // alert(typeof());  return 0;
                if (visited.list.indexOf(tid) < 0)
                    $('i', $(element)).addClass('list_user_new')
                else       
                    $('i', $(element)).removeClass('list_user_new')
        }  
        
    } 
} 

