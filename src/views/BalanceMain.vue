<template>
<div class="clear-fix">
  <el-form :inline="true" :model="formInline" class="demo-form-inline" @submit.native.prevent>
      <el-form-item label="用户编号（微信用户ID）">
        <el-input
        @keyup.enter.native="onSubmit"
          v-model="formInline.num"
          placeholder="请输入用户编号（微信用户ID）"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
  <el-table :data="showList" border :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
    <el-table-column type="selection" width="55"> </el-table-column>
    <el-table-column type="index" label="序号" width="60"> </el-table-column>
    <el-table-column prop="userNum" label="用户编号" width="80">
    </el-table-column>
    <el-table-column prop="type" label="消费类型" width="100">
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="120">
    </el-table-column>
    <el-table-column prop="oldBalance" label="历史余额" width="80">
    </el-table-column>
    <el-table-column prop="consumptionBalance" label="消费金额" width="80">
    </el-table-column>
    <el-table-column prop="newBalance" label="最新金额" width="80">
    </el-table-column>
    <el-table-column prop="remark" label="备注"> </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listLength">
    </el-pagination>
</div>
  
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          userNum: 6,
          type: "提现",
          createTime: "2021-01-19",
          oldBalance: 10,
          consumptionBalance: 10,
          newBalance: 0,
          remark: "申请提现10",
        },
        {
          userNum: 7,
          type: "消费",
          createTime: "2021-01-01",
          oldBalance: 0,
          consumptionBalance: 0.01,
          newBalance: 0,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 6,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 6,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 5,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 0,
          consumptionBalance: 0.01,
          newBalance: 0,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 5,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 0,
          consumptionBalance: 0.01,
          newBalance: 0,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 6,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 6,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 5,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 5,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 6,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 6,
          type: "消费",
          createTime: "2020-12-28",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 5,
          type: "消费",
          createTime: "2020-12-28",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 6,
          type: "消费",
          createTime: "2020-12-28",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 6,
          type: "消费",
          createTime: "2020-12-28",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
      ],
      formInline: {
        num: ""
      },
      currentPage: 1,
      showList: [],
      size: 10,
      copyList: [
        {
          userNum: 6,
          type: "提现",
          createTime: "2021-01-19",
          oldBalance: 10,
          consumptionBalance: 10,
          newBalance: 0,
          remark: "申请提现10",
        },
        {
          userNum: 7,
          type: "消费",
          createTime: "2021-01-01",
          oldBalance: 0,
          consumptionBalance: 0.01,
          newBalance: 0,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 6,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 6,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 5,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 0,
          consumptionBalance: 0.01,
          newBalance: 0,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 5,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 0,
          consumptionBalance: 0.01,
          newBalance: 0,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 6,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 6,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 5,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 5,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 6,
          type: "消费",
          createTime: "2020-12-29",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 6,
          type: "消费",
          createTime: "2020-12-28",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 5,
          type: "消费",
          createTime: "2020-12-28",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 6,
          type: "消费",
          createTime: "2020-12-28",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
        {
          userNum: 6,
          type: "消费",
          createTime: "2020-12-28",
          oldBalance: 10,
          consumptionBalance: 0.01,
          newBalance: 10,
          remark: "微信支付充值:0.01 会员- 账户余额不变",
        },
      ]
    };
  },
  computed:{
      listLength:function(){
          return(parseInt(this.copyList.length))
      }
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.showList = this.tableData.slice(0, this.size);
    },
    handleCurrentChange(val) {
      // console.log(val);
      if (this.formInline.num) {
        let checkList = [];
        this.tableData.map((item) => {
          if (item.userNum == this.formInline.num) {
            checkList.push(item);
          }
        });
        this.showList = checkList.slice(
          val * this.size - this.size,
          this.size * val
        );
      } else {
        this.showList = this.tableData.slice(
          val * this.size - this.size,
          this.size * val
        );
      }

      // console.log(`当前页: ${val}`);
    },
    // 点击查询按钮
    onSubmit() {
      let checkList = [];
      this.tableData.map((item) => {
        if (this.formInline.num.trim()) {
          if (item.userNum == this.formInline.num.trim()) {
          checkList.push(item);
        }
        }else{
          checkList=this.tableData
        }
        // console.log(item);
        
      });
      this.showList = checkList.slice(0, 10);
    //   this.listLength=parseInt(checkList.length)
    this.copyList=checkList
    },
  },
  created() {
    this.showList = this.tableData.slice(0, 10);
  },
};
</script>
<style lang="scss" scoped>
.content {
  margin-top: 110px;
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