<template>
  <div style="display:flex;justify-content: space-between;">
    <div style="margin-left:34px;font-size:14px">
      业务员端：欢迎{{username}}回来~
    </div>
    <div class="content">
      <span @click="showSearch = true">
        <i class="el-icon-search" style="margin-right: 6px"></i>
        <el-select
          v-if="showSearch"
          v-model="value"
          filterable
          placeholder="搜索菜单"
          @change="add"
        >
          <el-option
            v-for="item in options"
            :key="item.title"
            :label="item.name"
            :value="item.title"
          >
          </el-option>
        </el-select>
      </span>
      <el-popover
        placement="bottom"
        title="标题"
        width="200"
        trigger="click"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
      >
        <el-button slot="reference"><i class="el-icon-bell"></i></el-button>
      </el-popover>
      <el-dropdown>
        <span style="color: #fff">
          <img :src="avatar" alt="" />
          <span>欢迎您，龙磊</span>
        </span>
        <el-dropdown-menu>
          <el-dropdown-item
            ><i class="el-icon-user"></i> 个人中心</el-dropdown-item
          >
          <el-dropdown-item
            ><i class="el-icon-setting"></i> 密码中心</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <span>
        <i class="el-icon-s-operation" @click="out">退出登录</i>
      </span>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username:"龙磊",
      avatar: "",
      show: true,
      editableTabsValue: "1",
      showSearch: false,
      value: "",
      options: [
        {
          title: "首页",
          routeName: "Index",
          name: "首页",
        },
        {
          title: "订单管理",
          routeName: "OrderMain",
          name: "订单管理",
        },
        {
          title: "审核店铺管理",
          routeName: "AuditStoreMain",
          name: "审核店铺管理",
        },
        {
          title: "客服管理",
          routeName: "ServiceMain",
          name: "客服管理",
        },
        {
          title: "资金管理",
          routeName: "BalanceMain",
          name: "资金管理",
        },
        {
          title: "轮播图",
          routeName: "BannerMain",
          name: "轮播图",
        },
        {
          title: "用户支付管理",
          routeName: "PayMain",
          name: "用户支付管理",
        },
        {
          title: "店铺管理",
          routeName: "StoreMain",
          name: "店铺管理",
        },
        {
          title: "提现审核",
          routeName: "WithdrawalMain",
          name: "提现审核",
        },
        {
          title: "微信用户管理",
          routeName: "UserMain",
          name: "微信用户管理",
        },
        {
          title: "用户地址管理",
          routeName: "AddressMain",
          name: "用户地址管理",
        },
      ],
    };
  },
  computed: {},
  methods: {
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
    },
    // 点击选择器列表中的一项时，添加导航
    add(e) {
      this.options.map((item) => {
        if (item.name == e) {
          this.handleOpen2(item);
        }
      });
      this.showSearch = false;
    },
    // 调用 注册vuex内注册的editableTabs方法
    ...mapActions({
      handleOpen2: "editableTabs",
    }),
    out(){
      this.$store.commit("del_token");
      this.$router.push('/')
    }
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: flex-end;
  span {
    padding: 0px 10px;
  }
  span:hover {
    background: hsla(0, 0%, 100%, 0.3);
    cursor: pointer;
    transition: all 0.3s;
  }
}
</style>