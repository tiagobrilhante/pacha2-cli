<template>
  <v-app id="inspire">
    <vue-confirm-dialog></vue-confirm-dialog>
    <BarraNavegacao/>
    <router-view/>
  </v-app>
</template>

<script>import BarraNavegacao from '@/components/barra-navegacao/BarraNavegacao'

export default {

  components: {
    BarraNavegacao
  }

}
</script>

<style>

</style>
