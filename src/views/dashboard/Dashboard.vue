<!--
 * @Author: your name
 * @Date: 2021-01-04 09:52:23
 * @LastEditTime: 2021-01-05 09:23:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-elment-admin\src\views\dashboard\Dashboard.vue
-->
<template>
  <div class="box">
    <DataPanel />
    <ChartRow />
    <MapLine/>
    <Map/>
  </div>
</template>

<script>
import DataPanel from './components/DataPanel'
import ChartRow from './components/ChartRow'
import MapLine from './components/MapLine'
import Map from './components/Map'

export default {
  name: 'Dashboard',
  components: {
    DataPanel,
    ChartRow,
    MapLine,
    Map
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
