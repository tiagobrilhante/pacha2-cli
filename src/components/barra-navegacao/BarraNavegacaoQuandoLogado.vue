<template>

  <div class="ml-5">
    <!--Home-->
    <v-tooltip bottom color="primary">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ma-1"
          plain
          to="/" v-bind="attrs"
          v-if="usuarioResetado"
          v-on="on"
        >
          <v-icon center>
            mdi-home
          </v-icon>
        </v-btn>
      </template>
      <span>Página Inicial</span>
    </v-tooltip>

    <!--Administração do sistema-->
    <v-menu
      offset-y
      open-on-hover
      rounded="b-xl"
      v-if="usuarioResetado"
    >
      <template v-if="checaPermissaoAdmin" v-slot:activator="{ on, attrs }">
        <v-btn
          color="white"
          plain
          v-bind="attrs"
          v-on="on"
        ><i class="fa fa-cogs mr-5"></i>
          Administração do Sistema
        </v-btn>
      </template>
      <!--list-->
      <v-list>
        <!--Gerenciar Oms-->
        <v-list-item to="/oms">
          <i class="fab fa-fort-awesome mr-5"></i>
          <v-list-item-title>
            Gerenciar Oms
          </v-list-item-title>
        </v-list-item>
        <!--Gerenciar Usuários-->
        <v-list-item to="/usuarios">
          <i class="fa fa-users mr-5"></i>
          <v-list-item-title>
            Gerenciar Usuários
          </v-list-item-title>
        </v-list-item>
        <!--gerenciar painéis-->
        <v-list-item to="/panels">
          <i class="fa fa-desktop mr-5"></i>
          <v-list-item-title>
            Gerenciar Painéis
          </v-list-item-title>
        </v-list-item>
        <!--gerenciar Guiches-->
        <v-list-item to="/guiches">
          <v-icon class="mr-5" color="black">
            mdi-desktop-classic
          </v-icon>
          <v-list-item-title>
            Gerenciar Guichês
          </v-list-item-title>
        </v-list-item>
        <!--gerenciar tipos de atendimento-->
        <v-list-item to="/tiposatendimento">
          <v-icon class="mr-5" color="black">
            mdi-format-list-text
          </v-icon>
          <v-list-item-title>
            Gerenciar tipos de atendimento
          </v-list-item-title>
        </v-list-item>
        <!--gerenciar publico alvo-->
        <v-list-item to="/publicoalvo">
          <v-icon class="mr-5" color="black">
            mdi-account-star-outline
          </v-icon>
          <v-list-item-title>
            Gerenciar Público Alvo
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!--Administração de chamadas-->
    <v-menu
      offset-y
      open-on-hover
      rounded="b-xl"
      v-if="usuarioResetado"
    >
      <template v-if="checaPermissaoChamador" v-slot:activator="{ on, attrs }">

        <!--Administração de chamadas-->
        <v-btn
          color="white"
          plain
          v-bind="attrs"
          v-on="on"

        >
          <v-icon class="mr-5">
            mdi-speaker-wireless
          </v-icon>
          Administração de Chamadas
        </v-btn>

        <!--mensagens-->
        <v-btn
          color="white"
          plain
          to="/mensagens"

        >
          <v-icon class="mr-5">
            mdi-comment-text
          </v-icon>
          Mensagens
        </v-btn>

      </template>
      <!--list-->
      <v-list>
        <!--gerenciar preferências-->
        <v-list-item to="/preferences">
          <v-icon class="mr-5" color="black">
            mdi-settings-transfer-outline
          </v-icon>
          <v-list-item-title>
            Gerenciar Preferências
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </div>
</template>

<script>import {logoutMixin} from '@/mixins'
import {mapGetters} from 'vuex'

export default {
  mixins: [logoutMixin],
  computed: {

    ...mapGetters(['usuarioResetado', 'usuarioLogado'])

  },
  data: () => ({
    checaPermissaoAdmin: true,
    checaPermissaoChamador: true
  }),
  mounted () {
    if (this.usuarioLogado.tipo === 'Chamador') {
      this.checaPermissaoAdmin = false
      this.checaPermissaoChamador = true
    } else {
      this.checaPermissaoAdmin = true
      this.checaPermissaoChamador = false
    }
  }
}
</script>
