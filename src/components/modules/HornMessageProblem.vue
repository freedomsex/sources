<script>
import ContactWizard from '~dialogs/ContactWizard';
import InfoDialog from '~dialogs/InfoDialog';
import ConfirmDialog from '~dialogs/ConfirmDialog';

export default {
  props: ['human'],
  data: () => ({
    negative: {
      contacts: false,
      twitter: false,
      exceed: false,
      interest: false,
      dirt: false,
      spam: false,
    },
  }),
  mounted() {
    console.log('human:::human', this.human);
    this.$parent.$on('problem', this.problem);
  },
  methods: {
    problem(type) {
      console.log('problem', type);
      this.negative[type] = true;
    },
    solve(type) {
      this.ignore(type);
      this.$emit('solve');
    },
    ignore(type) {
      this.negative[type] = false;
      this.$emit('ignore', type);
    },
  },
  components: {
    ContactWizard,
    InfoDialog,
    ConfirmDialog,
  },
};
</script>

<template>
  <div>
    <ContactWizard v-if="negative.contacts"
      :humanCity="human.city"
      :humanAge="human.age"
      @approve="solve('contacts')"
      @close="ignore('contacts')"/>

    <ConfirmDialog v-if="negative.interest"
     @confirm="solve('interest')"
     @close="ignore('interest')">
     <div slot="title">Учитывайте интересы</div>
      Потребуется подтверждение, если не совпадает
      желаемый город, возраст или пол.
      Вирт интересен далеко не всем.
    </ConfirmDialog>


    <InfoDialog v-if="negative.twitter"
      @close="ignore('twitter')">
      <div slot="title">Первое сообщение</div>
      Оно должно быть коротким, без контактных данных и
      ссылок. Заполните анкету вместо описания текстом.
      Свыше 140 символов нужно подтверждение.
    </InfoDialog>

    <InfoDialog v-if="negative.exceed"
      @close="ignore('exceed')">
      <div slot="title">Много букв</div>
      Пожалуйста, уместите мысль в 500 символов или разделите
      на несколько сообщений. Если у вас есть о чем поговорить,
      обменяйтесь контактами.
    </InfoDialog>

    <InfoDialog v-if="negative.dirt"
      @close="ignore('dirt')">
      <div slot="title">Поступят жалобы</div>
      Оскорбления в любой форме запрещены. На вас поступят жалобы,
      что грозит блокировкой анкеты.
      Возможно потребуется подтверждение.
    </InfoDialog>

    <InfoDialog v-if="negative.spam"
     @close="ignore('spam')">
      <div slot="title">Не сейчас</div>
      Не отправляйте номера телефонов, ссылки, мессенджеры в начале знакомства.
      Так поступают мошенники, потребуется подтверждение.
    </InfoDialog>

    <InfoDialog v-if="0">
     <div slot="title">Комфортное начало</div>
      Используйте шаблоны из блокнота, простые фразы
      или текст менее 140 символов для начала общения.
      Исключите цифры в первых сообщениях.
    </InfoDialog>
  </div>
</template>

<style lang="less">

</style>
