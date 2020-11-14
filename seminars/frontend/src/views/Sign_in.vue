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


    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
    Войти
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
    async sign_In () {
          //запускаем валидацию формы
        if(!this.$refs.form.validate()){
            return
        }
    try {
        await this.$store.dispath('auth/signIn', {
            email:this.email,
            password:this.password
        })
    } catch (err) {
        this.snackbar = true
    } 

    },
    
    },
}
</script>