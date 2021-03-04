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
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="white"
          plain
          v-bind="attrs"
          v-on="on"
        > <i class="fa fa-cogs mr-5"></i>
          Administração do Sistema
        </v-btn>
      </template>
      <!--list-->
      <v-list>
        <!--Gerenciar Usuários-->
        <v-list-item to="/usuarios">
          <v-list-item-title>
            Gerenciar Usuários
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

  }
}
</script>
