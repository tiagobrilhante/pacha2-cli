<template>
  <v-main>
    <v-container fluid v-if="loading">

      <!--Guiche e informações do painel-->
      <v-row>
        <v-col></v-col>
        <v-col class="text-center">
          <h2>Guichê - {{ guicheNomeRef }} </h2>
          <h4>Painel IP - {{ guichePanelRef }}</h4>
        </v-col>
        <v-col class="text-lg-right">

          <div class="pt-3">
            <span class="digital">{{ meuRelogio }}</span>
          </div>

        </v-col>
      </v-row>

      <v-row v-if="temParametro">
        <!--Console de chamadas-->
        <v-col v-if="meuConsole">

          <v-card
            elevation="10"
            outlined
            rounded="lg"
          >

            <v-container>

              <v-row>

                <v-col>

                  <h2 class="text-center">Console de Chamadas</h2>
                  <v-divider></v-divider>
                  <br>
                  <v-row>

                    <!--espaço para botões-->
                    <v-col cols="7">

                      <!--chamada normal-->
                      <v-btn
                        @click="chama('Normal')"
                        block
                        class="mb-2"
                        color="primary"
                        x-large
                      >
                        <v-icon class="mr-5">
                          mdi-human-male
                        </v-icon>
                        Chamada Normal
                      </v-btn>

                      <!--chamada preferencial-->
                      <v-btn
                        @click="chama('Preferencial')"
                        block
                        class="mb-2"
                        color="warning"
                        x-large
                      >
                        <i class="fa fa-wheelchair mr-5"></i>
                        Chamada Preferencial
                      </v-btn>

                      <!--chamada nominal-->
                      <v-btn
                        @click="preChamaNominal()"
                        block
                        class="mb-2"
                        color="error"
                        x-large
                      >
                        <v-icon class="mr-5">
                          mdi-comment-account
                        </v-icon>
                        Chamada Nominal
                      </v-btn>

                    </v-col>

                    <!--Espaço para previsão-->
                    <v-col cols="5">

                      <v-card
                        elevation="10"
                        outlined
                        rounded="lg"
                      >
                        <v-card-title>Previsão</v-card-title>
                        <v-card-text class="text-left">
                          <p><b>Normal:</b> {{ previsaoNormal }}</p>
                          <p><b>Prioridade:</b> {{ previsaoPreferencial }}</p>
                        </v-card-text>
                      </v-card>

                    </v-col>

                    <!--Dialog para deletar painel-->
                    <v-dialog max-width="800px" v-model="dialogChamaNominal">
                      <v-card>
                        <v-card-title class="justify-center" primary-title><i
                          class="fa fa-exclamation-triangle mr-4"></i> Insira o Nome da pessoa a ser chamada. <i
                          class="fa fa-exclamation-triangle ml-4"></i></v-card-title>
                        <v-card-text>

                          <form>

                            <v-card-text>
                              <v-container>
                                <!--nome a ser chamado-->
                                <v-row>
                                  <v-col>
                                    <v-text-field
                                      :error-messages="nomeRefErrors"
                                      @blur="$v.nome_ref.$touch()"
                                      @input="$v.nome_ref.$touch()"
                                      dense
                                      hint="O nome digitado parecerá no painel"
                                      label="Nome"
                                      name="nome_ref"
                                      outlined
                                      placeholder="Insira o nome a ser chamado"
                                      required
                                      v-model="nome_ref"
                                    ></v-text-field>
                                  </v-col>
                                </v-row>

                              </v-container>
                            </v-card-text>
                            <v-card-actions class="pb-5">
                              <v-spacer></v-spacer>
                              <!--chamar-->
                              <v-btn @click="chama('Nominal')" color="green lighten-1">Chamar</v-btn>
                              <span class="pl-5 pr-5"></span>
                              <!--Cancelar-->
                              <v-btn @click="closePreChamaNominal" color="grey lighten-1">Cancelar</v-btn>
                              <v-spacer></v-spacer>
                            </v-card-actions>

                          </form>

                        </v-card-text>

                      </v-card>
                    </v-dialog>

                  </v-row>

                  <br>

                </v-col>

              </v-row>

            </v-container>

          </v-card>

        </v-col>

        <!--Chamada Ativa-->
        <v-col v-if="meuAtiva">
          <v-card
            elevation="10"
            outlined
            rounded="lg"
          >
            <v-container>
              <v-row>
                <v-col>
                  <div class="text-center">
                    <h2>Chamada Ativa</h2>
                  </div>
                  <v-divider></v-divider>
                  <br>
                  <!--Sumário de chamada-->
                  <v-row>
                    <!--Múdulo sumário de chamadas-->
                    <v-col>
                      <v-alert
                        border="left"
                        class="pb-0"
                        color="blue-grey"
                        outlined
                      >
                        <p class="text-center text-h5 mb-0"><b>Sumário de Chamada</b></p>

                        <!--Nome / num / detalhes / tipo (chamada)-->
                        <v-container class="pb-0">
                          <!--nome / num e detalhes-->
                          <v-row>
                            <!--nome / num chamado-->
                            <v-col> Número / Nome Chamado: <br>
                              <v-alert
                                class="text-center pb-0"
                                color="black"
                                outlined>
                                <p class="text-h3">{{ chamadaAtivaConsoleNumero }}</p>
                              </v-alert>
                            </v-col>
                            <!--Detalhes-->
                            <v-col> Detalhes:
                              <v-alert
                                class="text-left pb-0 pt-0"
                                color="grey"
                                outlined>
                                <b>Chamador:</b> {{ chamadaAtivaConsoleChamador }}<br>
                                <b>Data / Hora:</b> {{ chamadaAtivaConsoleDateTime }}
                              </v-alert>
                            </v-col>
                          </v-row>
                          <!--Tipo de chamada-->
                          <v-row class="mt-0">
                            <v-col class="text-center">
                              <v-alert
                                class="text-center"
                                color="dark-grey"
                                outlined>
                                <span class="text-h5">Chamada {{ chamadaAtivaConsoleTipo }}</span>
                              </v-alert>
                            </v-col>
                          </v-row>
                        </v-container>

                        <!--tipo atendimento e publico alvo-->
                        <v-container>
                          <v-row class="p-0 m-0">
                            <!--publico alvo-->
                            <v-col class="p-0 m-0">
                              <v-select
                                :error-messages="publicoErrors"
                                :items="listaPublicos"
                                @blur="$v.publico.$touch()"
                                @input="$v.publico.$touch()"
                                dense
                                item-text="tipo"
                                item-value="id"
                                label="Público Alvo"
                                name="publico"
                                outlined
                                placeholder="Selecione o alvo do atendimento"
                                required
                                v-model="publico"
                              ></v-select>
                            </v-col>
                          </v-row>
                          <v-row class="p-0 m-0">
                            <!--tipo de atendimento-->
                            <v-col class="p-0 m-0">
                              <v-select
                                :error-messages="tipoErrors"
                                :items="listaTipos"
                                @blur="$v.tipo.$touch()"
                                @input="$v.tipo.$touch()"
                                chips
                                dense
                                item-text="tipo"
                                item-value="id"
                                label="Tipos de atendimento"
                                multiple
                                name="tipo"
                                outlined
                                placeholder="Selecione o tipo de atendimento"
                                required
                                v-model="tipo"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-container>

                      </v-alert>
                    </v-col>

                    <!--Módulo de actions-->
                    <v-col>
                      <!--rechamar-->
                      <v-btn
                        @click="rechamada"
                        block
                        class="mb-2"
                        color="yellow"
                        height="145px"
                        x-large
                      >
                        <v-icon class="mr-5">
                          mdi-reload-alert
                        </v-icon>
                        Rechamar
                      </v-btn>
                      <!--Finalizar-->
                      <v-btn
                        @click="finaliza"
                        block
                        class="mb-2"
                        color="green"
                        height="145px"
                        x-large
                      >
                        <v-icon class="mr-5">
                          mdi-check
                        </v-icon>
                        Finalizar
                      </v-btn>
                      <!--Descartar-->
                      <v-btn
                        @click="descarta"
                        block
                        class="mb-2"
                        color="red"
                        height="145px"
                        x-large
                      >
                        <v-icon class="mr-5">
                          mdi-delete-empty
                        </v-icon>
                        Descartar
                      </v-btn>
                    </v-col>
                  </v-row>

                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <!--Chamadas efetuadas-->
      <v-row class="mt-5" v-if="temParametro">
        <v-col>
          <v-card
            elevation="10"
            outlined
            rounded="lg"
          >
            <v-data-table
              :headers="headers"
              :items=tabelaDadosTipo
              :search="search"
              class="elevation-1"
              sort-by="id"
              sort-desc
            >

              <!--Criado em-->
              <template v-slot:item.created_at="{ item }">
                <span>{{ new Date(item.created_at).toLocaleString() }}</span>
              </template>

              <!--updated at-->
              <template v-slot:item.updated_at="{ item }">
                <span>{{ new Date(item.updated_at).toLocaleString() }}</span>
              </template>

              <!--tempo-->
              <template v-slot:item.tempo="{ item }">
                <span>{{ difTempoChamado(item.updated_at,item.created_at ) }}</span>
              </template>

              <!--Tipo de atendimento-->
              <template v-slot:item.tipo_atendimento="{ item }">
                <span>{{ formatWhiteSpaces(item.tipo_atendimento) }}</span>
              </template>

              <!--Publico Alvo-->
              <template v-slot:item.publico_alvo="{ item }">
                <span>{{ formatWhiteSpaces(item.publico_alvo) }}</span>
              </template>

              <!--Nome de referencia-->
              <template v-slot:item.nome_ref="{ item }">
                <span>{{ formatWhiteSpaces(item.nome_ref) }}</span>
              </template>

              <!--NUmero de referencia-->
              <template v-slot:item.numero_ref="{ item }">
                <span>{{ formatWhiteSpaces(item.numero_ref) }}</span>
              </template>

              <template v-slot:top>
                <v-toolbar
                  flat
                >
                  <v-toolbar-title>Chamadas realizadas neste guiche ( {{ guicheNomeRef }} ) - {{ tabelaTipo }}
                  </v-toolbar-title>

                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>

                  <!--Filtro atendimento normal-->
                  <v-btn @click="getTableData('Normal')" class="mr-5" color="primary" rounded>
                    <v-icon>
                      fa fa-male
                    </v-icon>
                  </v-btn>

                  <!--Filtro atendimento preferencial-->
                  <v-btn @click="getTableData('Preferencial')" class="mr-5" color="warning" rounded>
                    <v-icon>
                      fa fa-wheelchair
                    </v-icon>
                  </v-btn>

                  <!--Filtro atendimento por nome-->
                  <v-btn @click="getTableData('Nominal')" color="error" rounded>
                    <v-icon>
                      mdi-comment-account
                    </v-icon>
                  </v-btn>

                  <v-divider
                    class="mx-4"
                    inset
                    vertical></v-divider>
                  <v-btn
                    :color=colorBtnTableGeral
                    @click="showGeralTable(statusTabelaGeral)"
                  >
                    {{ textChamaGeral }} Chamadas do Painel
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
        </v-col>
      </v-row>

      <!--Chamadas efetuadas no painel-->
      <v-row class="mt-5" v-if="temParametro" v-show="mostraTudo">
        <v-col>
          <v-card
            elevation="10"
            outlined
            rounded="lg"
          >
            <v-data-table
              :headers="headersGeral"
              :items=chamadasGerais
              :search="searchGeral"
              class="elevation-1"
              sort-by="id"
              sort-desc
            >

              <!--created at-->
              <template v-slot:item.created_at="{ item }">
                <span>{{ new Date(item.created_at).toLocaleString() }}</span>
              </template>

              <!--updated at-->
              <template v-slot:item.updated_at="{ item }">
                <span>{{ new Date(item.updated_at).toLocaleString() }}</span>
              </template>

              <!--tempo-->
              <template v-slot:item.tempo="{ item }">
                <span>{{ difTempoChamado(item.updated_at,item.created_at ) }}</span>
              </template>

              <!--Tipo de atendimento-->
              <template v-slot:item.tipo_atendimento="{ item }">
                <span>{{ formatWhiteSpaces(item.tipo_atendimento) }}</span>
              </template>

              <!--Publico Alvo-->
              <template v-slot:item.publico_alvo="{ item }">
                <span>{{ formatWhiteSpaces(item.publico_alvo) }}</span>
              </template>

              <!--Nome de referencia-->
              <template v-slot:item.nome_ref="{ item }">
                <span>{{ formatWhiteSpaces(item.nome_ref) }}</span>
              </template>

              <!--numero de referencia-->
              <template v-slot:item.numero_ref="{ item }">
                <span>{{ formatWhiteSpaces(item.numero_ref) }}</span>
              </template>

              <template v-slot:top>
                <v-toolbar
                  flat
                >
                  <v-toolbar-title>Chamadas do Painel {{ guichePanelRef }}
                  </v-toolbar-title>

                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>

                  <v-spacer></v-spacer>

                  <!--Pesquisar-->
                  <v-text-field
                    append-icon="mdi-magnify"
                    hide-details
                    label="Pesquisar"
                    placeholder="Pesquisar"
                    single-line
                    v-model="searchGeral"
                  ></v-text-field>

                </v-toolbar>

              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>

      <!--Alerta de ausência de parametros-->
      <v-row v-else>
        <v-col></v-col>
        <v-col>
          <v-alert
            border="left"
            dense
            type="warning"
          >
            É necessário cadastrar os parametros de chamadas para o dia de hoje.
          </v-alert>
        </v-col>
        <v-col></v-col>
      </v-row>

    </v-container>
  </v-main>
