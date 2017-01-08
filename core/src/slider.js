 
// -- Слайдер, главная ---
var slider = {  
 
    timer: null, 
    context: 0,
    next: 0,
        
    init: function () 
    {          
        if(!$('div').is('#top_intro_info_block'))
            return null;
         
        $('#top_intro_info_block').on('mouseover',slider.stop);
        $('#top_intro_info_block').on('mouseout',slider.start);
        
        // Предзагрузка картинок  
        setInterval(function()
        { 
            var nn = ( slider.next + 1 < 5 ) ? slider.next + 1 : 0; 
            a1 = new Image; 
            a1.src = "/img/board/top_intro_info_" + nn + ".jpg";   
        }, 10000);   
                        
    } ,  

    slide: function (num,st) 
    {
        var top_intro_caption = []
        var top_intro_context = []
         top_intro_context[0] = 'Позволит познакомиться с парнем или девушкой для секса, найти партнёра в соседнем подъезде или доме напротив. Знакомиться в собственном дворе или районе уже сегодня';
         top_intro_caption[0] = 'Уникальный способ знакомства';
         top_intro_caption[1] = 'Знакомства без регистрации';
         top_intro_context[1] = 'Начинайте использовать всё и сразу, на полную, лишь только зайдя на сайт. Без подтверждений регистрации, без активации анкет. Лёгкий и быстрый поиск новых знакомств';
         top_intro_caption[2] = 'Секс знакомства без смс';
         top_intro_context[2] = 'Ни номеров телефонов, ни подтверждений, ни смс. 100% анонимность, лёгкое и раскрепощённое общение. Онлайн обмен любыми фотографиями. E-mail адрес и всё остальное указывается по желанию';
         top_intro_caption[3] = 'Онлайн общение, интимные темы';
         top_intro_context[3] = 'То что вы хотели спросить, то о чём вы хотели поговорить. Получайте прямо сейчас. Комфортное онлайн общение, интимные беседы, уютная обстановка и приятные собеседники уже ждут вас';
         top_intro_caption[4] = 'Секс знакомства бесплатно';
         top_intro_context[4] = 'Здесь всё бесплатно. Вам доступны все сервисы сайта полностью, уже сейчас. Ваша анкета всегда наверху. Vip аккаунтов нет, открытый доступ ко всем анкетам и безграничные возможности';
 
        if( num > 4 ) num = 0;
        for (var i = 0; i<5; i++) 
        {
            $('#board_img_'+i).removeClass('show');
            $('#board_img_'+i).attr('src','');
        }
 
        $('#board_img_' + num).addClass('show active');
        $('#board_img_' + num).attr('src','/img/board/top_intro_info_'+num+'.jpg');

        if (slider.context)
        {         
            $('#top_intro_info_block_caption').text(top_intro_caption[num]);
            $('#top_intro_info_block_context').text(top_intro_context[num]); 
        }
      
        slider.next = num
    } ,

    start: function () 
    {
        slider.timer = setInterval( function(){ slider.slide(++slider.next,0)}, 20000); 
    } ,

    stop: function () 
    {
        clearTimeout(slider.timer); 
    }
    
        
}

