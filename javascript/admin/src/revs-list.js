
// -- Список отзывов ---
var revs_list = {
     
    init: function () 
    {         
        $('.revs_up').on('click',revs_list.ajax.up); 
        $('.revs_down').on('click',revs_list.ajax.down); 
    } , 
    
    ajax: {   
    
        up: function () 
        {           
            var id  = $(this).data('num'); 
            $(this).off('click');
            $.post( '/security/modrevs/', { id: id, mod: 1 } );
            revs_list.actions.mod(id,1);  
        } ,  
    
        down: function () 
        {            
            var id  = $(this).data('num');  
            $(this).off('click');
            $.post( '/security/modrevs/', { id: id, mod: -1 } ); 
            revs_list.actions.mod(id,-1);   
        }      
          
    } ,
 
    actions: {
    
        mod: function (id,mod) 
        {          
            var rank = $('#revs_rank_'+id).text() * 1 + mod;
            var vote = $('#revs_vote_'+id).text() * 1 + 1;
            $('#revs_rank_'+id).text(rank); 
            $('#revs_vote_'+id).text(vote);       
        }  
        
    } 
}   

