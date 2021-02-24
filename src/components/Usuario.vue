<template>
  <v-main>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="usuarios"
        class="elevation-1"
        sort-by="nome"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Tabela de Usuários</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              max-width="500px"
              v-model="dialog"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mb-2"
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Novo Usuário
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="4"
                        sm="6"
                      >
                        <v-text-field
                          label="Nome"
                          v-model="editedUser.nome"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="4"
                        sm="6"
                      >
                        <v-text-field
                          label="Nome de Guerra"
                          v-model="editedUser.nome_guerra"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="4"
                        sm="6"
                      >
                        <v-text-field
                          label="CPF"
                          v-model="editedUser.cpf"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="4"
                        sm="6"
                      >
                        <v-text-field
                          label="OM"
                          v-model="editedUser.om"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        md="4"
                        sm="6"
                      >
                        <v-text-field
                          label="Tipo"
                          v-model="editedUser.tipo"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    @click="close"
                    color="blue darken-1"
                    text
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    @click="save"
                    color="blue darken-1"
                    text
                  >
                    Salvar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog max-width="500px" v-model="dialogDelete">
              <v-card>
                <v-card-title class="headline">Você tem certeza que quer deletar este usuário?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="closeDelete" color="blue darken-1" text>Cancelar</v-btn>
                  <v-btn @click="deleteUserConfirm" color="blue darken-1" text>Excluir</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ usuarios }">
          <v-icon
            @click="editUser(usuarios)"
            class="mr-2"
            small
          >
            mdi-pencil
          </v-icon>
          <v-icon
            @click="deleteUser(usuarios)"
            small
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>
<script>export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Nome',
        align: 'start',
        sortable: false,
        value: 'nome'
      },
      {
        text: 'Nome de Guerra',
        value: 'nome_guerra'
      },
      {
        text: 'CPF',
        value: 'cpf'
      },
      {
        text: 'Om',
        value: 'om.sigla'
      },
      {
        text: 'Tipo',
        value: 'user_type.type'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      }
    ],
    editedIndex: -1,
    editedUser: {
      nome: '',
      nome_guerra: '',
      cpf: '',
      om: '',
      tipo: ''
    },
    defaultUser: {
      nome: '',
      nome_guerra: '',
      cpf: '',
      om: '',
      tipo: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Usuário' : 'Editar Usuário'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  props: ['usuarios'],

  methods: {
    editUser (usuarios) {
      this.editedIndex = this.usuarios.indexOf(usuarios)
      this.editedUser = Object.assign({}, usuarios)
      this.dialog = true
    },

    deleteUser (usuarios) {
      this.editedIndex = this.usuarios.indexOf(usuarios)
      this.editedUser = Object.assign({}, usuarios)
      this.dialogDelete = true
    },

    deleteUserConfirm () {
      this.usuarios.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedUser = Object.assign({}, this.defaultUser)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedUser = Object.assign({}, this.defaultUser)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.usuarios[this.editedIndex], this.editedUser)
      } else {
        this.usuarios.push(this.editedUser)
      }
      this.close()
    }
  }
}
</script>
