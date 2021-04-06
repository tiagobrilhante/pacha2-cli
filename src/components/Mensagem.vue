<template>
  <v-main>
    <v-container class="pt-5">

      <!--Banner-->
      <v-banner
        class="p-5"
        elevation="21"
      >
        <v-icon
          size="36"
          slot="icon"
        >
          mdi-comment-text
        </v-icon>
        <h2>Gerenciamento de Mensagens </h2>
      </v-banner>

      <!--DataTable-->
      <v-data-table
        :headers="headers"
        :items="mensagens"
        :search="search"
        class="elevation-1"
        sort-by="ip"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Tabela de Mensagens Cadastradas</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>

            <!--Dialog de cadastro e edição-->
            <v-dialog
              max-width="700px"
              v-model="dialog"
            >
              <!--novo cadastro-->
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mb-2"
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon class="mr-5">
                    mdi-message-plus-outline
                  </v-icon>
                  Nova Mensagem
                </v-btn>
              </template>

              <!--Card de cadastro edição-->
              <form>
                <v-card>
                  <v-card-title>
                    <span class="headline"><v-icon> mdi-comment-text </v-icon> {{ formTitle }}</span>
                  </v-card-title>

                  <!--Mensagem-->
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col>
                          <v-text-field
                            :error-messages="mensagemErrors"
                            @blur="$v.mensagem.$touch()"
                            @input="$v.mensagem.$touch()"
                            dense
                            label="Mensagem"
                            name="mensagem"
                            outlined
                            placeholder="Insira a mensagem"
                            required
                            v-model="mensagem"
                          >
                          </v-text-field>
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

            <v-spacer></v-spacer>

            <!--Pesquisar-->
            <v-text-field
              append-icon="mdi-magnify"
              hide-details
              label="Pesquisar"
              placeholder="Pesquisar"
              single-line
              v-model="search"
            ></v-text-field>

            <!--Dialog para deletar mensagem-->
            <v-dialog max-width="800px" v-model="dialogDelete">
              <v-card>
                <v-card-title class="justify-center" primary-title><i class="fa fa-exclamation-triangle mr-4"></i> Você
                  tem
                  certeza que quer excluir esta mensagem? <i
                    class="fa fa-exclamation-triangle ml-4"></i></v-card-title>
                <v-card-text>
                  <div class="text-center">Essa ação é irreverssível. Tenha certeza do que está fazendo.</div>
                </v-card-text>
                <v-card-actions class="pb-5">
                  <v-spacer></v-spacer>
                  <v-btn @click="closeDelete" color="grey lighten-1">Cancelar</v-btn>
                  <span class="pl-5 pr-5"></span>
                  <v-btn @click="deleteMensagemConfirm" color="red lighten-1">Excluir</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </v-toolbar>

        </template>

        <!--Template de botões para editar e excluir -->
        <template v-slot:item.actions="{ item }">
          <!--editar-->
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="editMensagem(item)"
                class="mr-2"
                small
                v-bind="attrs"
                v-on="on"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Editar Mensagem</span>
          </v-tooltip>
          <!--Excluir-->
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="deleteMensagem(item)"
                class="mr-2"
                small
                v-bind="attrs"
                v-on="on"
              >
                mdi-delete
              </v-icon>
            </template>
            <span>Excluir Mensagem</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>
<script>import {validationMixin} from 'vuelidate'
import {required} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  directives: {},
  validations: {
    mensagem: {required}
  },

  data: () => ({

    dialog: false,
    search: '',
    dialogDelete: false,
    headers: [
      {
        text: 'Mensagem',
        align: 'start',
        value: 'mensagem'
      },
      {
        text: 'Responsável',
        value: 'responsavel'
      },
      {
        text: 'Actions',
        value: 'actions',
        align: 'center',
        sortable: false
      }
    ],
    editedIndex: -1,
    mensagem: '',
    defaultMensagem: {
      mensagem: ''
    },
    editedMensagem: {
      mensagem: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nova mensagem' : 'Editar mensagem'
    },
    mensagemErrors () {
      const errors = []
      if (!this.$v.mensagem.$dirty) return errors
      !this.$v.mensagem.required && errors.push('O Campo "mensagem" não pode ficar em branco! ')
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
    tipos: Array,
    mensagens: Array
  },

  methods: {
    editMensagem (item) {
      this.editedIndex = this.mensagens.indexOf(item)
      this.editedMensagem = Object.assign({}, item)
      this.id = this.editedMensagem.id
      this.mensagem = this.editedMensagem.mensagem
      this.$v.$touch()
      this.dialog = true
    },

    deleteMensagem (item) {
      this.editedIndex = this.mensagens.indexOf(item)
      this.editedMensagem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteMensagemConfirm () {
      this.$http.delete('mensagens/' + this.editedMensagem.id)
      // eslint-disable-next-line no-return-assign
        .then(() => {
          this.mensagens.splice(this.editedIndex, 1)
          this.resetFields()
          this.closeDelete()
          this.$toastr.s(
            'Mensagem removida com sucesso', 'Sucesso!'
          )
          this.resetFields()
        }, err => {
          console.log(err)
          this.$toastr.e(
            'Não foi possível remover a mensagem', 'Erro!'
          )
        })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedMensagem = Object.assign({}, this.defaultMensagem)
        this.editedIndex = -1
        this.resetFields()
      })
    },

    resetFields () {
      this.id = ''
      this.mensagem = ''
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedMensagem = Object.assign({}, this.defaultMensagem)
        this.editedIndex = -1
        this.resetFields()
      })
    },

    save () {
      if (!this.$v.$invalid) {
        if (this.editedIndex > -1) {
          let objetoParaEnvio = {}

          objetoParaEnvio['id'] = this.id
          objetoParaEnvio['mensagem'] = this.mensagem

          this.$http.put('mensagens/' + objetoParaEnvio.id, objetoParaEnvio)
          // eslint-disable-next-line no-return-assign
            .then(response => {
              Object.assign(this.mensagens[this.editedIndex], response.data)
              this.$toastr.s(
                'Mensagem alterada com sucesso', 'Sucesso!'
              )
              this.resetFields()
              this.close()
            }, err => {
              console.log(err)
              this.$toastr.e(
                'Não foi possível alterar a mensagem', 'Erro!'
              )
            })
        } else {
          let objetoParaEnvio = {}
          objetoParaEnvio['mensagem'] = this.mensagem
          this.$http.post('mensagens', objetoParaEnvio)
            .then(response => {
              this.mensagens.push(response.data)
              this.$toastr.s(
                'Mensagem criada com sucesso', 'Sucesso!'
              )
              this.resetFields()
              this.close()
            }, err => {
              console.log(err)
              this.$toastr.e(
                'Não foi possível criar a mensagem', 'Erro!'
              )
            })
        }
      } else {
        this.$v.$touch()
      }
    }
  }
}

</script>
