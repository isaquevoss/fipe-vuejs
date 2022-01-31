<template>
  <v-container>
    <v-form form="form">
      <v-autocomplete
        :items="referencias"
        item-text="Mes"
        @change="getMarcas()"
        label="Referencias"
        item-value="Codigo"
        v-model="referenciaSelected"
      >
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
    </v-form>
    <!-- <v-btn @click="getReferencias()"> Referencias </v-btn>
    <v-btn @click="getMarcas()"> Marcas </v-btn>
    <v-btn @click="getVeiculos()"> Veiculos </v-btn>
    <v-btn @click="getYears()"> Anos </v-btn> -->
    <v-row align="center" justify="center">
      <v-btn @click="removeDetails()"> Limpar </v-btn>
      <v-btn @click="getDetails()"> Buscar </v-btn>
    </v-row>

    <v-container>
      <v-row align="center" justify="center">
        <v-col
          v-for="(detail, i) in details"
          :key="i"
          cols="12"
          md="6"
          lg="4"
          xl="3"
        >
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
    if (localStorage.getItem("details"))
      this.details = JSON.parse(localStorage.getItem("details"));

    this.refreshDetails();
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
      details: [],
      referenciaSelected: {},
    };
  },
  methods: {
    async getReferencias() {
      await service.loadReferencias();
      this.referencias = service.referencias;
      this.referenciaSelected = this.referencias[0].Codigo;
      console.log(this.referencias);
    },
    async refreshDetails() {
      for (let i = 0; i < this.details.length; i++) {
        var item = this.details[i];
        if (item.params)
          setTimeout(async () => {
            Object.assign(
              this.details[i],
              await service.loadVeiculo(
                item.params.referencia,
                item.params.tipo,
                item.params.marca,
                item.params.modelo,
                item.params.ano
              )
            );
          }, 500);
      }
    },
    async getMarcas() {
      await service.loadMarcas(this.referenciaSelected, service.tipos.carro);
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
    async removeDetails() {
      this.details = [];
      localStorage.removeItem("details");
    },
    async getDetails() {
      this.details.push(
        await service.loadVeiculo(
          this.referenciaSelected,
          service.tipos.carro,
          this.marcaSelected,
          this.veicleSelected,
          this.yearSelected,
          this.yearSelected
        )
      );
      localStorage.setItem("details", JSON.stringify(this.details));
      this.yearSelected = {};
    },
    async getYears() {
      await service.loadAnos(
        this.referenciaSelected,
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
