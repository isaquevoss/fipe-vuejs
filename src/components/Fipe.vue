<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn></v-btn>
      </v-col>
    </v-row>
    <button @click="getReferencias()">ref</button>
    <button @click="getMarcas()">Marcas</button>
  </v-container>
</template>

<script>
import * as service from "../service";
export default {
  name: "HelloWorld",
  data() {
    return {
      dados: [],
    };
  },
  methods: {
    getReferencias() {
      console.log("teste");
      console.log(service.loadReferencias);
      service.loadReferencias();
      // this.dados = referencias;
    },
    getMarcas() {
      service.loadMarcas(service.referencia.Codigo, service.tipos.carro);
    },
  },
  props: {
    msg: String,
  },
};
</script>
