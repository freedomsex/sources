
var cookie_storage = {
         
    enabled: 0, 

    init: function () 
    {  

    } ,

    get_cookie: function (name) 
    {       
        var results = document.cookie.match ( '(^|;) ?' + name + '=([^;]*)(;|$)' ); 
        if (results)
          return (unescape(results[2]));
        else
          return null; 
    } ,
     
    del_cookie: function (name) 
    {              
        let expires = new Date(); // получаем текущую дату 
        expires.setTime( expires.getTime() - 1000 ); 
         document.cookie = name + "=; expires=" + expires.toGMTString() +  "; path=/";  
    } ,    
    
    set_cookie: function (name, val, time) 
    {      
        let expires = new Date(); 
        expires.setTime( expires.getTime() + (1000 * 60 * time ) ); // минут
        document.cookie = name + "="+ val +"; expires=" + expires.toGMTString() +  "; path=/";
    } ,  
    
    get_data: function (name) 
    {  
        var data = get_cookie(name); 
        var result = null;     
         
        if (data)   
        try 
        {
          result = JSON.parse(data);
        } 
        catch(e) { }      
        
        return result;     
    } ,  
    
    set_data: function () 
    {  

    }  
  
  

}

