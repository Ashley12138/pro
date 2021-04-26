<template>
  <div>
    <el-table
      :data="showList"
      border
      ref="multipleTable"
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      highlight-current-row
      @selection-change="changeBox"
    >
    <el-table-column>
      
    </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
</style>