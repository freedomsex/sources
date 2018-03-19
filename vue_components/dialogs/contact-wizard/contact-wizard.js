
const ContactWizard = Vue.component('contact-wizard', {
    extends: AccountSettings,
    props: ['humanCity', 'humanAge'],
    created() {
        if (!this.selectCity && this.humanCity) {
            this.selectCity = this.humanCity;
        }
        if (!this.selectAge && this.humanAge) {
            this.selectAge = this.humanAge;
        }
    },
    methods: {
        approve() {
            this.save();
            this.$emit('approve');
            this.$emit('close');
        },
        close() {
            this.$emit('close');
        }
    },
    template: '#contact-wizard',
});
