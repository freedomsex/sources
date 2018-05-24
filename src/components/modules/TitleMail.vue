<script>
export default {
  props: ['human'],
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.title();
  },
  watch: {
    human() {
      this.title();
    },
  },
  methods: {
    title() {
      const title = ' ';
      if (this.human) {
        let name = '';
        if (this.human.name) {
          name = `${this.human.name} | `;
        }
        if (this.human.sex) {
          name += this.human.sex == 2 ? 'Девушка' : 'Парень';
        } else {
          name += 'Парень или девушка';
        }
        name += ' ';

        let age = '';
        if (this.human.age) {
          age = ` ${this.$moment.duration(this.human.age, 'years').humanize()}`;
        }
        let city = ' ищет ';
        if (this.human.city) {
          city = ` из города ${this.human.city} ищет `;
        }
        let who = ' девушку или парня ';
        if (this.human.sex) {
          who = this.human.sex == 2 ? 'парня' : 'девушку';
        }
        who += ' для секса или общения ';
        let years = '';
        if (this.human.up && this.human.to) {
          years = ` в возрасте от ${this.human.up} до ${this.$moment
            .duration(this.human.to, 'years')
            .humanize()}`;
        }
        if (this.human.up && !this.human.to) {
          years = ` в возрасте от ${this.$moment.duration(this.human.up, 'years').humanize()}`;
        }
        if (!this.human.up && this.human.to) {
          years = ` в возрасте до ${this.$moment.duration(this.human.to, 'years').humanize()}`;
        }
        document.title = name + age + city + who + years + title;
      }
    },
  },
};
</script>

<template>
  <div> </div>
</template>
