
var quick_word = {    
         
    init: function () 
    {     
       $('.quick_link').click( function () 
       {
           quick_word.show($(this).data('title'));
       
       });    

    } , 
     
    show: function (title) 
    {  
        $('#reply_text').load('/static/htm/admin/quick/'+title+'.html');
     
    } 

}    

