<template>
  <!-- MODAL -->
  <div aria-hidden="true" aria-labelledby="myModalLabel" class="modal fade" id="myModal" role="dialog" tabindex="-1">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ titulo }}</h5>
          <button aria-label="Close" class="close" data-dismiss="modal" type="button">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
         {{ corpo }}

          <hr>

          {{usuario}}
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-dismiss="modal" type="button">Close</button>
          <button class="btn btn-primary" type="button">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>import Botao from '@/components/shared/botao/Botao.vue'

export default {
  components: {
    'botao': Botao
  },
  methods: {

  },
  props: {
    titulo: {
      required: true,
      type: String
    },
    corpo: {
      required: true,
      type: String
    },
    usuario: Array
    /*,
    icone: {
      required: false,
      type: String
    },
    rotulo: {
      required: false,
      type: String
    },
    confirmacao: Boolean,
    estilo: String,
    usuario: Object
*/
  }
}

</script>
