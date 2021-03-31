<template>
  <v-main>
    <v-container fluid v-if="loading">

      <v-row>
        <!--Console de chamadas-->
        <v-col>

          <v-card
            color="red"
            elevation="10"
            outlined
            rounded="lg"
          >

            <v-container fluid v-if="comChamado">
              <v-row>
                <!--Espaço para chamados-->
                <v-col>

                  <!--Card de chamado-->
                  <v-card
                    :key="chamado.id"
                    class="ma-5"
                    elevation="10"
                    outlined
                    rounded="lg"
                    v-for="chamado in chamadoPainel"
                  >
                    <v-card-text class="text-left">
                      <v-row>
                        <v-col>
                          <p class="text-h1" v-if="chamado.numero_ref === null">{{ chamado.nome_ref }}</p>
                          <p class="text-h1" v-if="chamado.nome_ref === null">{{ chamado.numero_ref }} - {{ chamado.tipo
                            }}</p>
                        </v-col>
                        <v-col class="text-h1 text-right">Guichê - {{ chamado.guiche.nome_ref }}</v-col>
                      </v-row>

                    </v-card-text>
                  </v-card>

                </v-col>
              </v-row>
            </v-container>

            <!--Espaco para acusar ausencia de chamado-->
            <v-container fluid v-else>
              <v-row>
                <v-col>
                  <!--Card de ausencia de chamado-->
                  <v-card
                    class="ma-5 text--black"
                    elevation="10"
                    outlined
                    rounded="lg"
                  >
                    <v-card-text class="text-center">
                      <span class="text-h2 font-weight-black">Ainda não existem chamadas no dia de hoje</span>
                      <v-divider></v-divider>
                      <br>
                      <span class="text-h4"> Aguarde o início do atendimento</span>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>

          </v-card>

        </v-col>
      </v-row>

    </v-container>
  </v-main>
</template>

<script>export default {
  data: () => ({
    PanelRef: '',
    chamadoPainel: [],
    loading: false,
    meuRelogio: '',
    lePrevision: '',
    comChamado: false,
    idChamadaAtual: '',
    isLoaded: false
  }),
  async mounted () {
    await this.getPrevisaoChamadas()
    await this.getPainelChamadas()
    this.loading = true
    // tenho que travar o setInterval quando eu chamar alguem, ou quando não tiver os parametros

    setInterval(this.relogio, 1000)
  },
  computed: {},
  methods: {
    // verifica qual é o Painel que está em uso
    async getPainelChamadas () {
      try {
        let self = this
        // Retorna o guiche
        this.$http.get('painelchamada/panel')
          .then(response => {
            self.PanelRef = response.data.localizacao + ' - ' + response.data.om.sigla
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
      Promise.resolve(this.$http.get('painelchamada')
        .then(response => {
          if (response.data !== 'sem chamadas') {
            this.comChamado = true
          }
          this.chamadoPainel = response.data

          if (this.idChamadaAtual === response.data[0].id) {
            console.log('sem alteracao')
          } else {
            console.log('alterou')
            this.idChamadaAtual = response.data[0].id
            this.alert()
          }
        })
        .catch((e) => {
          clearInterval(this.lePrevision)
        })
      )
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
    },

    alert () {
      console.log('alert')
      let context = new AudioContext()
      let oscillator = context.createOscillator()
      oscillator.type = 'square'
      oscillator.connect(context.destination)
      oscillator.start()
      setInterval(() => oscillator.stop(), 500)
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
