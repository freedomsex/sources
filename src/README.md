
# \*.VUE - компоненты

Фреймворк VueJS дает возможность писать веб интерфейс с применением веб компонентов. Они в свою очередь описываются в VUE файлах - однофайловый компонент. В каждом файле три блока Script/Template/Style. Они же в данный момент JS/HTML/LESS(CSS)

*components* - компоненты интерфейса. Самое простое над чем вы можете поработать прямо сейчас. \*.VUE можно внести правку в как JS так и в CSS стиль компонента, изменить верстку. Всё это в одном файле. Править можно ту часть, которая больше нравится.
 
*store* - стор, хранилище [vuex](https://vuex.vuejs.org/ru/intro.html) общего с VueJS 

*templates* - шаблоны сборки страниц, для SEO большей частью, или кастомизации

*styles* - основные стили, цвета, миксины, общие размерности

*static* - статическое, картинки, иконки, фоны

*assets* - дополнительные JS скрипты и директивы, в основном наследие прошлого, legacy

*config* - всякая конфигурация

Структура папок перечислена в порядке наибольшей стабильности. То что выше, вряд ли изменится, ниже - вероятнее всего изменится. Из проекта выпилен GruntJS и Bower. Устанавливается через [NPM](https://www.npmjs.com/) (команда _npm i_). Собирается с помощью Webpack.
