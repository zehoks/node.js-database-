<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Почта"
      required
    ></v-text-field>


    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Пароль"
      required
    ></v-text-field>
   

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Войти
    </v-btn>
    </v-btn>

   
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'пароль обязателен',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
       
      ],
    }),

    methods: {
      sign_In () {
          //запускаем валидацию формы
        if(!this.$refs.form.validate()){
            return
        }
    console.log("send signIn request")

      },
     
    },
  }
</script>