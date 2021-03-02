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

              <v-form
                lazy-validation
                ref="form"
                v-model="valid"
              >
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
                            :rules="nomeRules"
                            dense
                            label="Nome"
                            name="nome"
                            outlined
                            placeholder="Insira o nome completo"
                            required
                            v-model="editedUser.nome"
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
                            v-model="editedUser.posto_grad"
                          ></v-select>
                        </v-col>
                        <!--Nome de Guerra-->
                        <v-col
                          cols="12"
                          md="6"
                          sm="4"
                        >
                          <v-text-field
                            :rules="nomeGuerraRules"
                            dense
                            label="Nome de Guerra"
                            outlined
                            placeholder="Insira o nome de guerra"
                            v-model="editedUser.nome_guerra"
                          ></v-text-field>
                        </v-col>
                        <!--CPF-->
                        <v-col
                          cols="12"
                          md="6"
                          sm="4"
                        >
                          <v-text-field
                            :rules="cpfRules"
                            dense
                            label="CPF"
                            name="cpf"
                            outlined
                            placeholder="Insira o CPF do usuário"
                            v-mask-cpf
                            v-model="editedUser.cpf"
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
                            v-model="editedUser.om"
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
                            v-model="editedUser.tipo"
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
              </v-form>
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

export default {
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
    editedUser: {
      nome: '',
      nome_guerra: '',
      guerra: '',
      cpf: '',
      om: '',
      tipo: '',
      posto_grad: ''
    },
    defaultUser: {
      nome: '',
      nome_guerra: '',
      guerra: '',
      cpf: '',
      om: '',
      tipo: '',
      posto_grad: ''
    },
    tempCpf: '',
    valid: true,
    nomeRules: [
      v => !!v || 'O Campo "Nome" é obrigatório'
    ],
    nomeGuerraRules: [
      v => !!v || 'O Campo "Nome de Guerra" é obrigatório'
    ],
    cpfRules: [
      v => !!v || 'O campo "CPF" é obrigatório',
      v => {
        if (!cpf.isValid(v)) {
          return 'O "CPF" informado não é válido'
        } else {
          return true
        }
      }
    ]
  }),
  computed:
    {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Usuário' : 'Editar Usuário'
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
        if (typeof this.editedUser.om === 'object') {
          novaOm = this.editedUser.om
        } else {
          for (let i = 0; i < this.oms.length; i++) {
            if (this.oms[i].id === this.editedUser.om) {
              novaOm = this.oms[i]
            }
          }
        }
        ajustaObjeto['id'] = this.editedUser.id
        ajustaObjeto['nome'] = this.editedUser.nome
        ajustaObjeto['nome_guerra'] = this.editedUser.nome_guerra
        ajustaObjeto['posto_grad'] = this.editedUser.posto_grad
        ajustaObjeto['guerra'] = this.editedUser.posto_grad + ' ' + this.editedUser.nome_guerra
        ajustaObjeto['cpf'] = this.editedUser.cpf
        ajustaObjeto['om'] = novaOm
        ajustaObjeto['tipo'] = this.editedUser.tipo
        ajustaObjeto['edited_index'] = this.editedIndex

        objetoParaEnvio['id'] = this.editedUser.id
        objetoParaEnvio['nome'] = this.editedUser.nome
        objetoParaEnvio['nome_guerra'] = this.editedUser.nome_guerra
        objetoParaEnvio['posto_grad'] = this.editedUser.posto_grad
        objetoParaEnvio['cpf'] = this.editedUser.cpf
        objetoParaEnvio['om_id'] = novaOm.id
        objetoParaEnvio['tipo'] = this.editedUser.tipo

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
        this.usuarios.push(this.editedUser)
      }
      this.close()
    },

    save () {
      if (this.$refs.form.validate()) {
        if (this.tempCpf !== this.editedUser.cpf) {
          let novoCpf = this.editedUser.cpf
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
