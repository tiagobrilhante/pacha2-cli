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
                      <v-btn
                        color="primary"
                        elevation="2"
                        type="submit"
                      >Logar
                      </v-btn>

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

<script>import {cpf} from 'cpf-cnpj-validator'

export default {
  data () {
    return {
      usuario: {},
      show1: false
    }
  },
  methods: {
    efetuarLogin () {
      if (!cpf.isValid(this.usuario.cpf)) {
        this.$toastr.e(
          'CPF invalido', 'Erro!'
        )
      } else {
        this.$store.dispatch('efetuarLogin', this.usuario)
          .then(() => {
            this.$router.push({name: 'home'})
          })
          .catch(erro => {
            if (erro.request.status === 401) {
              this.$toastr.e(
                'Login ou senha inválidos', 'Erro!'
              )
            }
          })
      }
    }
  }
}
</script>
