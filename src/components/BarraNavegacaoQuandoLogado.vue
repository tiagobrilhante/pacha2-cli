<template>
  <div>
    <v-btn class="secondary" to="/">
      Home
    </v-btn>
    <v-btn class="secondary" to="/usuarios">
      Gerenciamento de Usuarios
    </v-btn>

    <v-btn class="secondary" @click.prevent="efetuarLogout">
      Sair
    </v-btn>
  </div>
</template>

<script>import {logoutMixin} from '@/mixins'

export default {
  mixins: [logoutMixin]
}
</script>
