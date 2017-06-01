
var RemoveConfirm = Vue.component('remove-confirm', {
    props: ['show', 'item'],
    data() {
        return {
            content: {
                doit: {
                    caption: 'Наказывайте как следует',
                    text: `За резкие слова, за оскорбления или хамство,
                    за фотографии не в тему или бессмысленные сообщения, наказывайте всех, кого
                    считаете нужным. Наказание действует сразу.`,
                    action: 'Удалить и наказать'
                },
                must: {
                    caption: 'Может стоит наказать?',
                    text: `Нажмите "Дизлайк" у сообщения или контакта, которое вызвало негативные эмоции.
                    Наказание действует сразу же. Мы никогда не узнаем о нарушениях, если удалить без наказания.`,
                    action: 'Удалить и забыть'
                },
                some: {
                    caption: 'Удалить навсегда',
                    text: `Ваше сообщение будет удалено отовсюду, без возможности восстановить. Сообщение
                    пропадет как из вашей истории переписки, так и из переписки вашего собеседника.`,
                    action: 'Удалить навсегда'
                }
            }
        }
    },
    computed: {
        variant() {
            return this.show ? this.show : 'some';
        },
        caption() {
            return this.content[this.variant].caption;
        },
        text() {
            return this.content[this.variant].text;
        },
        action() {
            return this.content[this.variant].action;
        },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        bun() {
            this.$emit('bun');
            this.close();
        },
        remove() {
            this.$emit('remove');
            this.close();
        },
    },
    template: '#remove-confirm',
});



Vue.component('remove-contact', {
    extends: RemoveConfirm,
    data() {
        return {
            content: {
                some: {
                    caption: 'Удалить навсегда',
                    text: `Контакт будет удален без возможности восстановить. Дальнейшее общение с собеседником станет невозможно.
                    Обменивайтесь реальными контактами с теми кто вам интересен всегда.`,
                    action: 'Удалить навсегда'
                }
            }
        }
    },
    computed: {

    },
    methods: {
        remove() {
            this.$emit('remove');
            this.close();
        },
    },
    template: '#remove-confirm',
});