
var json = {
        
    parse: function (str) 
    {
        var result = null;
        try 
        {
            result = JSON.parse(str);
        } 
        catch (e) { }
        
        return result;
    } ,
    
    encode: function (str) 
    {
        return JSON.stringify(str); 
    }       
}       
   
