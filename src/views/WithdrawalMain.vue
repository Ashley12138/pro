<template>
  <div class="clear-fix">
    <keep-alive>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        @submit.native.prevent
      >
        <el-form-item label="用户标识（微信用户ID）">
          <el-input
            @keyup.enter.native="onSubmit"
            v-model="formInline.user"
            placeholder="请输入用户标识（微信用户ID）"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" icon="el-icon-search"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </keep-alive>
    <el-table
      :data="showList"
      border
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      highlight-current-row
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column type="index" label="序号" width="70"> </el-table-column>
      <el-table-column prop="userTag" label="用户编号" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="140">
      </el-table-column>
      <el-table-column prop="amount" label="提现金额" width="120">
      </el-table-column>
      <el-table-column prop="state" label="审核状态" width="120">
      </el-table-column>
      <el-table-column prop="name" label="审核人" width="100">
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" prop="unfinish">
        <!-- slot-scope="scope"获取作用域插槽（data绑定的数据） -->
        <template slot-scope="scope">
          <el-button size="small" v-if="scope.row.unfinish">未通过</el-button>
          <el-button size="small" v-if="scope.row.unfinish">通过</el-button>
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
      withdrawalList: [
        {
          name: "",
          userTag: "6",
          createTime: "2021-01-19",
          amount: "10",
          state: "待审核",
          unfinish: true,
        },
        {
          name: "管理员",
          userTag: "4",
          createTime: "2020-12-27",
          amount: "5",
          state: "审核通过",
          unfinish: false,
        },
        {
          name: "管理员",
          userTag: "4",
          createTime: "2020-12-27",
          amount: "1",
          state: "审核通过",
          unfinish: false,
        },
        {
          name: "管理员",
          userTag: "4",
          createTime: "2020-12-27",
          amount: "1",
          state: "审核通过",
          unfinish: false,
        },
        {
          name: "管理员",
          userTag: "4",
          createTime: "2020-12-27",
          amount: "1",
          state: "未通过",
          unfinish: false,
        },
        {
          name: "管理员",
          userTag: "4",
          createTime: "2020-12-24",
          amount: "2",
          state: "未通过",
          unfinish: false,
        },
        {
          name: "管理员",
          userTag: "4",
          createTime: "2020-12-24",
          amount: "20",
          state: "审核通过",
          unfinish: false,
        },
      ],
      formInline: {
        user: "",
      },
      currentPage: 1,
      showList: [],
      // 在初始化时副本列表和原列表相同，存储搜索过后的列表
      copyList: [
        {
          name: "",
          userTag: "6",
          createTime: "2021-01-19",
          amount: "10",
          state: "待审核",
          unfinish: true,
        },
        {
          name: "管理员",
          userTag: "4",
          createTime: "2020-12-27",
          amount: "5",
          state: "审核通过",
          unfinish: false,
        },
        {
          name: "管理员",
          userTag: "4",
          createTime: "2020-12-27",
          amount: "1",
          state: "审核通过",
          unfinish: false,
        },
        {
          name: "管理员",
          userTag: "4",
          createTime: "2020-12-27",
          amount: "1",
          state: "审核通过",
          unfinish: false,
        },
        {
          name: "管理员",
          userTag: "4",
          createTime: "2020-12-27",
          amount: "1",
          state: "未通过",
          unfinish: false,
        },
        {
          name: "管理员",
          userTag: "4",
          createTime: "2020-12-24",
          amount: "2",
          state: "未通过",
          unfinish: false,
        },
        {
          name: "管理员",
          userTag: "4",
          createTime: "2020-12-24",
          amount: "20",
          state: "审核通过",
          unfinish: false,
        },
      ],
    };
  },
  computed: {
    listLength: function () {
      return parseInt(this.copyList.length);
    },
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.showList = this.withdrawalList.slice(0, this.size);
    },
    handleCurrentChange(val) {
      this.showList = this.copyList.slice(
        val * this.size - this.size,
        this.size * val
      );
    },
    // 点击查询按钮
    onSubmit() {
      let checkList = [];
      if (this.formInline.user) {
        this.withdrawalList.map((item) => {
          if (item.userTag == this.formInline.user.trim()) {
            checkList.push(item);
          }
        });
        this.showList = checkList.slice(0, 10);
        this.copyList = checkList;
      } else {
        this.copyList = this.withdrawalList;
        this.showList = this.withdrawalList.slice(0, 10);
      }
    },
  },
  created() {
    // 让数据只展示前十条
    this.showList = this.withdrawalList.slice(0, 10);
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