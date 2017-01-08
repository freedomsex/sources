      
var user_tag = { 
                    
    list: [],
    idls: [], 
    sync:  0, 
    count: 0,
  
    init: function () {                                           
        user_tag.list  = storage.array.load('user_tag_list'); 
        user_tag.sync  = storage.load('sync_taglist');     
        user_tag.count = storage.load('user_tag_count');          
    },        
    action: {    
        store: function () {                             
            storage.array.save('user_tag_list',user_tag.list);
            storage.save('user_tag_count',user_tag.count); 
            storage.save('sync_taglist',user_tag.sync);                 
        },    
        ids: function () {    
            user_tag.idls = [];               
            for (var i = 0; i < user_tag.list.length; i++) {
                if (user_tag.list[i].id)          
                    user_tag.idls.push(user_tag.list[i].id);
            }                                                
            return user_tag.idls;              
        }                      
    }, 
    option: {                                  
        set_count: function () {                     
            if (user_tag.list.length)
                $('#user_desire_count').text(user_tag.list.length); 
        }
    }     
}          

