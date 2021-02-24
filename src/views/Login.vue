<template>
  <v-main>
    <v-container fluid>
      <v-form @submit.prevent="efetuarLogin">
        <v-container>
          <v-row>
            <v-col
              cols="6"
              offset="3"
            >
              <v-banner
                elevation="10"
                icon="fa fa-user"
                outlined
                rounded="lg"
              >
                Login
              </v-banner>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              cols="6"
              offset="3"
            >
              <v-card
                elevation="10"
                rounded="lg"
              >
                <v-container>

                  <!--cpf-->
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        clearable
                        dense
                        label="CPF"
                        name="cpf"
                        outlined
                        placeholder="Insira o seu CPF"
                        required
                        v-mask-cpf
                        v-model="usuario.cpf"
                      />
                    </v-col>
                  </v-row>

                  <!--Password-->
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <v-text-field
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        clearable
                        counter
                        dense
                        hint="No mínimo 6 caracteres"
                        label="Senha"
                        name="password"
                        outlined
                        required
                        v-model="usuario.password"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <!--Submit-->
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <p class="alert alert-danger" v-if="mensagemErro">{{ mensagemErro }}</p>

                      <v-btn
                        type="submit"
                        elevation="2"
                        color="primary"
                      >Logar</v-btn>

                    </v-col>
                  </v-row>
                </v-container>

              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-container>
  </v-main>
</template>

<script>export default {
  data () {
    return {
      usuario: {},
      mensagemErro: '',
      show1: false
    }
  },
  methods: {
    efetuarLogin () {
      if (!this.validaCpf(this.usuario.cpf)) {
        this.mensagemErro = 'CPF inválido !'
      } else {
        this.$store.dispatch('efetuarLogin', this.usuario)
          .then(() => {
            this.$router.push({name: 'home'})
            this.mensagemErro = ''
          })
          .catch(erro => {
            if (erro.request.status === 401) {
              this.mensagemErro = 'Login ou senha inválido(s)!'
            }
          })
      }
    },
    validaCpf (c) {
      if ((c = c.replace(/[^\d]/g, '')).length !== 11) {
        return false
      }
      if (c === '00000000000' ||
        c === '11111111111' ||
        c === '22222222222' ||
        c === '33333333333' ||
        c === '44444444444' ||
        c === '55555555555' ||
        c === '66666666666' ||
        c === '77777777777' ||
        c === '88888888888' ||
        c === '99999999999') {
        return false
      }
      let r
      let s = 0
      let i
      for (i = 1; i <= 9; i++) {
        s = s + parseInt(c[i - 1]) * (11 - i)
      }
      r = (s * 10) % 11
      if ((r === 10) || (r === 11)) {
        r = 0
      }
      if (r !== parseInt(c[9])) {
        return false
      }
      s = 0
      for (i = 1; i <= 10; i++) {
        s = s + parseInt(c[i - 1]) * (12 - i)
      }
      r = (s * 10) % 11
      if ((r === 10) || (r === 11)) {
        r = 0
      }
      if (r !== parseInt(c[10])) {
        return false
      }
      return true
    }
  }
}
</script>
