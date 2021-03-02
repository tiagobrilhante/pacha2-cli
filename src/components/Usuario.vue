<template>
  <v-main>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="usuarios"
        class="elevation-1"
        sort-by="nome"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Tabela de Usuários</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>

            <!--Dialog de cadastro e edição-->
            <v-dialog
              max-width="700px"
              v-model="dialog"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mb-2"
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Novo Usuário
                </v-btn>
              </template>

              <!--Card de cadastro edição-->

              <form>
                <v-card>
                  <v-card-title>
                    <span class="headline"><i class="fa fa-user"></i> {{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <!--Nome-->
                        <v-col
                          cols="12"
                          md="6"
                          sm="4"
                        >
                          <v-text-field
                            :error-messages="nomeErrors"
                            @blur="$v.nome.$touch()"
                            @input="$v.nome.$touch()"
                            dense
                            label="Nome"
                            name="nome"
                            outlined
                            placeholder="Insira o nome completo"
                            required
                            v-model="nome"
                          ></v-text-field>
                        </v-col>
                        <!--Posto Grad-->
                        <v-col
                          cols="12"
                          md="6"
                          sm="4"
                        >
                          <v-select
                            :items="posto_grad_options"
                            dense
                            label="Posto / Grad"
                            name="posto_grad"
                            outlined
                            placeholder="Insira o Posto/Grad"
                            v-model="posto_grad"
                          ></v-select>
                        </v-col>
                        <!--Nome de Guerra-->
                        <v-col
                          cols="12"
                          md="6"
                          sm="4"
                        >
                          <v-text-field
                            :error-messages="nomeGuerraErrors"
                            @blur="$v.nome_guerra.$touch()"
                            @input="$v.nome_guerra.$touch()"
                            dense
                            label="Nome de Guerra"
                            name="nome_guerra"
                            outlined
                            placeholder="Insira o nome de guerra"
                            required
                            v-model="nome_guerra"
                          ></v-text-field>
                        </v-col>
                        <!--CPF-->
                        <v-col
                          cols="12"
                          md="6"
                          sm="4"
                        >
                          <v-text-field
                            :error-messages="cpfErrors"
                            @blur="$v.cpf.$touch()"
                            @input="$v.cpf.$touch()"
                            dense
                            label="CPF"
                            name="cpf"
                            outlined
                            placeholder="Insira o CPF do usuário"
                            required
                            v-mask-cpf
                            v-model="cpf"
                          ></v-text-field>
                        </v-col>
                        <!--OM-->
                        <v-col
                          cols="12"
                          md="6"
                          sm="4"
                        >
                          <v-select
                            :items="oms"
                            dense
                            item-text="sigla"
                            item-value="id"
                            label="Om"
                            name="om"
                            outlined
                            placeholder="Selecione a Om do usuário"
                            required
                            v-model="om"
                          ></v-select>
                        </v-col>
                        <!--Tipo-->
                        <v-col
                          cols="12"
                          md="6"
                          sm="4"
                        >
                          <v-select
                            :items="user_type_options"
                            dense
                            label="Tipo de Usuário"
                            name="tipo"
                            outlined
                            placeholder="Selecione o tipo de usuário"
                            required
                            v-model="tipo"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <!--Botões-->
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <!--Cancelar-->
                    <v-btn
                      @click="close"
                      color="red darken-1"
                    >
                      Cancelar
                    </v-btn>
                    <!--Salvar-->
                    <v-btn
                      @click="save"
                      color="green darken-1"
                    >
                      Salvar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </form>
            </v-dialog>

            <!--Dialog para deletar usuário-->
            <v-dialog max-width="800px" v-model="dialogDelete">
              <v-card>
                <v-card-title class="justify-center" primary-title><i class="fa fa-exclamation-triangle mr-4"></i> Você
                  tem
                  certeza que quer deletar o usuário {{ editedUser.posto_grad }} {{ editedUser.nome_guerra }}? <i
                    class="fa fa-exclamation-triangle ml-4"></i></v-card-title>
                <v-card-text>
                  <div class="text-center">Essa ação é irreverssível. Tenha certeza do que está fazendo.</div>
                </v-card-text>
                <v-card-actions class="pb-5">
                  <v-spacer></v-spacer>
                  <v-btn @click="closeDelete" color="grey lighten-1">Cancelar</v-btn>
                  <span class="pl-5 pr-5"></span>
                  <v-btn @click="deleteUserConfirm" color="red lighten-1">Excluir</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <!--Template de botões para editar e excluir-->
        <template v-slot:item.actions="{ item }">
          <v-icon
            @click="editUser(item)"
            class="mr-2"
            small
          >
            mdi-pencil
          </v-icon>
          <v-icon
            @click="deleteUser(item)"
            small
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>
<script>import {cpf} from 'cpf-cnpj-validator'
import {validationMixin} from 'vuelidate'
import {required} from 'vuelidate/lib/validators'

let validaCpf = (value) => cpf.isValid(value)
let uniqueCpf = () => {
  return true
}

export default {
  mixins: [validationMixin],
  validations: {
    nome: {required},
    nome_guerra: {required},
    cpf: {required, validaCpf, uniqueCpf}
  },
  data: () => ({
    posto_grad_options: ['Gen Ex', 'Gen Div', 'Gen Bda', 'Cel', 'Ten Cel', 'Maj', 'Cap', '1º Ten', '2º Ten', 'Asp', 'STen', '1º Sgt', '2º Sgt', '3º Sgt', 'Cb', 'Sd', 'SC'],
    user_type_options: ['Administrador Geral', 'Administrador', 'Chamador'],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Nome',
        align: 'start',
        value: 'nome'
      },
      {
        text: 'Nome de Guerra',
        value: 'guerra'
      },
      {
        text: 'CPF',
        value: 'cpf'
      },
      {
        text: 'Om',
        value: 'om.sigla'
      },
      {
        text: 'Tipo',
        value: 'tipo'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      }
    ],
    editedIndex: -1,
    id: '',
    nome: '',
    nome_guerra: '',
    guerra: '',
    cpf: '',
    om: '',
    tipo: '',
    posto_grad: '',
    tempCpf: '',
    defaultUser: {
      nome: '',
      nome_guerra: '',
      guerra: '',
      cpf: '',
      om: '',
      tipo: '',
      posto_grad: ''
    },
    editedUser: {
      id: '',
      nome: '',
      nome_guerra: '',
      guerra: '',
      cpf: '',
      om: '',
      tipo: '',
      posto_grad: ''
    }
  }),
  computed:
    {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Usuário' : 'Editar Usuário'
      },
      nomeErrors () {
        const errors = []
        if (!this.$v.nome.$dirty) return errors
        !this.$v.nome.required && errors.push('O Campo "Nome" não pode ficar em branco! ')
        return errors
      },
      nomeGuerraErrors () {
        const errors = []
        if (!this.$v.nome_guerra.$dirty) return errors
        !this.$v.nome_guerra.required && errors.push('O Campo "Nome de Guerra" não pode ficar em branco! ')
        return errors
      },
      cpfErrors () {
        const errors = []
        if (!this.$v.cpf.$dirty) return errors
        !this.$v.cpf.required && errors.push('O Campo "CPF" não pode ficar em branco! ')
        !this.$v.cpf.validaCpf && errors.push('O CPF informado não é valido! ')
        !this.$v.cpf.uniqueCpf && errors.push('O CPF informado já está em uso! ')
        return errors
      }
    },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  props: {
    usuarios: Array,
    oms: Array
  },

  methods: {
    editUser (item) {
      this.editedIndex = this.usuarios.indexOf(item)
      this.editedUser = Object.assign({}, item)
      this.id = this.editedUser.id
      this.nome = this.editedUser.nome
      this.nome_guerra = this.editedUser.nome_guerra
      this.posto_grad = this.editedUser.posto_grad
      this.cpf = this.editedUser.cpf
      this.om = this.editedUser.om.id
      this.tipo = this.editedUser.tipo
      this.dialog = true
      this.tempCpf = this.editedUser.cpf
    },

    deleteUser (item) {
      this.editedIndex = this.usuarios.indexOf(item)
      this.editedUser = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteUserConfirm () {
      this.$http.delete('users/' + this.editedUser.id)
      // eslint-disable-next-line no-return-assign
        .then(() => {
          this.usuarios.splice(this.editedIndex, 1)
          this.closeDelete()
          this.$toastr.s(
            'Usuário removido com sucesso', 'Sucesso!'
          )
        }, err => {
          console.log(err)
          this.$toastr.e(
            'Não foi possível remover o Usuário', 'Erro!'
          )
        })
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedUser = Object.assign({}, this.defaultUser)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedUser = Object.assign({}, this.defaultUser)
        this.editedIndex = -1
      })
    },

    mandaPraEdicao () {
      if (this.editedIndex > -1) {
        let ajustaObjeto = {}
        let objetoParaEnvio = {}

        let novaOm = []
        if (typeof this.om === 'object') {
          novaOm = this.om
        } else {
          for (let i = 0; i < this.oms.length; i++) {
            if (this.oms[i].id === this.om) {
              novaOm = this.oms[i]
            }
          }
        }
        ajustaObjeto['id'] = this.id
        ajustaObjeto['nome'] = this.nome
        ajustaObjeto['nome_guerra'] = this.nome_guerra
        ajustaObjeto['posto_grad'] = this.posto_grad
        ajustaObjeto['guerra'] = this.posto_grad + ' ' + this.nome_guerra
        ajustaObjeto['cpf'] = this.cpf
        ajustaObjeto['om'] = novaOm
        ajustaObjeto['tipo'] = this.tipo
        ajustaObjeto['edited_index'] = this.editedIndex

        objetoParaEnvio['id'] = this.id
        objetoParaEnvio['nome'] = this.nome
        objetoParaEnvio['nome_guerra'] = this.nome_guerra
        objetoParaEnvio['posto_grad'] = this.posto_grad
        objetoParaEnvio['cpf'] = this.cpf
        objetoParaEnvio['om_id'] = novaOm.id
        objetoParaEnvio['tipo'] = this.tipo

        this.$http.put('users/' + objetoParaEnvio.id, objetoParaEnvio)
        // eslint-disable-next-line no-return-assign
          .then(() => {
            Object.assign(this.usuarios[ajustaObjeto.edited_index], ajustaObjeto)
            this.$toastr.s(
              'Usuário alterado com sucesso', 'Sucesso!'
            )
          }, err => {
            console.log(err)
            this.$toastr.e(
              'Não foi possível alterar o Usuário', 'Erro!'
            )
          })
      } else {
        let objetoParaEnvio = {}
        objetoParaEnvio['nome'] = this.nome
        objetoParaEnvio['nome_guerra'] = this.nome_guerra
        objetoParaEnvio['posto_grad'] = this.posto_grad
        objetoParaEnvio['cpf'] = this.cpf
        objetoParaEnvio['om_id'] = this.om
        objetoParaEnvio['tipo'] = this.tipo
        this.usuarios.push(objetoParaEnvio)
      }
      this.close()
    },

    save () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.tempCpf !== this.cpf) {
          let novoCpf = this.cpf
          var registro = this.usuarios.find(f => f.cpf === novoCpf)
          if (registro) {
            this.$toastr.e(
              'Esse CPF já se encotra cadastrado na base de dados.', 'Erro!'
            )
          } else {
            this.mandaPraEdicao()
          }
        } else {
          this.mandaPraEdicao()
        }
      }
    }
  }
}

</script>
