<template>
  <div class="row">
    <div class="container pt-4">
      <div class="alert alert-dark text-center"><h2><i class="fa fa-user"></i> Gerenciamento de Usuários</h2></div>
      <Botao estilo="primary" icone="plus" rotulo=" Cadastrar Novo Usuário" tipo="button"/>
      <Usuario :usuarios="usuarios"/>

    </div>
  </div>
</template>

<script>import Usuario from '../components/Usuario.vue'
import Botao from '../components/shared/botao/Botao'

export default {
  components: {
    Usuario,
    Botao
  },
  data () {
    return {
      usuarios: []
    }
  },
  mounted () {
    this.$http.get('users')
    // eslint-disable-next-line no-return-assign
      .then(response => this.usuarios = response.data.data)
      .catch(erro => console.log(erro))
  }
}
</script>

<style>

</style>
