<i18n>
{
  "ru": {
    "dialogs": {
      "search": {
        "caption": "Легко начать",
        "text": "Для правильного отображения результатов поиска необходимо указать пол. Вы парень или девушка?"
      },
      "contacts": {
        "caption": "Вы девушка?",
        "text": "Начало быстрого общения в один клик. Хотите получать сообщения и новые знакомства? Достаточно подтвердить, парень вы или девушка."
      },
      "message": {
        "caption": "Общение в один клик",
        "text": "Начать общение просто. Хотите получать сообщения и новые знакомства? Достаточно подтвердить, парень вы или девушка."

      },
      "account": {
        "caption": "Кто вы?",
        "text": "Приватная анкета в один клик. Самое быстрое общение. Достаточно указать кто вы, парень или девушка. И начинайте общаться."
      },
      "register": {
        "caption": "Очень легко!",
        "text": "Самое быстрое общение. Приватная анкета в один клик. Достаточно указать, парень вы или девушка. И начинайте общаться."
      }
    }
  },
  "en": {
    "Девушка": "Girl",
    "Парень": "Guy",
    "Уже есть анкета?": "Already have a profile?",
    "dialogs": {
      "search": {
        "caption": "It's easy to start",
        "text": "To correctly display the search results, you must specify the gender. Are you a guy or a girl?"
      },
      "contacts": {
        "caption": "You're a girl?",
        "text": "Start a quick communication in one click. Do you want to receive messages and new acquaintances? It's enough to confirm whether you are a guy or a girl."
      },
      "message": {
        "caption": "Communication in one click",
        "text": "It's easy to start a conversation. Do you want to receive messages and new acquaintances? It's enough to confirm whether you are a guy or a girl."
      },
      "account": {
        "caption": "Who you are?",
        "text": "Private profile in one click. The fastest communication. It is enough to indicate who you are, a guy or a girl. And start to communicate."
      },
      "register": {
        "caption": "Very easy!",
        "text": "The fastest communication. Private profile in one click. It is enough to indicate whether you are a boy or a girl. And start to communicate."
      }
    }
  },
  "kz": {
    "Девушка": "Қыз",
    "Парень": "Жігіт",
    "Уже есть анкета?": "Сізде профиль бар ма?",
    "dialogs": {
      "search": {
        "caption": "Бастау оңай",
        "text": "Іздеу нәтижелерін дұрыс көрсету үшін жынысты көрсету керек. Сіз жігіт немесе қыз болдыңыз ба?"
      },
      "contacts": {
        "caption": "Сіз қыз боласыз ба?",
        "text": "Бір рет нұқыңыз жылдам байланыс. Хабарламалар мен жаңа таныстыруды алғыңыз келе ме? Бұл жігіттің немесе қыздың екендігін растау жеткілікті."
      },
      "message": {
        "caption": "Бір рет басу",
        "text": "Әңгімелесу оңай. Хабарламалар мен жаңа таныстыруды алғыңыз келе ме? Бұл жігіттің немесе қыздың екендігін растау жеткілікті."
      },
      "account": {
        "caption": "Сіз кімсіз?",
        "text": "Жеке профиль бір рет басу. Ең жылдам байланыс. Сіз кім екеніңізді көрсетуіңіз жеткілікті, жігіт немесе қыз. Және қарым-қатынас бастаңыз."
      },
      "register": {
        "caption": "Өте жеңіл!",
        "text": "Ең жылдам байланыс. Жеке профиль бір рет басу. Сіз балаңыз немесе қызыңыз бар ма екенін көрсету жеткілікті. Және қарым-қатынас бастаңыз."
      }
    }
  },
  "ua": {
    "Девушка": "Дівчина",
    "Парень": "Хлопець",
    "Уже есть анкета?": "Вже є анкета?",
    "dialogs": {
      "search": {
        "caption": "Легко почати",
        "text": "Для правильного відображення результатів пошуку необхідно вказати стать. Ви хлопець чи дівчина?"
      },
      "contacts": {
        "caption": "Ви дівчина?",
        "text": "Початок швидкого спілкування в один клік. Хочете отримувати повідомлення і нові знайомства? Досить підтвердити, хлопець ви або дівчина."
      },
      "message": {
        "caption": "Спілкування в один клік",
        "text": "Почати спілкування просто. Хочете отримувати повідомлення і нові знайомства? Досить підтвердити, хлопець ви або дівчина."
      },
      "account": {
        "caption": "Хто ви?",
        "text": "Приватна анкета в один клік. Найшвидше спілкування. Досить вказати хто ви, хлопець або дівчина. І починайте спілкуватися."
      },
      "register": {
        "caption": "Дуже легко!",
        "text": "Найшвидше спілкування. Приватна анкета в один клік. Досить вказати, хлопець ви або дівчина. І починайте спілкуватися."
      }
    }
  }
}
</i18n>

