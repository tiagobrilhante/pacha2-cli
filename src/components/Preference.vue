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
          mdi-settings-transfer-outline
        </v-icon>
        <h2>Gerenciamento de Preferências de Chamadas </h2>
      </v-banner>

      <!--botoes para ajustes de atendimento-->
      <v-card
        class="mb-0"
        rounded="0"
      >
        <v-card-text>
          <!--Ajusta atendimento Normal-->
          <v-btn
            :disabled="desativadoNormal"
            @click='visualizaAreaForm("norm")'
            class="mb-2"
            color="primary"
          >
            <v-icon class="mr-5">
              mdi-human-male
            </v-icon>
            Ajuste de Atendimento Normal
          </v-btn>

          <!--Ajusta atendimento prioritário-->
          <v-btn
            :disabled="desativadoPrioridade"
            @click='visualizaAreaForm("prio")'
            class="mb-2"
            color="warning"
          >
            <i class="fa fa-wheelchair mr-5"></i>
            Ajuste de Atendimento Prioritário
          </v-btn>
        </v-card-text>
      </v-card>

      <!--Espaço para alerts de info de parametros-->
      <v-card
        class=""
        rounded="0"
      >
        <v-card-text>

          <!--alert atendimento normal-->
          <v-alert border="top"
                   color="primary"
                   dark
                   icon="fa fa-male"
                   v-show=visualizaCardNormal
          >
            <h3 class="headline">
              Ajustes para atendimento Normal
            </h3>

            <v-divider
              class="my-4 info"
              style="opacity: 0.22"
            ></v-divider>

            <v-row>
              <v-col>
                Senha Inicial - {{ num_ini_normal }}
              </v-col>
              <v-col>Data considerada: {{ data_ini_normal }}</v-col>
              <v-col>Responsável: {{ resp_normal }}</v-col>
            </v-row>

          </v-alert>

          <!--formulario de ajuste de atendimento normal-->
          <v-card
            class="mb-4"
            id="form_norm"
            key="form_norm"
            rounded="lg"
            v-show="visualizaFormNormal"
          >
            <v-card-title>
              Formulário de Ajuste de Atendimento Normal
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="saveNormal">
                <v-row>

                  <!--numero inicial normal-->
                  <v-col>
                    <v-text-field
                      :error-messages="numeroInicialNormalErrors"
                      @blur="$v.numero_inicial_normal.$touch()"
                      @input="$v.numero_inicial_normal.$touch()"
                      dense
                      label="Número Inicial"
                      name="numero_inicial"
                      outlined
                      placeholder="Insira o número inicial do dia"
                      required
                      v-model="numero_inicial_normal"
                    >
                    </v-text-field>
                  </v-col>

                  <!--data de referência normal-->
                  <v-col>
                    <v-menu
                      :close-on-content-click="false"
                      :nudge-right="0"
                      min-width="auto"
                      offset-y
                      transition="scale-transition"
                      v-model="menu_data_normal"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          label="Data de referência de atendimento"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-model="computedDateFormattedNormal"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        @input="menu_data_normal = false"
                        v-model="data_ref_normal"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                </v-row>
                <!--Salvar-->
                <v-btn
                  class="mb-2"
                  color="primary"
                  dark
                  type="submit"

                >
                  <v-icon class="mr-5">
                    mdi-check
                  </v-icon>
                  Salvar
                </v-btn>
                <!--cancelar-->
                <v-btn
                  @click='closeAreaForm("norm")'
                  class="mb-2"
                  color="error"
                  dark
                >
                  <v-icon class="mr-5">
                    mdi-cancel
                  </v-icon>
                  Cancelar
                </v-btn>
              </v-form>

            </v-card-text>

          </v-card>

          <!--Alert atendimento prioritario-->
          <v-alert border="top"
                   color="warning"
                   dark
                   icon="fa fa-wheelchair"
                   v-show=visualizaCardPrioridade>

            <h3 class="headline">
              Ajustes para atendimento Prioritário
            </h3>

            <v-divider
              class="my-4 info"
              style="opacity: 0.22"
            ></v-divider>
            <v-row>
              <v-col>
                Senha Inicial - {{ num_ini_prioridade }}
              </v-col>
              <v-col>Data considerada: {{ data_ini_prioridade }}</v-col>
              <v-col>Responsável: {{ resp_prioridade }}</v-col>
            </v-row>

          </v-alert>

          <!--formulário de ajuste de atendiento prioritario-->
          <v-card
            class="mb-4"
            id="form_prio"
            key="form_prio"
            rounded="lg"
            v-show="visualizaFormPrioridade"
          >
            <v-card-title>
              Formulário de Ajuste de Atendimento Prioritário
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="savePrioridade">
                <v-row>

                  <!--Numero inicial prioridade-->
                  <v-col>
                    <v-text-field
                      :error-messages="numeroInicialPrioridadeErrors"
                      @blur="$v.numero_inicial_prioridade.$touch()"
                      @input="$v.numero_inicial_prioridade.$touch()"
                      dense
                      label="Número Inicial"
                      name="numero_inicial"
                      outlined
                      placeholder="Insira o número inicial do dia"
                      required
                      v-model="numero_inicial_prioridade"
                    >
                    </v-text-field>
                  </v-col>

                  <!--data_prioridade-->
                  <v-col>
                    <v-menu
                      :close-on-content-click="false"
                      :nudge-right="0"
                      min-width="auto"
                      offset-y
                      transition="scale-transition"
                      v-model="menu_data_prioridade"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          label="Data de referência de atendimento"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-model="computedDateFormattedPrioridade"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        @input="menu_data_prioridade = false"
                        v-model="data_ref_prioridade"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                </v-row>
                <!--Salvar -->
                <v-btn
                  class="mb-2"
                  color="primary"
                  dark
                  type="submit"
                >
                  <v-icon class="mr-5">
                    mdi-check
                  </v-icon>
                  Salvar
                </v-btn>
                <!--cancelar-->
                <v-btn
                  @click='closeAreaForm("prio")'
                  class="mb-2"
                  color="error"
                  dark
                >
                  <v-icon class="mr-5">
                    mdi-cancel
                  </v-icon>
                  Cancelar
                </v-btn>
              </v-form>

            </v-card-text>

          </v-card>

        </v-card-text>

      </v-card>

      <!--DataTable-->
      <v-card>
        <v-data-table
          :headers="headers"
          :items=tabelaDadosTipo
          :search="search"
          class="elevation-1"
          sort-by="id"
          sort-desc
        >

          <template v-slot:item.data_ref="{ item }">
            <span>{{  item.data_ref.split('-')[2] + '/' + item.data_ref.split('-')[1] + '/' + item.data_ref.split('-')[0] }}</span>
          </template>

          <template v-slot:top>
            <v-toolbar
              flat
            >
              <v-toolbar-title>Tabela de Parâmetros - Chamada {{ tabelaTipo }}</v-toolbar-title>

              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>

              <!--Filtro atendimento normal-->
              <v-btn @click="getTableData('Normal')" class="mr-5" color="primary">
                <v-icon class="mr-5">
                  fa fa-male
                </v-icon>
                Normal
              </v-btn>

              <!--Filtro atendimento preferencial-->
              <v-btn @click="getTableData('Preferencial')" color="warning">
                <v-icon class="mr-5">
                  fa fa-wheelchair
                </v-icon>
                Preferencial
              </v-btn>

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

            </v-toolbar>

          </template>
        </v-data-table>

      </v-card>

    </v-container>
  </v-main>
