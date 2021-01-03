<template>
  <div class="box">
    <DataPanel />
    <ChartRow />
  </div>
</template>

<script>
import DataPanel from './components/DataPanel'
import ChartRow from './components/ChartRow'

export default {
  name: 'Dashboard',
  components: {
    DataPanel,
    ChartRow
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped>
</style>
