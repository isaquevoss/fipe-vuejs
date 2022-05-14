<template>
  <div>
    <FipeCompare />
  </div>
</template>

<script>
// @ is an alias to /src
import FipeCompare from '@/components/FipeCompare.vue'

export default {
  name: 'Home',
  components: {
    FipeCompare
  },
  metaInfo: {
    htmlAttrs: {
      lang: 'pt-BR',
    },
    title: 'Comparar Preços',
    meta: [{ name: 'Tabela fipe', content: 'Compare os preços da tabela fipe' }],
  },
}
</script>
