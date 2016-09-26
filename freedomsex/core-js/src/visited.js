   
// -- Список посещенных страниц ---
var visited = {
                    
    sync: 0,       
    list: [],   
    
    init: function () 
    {    
        if (storage.enable) {
            visited.list = storage.array.load('visitor_list');    // alert(visited.list)
            result_list.action.visited(visited.list);
            visited.ajax.sync();   
        } 
    } , 
    
    ajax: {   
    
        sync: function () 
        {                               
            $.get( '/sync/visitor/'+ uid +'/', visited.ajax.parse_sync);
        } ,    
    
        parse_sync: function (data) 
        {                                             
            if (data) {
                visited.sync = JSON.parse(data);  // alert(visited.sync)             
                visited.action.check();             
            }                                         
        } , 
    
        load: function () 
        {                                 
            $.get( '/contact/visited/'+ uid +'/', visited.ajax.on_load);
        } ,    
    
        on_load: function (data) 
        {                                            // alert(visited.list)   
            if (data) {                                     
                visited.list = JSON.parse(data);       
                storage.array.save('visitor_list',visited.list);                 
                result_list.action.visited(visited.list);              
            }                                         
        } , 
        
        save: function (tid) 
        {                               
            $.get( '/contact/addvisit/'+ uid +'/', { tid: tid }, visited.ajax.parse_save);
        } ,      
    
        parse_save: function (data) 
        {                                          // 
            if (data) {
                var sync = JSON.parse(data)*1;       
                if (sync) {       
                    visited.sync = sync;     
                    storage.save('visitor_sync', visited.sync);         
                }                      
            }                                         
        } ,  
    
    } , 
    
    index: function (data) 
    {      
        var result = 0;
        visited.action.load_cache();            
        if (visited.list.length && visited.list.indexOf(data+'')) {
            result = 1;  // alert('index')
        }   
        return result; 
    } ,
 
    action: {
    
        check: function () 
        {                              
            if (visited.sync != storage.load('visitor_sync')) {
                visited.ajax.load();                                    
                storage.save('visitor_sync', visited.sync);  
            }                         
        } , 
    
        save: function (data) 
        {                          console.log("save",data);
            visited.list = storage.array.load('visitor_list');
            if (visited.list.indexOf(data+'') < 0) {     
                visited.list.push(json.encode(data));  
                storage.array.save('visitor_list',visited.list); 
                visited.ajax.save(data);  
            }     
        } , 
    
        load_cache: function () 
        {                     
            if (storage.enable) {
                visited.list = storage.array.load('visitor_list'); 
            } else 
                visited.list = [];   
        } 
        
    } 
} 

