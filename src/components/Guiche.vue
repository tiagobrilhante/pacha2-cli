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
          mdi-desktop-classic
        </v-icon>
        <h2>Gerenciamento de Guichês de Chamada </h2>
      </v-banner>

      <!--DataTable-->
      <v-data-table
        :headers="headers"
        :items="guiches"
        :search="search"
        class="elevation-1"
        sort-by="ip"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Tabela de Guiches Cadastrados</v-toolbar-title>
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
                  Novo Guiche de Atendimento
                </v-btn>
              </template>

              <!--Card de cadastro edição-->
              <form>
                <v-card>
                  <v-card-title>
                    <span class="headline">
                      <v-icon class="mr-5" color="black"> mdi-desktop-classic</v-icon>
                      {{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <!--IP - Localização, OM e nome ref-->
                        <v-col
                          cols="12"
                          md="6"
                          sm="4"
                        >
                          <!--IP-->
                          <v-row>
                            <v-col>
                              <v-text-field
                                :error-messages="ipErrors"
                                @blur="$v.ip.$touch()"
                                @input="$v.ip.$touch()"
                                dense
                                label="Ip"
                                name="ip"
                                outlined
                                placeholder="Insira o IP do painel"
                                required
                                v-model="ip"
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <!--nome de referência-->
                          <v-row>
                            <v-col>
                              <v-text-field
                                :error-messages="nomeRefErrors"
                                dense
                                hint="Por exemplo: 1 A"
                                label="Nome de Referência do guichê"
                                name="nome_ref"
                                outlined
                                placeholder="Insira o nome de referência do guichê"
                                required
                                v-model="nome_ref"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <!--Localização-->
                          <v-row>
                            <v-col>
                              <v-text-field
                                dense
                                hint="Por exemplo: Recepção"
                                label="Localização do guichê"
                                name="localizacao"
                                outlined
                                placeholder="Insira o local do guichê"
                                required
                                v-model="localizacao"
                              ></v-text-field>
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
                                placeholder="Selecione a Om vinculada ao Guichê"
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
                                  <p><b>Cor de referencia do guichê</b></p>
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

            <!--Dialog para deletar painel-->
            <v-dialog max-width="800px" v-model="dialogDelete">
              <v-card>
                <v-card-title class="justify-center" primary-title><i class="fa fa-exclamation-triangle mr-4"></i> Você
                  tem
                  certeza que quer deletar o Guichê? <i
                    class="fa fa-exclamation-triangle ml-4"></i></v-card-title>
                <v-card-text>
                  <div class="text-center">Essa ação é irreverssível. Tenha certeza do que está fazendo.</div>
                </v-card-text>
                <v-card-actions class="pb-5">
                  <v-spacer></v-spacer>
                  <v-btn @click="closeDelete" color="grey lighten-1">Cancelar</v-btn>
                  <span class="pl-5 pr-5"></span>
                  <v-btn @click="deleteGuicheConfirm" color="red lighten-1">Excluir</v-btn>
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
                @click="editGuiche(item)"
                class="mr-2"
                small
                v-bind="attrs"
                v-on="on"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Editar Guichê</span>
          </v-tooltip>
          <!--Excluir-->
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="deleteGuiche(item)"
                class="mr-2"
                small
                v-bind="attrs"
                v-on="on"
              >
                mdi-delete
              </v-icon>
            </template>
            <span>Excluir Guichê</span>
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
    ip: {required},
    nome_ref: {required},
    // localizacao: {required},
    om: {required}
    // cor: {required}
  },

  data: () => ({

    dialog: false,
    search: '',
    dialogDelete: false,
    headers: [
      {
        text: 'Ip',
        align: 'start',
        value: 'ip'
      },
      {
        text: 'Localizacao',
        value: 'localizacao'
      },
      {
        text: 'Nome Ref',
        value: 'nome_ref'
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
    ip: '',
    om: '',
    cor: '',
    localizacao: '',
    nome_ref: '',
    defaultGuiche: {
      ip: '',
      om: '',
      cor: '',
      localizacao: '',
      nome_ref: ''
    },
    editedGuiche: {
      ip: '',
      om: '',
      cor: '',
      localizacao: '',
      nome_ref: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Guichê' : 'Editar Guichê'
    },
    ipErrors () {
      const errors = []
      if (!this.$v.ip.$dirty) return errors
      !this.$v.ip.required && errors.push('O Campo "IP" não pode ficar em branco! ')
      return errors
    },
    omErrors () {
      const errors = []
      if (!this.$v.om.$dirty) return errors
      !this.$v.om.required && errors.push('O Campo "Om" não pode ficar em branco! ')
      return errors
    },
    nomeRefErrors () {
      const errors = []
      if (!this.$v.nome_ref.$dirty) return errors
      !this.$v.nome_ref.required && errors.push('O Campo "Nome de Referência" não pode ficar em branco! ')
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
    guiches: Array,
    oms: Array
  },

  methods: {
    editGuiche (item) {
      this.editedIndex = this.guiches.indexOf(item)
      this.editedGuiche = Object.assign({}, item)
      this.id = this.editedGuiche.id
      this.ip = this.editedGuiche.ip
      this.localizacao = this.editedGuiche.localizacao
      this.nome_ref = this.editedGuiche.nome_ref
      this.cor = this.editedGuiche.cor
      this.om = this.editedGuiche.om.id
      this.$v.$touch()
      this.dialog = true
    },

    getColor (cor) {
      return cor
    },

    deleteGuiche (item) {
      this.editedIndex = this.guiches.indexOf(item)
      this.editedGuiche = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteGuicheConfirm () {
      this.$http.delete('guiches/' + this.editedGuiche.id)
      // eslint-disable-next-line no-return-assign
        .then(() => {
          this.guiches.splice(this.editedIndex, 1)
          this.resetFields()
          this.closeDelete()
          this.$toastr.s(
            'Guichê removido com sucesso', 'Sucesso!'
          )
          this.resetFields()
        }, err => {
          console.log(err)
          this.$toastr.e(
            'Não foi possível remover o Guichê', 'Erro!'
          )
        })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedGuiche = Object.assign({}, this.defaultGuiche)
        this.editedIndex = -1
        this.resetFields()
      })
    },

    resetFields () {
      this.id = ''
      this.ip = ''
      this.localizacao = ''
      this.nome_ref = ''
      this.cor = ''
      this.om = ''
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedGuiche = Object.assign({}, this.defaultGuiche)
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
          ajustaObjeto['ip'] = this.ip
          ajustaObjeto['localizacao'] = this.localizacao
          ajustaObjeto['nome_ref'] = this.nome_ref
          ajustaObjeto['cor'] = this.cor
          ajustaObjeto['om'] = novaOm
          ajustaObjeto['edited_index'] = this.editedIndex

          objetoParaEnvio['id'] = this.id
          objetoParaEnvio['ip'] = this.ip
          objetoParaEnvio['localizacao'] = this.localizacao
          objetoParaEnvio['nome_ref'] = this.nome_ref
          objetoParaEnvio['cor'] = this.cor
          objetoParaEnvio['om_id'] = novaOm.id

          this.$http.put('guiches/' + objetoParaEnvio.id, objetoParaEnvio)
          // eslint-disable-next-line no-return-assign
            .then(() => {
              Object.assign(this.guiches[ajustaObjeto.edited_index], ajustaObjeto)
              this.$toastr.s(
                'Guichê alterado com sucesso', 'Sucesso!'
              )
              this.resetFields()
              this.close()
            }, err => {
              console.log(err)
              this.$toastr.e(
                'Não foi possível alterar o Guichê', 'Erro!'
              )
            })
        } else {
          let objetoParaEnvio = {}
          objetoParaEnvio['ip'] = this.ip
          objetoParaEnvio['localizacao'] = this.localizacao
          objetoParaEnvio['nome_ref'] = this.nome_ref
          objetoParaEnvio['cor'] = this.cor
          objetoParaEnvio['om_id'] = this.om
          this.$http.post('guiches', objetoParaEnvio)
            .then(response => {
              this.guiches.push(response.data)
              this.$toastr.s(
                'Guichê criado com sucesso', 'Sucesso!'
              )
              this.resetFields()
              this.close()
            }, err => {
              console.log(err)
              this.$toastr.e(
                'Não foi possível criar o Guichê', 'Erro!'
              )
            })
        }
      }
    }
  }
}

</script>
