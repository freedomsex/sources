
// -- Список контактов ---
var idea_list = {
     
    init: function () 
    {         
        $('.rating_up').on('click',idea_list.ajax.up); 
        $('.rating_down').on('click',idea_list.ajax.down); 
    } , 
    
    ajax: {   
    
        up: function () 
        {           
            var id  = $(this).data('num'); 
            $(this).off('click');
            $.post( '/develop/modidea/', { id: id, mod: 1 } );
            idea_list.actions.mod(id,1);  
        } ,  
    
        down: function () 
        {            
            var id  = $(this).data('num');  
            $(this).off('click');
            $.post( '/develop/modidea/', { id: id, mod: -1 } ); 
            idea_list.actions.mod(id,-1);   
        }      
          
    } ,
 
    actions: {
    
        mod: function (id,mod) 
        {          
            var rank = $('#idea_rank_'+id).text() * 1 + mod;
            var vote = $('#idea_vote_'+id).text() * 1 + 1;
            $('#idea_rank_'+id).text(rank); 
            $('#idea_vote_'+id).text(vote);       
        }  
        
    } ,
 
    options: {  
         
        updater: {  
            
            show: function () 
            {          
                $('#contact_update').show('fade');       
            } , 
            
            hide: function () 
            {          
                $('#contact_update').hide('fade');       
            }   
        } 
     
    } 
}     

