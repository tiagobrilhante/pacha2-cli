<template>
  <v-main>
    <v-container fluid>
      <v-row class="mt-5">
        <v-col
          cols="6"
          offset="3"
        >
          <v-card
            elevation="10"
            outlined
            rounded="lg"
          >
            <v-row>
              <v-col cols="10" offset="1" >
                <div class="text-center pt-5">
                  <h1>Bem-vindo ao sistema PaCha!</h1>
                  <p>Sistema web para painéis de chamada</p>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-main>
</template>

<script>import {logoutMixin} from '@/mixins'

export default {
  name: 'home',
  mixins: [logoutMixin]
}
</script>
