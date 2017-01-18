
var extra_button = {    
         
    init: function () 
    {     
       $('.extra_button.blue').on('click',extra_button.action.click);  
    } ,
    
    ajax: {    
        post: function (id) {            
            $.post( '/userinfo/setbun/', { id: id } );
            extra_button.option.saved(id); 
            extra_button.option.added(id);  
        }  
    } ,
 
    action: { 
        click: function () {          
            extra_button.ajax.post($(this).data('num'));
            $(this).off('click'); 
            return false;      
        }  
        
    }, 
    option:  {   
        saved: function (id) {                             
            $('#extra_saved'+id).show('fade');
            $('#extra_saved'+id).delay(2000).hide('fade');
        },   
        added: function (id) {                             
            var bun = $('#extra_bun'+id).text()*1;              
            $('#extra_bun'+id).text(bun+20);              
            $('#extra_add'+id).text('+'); 
        },  
    }  

}  

