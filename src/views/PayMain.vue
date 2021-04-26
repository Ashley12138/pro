<template>
  <div class="clear-fix">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" @submit.native.prevent>
      <el-form-item label="用户标识（微信用户ID）">
        <el-input @keyup.enter.native="onSubmit" v-model="formInline.user" placeholder="请输入用户标识（微信用户ID）"></el-input>
      </el-form-item>
      <el-form-item>
    <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
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
      <el-table-column prop="userTag" label="用户标识" width="200"> </el-table-column>
      <el-table-column prop="userId" label="账号" width="240">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="200"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
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
      payList: [
        {
          name: "cVoVEcgb",
          userTag: "43",
          createTime: "2021-01-17",
          userId:"3XPxqDd6"
          
        },
        {
          name: "cVoVEcgb",
          userTag: "44",
          createTime: "2021-01-17",
          userId:"3XPxqDd6"
          
        },
        {
          name: "cVoVEcgb",
          userTag: "42",
          createTime: "2021-01-15",
          userId:"3XPxqDd6"
          
        },
        {
          name: "cVoVEcgb",
          userTag: "27",
          createTime: "2021-01-15",
          userId:"3XPxqDd6"
          
        },
        {
          name: "cVoVEcgb",
          userTag: "11",
          createTime: "2021-01-03",
          userId:"3XPxqDd6"
          
        },
        {
          name: "cVoVEcgb",
          userTag: "10",
          createTime: "2020-12-30",
          userId:"3XPxqDd6"
          
        },
        {
          name: "赵斌",
          userTag: "4",
          createTime: "2020-12-30",
          userId:"18908329964"
          
        },
        {
          name: "赵斌",
          userTag: "3",
          createTime: "2020-12-17",
          userId:"18908329964"
          
        }
      ],
      formInline:{
          user:''
      },
      currentPage:1,
      showList: [],
      copyList:[
        {
          name: "cVoVEcgb",
          userTag: "43",
          createTime: "2021-01-17",
          userId:"3XPxqDd6"
          
        },
        {
          name: "cVoVEcgb",
          userTag: "44",
          createTime: "2021-01-17",
          userId:"3XPxqDd6"
          
        },
        {
          name: "cVoVEcgb",
          userTag: "42",
          createTime: "2021-01-15",
          userId:"3XPxqDd6"
          
        },
        {
          name: "cVoVEcgb",
          userTag: "27",
          createTime: "2021-01-15",
          userId:"3XPxqDd6"
          
        },
        {
          name: "cVoVEcgb",
          userTag: "11",
          createTime: "2021-01-03",
          userId:"3XPxqDd6"
          
        },
        {
          name: "cVoVEcgb",
          userTag: "10",
          createTime: "2020-12-30",
          userId:"3XPxqDd6"
          
        },
        {
          name: "赵斌",
          userTag: "4",
          createTime: "2020-12-30",
          userId:"18908329964"
          
        },
        {
          name: "赵斌",
          userTag: "3",
          createTime: "2020-12-17",
          userId:"18908329964"
          
        }
      ]
    };
  },
  computed:{
    // 当展示数据数量变化时
    listLength: function () {
      return parseInt(this.copyList.length);
    },
  },
  methods:{
    // 选择每页显示多少条数据
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.showList = this.payList.slice(0, this.size);
    },
    // 翻页
    handleCurrentChange(val) {
      // console.log(val);
      this.showList = this.payList.slice(
        val * this.size - this.size,
        this.size * val
      );
      // console.log(`当前页: ${val}`);
    },
    // 点击查询按钮
    onSubmit() {
      let checkList = [];
      if (this.formInline.user) {
        this.payList.map((item) => {
        // console.log(item);
        if (item.userTag == this.formInline.user.trim()) {
          checkList.push(item);
        }
      });
      this.showList = checkList.slice(0, 10);
    //   this.listLength=parseInt(checkList.length)
    this.copyList=checkList
      } else {
        this.copyList=this.payList;
        this.showList = this.payList.slice(0, 10);
      }
    },
  },
  created() {
    this.showList = this.payList.slice(0, 10);
  },
};
</script>
<style lang="scss" scoped>
.el-input{
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