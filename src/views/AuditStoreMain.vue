<template>
  <div class="clear-fix">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" @submit.native.prevent>
      <el-form-item label="联系电话">
        <el-input @keyup.enter.native="onSubmit" v-model="formInline.phone" placeholder="请输入电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="showList"
      border
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      highlight-current-row
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="storeName" label="门店名称" width="80">
      </el-table-column>
      <el-table-column prop="storeAddress" label="门店地址" width="80">
      </el-table-column>
      <el-table-column prop="name" label="联系人" width="80"> </el-table-column>
      <el-table-column prop="phone" label="联系电话" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="100">
        <template slot-scope="scope">
          {{scope.row.createTime|getCreatTime}}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="100">
      </el-table-column>
      <el-table-column prop="state" label="审核状态" width="80">
      </el-table-column>
      <el-table-column prop="admin" label="对接人姓名" width="120">
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template>
          <el-button type="text" size="small">对接完毕</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listLength"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      auditStoreList: [
        {
          storeName: "122",
          storeAddress: "egeave",
          name: "666",
          phone: "18912345679",
          createTime: "1608021869000",
          remark: "123456789",
          state: "已对接",
          admin: "管理员",
        },
        {
          storeName: "122",
          storeAddress: "egeave",
          name: "666",
          phone: "18912345678",
          createTime: "1608021869000",
          remark: "123456789",
          state: "已对接",
          admin: "管理员",
        },
      ],
      formInline: {
        phone: "",
      },
      currentPage:1,
      copyList:[
        {
          storeName: "122",
          storeAddress: "egeave",
          name: "666",
          phone: "18912345679",
          createTime: "2020-12-15",
          remark: "123456789",
          state: "已对接",
          admin: "管理员",
        },
        {
          storeName: "122",
          storeAddress: "egeave",
          name: "666",
          phone: "18912345678",
          createTime: "2020-12-15",
          remark: "123456789",
          state: "已对接",
          admin: "管理员",
        },
      ],
    };
  },
  computed:{
      listLength:function(){
          return(parseInt(this.copyList.length))
      }
  },
  methods: {
    // 这里的val是每页的条数
    handleSizeChange(val) {
      // 每页的条数
      this.size = val;
      this.showList = this.auditStoreList.slice(0, this.size);
    },
    // 这里的val是第几页
    handleCurrentChange(val) {
      if (this.formInline.phone) {
        let checkList = [];
        this.auditStoreList.map((item) => {
          if (item.phone.indexOf(this.formInline.phone.trim())>=0) {
            checkList.push(item);
          }
        });
        this.showList = checkList.slice(
          val * this.size - this.size,
          this.size * val
        );
      } else {
        this.showList = this.auditStoreList.slice(
          val * this.size - this.size,
          this.size * val
        );
      }
    },
    onSubmit() {
      let checkList = [];
      this.auditStoreList.map((item) => {
        // console.log(item);
        if (item.phone.indexOf(this.formInline.phone.trim())>=0) {
          checkList.push(item);
        }
      });
      this.showList = checkList.slice(0, 10);
    //   this.listLength=parseInt(checkList.length)
    this.copyList=checkList
    },
  },
  created() {
    this.showList = this.auditStoreList.slice(0, 10);
  },
};
</script>
<style lang="scss" scoped>
.el-input {
  width: 100px;
}
.el-pagination {
  float: right;
  margin-top: 3px;
}
.clear-fix::after {
  content: "";
  display: block;
  clear: both;
}
</style>