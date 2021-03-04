<template>
  <div>
    <v-menu
      rounded="xl"
      offset-y
      open-on-hover
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn block
          color="secondary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <i class="fa fa-user mr-5"></i> {{ usuarioLogado.posto_grad }} {{ usuarioLogado.nome_guerra }}
        </v-btn>
      </template>
      <!--list-->
      <v-list>
        <!--Efetuar logout-->
        <v-list-item @click.prevent="efetuarLogout">
          <v-list-item-title>
            Sair do Sistema
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>import {logoutMixin} from '@/mixins'
import {mapGetters} from 'vuex'

export default {
  data: () => ({}),
  mixins: [logoutMixin],
  computed: {

    ...mapGetters(['usuarioResetado', 'usuarioLogado'])

  }
}
</script>
