<template>
  <v-card shaped height="350" elevation="4" outlined>
    <v-container>
      <v-row align-content="center" justify="center">
        <v-card-title>
          <h4>{{ `${detail.Marca} - ${detail.Modelo}` }}</h4>
        </v-card-title>
      </v-row>

      <v-list flat>
        <v-list-item-group color="primary">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="`Ano: ${detail.AnoModelo} ${detail.Combustivel}`"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="`Código Fipe: ${detail.CodigoFipe}`"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-clock</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="`Referência: ${detail.MesReferencia}`"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-card-actions>
        <v-container>
          <v-spacer></v-spacer>
          <v-row align="end" align-content="end" justify="center">
            <v-chip color="primary" class="ma-2" large> {{ detail.Valor }} </v-chip>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-container>
  </v-card>
</template>
<script>
export default {
  props: {
    detail: {},
  },
};
</script>
