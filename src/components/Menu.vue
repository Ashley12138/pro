<template>
  <div class="content">
    <div
      style="
        display: flex;
        background-color: #1890ff;
        align-items: center;
        padding-left: 17.5px;
        height:60px;
      "
    >
      <img
        style="width: 32px; height: 32px"
        src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2231608597,38229152&fm=11&gp=0.jpg"
        alt=""
      />
      <h3 style="color: #fff">食惠吃管理后台</h3>
    </div>

    <el-radio-group
      v-model="isCollapse"
      fill="#ffffff"
      style="position: absolute; top: 5px; left: 200px; z-index: 1000"
    >
      <!-- 点击这个按钮控制列表左右展开收起 -->
      <el-radio-button :label="false" v-show="isCollapse"
        ><i class="el-icon-s-unfold"></i
      ></el-radio-button>
      <el-radio-button :label="true" v-show="!isCollapse"
        ><i class="el-icon-s-fold"></i
      ></el-radio-button>
    </el-radio-group>
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="$route.name"
      :collapse="isCollapse"
    >
      <el-menu-item
        v-for="(item, i) in index"
        :key="'info-' + i"
        :index="item.Index"
        @click="handleOpen2(item)"
      >
        <i :class="item.icont"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
      <el-submenu
        :index="`${index}`"
        v-for="(menu, index) in menuList"
        :key="index"
      >
        <template slot="title">
          <i :class="menu.icont"></i>
          <span>{{ menu.name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="item.routeName"
            v-for="item in menu.menuItem"
            :key="item.index"
            @click="handleOpen2(item)"
          >
            <i :class="item.icont"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      index: [
        {
          title: "首页",
          routeName: "Index",
          name: "首页",
          icont: "el-icon-house",
        },
      ],
      // 将所需submenu，menu和tabs所需参数写成数据格式
      menuList: [
        {
          icont: "el-icon-shopping-bag-1",
          name: "食惠吃后台管理",
          menuItem: [
            {
              title: "轮播图",
              routeName: "BannerMain",
              name: "轮播图",
              icont: "el-icon-s-flag",
            },
            {
              title: "资金管理",
              routeName: "BalanceMain",
              name: "资金管理",
              icont: "el-icon-c-scale-to-original",
            },
            {
              title: "用户支付管理",
              routeName: "PayMain",
              name: "用户支付管理",
              icont: "el-icon-coin",
            },
            {
              title: "店铺管理",
              routeName: "StoreMain",
              name: "店铺管理",
              icont: "el-icon-s-shop",
            },
            {
              title: "提现审核",
              routeName: "WithdrawalMain",
              name: "提现审核",
              icont: "el-icon-s-claim",
            },
            {
              title: "微信用户管理",
              routeName: "UserMain",
              name: "微信用户管理",
              icont: "el-icon-s-custom",
            },
            {
              title: "用户地址管理",
              routeName: "AddressMain",
              name: "用户地址管理",
              icont: "el-icon-map-location",
            },
            {
              title: "订单管理",
              routeName: "OrderMain",
              name: "订单管理",
              icont: "el-icon-document",
            },
            {
              title: "审核店铺管理",
              routeName: "AuditStoreMain",
              name: "审核店铺管理",
              icont: "el-icon-coordinate",
            },
            {
              title: "客服管理",
              routeName: "ServiceMain",
              name: "客服管理",
              icont: "el-icon-service",
            },
          ],
        },
      ],
      isCollapse: false,
    };
  },
  methods: {
    // 调用 注册vuex内注册的editableTabs方法
    ...mapActions({
      handleOpen2: "editableTabs",
    }),
  },
};
</script>
<style lang="scss" scoped>
.content {
  height: 100vh;
}
.el-radio-group {
  ::v-deep .el-radio-button__inner {
    border: 0;
    font-size: 28px;
    background: #1890ff;
    padding: 10px;
    color: #fff;
  }
}
.el-radio-button:first-child{
  ::v-deep .el-radio-button__inner{
    border: 0;
  }
} 
</style>