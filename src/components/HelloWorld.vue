<template>
  <v-container>
    <v-autocomplete :items="referencias" item-text="Mes" @change="getMarcas()" label="Referencias">
    </v-autocomplete>
    <v-autocomplete
      :items="marcas"
      label="Marcas"
      item-text="Label"
      item-value="Value"
      @change="getVeiculos()"
      v-model="marcaSelected"
    ></v-autocomplete>
    <v-autocomplete
      :items="modelos"
      label="Modelos"
      item-value="Value"
      item-text="Label"
      @change="getYears()"
      v-model="veicleSelected"
    ></v-autocomplete>
    <v-autocomplete
      :items="years"
      label="Anos"
      item-text="Label"
      item-value="Value"
      v-model="yearSelected"
    ></v-autocomplete>
    <v-btn @click="getReferencias()"> Referencias </v-btn>
    <v-btn @click="getMarcas()"> Marcas </v-btn>
    <v-btn @click="getVeiculos()"> Veiculos </v-btn>
    <v-btn @click="getYears()"> Anos </v-btn>
    <v-btn @click="getDetails()"> Show </v-btn>

    <v-container>
      <v-row align="center" justify="center">
        <v-col v-for="detail in details" :key="detail.CodigoFipe" cols="12" md="6" lg="4" xl="3">
          <veiculo-detail :detail="detail" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import * as service from "../service";
import VeiculoDetail from "./VeiculoDetail.vue";
export default {
  components: { VeiculoDetail },
  name: "HelloWorld",
  async mounted() {
    await this.getReferencias();
    await this.getMarcas();
  },
  data() {
    return {
      dados: [],
      referencias: [],
      marcas: [],
      marcaSelected: {},
      modelos: [],
      veicleSelected: {},
      yearSelected: {},
      years: [],
      details: [{
        Valor: "R$ 18.698,00",
        Marca: "Alfa Romeo",
        Modelo: "145 Elegant 1.7/1.8 16V",
        AnoModelo: 1999,
        Combustivel: "Gasolina",
        CodigoFipe: "006009-7",
        MesReferencia: "janeiro de 2022 ",
        Autenticacao: "kdkk9y4m9h",
        TipoVeiculo: 1,
        SiglaCombustivel: "G",
        DataConsulta: "sexta-feira, 28 de janeiro de 2022 19:02",
      }],
    };
  },
  methods: {
    async getReferencias() {
      console.log("teste");
      console.log(service.loadReferencias);
      await service.loadReferencias();
      this.referencias = service.referencias;
      // this.dados = referencias;
    },
    async getMarcas() {
      await service.loadMarcas(service.referencia.Codigo, service.tipos.carro);
      this.marcas = service.marcas;
    },
    async getVeiculos() {
      await service.loadModelos(
        service.referencia.Codigo,
        service.tipos.carro,
        this.marcaSelected
      );
      this.modelos = service.modelos;
    },
    async getDetails() {
      this.details.push( await service.loadVeiculo(
        service.referencia.Codigo,
        service.tipos.carro,
        this.marcaSelected,
        this.veicleSelected,
        this.yearSelected,
        this.yearSelected
      ));
    },
    async getYears() {
      await service.loadAnos(
        service.referencia.Codigo,
        service.tipos.carro,
        this.marcaSelected,
        this.veicleSelected
      );
      this.years = service.anos;
    },
  },
  props: {
    msg: String,
  },
};
</script>