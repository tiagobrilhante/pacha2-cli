<template>
  <v-app>
    <vue-confirm-dialog></vue-confirm-dialog>
    <BarraNavegacao/>
    <router-view/>
  </v-app>
</template>

<script>import BarraNavegacao from '@/components/BarraNavegacao'

export default {

  components: {
    BarraNavegacao
  }

}
</script>

<style>

</style>
