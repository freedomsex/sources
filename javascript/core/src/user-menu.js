                                 
var user_menu = { 
  
    init: function () {              
                       
    },    
    ajax: {  
                  
    },  
    action: {     
        sets: {            
            search: function () {
                var str = '/index.php?view=simple&town='+userinfo.data.town+
                   '&years_up='+userinfo.data.years_up+'&years_to='+userinfo.data.years_to+''+
                   '&who='+userinfo.data.who+''; // alert(userinfo.data.years_up)
                $('#menu_user_button_search').attr('href',str);  
            },            
            contact: function () {       
                //storage.save('contact',0);
                //storage.load('contact');
                var str = '/mail.php'; 
                $('#menu_message').attr('href',str);  
            } 
        }                               
    },  
    option: {     
        act: {     
            show_reg: function () {  
                $('#menu_user_action_new').show();  
                $('#menu_user_action_block').hide(); 
            },   
            show_opt: function () { 
                $('#menu_user_action_new').hide();  
                $('#menu_user_action_block').show();
            }  
        },    
        se: function () {  
          
        }                                   
    }    
}          

