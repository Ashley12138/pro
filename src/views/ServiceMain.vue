<template>
  <div class="clear-fix">
    <div style="display: flex">
      <el-button type="primary" @click="addRow">+ 新增</el-button>
      <el-dropdown v-if="selectedList.length > 0" @command="clear">
        <span class="el-dropdown-link batch">
          批量操作<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            ><i class="el-icon-delete"></i>删除</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="name" label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片路径" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="imageUrl"
              :src="imgUrl"
              class="avatar"
              style="width: 100px; height: 100px"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
        <el-button type="primary" @click="open('form')">确 定</el-button>
      </div>
    </el-dialog>
    <div class="clear">
      <div>已选择</div>
      <div style="color: #1890ff; fontweight: bold">
        {{ selectedList.length }}
      </div>
      <div>项</div>
      <el-button @click="clear" type="text">清空</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="showList"
      border
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      @selection-change="changeBox"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="name" label="名称" width="200"> </el-table-column>
      <el-table-column prop="" label="二维码" width="200">
        <template slot-scope="scope">
          <img
            style="width: 25px; height: 25px"
            :src="require('../assets/' + scope.row.imgUrl)"
            alt=""
          />
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click.native.prevent="editRow(scope.$index, copyList)"
            >编辑</el-button
          >
          <el-button
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
      currentPage: 1,
      imageUrl: "",
      serviceList: [
        {
          name: "杨家坪",
          imgUrl: "code.png",
        },
      ],
      selectedList: [],
      show: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        imgUrl: "code.png",
      },
      formLabelWidth: "120px",
      copyList: [
        {
          name: "杨家坪",
          imgUrl: "code.png",
        },
      ],
      showList: [],
      rules: {
        name: [{ required: true, message: "请输入名称" }],
      },
      imageUrl: "",
      changeIndex: "",
    };
  },
  computed: {
    // 当展示数据数量变化时
    listLength: function () {
      return parseInt(this.copyList.length);
    },
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.showList = this.serviceList.slice(0, this.size);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.showList = this.serviceList.slice(
        val * this.size - this.size,
        this.size * val
      );
    },
    // 图片上传成功执行
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw);
    },
    // 点击多选框后把选中的数据放入新的数组
    changeBox(val) {
      this.selectedList = [];
      val.forEach((item) => {
        this.selectedList.push(item);
      });
    },
    addRow() {
      this.dialogFormVisible = true;
      this.form = {
        name: "",
        imgUrl: "code.png",
      };
    },
    // 点击编辑按钮
    editRow(index, rows) {
      this.form.name = rows[index].name;
      // 为了区分是点击编辑还是新增按钮，在点击编辑时，把点击的行数记录下来，方便提交时修改数据
      this.changeIndex = index;
      // this.form.imgUrl = require('../assets/' + rows[index].imgUrl);
      this.dialogFormVisible = true;
    },
    // 点击编辑框中的确定按钮
    open(form) {
      // 新增数据
      if (this.changeIndex === "") {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false;
            this.copyList.push(this.form);
            var objString = JSON.stringify(this.copyList);
            this.copyList = JSON.parse(objString);
            // console.log(this.copyList);
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.dialogFormVisible = false;
        // 为了解决编辑时所有新数据都会变化，这里使用了深拷贝
        var objString = JSON.stringify(this.form);
        this.copyList[this.changeIndex] = JSON.parse(objString);
      }
      this.showList = this.copyList.slice(0, 10);
    },
    // 点击每行中的删除按钮
    deleteRow(index, rows) {
      rows.splice(index, 1);
      var objString = JSON.stringify(this.copyList);
      this.copyList = JSON.parse(objString);
      this.showList = this.copyList.slice(0, 10);
    },
    // 点中多选后点击清空 批量删除
    clear() {
      var that = this;
      // 拿到选中的数据；
      var val = this.selectedList;
      // 如果选中数据存在
      if (val) {
        // 将选中数据遍历
        val.forEach(function (item, index) {
          // 遍历源数据
          that.copyList.forEach(function (itemI, indexI) {
            // 如果选中数据跟原数据图片路径相等，删除对应的源数据
            if (item.name === itemI.name) {
              that.copyList.splice(indexI, 1);
            }
          });
        });
        that.showList = this.copyList.slice(0, 10);
      }
      // 清除选中状态
      this.$refs.multipleTable.clearSelection();
    },
  },
  created() {
    this.showList = this.serviceList.slice(0, 10);
  },
};
</script>
<style lang="scss" scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #fafafa;
  width: 100px;
  &:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    width: 86px;
    height: 104px;
    font-size: 24px;
    line-height: 104px;
    text-align: center;
    padding: 8px;
  }
}
.batch {
  margin-left: 10px;
  line-height: 40px;
  border: 1px solid #e6e6e6;
  padding: 10px;
  border-radius: 5px;
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
.clear {
  display: flex;
  background-color: #e6f7ff;
  width: 921px;
  height: 21px;
  padding: 8px 15px 8px 37px;
  border: 1px solid #91d5ff;
  border-radius: 4px;
  line-height: 21px;
  // box-sizing: border-box;
  align-items: center;
  margin: 16px auto;
  .el-button {
    margin-left: 10px;
  }
}
</style>