<template>
  <div class="clear-fix">
    <el-button type="primary" @click="addRow"
      >+ 新增</el-button
    >
    <!-- 当有数据被选择时显示批量操作的按钮 -->
    <el-dropdown v-if="selectedList.length > 0" @command="clear">
      <span class="el-dropdown-link batch">
        批量操作<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><i class="el-icon-delete"></i>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog
      title="新增"
      :visible.sync="dialogFormVisible"
      :before-close="closeDialog"
    >
      <el-form :model="addObj" :rules="rules" ref="addObj">
        <el-form-item label="图片路径" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item
          prop="order"
          label="显示顺序"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addObj.order" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="imgType"
          label="图片类型"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addObj.imgType" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">关 闭</el-button>
        <el-button type="primary" @click="handleClick('addObj')"
          >确 定</el-button
        >
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
      :data="showList"
      border
      ref="multipleTable"
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      highlight-current-row
      @selection-change="changeBox"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="" label="图片路径" width="100">
        <template slot-scope="scope">
          <img
            :src="require('../assets/' + scope.row.imgUrl)"
            width="25"
            alt="出错了"
          />
        </template>
      </el-table-column>
      <el-table-column prop="order" label="显示顺序" width="100">
      </el-table-column>
      <el-table-column prop="creater" label="创建人" width="140">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="100">
        <template slot-scope="scope">
          {{ scope.row.createTime | getCreatTime }}
        </template>
      </el-table-column>
      <el-table-column prop="imgType" label="图片类型" width="220">
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
      layout="total, prev, pager, next, sizes"
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
      bannerList: [
        {
          imgUrl: '1.png',
          order: 3,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '订单示例图片',
        },
        {
          imgUrl: '2.png',
          order: 2,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '订单示例图片',
        },
        {
          imgUrl: '3.jpg',
          order: 1,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '订单示例图片',
        },
        {
          imgUrl: '4.gif',
          order: 1,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '首页饿了么领红包图片',
        },
        {
          imgUrl: '5.gif',
          order: 1,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '首页美团领红包图片',
        },
        {
          imgUrl: '6.png',
          order: 4,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '会员顶部图片',
        },
        {
          imgUrl: '7.png',
          order: 1,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '首页轮播图片',
        },
        {
          imgUrl: '8.png',
          order: 3,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '首页轮播图片',
        },
        {
          imgUrl: '9.png',
          order: 2,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '首页轮播图片',
        },
      ],
      addObj: {
        order: '',
        creater: 'admin',
        imgUrl: '8.png',
        imgType: '',
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      options: [
        {
          value: '选项1',
          label: '删除',
          icon: 'el-icon-delete',
        },
      ],
      value: '',
      imageUrl: '',
      selectedList: [],
      show: false,
      banner: 1,
      showList: [],
      timestamp: '',
      copyList: [
        {
          imgUrl: '1.png',
          order: 3,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '订单示例图片',
        },
        {
          imgUrl: '2.png',
          order: 2,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '订单示例图片',
        },
        {
          imgUrl: '3.jpg',
          order: 1,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '订单示例图片',
        },
        {
          imgUrl: '4.gif',
          order: 1,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '首页饿了么领红包图片',
        },
        {
          imgUrl: '5.gif',
          order: 1,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '首页美团领红包图片',
        },
        {
          imgUrl: '6.png',
          order: 4,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '会员顶部图片',
        },
        {
          imgUrl: '7.png',
          order: 1,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '首页轮播图片',
        },
        {
          imgUrl: '8.png',
          order: 3,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '首页轮播图片',
        },
        {
          imgUrl: '9.png',
          order: 2,
          creater: 'admin',
          createTime: '1608972269000',
          imgType: '首页轮播图片',
        },
      ],
      size: 10,
      // 修改或新增提交时的判断规则
      rules: {
        order: [
          { required: true, message: '必填项，不能为空', trigger: 'blur' },
        ],
        imgType: [
          { required: true, message: '必填项，不能为空', trigger: 'blur' },
        ],
      },
      changeIndex:''
    };
  },
  computed: {
    // 当展示数据数量变化时
    listLength: function () {
      return parseInt(this.copyList.length)
    }
  },
  methods: {
    // 点击新增按钮
    addRow(){
      this.dialogFormVisible = true
      this.addObj={
        order: '',
        creater: 'admin',
        imgUrl: '8.png',
        imgType: '',
      }
    },
    // 点击新增弹窗的确定按钮
    handleClick(addObj) {
      // 点击新增出来的弹框
      if (this.changeIndex === '') {
        this.$refs[addObj].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          this.addObj.createTime = new Date().getTime()
          this.copyList.push(this.addObj)
          var objString = JSON.stringify(this.copyList)
            this.copyList = JSON.parse(objString)
        } else {
          console.log('error submit!!')
          return false
        }
      });
      } else {
        this.dialogFormVisible = false
        var objString = JSON.stringify(this.addObj)
        this.copyList[this.changeIndex] = JSON.parse(objString)
      }
      this.showList = this.copyList.slice(0, 10)
    },
    // 点击关闭按钮，把输入框之前写的数据清空
    closeDialog() {
      this.dialogFormVisible = false
      this.addObj.imgType = ''
      this.addObj.order = ''
    },
    // 点击编辑按钮
    editRow(index, rows) {
      this.changeIndex = index
      // console.log(rows,index);
      this.addObj.order = rows[index].order
      this.addObj.imgType = rows[index].imgType
      this.dialogFormVisible = true
    },
    // 选择每页显示多少条数据
    handleSizeChange(val) {
      this.size = val
      this.showList = this.copyList.slice(0, this.size)
    },
    // 翻页
    handleCurrentChange(val) {
      // console.log(val);
      this.showList = this.copyList.slice(
        val * this.size - this.size,
        this.size * val
      );
    },
    // 上传图片
    handleAvatarSuccess(res, file, fileList) {
      // console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 点击多选框后把选中的数据放入新的数组
    changeBox(val) {
      this.selectedList = []
      val.forEach((item) => {
        this.selectedList.push(item)
      })
      // console.log(this.selectedList);
    },
    // 点击每行中的删除按钮
    deleteRow(index, rows) {
      rows.splice(index, 1)
      this.showList = this.copyList.slice(0, this.size)
      this.currentPage = 1
    },
    // 点中多选后点击清空 批量删除
    clear() {
      var that = this
      // 拿到选中的数据；
      var val = this.selectedList
      // 如果选中数据存在
      if (val) {
        // 将选中数据遍历
        val.forEach(function (item, index) {
          // 遍历源数据
          that.copyList.forEach(function (itemI, indexI) {
            // 如果选中数据跟原数据图片路径相等，删除对应的源数据
            if (item.imgUrl === itemI.imgUrl) {
              that.copyList.splice(indexI, 1)
            }
          });
        });
      }
      // 清除选中状态
      this.$refs.multipleTable.clearSelection();
      this.show = false;
      this.showList = this.copyList.slice(0, this.size);
    }
  },
  created() {
    // this.timestamp = Date.parse( new Date() ).toString();
    // this.timestamp=this.timestamp.substr(0,10);
    // this.token=window.sessionStorage.getItem('token');
    // // console.log(this.token);
    // this.axios.get("/sys/permission/getUserPermissionByToken?_t="+this.timestamp+"&token="+this.token).then(res=>{
    //   console.log(res);
    // })
    // this.axios.get("/system/shcImgTop/list?_t="+this.timestamp+"&column=createTime&order=desc&field=id,,,imgUrl,num,updater,createTime,imgType,action&pageNo=1&pageSize=10").then(res=>{
    //   console.log(res);
    // })
    this.showList = this.bannerList.slice(0, 10);
  }
};
</script>
<style lang="scss" scoped>
.del {
  cursor: pointer !important;
}
.batch {
  margin-left: 10px;
  line-height: 40px;
  border: 1px solid #e6e6e6;
  padding: 10px;
  border-radius: 5px;
}
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #fafafa;
  width: 100px;
}
.avatar-uploader:hover {
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
  width: 970px;
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