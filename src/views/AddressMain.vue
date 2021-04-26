<template>
  <div class="clear-fix">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" @submit.native.prevent>
      <el-form-item label="用户标识（微信用户ID）">
        <el-input
        @keyup.enter.native="onSubmit"
        style="width:100px"
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
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth">
          <el-input v-model="form.city" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="省" :label-width="formLabelWidth">
          <el-input v-model="form.province" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="区" :label-width="formLabelWidth">
          <el-input v-model="form.area" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-input v-model="form.createTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否默认" :label-width="formLabelWidth">
          <el-input v-model="form.default" autocomplete="off"></el-input>
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
      <el-table-column prop="name" label="收货人" width="80"> </el-table-column>
      <el-table-column prop="phone" label="收货人电话" width="120">
      </el-table-column>
      <el-table-column prop="city" label="城市" width="80"> </el-table-column>
      <el-table-column prop="province" label="省" width="70"> </el-table-column>
      <el-table-column prop="area" label="区" width="80"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="100">
      </el-table-column>
      <el-table-column prop="address" label="详细地址" width="120">
      </el-table-column>
      <el-table-column prop="default" label="是否默认" width="60">
      </el-table-column>
      <el-table-column prop="userTag" label="用户标识" width="60">
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="editRow(scope.$index, copyList)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.$index, copyList)"
            >删除</el-button
          >
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
      addressList: [
        {
          name: "赵斌",
          phone: "18908329964",
          city: "重庆城区",
          province: "重庆市",
          area: "沙坪坝区",
          createTime: "2020-12-17",
          address: "石坪桥志高花园",
          default: "是",
          userTag: "3",
        },
        {
          name: "伍隆梅",
          phone: "15923217781",
          city: "重庆城区",
          province: "重庆市",
          area: "沙坪坝区",
          createTime: "2020-12-17",
          address: "中渝",
          default: "否",
          userTag: "4",
        },
      ],
      // 搜索框输入内容
      formInline: {
        user: "",
      },
      currentPage: 1,
      showList: [],
      copyList: [
        {
          name: "赵斌",
          phone: "18908329964",
          city: "重庆城区",
          province: "重庆市",
          area: "沙坪坝区",
          createTime: "2020-12-17",
          address: "石坪桥志高花园",
          default: "是",
          userTag: "3",
        },
        {
          name: "伍隆梅",
          phone: "15923217781",
          city: "重庆城区",
          province: "重庆市",
          area: "沙坪坝区",
          createTime: "2020-12-17",
          address: "中渝",
          default: "否",
          userTag: "4",
        },
      ],
      // 编辑弹出框内容
      form:{},
      formLabelWidth:"120px",
      dialogTableVisible: false,
      dialogFormVisible: false,
      editIndex:''
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
      this.showList = this.addressList.slice(0, this.size);
    },
    handleCurrentChange(val) {
        this.showList = this.copyList.slice(
          val * this.size - this.size,
          this.size * val
        );
    },
    onSubmit() {
      let checkList = [];
      this.copyList.map((item) => {
        if (item.userTag == this.formInline.user.trim()) {
          checkList.push(item);
        }
      });
      this.showList = checkList.slice(0, 10);
      this.copyList=this.showList
      this.formInline.user = "";
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
      // 数据可以改变，但是展示的数据没变
    },
    // 点击每行中的删除按钮
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.showList=this.copyList.slice(0,10)
    },
  },
  created() {
    this.showList = this.addressList.slice(0, 10);
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