
// -- Список комментариев ---
var comm_list = {
     
    init: function () 
    {         
        $('.comm_up').on('click',comm_list.ajax.up); 
        $('.comm_down').on('click',comm_list.ajax.down); 
    } , 
    
    ajax: {   
    
        up: function () 
        {           
            var id  = $(this).data('num'); 
            $(this).off('click');
            $.post( '/develop/modcomm/', { id: id, mod: 1 } );
            comm_list.actions.mod(id,1);  
        } ,  
    
        down: function () 
        {            
            var id  = $(this).data('num');  
            $(this).off('click');
            $.post( '/develop/modcomm/', { id: id, mod: -1 } ); 
            comm_list.actions.mod(id,-1);   
        }      
          
    } ,
 
    actions: {
    
        mod: function (id,mod) 
        {          
            var rank = $('#comm_rank_'+id).text() * 1 + mod;
            var vote = $('#comm_vote_'+id).text() * 1 + 1;
            $('#comm_rank_'+id).text(rank); 
            $('#comm_vote_'+id).text(vote);       
        }  
        
    } 
} 