</template>
<script>import {validationMixin} from 'vuelidate'
import {required} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  directives: {},
  validations: {
    numero_inicial_normal: {required},
    numero_inicial_prioridade: {required}
  },

  props: {
    parametrosnormal: Array,
    parametrosprioridade: Array
  },
  data: () => ({
    // dados do form de ajuste
    data_ref_normal: new Date().toISOString().substr(0, 10),
    data_ref_prioridade: new Date().toISOString().substr(0, 10),
    numero_inicial_prioridade: '',
    numero_inicial_normal: '',
    menu_data_normal: false,
    menu_data_prioridade: false,
    // desbilita os botoes
    // Card e form Normal
    visualizaCardNormal: true,
    visualizaFormNormal: false,
    // dados base card normal
    num_ini_normal: '',
    data_ini_normal: '',
    resp_normal: '',
    num_ini_prioridade: '',
    data_ini_prioridade: '',
    resp_prioridade: '',
    // Card e Form Prioridade
    visualizaCardPrioridade: true,
    visualizaFormPrioridade: false,
    // ajuste dos botões
    desativadoNormal: false,
    desativadoPrioridade: false,
    // tabela tipo e retorno + ajustes
    tabelaTipo: 'Normal',
    tabelaDadosTipo: [],
    search: '',
    headers: [
      {
        text: 'Número Inicial',
        align: 'start',
        value: 'numero_inicial'
      },
      {
        text: 'Data / hora Considerada',
        value: 'data_ref'
      },
      {
        text: 'Responsável',
        value: 'responsavel',
        align: 'center'
      },
      {
        text: 'Validação',
        value: 'validacao',
        align: 'center'
      }
    ]
  }),

  computed: {
    numeroInicialNormalErrors () {
      const errors = []
      if (!this.$v.numero_inicial_normal.$dirty) return errors
      !this.$v.numero_inicial_normal.required && errors.push('O Campo "Número Inicial" não pode ficar em branco! ')
      return errors
    },

    numeroInicialPrioridadeErrors () {
      const errors = []
      if (!this.$v.numero_inicial_prioridade.$dirty) return errors
      !this.$v.numero_inicial_prioridade.required && errors.push('O Campo "Número Inicial" não pode ficar em branco! ')
      return errors
    },

    computedDateFormattedNormal () {
      return this.formatDate(this.data_ref_normal)
    },

    computedDateFormattedPrioridade () {
      return this.formatDate(this.data_ref_prioridade)
    }

  },

  watch: {},

  mounted () {
    this.retornaNormal()
    this.retornaPrioridade()
    this.getTableData('Normal')
  },

  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    visualizaAreaForm (qual) {
      if (qual === 'norm') {
        this.visualizaCardNormal = false
        this.visualizaFormNormal = true
        this.desativadoNormal = true
      } else {
        this.visualizaCardPrioridade = false
        this.visualizaFormPrioridade = true
        this.desativadoPrioridade = true
      }
    },

    closeAreaForm (qual) {
      if (qual === 'norm') {
        this.visualizaCardNormal = true
        this.visualizaFormNormal = false
        this.desativadoNormal = false
      } else {
        this.visualizaCardPrioridade = true
        this.visualizaFormPrioridade = false
        this.desativadoPrioridade = false
      }
    },

    getTableData (tipo) {
      if (tipo === 'Normal') {
        this.tabelaTipo = 'Normal'
        this.tabelaDadosTipo = this.parametrosnormal
      } else {
        this.tabelaTipo = 'Preferêncial'
        this.tabelaDadosTipo = this.parametrosprioridade
      }
    },

    saveNormal () {
      this.$v.numero_inicial_normal.$touch()
      if (this.$v.numero_inicial_normal.$anyError) {
        console.log('Existem erros no processamento do formulário')
      } else {
        let objetoParaEnvio = {}
        objetoParaEnvio['numero_inicial'] = this.numero_inicial_normal
        objetoParaEnvio['data_ref'] = this.data_ref_normal
        this.$http.post('parametronormal', objetoParaEnvio)
          .then(response => {
            this.retornaNormal()
            this.parametrosnormal.push(response.data)
            this.$toastr.s(
              'Parâmetro de cahamada normal criado com sucesso', 'Sucesso!'
            )
            this.closeAreaForm('norm')
          }, err => {
            console.log(err)
            this.$toastr.e(
              'Não foi possível criar o parâmetro de chamada normal', 'Erro!'
            )
          })
      }
    },

    savePrioridade () {
      this.$v.numero_inicial_prioridade.$touch()
      if (this.$v.numero_inicial_prioridade.$anyError) {
        console.log('Existem erros no processamento do formulário')
      } else {
        let objetoParaEnvio = {}
        objetoParaEnvio['numero_inicial'] = this.numero_inicial_prioridade
        objetoParaEnvio['data_ref'] = this.data_ref_prioridade
        this.$http.post('parametroprioridade', objetoParaEnvio)
          .then(response => {
            this.retornaPrioridade()
            this.parametrosprioridade.push(response.data)
            this.$toastr.s(
              'Parâmetro de cahamada prioritária criado com sucesso', 'Sucesso!'
            )
            this.closeAreaForm('prio')
          }, err => {
            console.log(err)
            this.$toastr.e(
              'Não foi possível criar o parâmetro de chamada prioritária', 'Erro!'
            )
          })
      }
    },

    retornaNormal () {
      let self = this
      this.$http.get('parametronormal/last')
        .then(response => {
          self.num_ini_normal = response.data.numero_inicial
          self.data_ini_normal = response.data.data_ref.split('-')[2] + '/' + response.data.data_ref.split('-')[1] + '/' + response.data.data_ref.split('-')[0]
          self.resp_normal = response.data.responsavel
        }, err => {
          console.log(err)
          this.$toastr.e(
            'Não foi possível obter dados de chamada normal', 'Erro!'
          )
        })
    },

    retornaPrioridade () {
      let self = this
      this.$http.get('parametroprioridade/last')
        .then(response => {
          self.num_ini_prioridade = response.data.numero_inicial
          self.data_ini_prioridade = response.data.data_ref.split('-')[2] + '/' + response.data.data_ref.split('-')[1] + '/' + response.data.data_ref.split('-')[0]
          self.resp_prioridade = response.data.responsavel
        }, err => {
          console.log(err)
          this.$toastr.e(
            'Não foi possível obter dados de chamada preferencial', 'Erro!'
          )
        })
    }

  }
}

</script>
