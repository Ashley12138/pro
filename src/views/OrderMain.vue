<template>
  <div class="clear-fix">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="small"
    >
      <el-form-item label="订单号：">
        <el-input
        @keyup.enter.native="onSubmit"
          v-model="formInline.orderId"
          placeholder="请输入订单号"
          style="width: 140px"
        ></el-input>
      </el-form-item>
      <el-form-item label="订单状态：">
        <el-select
          v-model="formInline.state"
          placeholder="请选择订单状态"
          style="width: 130px"
        >
          <el-option-group label="请选择">
            <el-option label="待付款" value="待付款"></el-option>
            <el-option label="待评鉴" value="待评鉴"></el-option>
            <el-option label="待审核" value="待审核"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="已取消" value="已取消"></el-option>
            <el-option label="未通过" value="未通过"></el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="用户编号：">
        <el-input
        @keyup.enter.native="onSubmit"
          style="width: 140px"
          v-model="formInline.userTag"
          placeholder="请输入用户编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="店铺序号：">
        <el-input
        @keyup.enter.native="onSubmit"
          style="width: 150px"
          v-model="formInline.storeTag"
          placeholder="请输入店铺序号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
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
    <!-- 蓝条 -->
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
      ref="multipleTable"
      border
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      highlight-current-row
      @selection-change="changeBox"
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="orderId" label="订单编号" width="240">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120">
      </el-table-column>
      <el-table-column prop="state" label="订单状态" width="110">
      </el-table-column>
      <el-table-column prop="userTag" label="用户编号" width="120">
      </el-table-column>
      <el-table-column prop="storeTag" label="店铺编号" width="120">
      </el-table-column>
      <el-table-column prop="name" label="审核人" width="80"> </el-table-column>
      <el-table-column prop="handle" label="操作"> </el-table-column>
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
      orderList: [
        {
          orderId: "2021022100590083566",
          createTime: "2021-02-21",
          state: "已取消",
          userTag: "6",
          storeTag: "9",
          name: "",
          handle: "",
        },
        {
          orderId: "2021022100590085789",
          createTime: "2021-02-21",
          state: "已取消",
          userTag: "6",
          storeTag: "9",
          name: "",
          handle: "",
        },
        {
          orderId: "2021022020350070552",
          createTime: "2021-02-20",
          state: "已取消",
          userTag: "40",
          storeTag: "14",
          name: "",
          handle: "",
        },
        {
          orderId: "2021022020350024736",
          createTime: "2021-02-20",
          state: "已取消",
          userTag: "40",
          storeTag: "14",
          name: "",
          handle: "",
        },
        {
          orderId: "2021013023300091638",
          createTime: "2021-01-30",
          state: "已取消",
          userTag: "6",
          storeTag: "10",
          name: "",
          handle: "",
        },
        {
          orderId: "2021013023300099672",
          createTime: "2021-01-30",
          state: "已取消",
          userTag: "6",
          storeTag: "10",
          name: "",
          handle: "",
        },
        {
          orderId: "2021013023300050598",
          createTime: "2021-01-30",
          state: "已取消",
          userTag: "6",
          storeTag: "7",
          name: "",
          handle: "",
        },
        {
          orderId: "2021013023240020262",
          createTime: "2021-01-30",
          state: "已取消",
          userTag: "6",
          storeTag: "9",
          name: "",
          handle: "",
        },
        {
          orderId: "2021013023220030344",
          createTime: "2021-01-30",
          state: "已取消",
          userTag: "6",
          storeTag: "10",
          name: "",
          handle: "",
        },
        {
          orderId: "2021013011380069147",
          createTime: "2021-01-30",
          state: "已取消",
          userTag: "14",
          storeTag: "14",
          name: "",
          handle: "",
        },
        {
          orderId: "2021012923500037821",
          createTime: "2021-01-29",
          state: "已取消",
          userTag: "6",
          storeTag: "7",
          name: "",
          handle: "",
        },
        {
          orderId: "2021012923500031331",
          createTime: "2021-01-29",
          state: "已取消",
          userTag: "6",
          storeTag: "7",
          name: "",
          handle: "",
        },
        {
          orderId: "2021012923500073507",
          createTime: "2021-01-29",
          state: "已取消",
          userTag: "6",
          storeTag: "7",
          name: "",
          handle: "",
        },
        {
          orderId: "2021012922200069685",
          createTime: "2021-01-29",
          state: "已取消",
          userTag: "6",
          storeTag: "7",
          name: "",
          handle: "",
        },
        {
          orderId: "2021012916110092011",
          createTime: "2021-01-29",
          state: "已取消",
          userTag: "6",
          storeTag: "18",
          name: "",
          handle: "",
        },
        {
          orderId: "2021012911110034069",
          createTime: "2021-01-29",
          state: "已取消",
          userTag: "6",
          storeTag: "7",
          name: "",
          handle: "",
        },
        {
          orderId: "2021012910590028157",
          createTime: "2021-01-29",
          state: "已取消",
          userTag: "6",
          storeTag: "9",
          name: "",
          handle: "",
        },
      ],
      formInline: {
        orderId: "",
        state: "",
        userTag: "",
        storeTag: "",
      },
      currentPage: 1,
      showList: [],
      size: 10,
      copyList:[
        {
          orderId: "2021022100590083566",
          createTime: "2021-02-21",
          state: "已取消",
          userTag: "6",
          storeTag: "9",
          name: "",
          handle: "",
        },
        {
          orderId: "2021022100590085789",
          createTime: "2021-02-21",
          state: "已取消",
          userTag: "6",
          storeTag: "9",
          name: "",
          handle: "",
        },
        {
          orderId: "2021022020350070552",
          createTime: "2021-02-20",
          state: "已取消",
          userTag: "40",
          storeTag: "14",
          name: "",
          handle: "",
        },
        {
          orderId: "2021022020350024736",
          createTime: "2021-02-20",
          state: "已取消",
          userTag: "40",
          storeTag: "14",
          name: "",
          handle: "",
        },
        {
          orderId: "2021013023300091638",
          createTime: "2021-01-30",
          state: "已取消",
          userTag: "6",
          storeTag: "10",
          name: "",
          handle: "",
        },
        {
          orderId: "2021013023300099672",
          createTime: "2021-01-30",
          state: "已取消",
          userTag: "6",
          storeTag: "10",
          name: "",
          handle: "",
        },
        {
          orderId: "2021013023300050598",
          createTime: "2021-01-30",
          state: "已取消",
          userTag: "6",
          storeTag: "7",
          name: "",
          handle: "",
        },
        {
          orderId: "2021013023240020262",
          createTime: "2021-01-30",
          state: "已取消",
          userTag: "6",
          storeTag: "9",
          name: "",
          handle: "",
        },
        {
          orderId: "2021013023220030344",
          createTime: "2021-01-30",
          state: "已取消",
          userTag: "6",
          storeTag: "10",
          name: "",
          handle: "",
        },
        {
          orderId: "2021013011380069147",
          createTime: "2021-01-30",
          state: "已取消",
          userTag: "14",
          storeTag: "14",
          name: "",
          handle: "",
        },
        {
          orderId: "2021012923500037821",
          createTime: "2021-01-29",
          state: "已取消",
          userTag: "6",
          storeTag: "7",
          name: "",
          handle: "",
        },
        {
          orderId: "2021012923500031331",
          createTime: "2021-01-29",
          state: "已取消",
          userTag: "6",
          storeTag: "7",
          name: "",
          handle: "",
        },
        {
          orderId: "2021012923500073507",
          createTime: "2021-01-29",
          state: "已取消",
          userTag: "6",
          storeTag: "7",
          name: "",
          handle: "",
        },
        {
          orderId: "2021012922200069685",
          createTime: "2021-01-29",
          state: "已取消",
          userTag: "6",
          storeTag: "7",
          name: "",
          handle: "",
        },
        {
          orderId: "2021012916110092011",
          createTime: "2021-01-29",
          state: "已取消",
          userTag: "6",
          storeTag: "18",
          name: "",
          handle: "",
        },
        {
          orderId: "2021012911110034069",
          createTime: "2021-01-29",
          state: "已取消",
          userTag: "6",
          storeTag: "7",
          name: "",
          handle: "",
        },
        {
          orderId: "2021012910590028157",
          createTime: "2021-01-29",
          state: "已取消",
          userTag: "6",
          storeTag: "9",
          name: "",
          handle: "",
        },
      ],
      selectedList: [],
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
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.showList = this.copyList.slice(0, this.size);
    },
    // 翻页
    handleCurrentChange(val) {
        this.showList = this.copyList.slice(
          val * this.size - this.size,
          this.size * val
        );
    },
    // 查询功能
    onSubmit() {
      let checkList = [];
      this.orderList.map((item) => {
        // 当订单号存在时精准搜索完全符合的数据
        // 如果管理员通过订单号查询
        if (this.formInline.orderId) {
          if (item.orderId == this.formInline.orderId) {
            checkList.push(item);
          }
          // 订单号不存在时另外三个条件“与”关系
        } else {
          // 如果订单状态存在
          if (this.formInline.state) {
            // 如果用户编号存在
            if (this.formInline.userTag) {
              // 如果店铺编号存在
              // 三个条件都存在
              if (this.formInline.storeTag) {
                if (
                  this.formInline.state == item.state &&
                  this.formInline.userTag == item.userTag &&
                  this.formInline.storeTag == item.storeTag
                ) {
                  checkList.push(item);
                }
              }
              // 店铺编号不存在时
              // 三个条件只有店铺编号不存在
              else {
                if (
                  this.formInline.state == item.state &&
                  this.formInline.userTag == item.userTag
                ) {
                  checkList.push(item);
                }
                }
            }
            // 三个条件只有用户编号不存在
            else if (this.formInline.state && this.formInline.storeTag) {
              if (
                this.formInline.state == item.state &&
                this.formInline.storeTag == item.storeTag
              ) {
                checkList.push(item);
              }
            }
            // 三个条件只有订单状态存在
            if (!this.formInline.userTag && !this.formInline.storeTag) {
              if (this.formInline.state == item.state) {
                checkList.push(item);
              }
            }
          }
          // 下面的几种情况都没有订单状态
          // 三个状态只有店铺状态不存在
          else if (this.formInline.userTag && this.formInline.storeTag) {
            if (
              this.formInline.userTag == item.userTag &&
              this.formInline.storeTag == item.storeTag
            ) {
              checkList.push(item);
            }
          }
          // 三个条件只有用户编号存在
          else if (!this.formInline.storeTag) {
            if (this.formInline.userTag == item.userTag) {
              checkList.push(item);
            }
          }
          // 三个条件只有店铺编号存在
          if (!this.formInline.userTag) {
            if (this.formInline.storeTag == item.storeTag) {
              checkList.push(item);
            }
          }
        }
      });
      this.showList = checkList.slice(0, 10);
      this.copyList = checkList;
    },
    // 点击多选框后把选中的数据放入新的数组
    changeBox(val) {
      this.selectedList = [];
      val.forEach((item) => {
        this.selectedList.push(item);
      });
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
          that.orderList.forEach(function (itemI, indexI) {
            // 如果选中数据跟原数据图片路径相等，删除对应的源数据
            if (item.orderId === itemI.orderId) {
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
    this.showList = this.orderList.slice(0, 10);
  },
};
</script>
<style lang="scss" scoped>
.el-input {
  width: 100px;
}
.el-form-item {
  margin-left: 10px;
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
.batch {
  margin-left: 10px;
  line-height: 40px;
  border: 1px solid #e6e6e6;
  padding: 10px;
  border-radius: 5px;
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
  align-items: center;
  margin: 6px auto;
  .el-button {
    margin-left: 10px;
  }
}
</style>