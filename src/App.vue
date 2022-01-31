<template>
  <v-app>
    <v-app-bar app color="primary" dark> 
      <v-app-bar-title>Compara fipe</v-app-bar-title>
    </v-app-bar>
      
    <v-main>
      <HelloWorld />    
    </v-main>
    <v-footer>
      Desenvolvido por  <v-btn icon target="_blank" tag="i" href="https://github.com/isaquevoss" size="24px" ><v-icon>mdi-github</v-icon> </v-btn> isaquevoss
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
