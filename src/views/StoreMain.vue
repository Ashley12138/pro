<template>
  <div class="clear-fix">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" @submit.native.prevent>
      <el-form-item label="店铺名称">
        <el-input
        @keyup.enter.native="onSubmit"
        style="width:100px"
          v-model="formInline.storeName"
          placeholder="请输入店铺名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="店铺名称" :label-width="formLabelWidth">
          <el-input v-model="form.storeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发布次数" :label-width="formLabelWidth">
          <el-input v-model="form.times" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员满价格" :label-width="formLabelWidth">
          <el-input v-model="form.vipReach" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员返价格" :label-width="formLabelWidth">
          <el-input v-model="form.vipCashback" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="非会员满价格" :label-width="formLabelWidth">
          <el-input v-model="form.normalReach" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="非会员返价格" :label-width="formLabelWidth">
          <el-input v-model="form.normalCashback" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺类型" :label-width="formLabelWidth">
          <el-input v-model="form.storeType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="评价规则" :label-width="formLabelWidth">
          <el-input v-model="form.assessRules" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="起始报名时间" :label-width="formLabelWidth">
          <el-input v-model="form.startTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="截至报名时间" :label-width="formLabelWidth">
          <el-input v-model="form.endTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="餐饮类别" :label-width="formLabelWidth">
          <el-input v-model="form.cateringType" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
        <el-button type="primary" @click="open">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="showList"
      border
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      highlight-current-row
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="storeName" label="店铺名称" width="40">
      </el-table-column>
      <el-table-column prop="storeLogo" label="店铺logo" width="50">
      </el-table-column>
      <el-table-column prop="longitude" label="经度" width="120">
      </el-table-column>
      <el-table-column prop="latitude" label="纬度" width="120">
      </el-table-column>
      <el-table-column prop="times" label="发布次数" width="30">
      </el-table-column>
      <el-table-column prop="remainingTimes" label="剩余次数" width="30"> </el-table-column>
      <el-table-column prop="vipReach" label="会员满价格" width="40"> </el-table-column>
      <el-table-column prop="vipCashback" label="会员返价格" width="40"> </el-table-column>
      <el-table-column prop="normalReach" label="非会员满价格" width="40"> </el-table-column>
      <el-table-column prop="normalCashback" label="非会员返价格" width="40"> </el-table-column>
      <el-table-column prop="storeType" label="店铺类型" width="40"> </el-table-column>
      <el-table-column prop="assessRules" label="评价规则" width="40"> </el-table-column>
      <el-table-column prop="startTime" label="起始报名时间" width="50"> </el-table-column>
      <el-table-column prop="endTime" label="截至报名时间" width="60"> </el-table-column>
      <el-table-column prop="cateringType" label="餐饮类别" width="40"> </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click.native.prevent="editRow(scope.$index, copyList)">编辑基本信息</el-button>
          <el-button size="small">补充店铺信息</el-button>
          <el-button size="small" @click.native.prevent="deleteRow(scope.$index, copyList)">删除</el-button>
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
      storeList: [
        {
          storeName:"测试1",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"6:00",
          endTime:"23:00",
          cateringType:"早餐"
        },
        {
          storeName:"测试2",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"",
          endTime:"",
          cateringType:"正餐"
        },
        {
          storeName:"测试3",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"",
          endTime:"",
          cateringType:"夜宵"
        },
        {
          storeName:"测试4",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"",
          endTime:"",
          cateringType:"水果"
        },
        {
          storeName:"测试5",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"",
          endTime:"",
          cateringType:"早餐"
        },
        {
          storeName:"测试6",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"",
          endTime:"",
          cateringType:"夜宵"
        },
        {
          storeName:"测试7",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"",
          endTime:"",
          cateringType:"下午茶"
        },
        {
          storeName:"测试8",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"",
          endTime:"",
          cateringType:"正餐"
        },
        {
          storeName:"测试9",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"",
          endTime:"",
          cateringType:"水果"
        },

      ],
      formInline: {
        storeName: "",
      },
      currentPage: 1,
      showList: [],
      size:10,
      copyList:[
        {
          storeName:"测试1",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"6:00",
          endTime:"23:00",
          cateringType:"早餐"
        },
        {
          storeName:"测试2",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"",
          endTime:"",
          cateringType:"正餐"
        },
        {
          storeName:"测试3",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"",
          endTime:"",
          cateringType:"夜宵"
        },
        {
          storeName:"测试4",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"",
          endTime:"",
          cateringType:"水果"
        },
        {
          storeName:"测试5",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"",
          endTime:"",
          cateringType:"早餐"
        },
        {
          storeName:"测试6",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"",
          endTime:"",
          cateringType:"夜宵"
        },
        {
          storeName:"测试7",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"",
          endTime:"",
          cateringType:"下午茶"
        },
        {
          storeName:"测试8",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"",
          endTime:"",
          cateringType:"正餐"
        },
        {
          storeName:"测试9",
          storeLogo:"",
          longitude:"106.58652591021732",
          latitude:"29.543455889193414",
          times:"3",
          remainingTimes:"3",
          vipReach:"20",
          vipCashback:"15",
          normalReach:"20",
          normalCashback:"12",
          storeType:"美团",
          assessRules:"好评+图片",
          startTime:"",
          endTime:"",
          cateringType:"水果"
        },

      ],
      formLabelWidth:"120px",
      dialogTableVisible: false,
      dialogFormVisible: false,
      editIndex:'',
      // 编辑弹出框内容
      form:{},
    };
  },
  computed:{
    listLength: function () {
      return parseInt(this.copyList.length);
    },
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size=val;
      this.showList = this.storeList.slice(0,this.size);
    },
    handleCurrentChange(val) {
      // console.log(val);
      this.showList = this.copyList.slice(
          val * this.size - this.size,
          this.size * val
        );
    },
    onSubmit() {
      let checkList = [];
      this.copyList.map((item) => {
        // console.log(item);
        if (item.storeName == this.formInline.storeName) {
          checkList.push(item);
        }
      });
      this.showList = checkList.slice(0, 10);
      this.copyList=this.showList
      this.formInline.storeName = "";
    },
    // 点击编辑按钮
    editRow(index, rows) {
      // console.log(rows,index);
      this.form = rows[index];
      this.dialogFormVisible = true;
      // 记录编辑的是哪一行数据
      this.editIndex=index
    },
    // 点击编辑框中的确定按钮
    open() {
      // editIndex记录了修改的是哪一行数据
      this.copyList[this.editIndex]=JSON.parse(JSON.stringify(this.form));
      this.dialogFormVisible = false;
      this.showList=this.copyList.slice(0,10)
    },
    // 点击每行中的删除按钮
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.showList=this.copyList.slice(0,10)
    },
  },
  created() {
    this.showList = this.storeList.slice(0, 10);
  },
};
</script>
<style lang="scss" scoped>
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