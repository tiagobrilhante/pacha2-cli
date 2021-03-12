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
                Senha Inicial - SENHA
              </v-col>
              <v-col>Data considerada: DATA</v-col>
              <v-col>Responsável: RESP</v-col>
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
              <v-row>
                <v-col>
                  <v-text-field
                    :error-messages="numeroInicialErrors"
                    @blur="$v.numero_inicial.$touch()"
                    @input="$v.numero_inicial.$touch()"
                    dense
                    label="Senha Inicial"
                    name="numero_inicial"
                    outlined
                    placeholder="Insira o número inicial do dia"
                    required
                    v-model="numero_inicial"
                  >
                  </v-text-field>
                </v-col>
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
                Senha Inicial - SENHA
              </v-col>
              <v-col>Data considerada: DATA</v-col>
              <v-col>Responsável: RESP</v-col>
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
              <v-row>
                <v-col>
                  <v-text-field
                    dense
                    label="Senha Inicial"
                    name="numero_inicial"
                    outlined
                    placeholder="Insira o número inicial do dia"
                    required
                    v-model="numero_inicial"
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

            </v-card-text>

          </v-card>

        </v-card-text>

      </v-card>

      <!--DataTable-->
      <v-card>
        tipo de tabela - {{tabelaTipo}}<v-spacer></v-spacer>
        dados de tabela - {{ tabelaDadosTipo }}
        <v-data-table
          :headers="headers"
          :items=tabelaDadosTipo
          :search="search"
          class="elevation-1"
          sort-by="numero_inicial"
        >
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
    numero_inicial: {required}
    // nome_ref: {required},
    // localizacao: {required},
    // om: {required}
    // cor: {required}
  },

  props: {
    parametrosnormal: Array,
    parametrosprioridade: Array,
    oms: Array
  },

  data: () => ({
    data_ref_normal: new Date().toISOString().substr(0, 10),
    data_ref_prioridade: new Date().toISOString().substr(0, 10),
    menu_data_normal: false,
    menu_data_prioridade: false,
    // desbilita os botoes
    // Card e form Normal
    visualizaCardNormal: true,
    visualizaFormNormal: false,
    // Card e Form Prioridade
    visualizaCardPrioridade: true,
    visualizaFormPrioridade: false,
    // ajuste dos botões
    desativadoNormal: false,
    desativadoPrioridade: false,
    // tabela tipo e retorno + ajustes
    tabelaTipo: 'Normal',
    tabelaDadosTipo: this.parametrosnormal,
    search: '',
    headers: [
      {
        text: 'Número Inicial',
        align: 'start',
        value: 'numero_inicial'
      },
      {
        text: 'Data Considerada',
        value: 'data_ref'
      },
      {
        text: 'Responsável',
        value: 'responsavel',
        align: 'center'
      }
    ],

    // default itens
    om: '',
    data_ref: '',
    numero_inicial: '',
    idForm: ''
  }),

  computed: {
    numeroInicialErrors () {
      const errors = []
      if (!this.$v.numero_inicial.$dirty) return errors
      !this.$v.numero_inicial.required && errors.push('O Campo Número Inicial" não pode ficar em branco! ')
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

    save () {
      if (!this.$v.$invalid) {
        console.log('save')
      }
    }

  }
}

</script>
