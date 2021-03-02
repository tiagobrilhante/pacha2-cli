<template>

  <div>

    <table class="table table-bordered table-hover table-sm table-striped">
      <thead>
      <tr class="bg-info">
        <td>Nome</td>
        <td>Nome de Guerra</td>
        <td>cpf</td>
        <td>Om</td>
        <td>Tipo</td>
        <td class="text-center">Ação</td>
      </tr>
      </thead>
      <tbody>

      <tr :key="usuario.id" :usuario="usuario" v-for="usuario in usuarios">
        <td>{{ usuario.nome}}</td>
        <td>{{ usuario.posto_grad}} {{ usuario.nome_guerra}}</td>
        <td>{{ usuario.cpf }}</td>
        <td>{{ usuario.om.sigla }}</td>
        <td>{{ usuario.user_type.type }}</td>
        <td class="text-center">

          <botao @botaoAtivado="abreModal(usuario)" estilo="primary" icone="edit" tipo="button"/>
          <botao estilo="warning" icone="lock-open" tipo="button"/>
          <botao @botaoAtivado="remove(usuario)" estilo="danger" icone="trash" tipo="button"/>

        </td>
      </tr>
      </tbody>
    </table>

    <modal :corpo="corpo" :titulo="titulo" :usuario="usuario"></modal>
    <v-data-table
      :headers="headers"
      :items="usuarios"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>
<script>import Botao from '@/components/shared/botao/Botao.vue'
import Modal from '@/components/shared/modal/Modal.vue'

export default {
  data () {
    return {
      usuario: [],
      titulo: '',
      corpo: '',
      headers: [
        {
          text: 'Nome',
          align: 'start',
          sortable: true,
          value: 'nome'
        },
        { text: 'Nome de Guerra', value: 'nome_guerra' },
        { text: 'cpf', value: 'cpf' },
        { text: 'Ações', value: 'actions', sortable: false }
      ],
      usuarios: [],
    }
  },
  components: {
    'botao': Botao,
    'modal': Modal
  },
  methods: {

    remove (usuario) {
      this.$confirm(
        {
          message: `Você tem certeza que deseja remover o usuário ${usuario.posto_grad} ${usuario.nome_guerra}? \n Essa ação é irreversível!`,
          button: {
            no: 'Não',
            yes: 'Sim'
          },
          /**
           * Callback Function
           * @param {Boolean} confirm
           */
          callback: confirm => {
            if (confirm) {
              this.$http.delete('users/' + usuario.id)
              // eslint-disable-next-line no-return-assign
                .then(() => {
                  let indice = this.usuarios.indexOf(usuario)
                  this.usuarios.splice(indice, 1)
                  this.$toastr.s(
                    'Usuário removido com sucesso', 'Sucesso!'
                  )
                }, err => {
                  console.log(err)
                  this.$toastr.e(
                    'Não foi possível remover o Usuário', 'Erro!'
                  )
                })
            }
          }
        })
    },
    abreModal (usuario) {
      this.titulo = 'PHP > JS'
      this.corpo = 'Vue dá dor de cabeça'
      this.usuario = usuario
      console.log(usuario)

      $('#myModal').modal('show')
    }
  },
  props: ['usuarios']
}
</script>
