<template>
    <v-app-bar
      app
      dark
      flat
    >
      <v-container class="py-0 fill-height">
        <v-toolbar-title>PaCha</v-toolbar-title>
        <BarraNavegacaoQuandoLogado v-if="usuarioEstaLogado"/>
        <BarraNavegacaoQuandoDeslogado v-else/>
        <v-spacer></v-spacer>
        <BarraNavegacaoUsuarioLogado v-if="usuarioEstaLogado"/>
      </v-container>
    </v-app-bar>
</template>

<script>import BarraNavegacaoQuandoLogado from './BarraNavegacaoQuandoLogado'
import BarraNavegacaoQuandoDeslogado from './BarraNavegacaoQuandoDeslogado'
import BarraNavegacaoUsuarioLogado from './BarraNavegacaoUsuarioLogado'
import {mapGetters} from 'vuex'

export default {

  components: {
    BarraNavegacaoQuandoLogado,
    BarraNavegacaoQuandoDeslogado,
    BarraNavegacaoUsuarioLogado
  },

  computed: {

    ...mapGetters(['usuarioEstaLogado'])

  }
}
</script>

<style>

</style>
