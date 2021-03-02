<template>
  <div class="container">
    <h1>Novo Usuario</h1>
    <form @submit.prevent="enviarFormulario">
      <div class="form.group">
        <label for="nome">Nome</label>
        <input class="form-control" type="text" v-model="usuario.nome">
      </div>
      <div class="form.group">
        <label for="email">E-mail</label>
        <input class="form-control" type="email" v-model="usuario.email">
      </div>
      <div class="form.group">
        <label for="senha">Senha</label>
        <input class="form-control" type="password" v-model="usuario.senha">
      </div>
      <button class="btn btn-primary" type="submit">Salvar</button>
    </form>
  </div>
</template>

<script>export default {

  data: function () {
    return {
      usuario: {
        nome: '',
        senha: '',
        email: ''
      }
    }
  },
  methods: {
    enviarFormulario () {
      this.$http
        .post('auth/register', this.usuario)
        .then(resposta => {
          console.log(resposta)
          this.$router.push({name: 'login'})
        })
        .catch(erro => console.log(erro))
    }
  }
}
</script>
