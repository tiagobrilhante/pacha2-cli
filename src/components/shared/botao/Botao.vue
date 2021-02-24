<template>

  <button :class="estiloDoBotao" :type="tipo" @click="disparaAcao()" class="btn btn-sm">
    <i :class="iconeDoBotao"></i>
    {{ rotulo }}
  </button>

</template>

<script>export default {
  props: {
    tipo: {
      required: true,
      type: String
    },
    icone: {
      required: false,
      type: String
    },
    rotulo: {
      required: false,
      type: String
    },
    confirmacao: Boolean,
    estilo: String

  },
  methods: {
    disparaAcao () {
      if (this.confirmacao) {
        if (confirm('Confirma Operação?')) {
          this.$emit('botaoAtivado')
        }
        return
      }
      this.$emit('botaoAtivado')
    }
  },
  computed: {

    estiloDoBotao () {
      if (this.estilo === 'default' || !this.estilo) {
        return 'btn-secondary'
      } else {
        return 'btn-' + this.estilo
      }
    },
    iconeDoBotao () {
      if (!this.icone) {
        return ''
      } else {
        return 'fa fa-' + this.icone
      }
    }
  }
}

</script>

<style scoped>

</style>
