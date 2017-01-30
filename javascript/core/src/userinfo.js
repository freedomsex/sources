
// -- Информация о пользователе ---
var userinfo = {

    data: {},
    init: function () {
        userinfo.ajax.load();
    } ,
    ajax: {
        load: function (option) {
            $.get( '/sync/sess/', userinfo.ajax.on_load);
        } ,
        on_load: function (data) {           // alert(userinfo.name)
            data = json.parse(data);
            if (data && data.uid) {
                userinfo.data = data;
                userinfo.action.set_data(data);
                master_info.init();
            } else {
                storage.save('auth',0); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }
        } ,
        save: {
            sex: function (func) {
                $.post('/option/sex/', { sex: userinfo.data.sex }, func);
            } ,
            age: function (func) {
                $.post('/option/age/', { age: userinfo.data.age }, func);
            } ,
            name: function (func) {
                $.post('/option/name/', { name: userinfo.data.name }, func);
            } ,
            city: function (func) {
                $.post('/option/city/', { city: userinfo.data.city }, func);
            }  
        }
    } ,
    action: {
        set_data: function (data) {
            storage.save('auth',data.uid);

            user_menu.option.act.show_opt();
            user_menu.action.sets.search();

            userinfo.action.set_sex();
            userinfo.action.set_age();
            userinfo.action.set_name();
            userinfo.action.set_city();

            userinfo.action.set_string(); /**/
        } ,
        set_name: function () {
            if (userinfo.data.name.length > 2) {
                $('.user_name_option').text(userinfo.data.name);
                $('.name_suggest').val(userinfo.data.name);
            }
            userinfo.action.set_string();
        } ,
        set_age: function (say) {
            if (userinfo.data.age > 0)
                $('.user_age_option').text(userinfo.data.age);
            if (say)
                $('.user_age_say').text(say);
            userinfo.action.set_string();
        } ,
        set_city: function () {
            if (userinfo.data.city.length > 3) {
                $('.user_city_option').text(userinfo.data.city);
                $('.city_suggest').val(userinfo.data.city);
            }
            //userinfo.data.city_id = city['city_id'];
            //userinfo.data.verify  = city['verify'];
            userinfo.action.set_string();
        } ,
        set_sex: function () {
            var say;
            if (userinfo.data.sex == 0) {
                say = 'Парень или девушка';
            } else
            if (userinfo.data.sex == 1) {
                say = 'Парень';
            } else
            if (userinfo.data.sex == 2) {
                say = 'Девушка';
            }
            $('.user_sex_option').text(say);
        } ,
        set_string: function () {
            var str = userinfo.data.name;
            if (!userinfo.data.name) {
                if (userinfo.data.sex == 1) {
                    str = 'Парень';
                } else
                if (userinfo.data.sex == 2) {
                    str = 'Девушка';
                }
            }

            if (userinfo.data.age > 10 || userinfo.data.city.length > 3)
                str = str + ', ';
            if (userinfo.data.age > 10)
                str = str + userinfo.data.age + ' ';
            if ((20 - str.length - userinfo.data.city.length) >= 0)
                str = str + userinfo.data.city;
            if (!str)
                str = 'Кто вы?';
            if (userinfo.data.uid) {
                $('.user_string_option').text(str);
                storage.save('user_string_print', str);
            } else
            //if (!uid)
                $('.user_string_option').text('');
        } ,
        set_email: function () {
            $('.option_email_value').val(userinfo.data.email);
            $('.profile_email_value').text(userinfo.data.email);
        }

    }
}

