Vue.component('abuse-form', {
    template: '#abuse-form',
    props: [
        'show'
    ],
    data: function () {
        return {
            isEditorShow:  0,
            isSuggestShow: 1,
            message: 'привет!',
            suggest: [
                'Предложение оплаты услуг, вирт за деньги, проституция',
                'Мошенничество, развод на деньги, шантаж, вымогательство',
                'Фото из интернета, вымышленные данные, обман, фейк',
                'Оскорбления, хамство, троллинг, грубые сообщения',
                'Рассылает интим фото, спамит или провоцирует',
            ],
            text: '',
        }
    },
    created: function () {
        console.log("abuse_form Created");
    },
    methods: {
        choiceText: function (event) {
            this.text = event.target.innerHTML;
            this.isEditorShow = true;
            this.isSuggestShow = false;
        },
        post: function (event) {
            simple_hash();
            this.$http.post('/abuse/send', {
                id: tid, 
                abuse: this.text, 
                captcha: '', 
                hash: hash 
            }).then(function(data) {
                console.log('ok');
            }, function(data) {
                console.log(data);
            });
        },
        cancel: function () {
            this.$emit('cancel');
            this.isSuggestShow = true;
        }
    }
});

var abuse_list_component = new Vue({
    el: '#abuse-list-component',
    data: {
        abuseStatus:   0,
        isFormShow:    1,
        isListShow:    0,
        isButtonShow:  0,
    },
    mounted: function () {
        //console.log(abuse_form.mess());
    },
    methods: {
        showForm: function (event) {
            if (!this.isFormShow) {
                this.isFormShow = true;
            } else {
                this.hideForm();
            }
        },
        hideForm: function (event) {
            this.isFormShow    = false;
            this.isButtonShow  = false;
            //this.isSuggestShow = true;
        },
        showList: function (event) {
            this.isListShow = !this.isListShow;
        },
        showButton: function (event) {
            if (!this.isFormShow) {
                this.isButtonShow = !this.isButtonShow;
            } else {
                this.hideForm();
            }
        },
    }
});

// -- Список жалоб на пользователя ---
var abuse_list = {     
 
    is_load: null,  // abuse_is_load
    
    init: function () 
    {          
       //$('#abuse_button_show_link span').click( function (){ form_public.show_form(); });
       //$('#abuse_list_show_link').click( function (){ abuse_list.show_list();  }); 
                                        
       $('#abuse_button_post').click( function (){ form_public.abuse_post(); });
       $('#abuse_captcha_post').click( function (){ form_public.abuse_post(); });
       
       abuse_list.ajax_load();
                             
    },             
 
    ajax_load: function () 
    {      
        $.get( '/ajax/post_abuse.php',{ id: tid }, abuse_list.on_load); 
    } , 
     
    on_load: function (data) 
    {     
         abuse_list.is_load = 1;  // cache/public/user_abuse/abuse_'+tid+'.html   
         abuse_list.set_count();
           
         if( data.indexOf('div') > 0 )
         {  
             $('#abuse_list').html( data );                            
             $('.abuse_list_line').click( function ()
             {
                 $('i',this).show('fade') ;   
                 $.post( '/ajax/post_abuse.php',{ id: tid, agree: $(this).data('number') } ); 
                 $(this).unbind('click'); 
             });
                  
             abuse_list.set_count(); 
         }    
         
    } ,
 
    red_link: function (lock) 
    {   
        if (lock) 
        {
            $('#abuse_list_show_link').addClass('red_link');
        }
        else
            $('#abuse_list_show_link').removeClass('red_link');   
    },
 
    get_count: function () 
    {   
        return $('.abuse_list_line').length ;   
    },
 
    set_count: function (count) 
    {   
        if (abuse_list.get_count()) 
        {    
            $('#abuse_list_show_link').text('Есть замечания ('+ abuse_list.get_count() +')'); 
            abuse_list.red_link(1);
        }
        else
        {   
            $('#abuse_list_show_link').text('Замечаний нет'); 
            abuse_list.red_link(0);
         
        }    
    },
 
    show_list: function () 
    {   
        if (!$('#abuse_list').is(':visible')) 
        {                                
            $('#abuse_list').show('blind'); 
            form_public.public_button(1);   
        } 
        else 
        {                                
            $('#abuse_list').hide('blind');
            form_public.public_button(0); 
            form_public.hide_form(); 
        } 
    },    
 
    status_link: function (show) 
    {             
        if (show) 
        {        
            $('#abuse_list_show_link').show('blind'); 
        } 
        else
        {      
            $('#abuse_list_show_link').hide('blind'); 
        }         
    }    
    
        
     
}