<script>
import ModalDialog from '~dialogs/ModalDialog';
import Recaptcha from '~modules/Recaptcha';
import AutoRegistration from '~mixins/AutoRegistration';
import Loadable from '~mixins/Loadable';

// Автоматически сохраняет город. Отправляет пол пользователя вместе с кодом капчи
export default {
  extends: ModalDialog,
  mixins: [AutoRegistration, Loadable],
  props: ['show'],
  data() {
    return {
      sex: null,
    };
  },
  computed: {
    variant() {
      return this.show ? this.show : 'message';
    },
    caption() {
      return this.$t(`dialogs.${this.variant}.caption`);
    },
    text() {
      return this.$t(`dialogs.${this.variant}.text`);
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    index(val) {
      return val == this.variant;
    },
    verify(sex) {
      this.sex = sex;
      this.processTimeout();
      this.$refs.recaptcha.render(this.save);
    },
    save(token) {
      this.process = true;
      if (this.sex) {
        this.$store.dispatch('SAVE_SEX', {sex: this.sex, token}).then(() => {
          // TODO: $root APP dep refresh() / reload()
          this.autoCity();
          this.autoAge();
          this.$root.refresh();
        });
        this.$root.reload();
        this.$emit('select', this.show);
        this.redirect();
      }
      this.$refs.recaptcha.reset();
    },
    login() {
      this.$emit('login');
      this.close();
    },
    redirect() {
      if (this.index('search')) {
        this.$router.replace('/search');
      } else if (this.index('account')) {
        this.$router.replace('/settings/account');
      } else if (this.index('message')) {
        this.$router.replace('/');
      } else if (this.index('city')) {
        this.$router.replace('/wizard/city');
      } else {
        this.$router.replace('/');
      }
      // if (this.index('contacts')) {
      //     console.log('leave', 'contacts');
      //     next({name: 'search-settings'});
      // }
    },
  },
  components: {
    ModalDialog,
    Recaptcha,
  },
};
</script>

<template>
  <ModalDialog @close="close">
    <div class="modal-dialog__wrapper" style="padding-bottom: 10px;">
      <div class="modal-dialog__caption">
        {{caption}}
      </div>
      <div class="modal-dialog__body">
        {{text}}
      </div>
      <div class="modal-dialog__centred" style="margin-bottom: 10px;">
        <button class="btn btn-primary btn-fat"
         @click="verify(2)" :disabled="process">   {{$t('Девушка')}}   </button>
        <button class="btn btn-primary btn-fat"
         @click="verify(1)" :disabled="process">   {{$t('Парень')}}   </button>
      </div>
      <div class="modal-dialog__centred">
        <button class="btn btn-link btn-fat"
         @click="$router.push('/login')">  {{$t('Уже есть анкета?')}}  </button>
      </div>
    </div>

    <Recaptcha ref="recaptcha" @verify="save" @cancel="close"/>
  </ModalDialog>
</template>

<style lang="less">
.btn-fat {
  padding-left: @indent-xl;
  padding-right: @indent-xl;
}
</style>
