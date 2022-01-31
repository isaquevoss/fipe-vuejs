<template>
  <v-card shaped height="350" elevation="4" outlined >
    <v-container>
      <v-row align-content="center" justify="center">
        <v-card-title>
          {{ `${detail.Marca} - ${detail.Modelo}` }}
        </v-card-title>
      </v-row>
      <v-row align-content="center" justify="center">
        <v-card-subtitle>
          {{ `Ano: ${detail.AnoModelo} ${detail.Combustivel}` }}
        </v-card-subtitle>
        <v-card-subtitle>
          {{ `Código Fipe: ${detail.CodigoFipe}` }}
        </v-card-subtitle>
        <v-card-subtitle>
          {{ `Mês de referencia: ${detail.MesReferencia}` }}
        </v-card-subtitle>
      </v-row>

     
      <v-card-actions>
        <v-container>   
            <v-spacer ></v-spacer>  
          <v-row align="end" align-content="end" justify="center">
               
            <v-chip class="ma-2" large> {{ detail.Valor }} </v-chip>
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