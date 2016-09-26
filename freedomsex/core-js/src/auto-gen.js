   
// -- Автогенератор информации ---        
var auto_gen = {    
    
    name: function (sex) 
    {      
        var name = []                              
        name[0] = ['Онилиона','Безимени','Неуказано','Хуисзиз','Незнаю','Неизвестно','Несонено'];
        name[1] = ['Саша','Дима','Сергей','Иван','Максим','Валера','Николай'];          
        name[2] = ['Оля','Юля','Настя','Алена','Катя','Маргарита','Татьяна'];  
        
        var x = Math.floor( Math.random() * 7);

        return name[sex][x];     
    } ,
    
    age: function (year) 
    {                                    
        var age = []                  
        age[0] = [18,21,24,25,27,28,31];
        age[1] = [year+3,year+2,year+1,year,year-1,year-2,year-3];
 
        var y = year ? 1 : 0;
        var x = Math.floor( Math.random() * 7);
                                
        return age[y][x]; 
    } 
    
}

