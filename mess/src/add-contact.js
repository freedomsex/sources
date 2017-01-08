
var add_contact = { 
 
    sync_taglist: 0,
  
    init: function () {              
        $('.add_contact').on('click',add_contact.action.add);                           
    },    
    ajax: {   
        add: function (tag) {                     // alert(tag);        
            $.post('/tag/contact/', { tag: tag });                   
        }           
    },        
    action: {  
        add: function () {                                
            $('.add_contact').removeClass('active');   
            $(this).addClass('active');            
            add_contact.ajax.add($(this).data('tag'));  
        }                                       
    }     
}          

