const ModalDialog = Vue.component('modal-dialog', {
    extends: ActivityActions,
    methods: {
        onEsc(event) {
            if (event.keyCode === 27) {
                this.close();
            }
        }
    },
    mounted() {
        // Close the modal when the escape key is pressed.
        var self = this;
        document.addEventListener('keydown', this.onEsc);
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.onEsc);
    },
    template: '#modal-dialog',
});