</template>

<script>import {logoutMixin} from '@/mixins'
import {validationMixin} from 'vuelidate'
import {required} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin, logoutMixin],
  validations: {
    tipo: {required},
    publico: {required},
    nome_ref: {required}
  },
  data: () => ({
    listaTipos: [],
    listaPublicos: [],
    guiche: '',
    guicheNomeRef: '',
    guichePanelRef: '',
    checaParametro: '',
    previsaoNormal: '',
    previsaoPreferencial: '',
    // tabela tipo e retorno + ajustes
    tabelaTipo: 'Normal',
    headers: [
      {
        text: 'Número Chamado',
        align: 'center',
        value: 'numero_ref'
      },
      {
        text: 'Nome Chamado',
        align: 'start',
        value: 'nome_ref'
      },
      {
        text: 'Data / hora Chamada',
        value: 'created_at'
      },
      {
        text: 'Data / hora Finalização',
        value: 'updated_at'
      },
      {
        text: 'Tempo Aproximado de atendimento',
        value: 'tempo'
      },
      {
        text: 'Tipo de Atendimento',
        value: 'tipo_atendimento',
        align: 'center'
      },
      {
        text: 'Publico Alvo',
        value: 'publico_alvo',
        align: 'center'
      },
      {
        text: 'Chamador',
        value: 'chamador',
        align: 'center'
      },
      {
        text: 'Status',
        value: 'status',
        align: 'center'
      }
    ],
    headersGeral: [
      {
        text: 'Número Chamado',
        align: 'center',
        value: 'numero_ref'
      },
      {
        text: 'Nome Chamado',
        align: 'start',
        value: 'nome_ref'
      },
      {
        text: 'Data / hora Chamada',
        value: 'created_at'
      },
      {
        text: 'Data / hora Finalização',
        value: 'updated_at'
      },
      {
        text: 'Tempo Aproximado de atendimento',
        value: 'tempo'
      },
      {
        text: 'Tipo de Chamado',
        value: 'tipo',
        align: 'center'
      },
      {
        text: 'Publico Alvo',
        value: 'publico_alvo',
        align: 'center'
      },
      {
        text: 'Guichê',
        value: 'guiche.nome_ref',
        align: 'center'
      },
      {
        text: 'Tipo de Atendimento',
        value: 'tipo_atendimento',
        align: 'center'
      },
      {
        text: 'Chamador',
        value: 'chamador',
        align: 'center'
      },
      {
        text: 'Status',
        value: 'status',
        align: 'center'
      }
    ],
    search: '',
    searchGeral: '',
    temParametro: true,
    minhasChamadasNormais: [],
    minhasChamadasPreferenciais: [],
    minhasChamadasNominais: [],
    chamadasGerais: [],
    tabelaDadosTipo: [],
    tipo: '',
    publico: '',
    loading: false,
    meuConsole: true,
    meuAtiva: false,
    dialogChamaNominal: false,
    nome_ref: '',
    statusPrev: 'stop',
    // informações de chamata ativa
    chamadaAtivaConsoleTipo: '',
    chamadaAtivaConsoleNumero: '',
    chamadaAtivaConsoleChamador: '',
    chamadaAtivaConsoleDateTime: '',
    chamadaAtivaConsoleId: '',
    mostraTudo: false,
    textChamaGeral: 'Mostrar',
    statusTabelaGeral: 'Show',
    colorBtnTableGeral: 'primary',
    meuRelogio: '',
    lePrevision: ''

  }),

  name: 'homeChamador',

  async mounted () {
    await this.getPrevisaoChamadas()
    await this.getTiposServicoChamadas()
    await this.getPermiteInicioChamadas()
    await this.getChamadasAbertas()
    await this.getGuicheChamadas()
    await this.getListaChamadasFeitas()
    this.loading = true
    // tenho que travar o setInterval quando eu chamar alguem, ou quando não tiver os parametros

    setInterval(this.relogio, 1000)
  },

  computed: {
    tipoErrors () {
      const errors = []
      if (!this.$v.tipo.$dirty) return errors
      !this.$v.tipo.required && errors.push('O Campo "Tipo de Atendimento" não pode ficar em branco! ')
      return errors
    },
    publicoErrors () {
      const errors = []
      if (!this.$v.publico.$dirty) return errors
      !this.$v.publico.required && errors.push('O Campo "Público Alvo" não pode ficar em branco! ')
      return errors
    },
    nomeRefErrors () {
      const errors = []
      if (!this.$v.nome_ref.$dirty) return errors
      !this.$v.nome_ref.required && errors.push('O Campo "Nome" não pode ficar em branco! ')
      return errors
    }
  },
  methods: {
    // Ajusta espaços vazios na tabela
    formatWhiteSpaces (item) {
      if (item === null) {
        return '-'
      } else {
        return item
      }
    },

    // pega os tipos de serviços disponíveis
    async getTiposServicoChamadas () {
      try {
        let self = this
        // retorna todos os tipos disponíveis de atendimento
        this.$http.get('tipoatendimento/alltipos')
          .then(response => {
            self.listaTipos = response.data.data
          })
          .catch(erro => console.log(erro))

        // retorna todos os publicos alvos disponiveis
        this.$http.get('publicoalvo/alltipos')
          .then(response => {
            self.listaPublicos = response.data.data
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    },

    // verifica se pode ou não iniciar as chamadas
    async getPermiteInicioChamadas () {
      try {
        let self = this
        // retorna se pode ou não realizar chamadas
        this.$http.get('parametrochamada/checa')
          .then(response => {
            if (!response.data) {
              this.temParametro = false
            }
            self.checaParametro = response.data
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    },

    // verifica qual é o guiche que está em uso
    async getGuicheChamadas () {
      try {
        let self = this
        // Retorna o guiche
        this.$http.get('guiches/myguiche')
          .then(response => {
            self.guiche = response.data
            self.guicheNomeRef = response.data.nome_ref
            self.guichePanelRef = response.data.ip + ' ( ' + response.data.localizacao + ' - ' + response.data.panel.om.sigla + ' )'
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    },

    // retorna as chamadas desse guiche para popular as tabelas
    async getListaChamadasFeitas () {
      try {
        let self = this
        // Retorna as chamadas normais que o guiche fez
        this.$http.get('chamadas/mycalls/normal')
          .then(response => {
            self.minhasChamadasNormais = response.data
            self.tabelaDadosTipo = this.minhasChamadasNormais
          })
          .catch(erro => console.log(erro))

        // Retorna as chamadas preferenciais que o guiche fez
        this.$http.get('chamadas/mycalls/preferencial')
          .then(response => {
            self.minhasChamadasPreferenciais = response.data
          })
          .catch(erro => console.log(erro))

        // Retorna as chamadas nominais que o guiche fez
        this.$http.get('chamadas/mycalls/nominal')
          .then(response => {
            self.minhasChamadasNominais = response.data
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    },

    // retorna as chamadas abertas se existirem
    async getChamadasAbertas () {
      try {
        // Retorna as chamadas normais que o guiche fez
        this.$http.get('chamadas/aberto')
          .then(response => {
            let leData = new Date(response.data.created_at)
            let options = {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric'
            }
            options.timeZone = 'America/Manaus'
            // options.timeZoneName = 'short'
            this.chamadaAtivaConsoleDateTime = leData.toLocaleDateString('pt-br', options)
            this.chamadaAtivaConsoleId = response.data.id

            if (typeof (response.data) === 'object') {
              if (response.data.tipo === 'Nominal') {
                this.chamadaAtivaConsoleNumero = response.data.nome_ref
              } else {
                this.chamadaAtivaConsoleNumero = response.data.numero_ref
              }
              this.chamadaAtivaConsoleTipo = response.data.tipo

              this.chamadaAtivaConsoleChamador = response.data.chamador

              this.meuConsole = false
              this.meuAtiva = true
              clearInterval(this.lePrevision)
            }
          })
          .catch(erro => console.log(erro))
      } catch (e) {
        console.log(e)
      }
    },

    // retrona a previsão de chamadas com tic de tempo
    async getPrevisaoChamadas () {
      try {
        this.lePrevision = setInterval(this.getLePrevisao, 1000)
      } catch (e) {
        console.log(e)
      }
    },

    // consulta para retornar uma previsão
    getLePrevisao () {
      // Previsão de chamadas Normais e preferenciais
      Promise.resolve(this.$http.get('chamadas/previsao')
        .then(response => {
          this.previsaoNormal = response.data[0]
          this.previsaoPreferencial = response.data[1]
          this.chamadasGerais = response.data[2]
        })
        .catch((e) => {
          clearInterval(this.lePrevision)
        })
      )
    },

    // carrega os dados da minha tabela de chamada (baseada em guiche)
    getTableData (tipo) {
      if (tipo === 'Normal') {
        this.tabelaTipo = 'Normal'
        this.tabelaDadosTipo = this.minhasChamadasNormais
      } else if (tipo === 'Preferencial') {
        this.tabelaTipo = 'Preferêncial'
        this.tabelaDadosTipo = this.minhasChamadasPreferenciais
      } else {
        this.tabelaTipo = 'Nominal'
        this.tabelaDadosTipo = this.minhasChamadasNominais
      }
    },

    // calcula a diferença em horas de um atendimeto
    difTempoChamado (updated, created) {
      const data1 = new Date(created)
      const data2 = new Date(updated)
      const tempoAtendimento = Math.round((data2 - data1) / 60000)

      if (tempoAtendimento === 1) {
        return tempoAtendimento + ' minuto'
      } else if (tempoAtendimento > 1) {
        return tempoAtendimento + ' minutos'
      } else if (tempoAtendimento === 0) {
        return 'menor que 60 segundos'
      } else {
        return 'tempo inválido'
      }
    },

    // abre o dialog para inserir o nome
    preChamaNominal () {
      this.dialogChamaNominal = true
      this.nome_ref = ''
    },

    // fecha o dialog para inserir o nome
    closePreChamaNominal () {
      this.dialogChamaNominal = false
    },

    // realiza uma chamada
    chama (quem) {
      if (quem === 'Nominal') {
        if (!this.$v.nome_ref.$anyError) {
          let objetoParaEnvio = {}
          objetoParaEnvio['tipo'] = quem
          objetoParaEnvio['guiche'] = this.guiche
          objetoParaEnvio['nome_ref'] = this.$v.nome_ref.$model

          this.$http.post('chamadas/chama', objetoParaEnvio)
            .then(response => {
              // tenho que popular as informações da chamada ativa
              this.chamadaAtivaConsoleTipo = response.data.tipo
              this.chamadaAtivaConsoleNumero = response.data.nome_ref
              this.chamadaAtivaConsoleChamador = response.data.chamador

              let leData = new Date(response.data.created_at)
              let options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
              }
              options.timeZone = 'America/Manaus'
              // options.timeZoneName = 'short'
              this.chamadaAtivaConsoleDateTime = leData.toLocaleDateString('pt-br', options)

              this.chamadaAtivaConsoleId = response.data.id

              clearInterval(this.lePrevision)
            })
            .catch(erro => console.log(erro))

          this.meuConsole = false
          this.meuAtiva = true
        }
      } else {
        let objetoParaEnvio = {}
        objetoParaEnvio['tipo'] = quem
        objetoParaEnvio['guiche'] = this.guiche

        this.$http.post('chamadas/chama', objetoParaEnvio)
          .then(response => {
            // tenho que popular as informações da chamada ativa
            this.chamadaAtivaConsoleTipo = response.data.tipo
            this.chamadaAtivaConsoleNumero = response.data.numero_ref
            this.chamadaAtivaConsoleChamador = response.data.chamador
            let leData = new Date(response.data.created_at)
            let options = {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric'
            }
            options.timeZone = 'America/Manaus'
            // options.timeZoneName = 'short'
            this.chamadaAtivaConsoleDateTime = leData.toLocaleDateString('pt-br', options)
            this.chamadaAtivaConsoleId = response.data.id

            clearInterval(this.lePrevision)
          })
          .catch(erro => console.log(erro))

        this.meuConsole = false
        this.meuAtiva = true
      }
    },

    // descarta uma chamada
    descarta () {
      try {
        this.$http.get('chamadas/descarta/' + this.chamadaAtivaConsoleId)
          .then(response => {
            if (response.data.tipo === 'Normal') {
              this.minhasChamadasNormais.push(response.data)
            } else if (response.data.tipo === 'Preferencial') {
              this.minhasChamadasPreferenciais.push(response.data)
            } else {
              this.minhasChamadasNominais.push(response.data)
            }
            this.tipo = ''
            this.meuConsole = true
            this.meuAtiva = false
            this.dialogChamaNominal = false
            this.getPrevisaoChamadas()
          })
      } catch (e) {
        console.log(e)
      }
    },

    // finaliza uma chamada (sucesso)
    finaliza () {
      // this.$v.tipo.$invalid === true significa que tem erro
      // this.$v.publico.$invalid === true significa que tem erro
      if (this.$v.tipo.$invalid || this.$v.publico.$invalid) {
        this.$v.tipo.$touch()
        this.$v.publico.$touch()
      } else {
        let objetoEnvio = {}
        objetoEnvio['id_chamada'] = this.chamadaAtivaConsoleId
        objetoEnvio['tipo_atendimento'] = this.$v.tipo.$model
        objetoEnvio['publico_alvo'] = this.$v.publico.$model

        this.$http.post('chamadas/finaliza', objetoEnvio)
          .then(response => {
            if (response.data.tipo === 'Normal') {
              this.minhasChamadasNormais.push(response.data)
            } else if (response.data.tipo === 'Preferencial') {
              this.minhasChamadasPreferenciais.push(response.data)
            } else {
              this.minhasChamadasNominais.push(response.data)
            }
            this.tipo = ''
            this.publico = ''
            this.meuConsole = true
            this.meuAtiva = false
            this.dialogChamaNominal = false
            this.getPrevisaoChamadas()
          })
          .catch(erro => console.log(erro))
      }
    },

    showGeralTable (status) {
      if (status === 'Show') {
        this.textChamaGeral = 'Ocultar'
        this.statusTabelaGeral = 'Hide'
        this.mostraTudo = true
        this.colorBtnTableGeral = 'gray'
      } else {
        this.textChamaGeral = 'Mostrar'
        this.statusTabelaGeral = 'Show'
        this.mostraTudo = false
        this.colorBtnTableGeral = 'primary'
      }
    },

    // rechamada de uma chamada
    rechamada () {
      this.$http.get('chamadas/rechamada/' + this.chamadaAtivaConsoleId)
        .then(response => {
          console.log(response)

          let leData = new Date(response.data[0].created_at)
          let options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          }
          options.timeZone = 'America/Manaus'
          // options.timeZoneName = 'short'
          this.chamadaAtivaConsoleDateTime = leData.toLocaleDateString('pt-br', options)
          this.chamadaAtivaConsoleId = response.data[0].id

          if (typeof (response.data[0]) === 'object') {
            if (response.data[1].tipo === 'Normal') {
              this.minhasChamadasNormais.push(response.data[1])
            } else if (response.data[1].tipo === 'Preferencial') {
              this.minhasChamadasPreferenciais.push(response.data[1])
            } else {
              this.minhasChamadasNominais.push(response.data[1])
            }

            if (response.data[0].tipo === 'Nominal') {
              this.chamadaAtivaConsoleNumero = response.data[0].nome_ref
            } else {
              this.chamadaAtivaConsoleNumero = response.data[0].numero_ref
            }
            this.chamadaAtivaConsoleTipo = response.data[0].tipo

            this.chamadaAtivaConsoleChamador = response.data[0].chamador

            clearInterval(this.lePrevision)
          }
        })
        .catch(erro => console.log(erro))
    },

    // relógio
    relogio () {
      let dia = new Date()
      let hora = dia.getHours()
      let minutos = dia.getMinutes()
      let segundos = dia.getSeconds()
      let formatoHora = convertaFormato(hora)
      hora = verificaHora(hora)

      hora = addZero(hora)
      minutos = addZero(minutos)
      segundos = addZero(segundos)

      this.meuRelogio = `${hora}:${minutos}:${segundos}${formatoHora}`

      function convertaFormato (time) {
        let formato = ' AM'
        if (time >= 12) {
          formato = ' PM'
        }
        return formato
      }

      function verificaHora (time) {
        if (time > 12) {
          time = time - 12
        }
        if (time === 0) {
          time = 12
        }
        return time
      }

      function addZero (time) {
        if (time < 10) {
          time = '0' + time
        }
        return time
      }
    }
  }
}
</script>

<style>

  @font-face {
    font-family: 'Digital';
    src: local('Digital'), url('../assets/fonts/digital-7.ttf');
  }

  .digital {
    font-family: 'Digital';
    color: black;
    font-size: 40px;
  }
</style>
