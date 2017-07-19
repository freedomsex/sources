
const SocialSettings = Vue.component('social-settings', {
    props: [],
    data() {
        return {
            checkedContact: {
                em: 0,
                vk: 0,
                ok: 0,
                fb: 0,
                go: 0,
                sk: 0,
                ph: 0,
            },
            virgin: true
        }
    },
    computed: Vuex.mapState({
        contacts(state) {
            return state.user.contacts;
        }
    }),
    mounted() {
        console.log('user', this.contacts);
        this.checkedContact = this.contacts;
    },
    methods: {
        close() {
            this.save();
            this.$emit('close');
        },
        deflower() {
            this.virgin = false;
        },
        save() {
            if (!this.virgin) {
                this.$store.dispatch('SAVE_CONTACTS', this.checkedContact);
            }
        }
    },
    template: '#social-settings',
});
