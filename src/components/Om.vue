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
          fab fa-fort-awesome-alt
        </v-icon>
        <h2>Gerenciamento de Organizações Militares </h2>
      </v-banner>

      <!--DataTable-->
      <v-data-table
        :headers="headers"
        :items="oms"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Tabela de Oms Cadastradas</v-toolbar-title>
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
                  Nova Om
                </v-btn>
              </template>

              <!--Card de cadastro edição-->
              <form>
                <v-card>
                  <v-card-title>
                    <span class="headline"><i class="fa fa-desktop"></i> {{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <!--nome - sigla-->
                        <v-col
                          cols="12"
                          md="6"
                          sm="4"
                        >
                          <!--Nome-->
                          <v-row>
                            <v-col>
                              <v-text-field
                                :error-messages="nomeErrors"
                                @blur="$v.nome.$touch()"
                                @input="$v.nome.$touch()"
                                dense
                                hint="Por exemplo: 12ª Região Militar"
                                label="Nome"
                                name="nome"
                                outlined
                                placeholder="Insira o Nome da Om"
                                required
                                v-model="nome"
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <!--sigla-->
                          <v-row>
                            <v-col>
                              <v-text-field
                                :error-messages="siglaErrors"
                                @blur="$v.sigla.$touch()"
                                @input="$v.sigla.$touch()"
                                dense
                                hint="Por exemplo: 12ª RM"
                                label="Sigla da Om"
                                name="sigla"
                                outlined
                                placeholder="Insira a sigla da Om"
                                required
                                v-model="sigla"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                        </v-col>
                        <!--COR-->
                        <v-col
                          cols="12"
                          md="6"
                          sm="4"
                        >

                          <v-card
                            elevation="2"
                          >
                            <v-container fluid>
                              <v-row>

                                <v-col>
                                  <p><b>Cor de referencia da Om</b></p>
                                  <v-color-picker
                                    canvas-height="100"
                                    hide-inputs
                                    mode="hexa"
                                    name="cor"
                                    v-model="cor"
                                  ></v-color-picker>
                                  <v-alert type="info">
                                    Apenas para gerenciamento de estatísticas.
                                  </v-alert>

                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card>

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

            <!--Dialog para deletar om-->
            <v-dialog max-width="800px" v-model="dialogDelete">
              <v-card>
                <v-card-title class="justify-center" primary-title><i class="fa fa-exclamation-triangle mr-4"></i> Você
                  tem
                  certeza que quer deletar a Om? <i
                    class="fa fa-exclamation-triangle ml-4"></i></v-card-title>
                <v-card-text>
                  <div class="text-center">Essa ação é irreverssível. Tenha certeza do que está fazendo.</div>
                </v-card-text>
                <v-card-actions class="pb-5">
                  <v-spacer></v-spacer>
                  <v-btn @click="closeDelete" color="grey lighten-1">Cancelar</v-btn>
                  <span class="pl-5 pr-5"></span>
                  <v-btn @click="deleteOmConfirm" color="red lighten-1">Excluir</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!--Dialog para detalhes da OM-->
            <v-dialog max-width="800px" v-model="dialogDetails">
              <v-card>
                <v-card-title class="justify-center" primary-title> Detalhes da OM - {{ editedOm.sigla }}</v-card-title>
                <v-card-text>
                  <h3><b>Painéis vinculados a essa OM:</b></h3>
                  <v-divider></v-divider>
                  <br>
                  <ul>
                    <li :key="panel.id" v-for="panel in editedOm.panel"> <b>IP</b> {{ panel.ip }} --- ({{ panel.localizacao }})</li>
                  </ul>
                </v-card-text>
                <v-card-actions class="pb-5">
                  <v-spacer></v-spacer>
                  <v-btn @click="closeDeleteDetails" color="grey lighten-1">Fechar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </v-toolbar>

        </template>

        <!--Template de botões para detalhar, editar e excluir -->
        <template v-slot:item.actions="{ item }">
          <!--Ver detalhes-->
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="detailOm(item)"
                class="mr-2"
                small
                v-bind="attrs"
                v-on="on"
              >
                mdi-magnify-plus
              </v-icon>
            </template>
            <span>Detalhes da Om</span>
          </v-tooltip>
          <!--editar-->
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="editOm(item)"
                class="mr-2"
                small
                v-bind="attrs"
                v-on="on"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Editar Om</span>
          </v-tooltip>
          <!--Excluir-->
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="deleteOm(item)"
                class="mr-2"
                small
                v-bind="attrs"
                v-on="on"
              >
                mdi-delete
              </v-icon>
            </template>
            <span>Excluir Om</span>
          </v-tooltip>
        </template>

        <!--Ajuste de cores-->
        <template v-slot:item.cor="{ item }">
          <v-chip
            :color="getColor(item.cor)"
            dark
          >
          </v-chip>
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
    nome: {required},
    sigla: {required}
  },

  data: () => ({

    dialog: false,
    search: '',
    dialogDelete: false,
    dialogDetails: false,
    headers: [
      {
        text: 'Nome',
        align: 'start',
        value: 'nome'
      },
      {
        text: 'Sigla',
        value: 'sigla'
      },
      {
        text: 'Cor',
        value: 'cor',
        align: 'center'
      },
      {
        text: 'Actions',
        value: 'actions',
        align: 'center',
        sortable: false
      }
    ],
    editedIndex: -1,
    nome: '',
    sigla: '',
    cor: '',
    defaultOm: {
      nome: '',
      sigla: '',
      cor: ''
    },
    editedOm: {
      nome: '',
      sigla: '',
      cor: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nova Om' : 'Editar Om'
    },
    nomeErrors () {
      const errors = []
      if (!this.$v.nome.$dirty) return errors
      !this.$v.nome.required && errors.push('O Campo "Nome" não pode ficar em branco! ')
      return errors
    },
    siglaErrors () {
      const errors = []
      if (!this.$v.sigla.$dirty) return errors
      !this.$v.sigla.required && errors.push('O Campo "Sigla" não pode ficar em branco! ')
      return errors
    },
    showColor () {
      if (typeof this.cor === 'string') return this.cor

      return JSON.stringify(Object.keys(this.cor).reduce((cor, key) => {
        cor[key] = Number(this.cor[key].toFixed(2))
        return cor
      }, {}), null, 2)
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    cor (value) {
      // temporary fix while there is no way to disable the alpha channel in the colorpicker component: https://github.com/vuetifyjs/vuetify/issues/9590
      if (value.toString().match(/#[a-zA-Z0-9]{8}/)) {
        this.cor = value.substr(0, 7)
      }
    }
  },

  props: {
    paineis: Array,
    oms: Array
  },

  methods: {
    editOm (item) {
      this.editedIndex = this.oms.indexOf(item)
      this.editedOm = Object.assign({}, item)
      this.id = this.editedOm.id
      this.nome = this.editedOm.nome
      this.sigla = this.editedOm.sigla
      this.cor = this.editedOm.cor
      this.$v.$touch()
      this.dialog = true
    },

    getColor (cor) {
      return cor
    },

    deleteOm (item) {
      this.editedIndex = this.oms.indexOf(item)
      this.editedOm = Object.assign({}, item)
      this.dialogDelete = true
    },

    detailOm (item) {
      this.editedIndex = this.oms.indexOf(item)
      this.editedOm = Object.assign({}, item)
      this.dialogDetails = true
    },

    deleteOmConfirm () {
      this.$http.delete('om/' + this.editedOm.id)
      // eslint-disable-next-line no-return-assign
        .then(() => {
          this.oms.splice(this.editedIndex, 1)
          this.resetFields()
          this.closeDelete()
          this.$toastr.s(
            'Om removida com sucesso', 'Sucesso!'
          )
          this.resetFields()
        }, err => {
          console.log(err)
          this.$toastr.e(
            'Não foi possível remover a Om', 'Erro!'
          )
        })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedOm = Object.assign({}, this.defaultOm)
        this.editedIndex = -1
        this.resetFields()
      })
    },

    closeDeleteDetails () {
      this.dialogDetails = false
    },

    resetFields () {
      this.id = ''
      this.nome = ''
      this.sigla = ''
      this.cor = ''
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedOm = Object.assign({}, this.defaultOm)
        this.editedIndex = -1
        this.resetFields()
      })
    },

    save () {
      if (!this.$v.$invalid) {
        if (this.editedIndex > -1) {
          let ajustaObjeto = {}
          let objetoParaEnvio = {}

          ajustaObjeto['id'] = this.id
          ajustaObjeto['nome'] = this.nome
          ajustaObjeto['sigla'] = this.sigla
          ajustaObjeto['cor'] = this.cor
          ajustaObjeto['edited_index'] = this.editedIndex

          objetoParaEnvio['id'] = this.id
          objetoParaEnvio['nome'] = this.nome
          objetoParaEnvio['sigla'] = this.sigla
          objetoParaEnvio['cor'] = this.cor

          this.$http.put('om/' + objetoParaEnvio.id, objetoParaEnvio)
          // eslint-disable-next-line no-return-assign
            .then(() => {
              Object.assign(this.oms[ajustaObjeto.edited_index], ajustaObjeto)
              this.$toastr.s(
                'Om alterada com sucesso', 'Sucesso!'
              )
              this.resetFields()
              this.close()
            }, err => {
              console.log(err)
              this.$toastr.e(
                'Não foi possível alterar a Om', 'Erro!'
              )
            })
        } else {
          let objetoParaEnvio = {}
          objetoParaEnvio['nome'] = this.nome
          objetoParaEnvio['sigla'] = this.sigla
          objetoParaEnvio['cor'] = this.cor
          this.$http.post('om', objetoParaEnvio)
            .then(response => {
              this.oms.push(response.data)
              this.$toastr.s(
                'Om criada com sucesso', 'Sucesso!'
              )
              this.resetFields()
              this.close()
            }, err => {
              console.log(err)
              this.$toastr.e(
                'Não foi possível criar a Om', 'Erro!'
              )
            })
        }
      }
    }
  }
}

</script>
