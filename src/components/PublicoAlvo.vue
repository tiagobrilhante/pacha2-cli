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
          mdi-account-star-outline
        </v-icon>
        <h2>Gerenciamento de Publico Alvo </h2>
      </v-banner>

      <!--DataTable-->
      <v-data-table
        :headers="headers"
        :items="tipos"
        :search="search"
        class="elevation-1"
        sort-by="ip"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Tabela de Publico Alvo Cadastrados</v-toolbar-title>
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
                  Novo publico alvo
                </v-btn>
              </template>

              <!--Card de cadastro edição-->
              <form>
                <v-card>
                  <v-card-title>
                    <span class="headline"><v-icon> mdi-account-star-outline </v-icon> {{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <!--tipo e OM-->
                        <v-col
                          cols="12"
                          md="6"
                          sm="4"
                        >
                          <!--tipo-->
                          <v-row>
                            <v-col>
                              <v-text-field
                                :error-messages="tipoErrors"
                                @blur="$v.tipo.$touch()"
                                @input="$v.tipo.$touch()"
                                dense
                                label="Alvo"
                                name="tipo"
                                outlined
                                placeholder="Insira o alvo"
                                hint="Ex: 'Veterano'"
                                required
                                v-model="tipo"
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <!--OM-->
                          <v-row>
                            <v-col>
                              <v-select
                                :error-messages="omErrors"
                                :items="oms"
                                @blur="$v.om.$touch()"
                                @input="$v.om.$touch()"
                                dense
                                item-text="sigla"
                                item-value="id"
                                label="Om"
                                name="om"
                                outlined
                                placeholder="Selecione a Om vinculada ao publico alvo"
                                required
                                v-model="om"
                              ></v-select>
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
                                  <p><b>Cor de referencia do publico alvo</b></p>
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

            <!--Dialog para deletar publico alvo-->
            <v-dialog max-width="800px" v-model="dialogDelete">
              <v-card>
                <v-card-title class="justify-center" primary-title><i class="fa fa-exclamation-triangle mr-4"></i> Você
                  tem
                  certeza que quer excluir este publico alvo? <i
                    class="fa fa-exclamation-triangle ml-4"></i></v-card-title>
                <v-card-text>
                  <div class="text-center">Essa ação é irreverssível. Tenha certeza do que está fazendo.</div>
                </v-card-text>
                <v-card-actions class="pb-5">
                  <v-spacer></v-spacer>
                  <v-btn @click="closeDelete" color="grey lighten-1">Cancelar</v-btn>
                  <span class="pl-5 pr-5"></span>
                  <v-btn @click="deleteTipoConfirm" color="red lighten-1">Excluir</v-btn>
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
                @click="editTipo(item)"
                class="mr-2"
                small
                v-bind="attrs"
                v-on="on"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Editar publico alvo</span>
          </v-tooltip>
          <!--Excluir-->
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="deleteTipo(item)"
                class="mr-2"
                small
                v-bind="attrs"
                v-on="on"
              >
                mdi-delete
              </v-icon>
            </template>
            <span>Excluir Publico Alvo</span>
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
    tipo: {required},
    om: {required}
    // cor: {required}
  },

  data: () => ({

    dialog: false,
    search: '',
    dialogDelete: false,
    headers: [
      {
        text: 'Tipo',
        align: 'start',
        value: 'tipo'
      },
      {
        text: 'Om',
        value: 'om.sigla',
        align: 'center'
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
    tipo: '',
    om: '',
    cor: '',
    defaultTipo: {
      tipo: '',
      om: '',
      cor: ''
    },
    editedTipo: {
      tipo: '',
      om: '',
      cor: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Publico Alvo' : 'Editar Publico Alvo'
    },
    tipoErrors () {
      const errors = []
      if (!this.$v.tipo.$dirty) return errors
      !this.$v.tipo.required && errors.push('O Campo "alvo" não pode ficar em branco! ')
      return errors
    },
    omErrors () {
      const errors = []
      if (!this.$v.om.$dirty) return errors
      !this.$v.om.required && errors.push('O Campo "Om" não pode ficar em branco! ')
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
    tipos: Array,
    oms: Array
  },

  methods: {
    editTipo (item) {
      this.editedIndex = this.tipos.indexOf(item)
      this.editedTipo = Object.assign({}, item)
      this.id = this.editedTipo.id
      this.tipo = this.editedTipo.tipo
      this.cor = this.editedTipo.cor
      this.om = this.editedTipo.om.id
      this.$v.$touch()
      this.dialog = true
    },

    getColor (cor) {
      return cor
    },

    deleteTipo (item) {
      this.editedIndex = this.tipos.indexOf(item)
      this.editedTipo = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteTipoConfirm () {
      this.$http.delete('publicoalvo/' + this.editedTipo.id)
      // eslint-disable-next-line no-return-assign
        .then(() => {
          this.tipos.splice(this.editedIndex, 1)
          this.resetFields()
          this.closeDelete()
          this.$toastr.s(
            'Publico alvo removido com sucesso', 'Sucesso!'
          )
          this.resetFields()
        }, err => {
          console.log(err)
          this.$toastr.e(
            'Não foi possível remover o publico alvo', 'Erro!'
          )
        })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedTipo = Object.assign({}, this.defaultTipo)
        this.editedIndex = -1
        this.resetFields()
      })
    },

    resetFields () {
      this.id = ''
      this.tipo = ''
      this.cor = ''
      this.om = ''
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedTipo = Object.assign({}, this.defaultTipo)
        this.editedIndex = -1
        this.resetFields()
      })
    },

    save () {
      if (!this.$v.$invalid) {
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
          ajustaObjeto['tipo'] = this.tipo
          ajustaObjeto['cor'] = this.cor
          ajustaObjeto['om'] = novaOm
          ajustaObjeto['edited_index'] = this.editedIndex

          objetoParaEnvio['id'] = this.id
          objetoParaEnvio['tipo'] = this.tipo
          objetoParaEnvio['cor'] = this.cor
          objetoParaEnvio['om_id'] = novaOm.id

          this.$http.put('publicoalvo/' + objetoParaEnvio.id, objetoParaEnvio)
          // eslint-disable-next-line no-return-assign
            .then(() => {
              Object.assign(this.tipos[ajustaObjeto.edited_index], ajustaObjeto)
              this.$toastr.s(
                'Publico Alvo alterado com sucesso', 'Sucesso!'
              )
              this.resetFields()
              this.close()
            }, err => {
              console.log(err)
              this.$toastr.e(
                'Não foi possível alterar o Publico Alvo', 'Erro!'
              )
            })
        } else {
          let objetoParaEnvio = {}
          objetoParaEnvio['tipo'] = this.tipo
          objetoParaEnvio['cor'] = this.cor
          objetoParaEnvio['om_id'] = this.om
          this.$http.post('publicoalvo', objetoParaEnvio)
            .then(response => {
              this.tipos.push(response.data)
              this.$toastr.s(
                'Publico Alvo criado com sucesso', 'Sucesso!'
              )
              this.resetFields()
              this.close()
            }, err => {
              console.log(err)
              this.$toastr.e(
                'Não foi possível criar o Publico Alvo', 'Erro!'
              )
            })
        }
      }
    }
  }
}

</script>
