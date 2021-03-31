<template>
  <div>
    <v-menu
      offset-y
      open-on-hover
      rounded="b-xl"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn block
               color="secondary"
               dark
               v-bind="attrs"
               v-on="on"
        >
          <i class="fa fa-user mr-5"></i> {{ usuarioLogado.posto_grad }} {{ usuarioLogado.nome_guerra }}
        </v-btn>
      </template>
      <!--list-->
      <v-list>
        <!--alterar senha-->
        <v-list-item @click.prevent="mudarSenhaAbrir">
          <v-list-item-title>
            Alterar Senha
          </v-list-item-title>
        </v-list-item>
        <!--Efetuar logout-->
        <v-list-item @click.prevent="efetuarLogout">
          <v-list-item-title>
            Sair do Sistema
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!--Dialog para alteração de senha-->
    <v-dialog max-width="800px" v-model="dialogSenha">
      <v-card>
        <v-card-title class="justify-center" primary-title> Alteração de senha de usuário</v-card-title>
        <v-form @submit.prevent="alterarSenha">
          <v-card-text>
            <h3><b>Insira a sua Nova Senha</b></h3><br>
            <v-alert border="left"
                     dense
                     type="warning">
              Ao alterar a sua senha, você será desconectado do PaCha para realizar um novo login.
            </v-alert>
            <v-divider></v-divider>
            <br>
            <!--Password-->
            <v-row>
              <v-col>
                <v-text-field
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  clearable
                  counter
                  dense
                  hint="No mínimo 6 caracteres"
                  label="Nova Senha"
                  name="password"
                  outlined
                  required
                  v-model="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="pb-5">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              elevation="2"
              type="submit"
            >Alterar senha
            </v-btn>
            <v-btn
              @click="fecharDialogAlterarSenha"
              color="error"
              elevation="2">Cancelar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>import {logoutMixin} from '@/mixins'
import {mapGetters} from 'vuex'
import {validationMixin} from 'vuelidate'
import {required} from 'vuelidate/lib/validators'

export default {
  data: () => ({
    dialogSenha: false,
    show1: false,
    password: ''
  }),
  validations: {
    password: {required}
  },
  mixins: [logoutMixin, validationMixin],
  methods: {
    mudarSenhaAbrir () {
      this.dialogSenha = true
    },
    fecharDialogAlterarSenha () {
      this.dialogSenha = false
    },
    alterarSenha () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        let myObject = {}
        myObject['password'] = this.password
        this.$http.post('users/password/change', myObject)
          .then(() => {
            this.dialogSenha = false
            this.$toastr.s(
              'Senha alterada com sucesso', 'Sucesso!'
            )
            this.$store.commit('DESLOGAR_USUARIO')
            this.$router.push({name: 'login'})
          }, err => {
            console.log(err)
            this.$toastr.e(
              'Não foi possível alterar a senha', 'Erro!'
            )
          })
      }
    }
  },
  computed: {
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('O Campo "Senha" não pode ficar em branco! ')
      return errors
    },
    ...mapGetters(['usuarioResetado', 'usuarioLogado'])

  }
}
</script>
