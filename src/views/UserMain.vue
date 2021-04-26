<template>
  <div class="clear-fix">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="昵称">
        <el-input
         @keyup.enter.native="onSubmit"
          style="width: 180px"
          v-model="formInline.nickName"
          placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input
         @keyup.enter.native="onSubmit"
          style="width: 180px"
          v-model="formInline.phone"
          placeholder="请输入电话"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
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
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      highlight-current-row
      @selection-change="changeBox"
      ref="multipleTable"
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="phoneNumber" label="手机号码" width="110">
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" width="60">
      </el-table-column>
      <el-table-column prop="wechatTag" label="微信标识" width="250">
      </el-table-column>
      <el-table-column prop="" label="微信头像" width="48">
        <template slot-scope="scope">
          　<img
            :src="scope.row.wechatAvatar"
            width="25"
            height="25"
            class="head_pic"
          />
        </template>
      </el-table-column>
      <el-table-column prop="userLevel" label="用户等级" width="30">
      </el-table-column>
      <el-table-column prop="points" label="积分" width="30"> </el-table-column>
      <el-table-column prop="handle" label="余额" width="30"> </el-table-column>
      <el-table-column prop="balance" label="红包" width="30">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="95">
      </el-table-column>
      <el-table-column prop="expirationTime" label="会员过期时间" width="95">
      </el-table-column>
      <el-table-column prop="qrcodeUrl" label="二维码图片路径" width="41">
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="55">
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
    <!-- 编辑的弹出框 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" destroy-on-close>
      <el-form :model="form">
        <el-form-item label="微信绑定ID：" :label-width="formLabelWidth">
          <el-input
            size="small"
            v-model="form.wechatTag"
            autocomplete="off"
            placeholder="请输入微信绑定ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="微信头像路径：" :label-width="formLabelWidth">
          <el-input
            size="small"
            v-model="form.wechatAvatar"
            autocomplete="off"
            placeholder="请输入微信头像路径"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户等级：" :label-width="formLabelWidth">
          <el-input-number
          style="width:500px;"
            v-model="form.userLevel"
            placeholder="请输入用户等级"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="积分：" :label-width="formLabelWidth">
          <el-input-number
          style="width:500px;"
            v-model="form.points"
            placeholder="请输入积分"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="余额：" :label-width="formLabelWidth">
          <el-input-number
          style="width:500px;"
            v-model="form.handle"
            placeholder="请输入余额"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="红包：" :label-width="formLabelWidth">
          <el-input-number
          style="width:500px;"
            v-model="form.balance"
            placeholder="请输入红包"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="手机号码：" :label-width="formLabelWidth">
          <el-input
            size="small"
            v-model="form.phoneNumber"
            autocomplete="off"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间：" :label-width="formLabelWidth">
          <el-input
            size="small"
            v-model="form.createTime"
            autocomplete="off"
            placeholder="请选择创建时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员过期时间：" :label-width="formLabelWidth">
          <el-input
            size="small"
            v-model="form.expirationTime"
            autocomplete="off"
            placeholder="请选择会员过期时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="二维码图片路径：" :label-width="formLabelWidth">
          <el-input
            size="small"
            v-model="form.qrcodeUrl"
            autocomplete="off"
            placeholder="请输入二维码图片路径"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="open">确 定</el-button>
      </div>
    </el-dialog>
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
      userList: [
        {
          phoneNumber: "",
          nickName: "勿忘心安",
          wechatTag: "ouNLA4mRytInFpXRi5-EPMQdEVX4",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLksMje2kROmIj8xBO3svr6UYDibOrURibH8QMmzJLkjG15upe3Zvw1ynQNWYTmkBB9iaeDGcSNmA4Ng/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-29",
          expirationTime: "2021-01-29",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "福星高照",
          wechatTag: "ouNLA4ndQYMC7JJHJoei1-8JEa7Y",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/jwGOeRZ97OHicS1jFyrQ2IqCLNRbWvcRqhY8MicyISL96ibv7tvneN18rvRAwic6MK4HnKCNILaAK1g9dEicpk0b9Vw/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-25",
          expirationTime: "2021-01-25",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "爱美造型",
          wechatTag: "ouNLA4pn1n1nIFVw75WprXcRaNK4",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/aUddbUB5jSET7qXJibnhj0l6HMPvARVx8NL2vpOVHgx6icxsAACgUt4ZDNLU9mmUrHNg36GDq3Dg3ZsQk7RrXvkg/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-21",
          expirationTime: "2021-01-21",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "秦瀚 🐜",
          wechatTag: "ouNLA4luFlyl0Gayog40e2Wzku8w",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eo8jqKJZwD4iccthIFticL2YCeFibUBjRs3p0rQibfQzsTAjaafLMbHBwk4UXBQ92XqkZUCCdcEfclpVg/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-17",
          expirationTime: "2021-01-17",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "超_越梦想",
          wechatTag: "ouNLA4tSI8DTbEsTQlLq9uZIWryI",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/OAaG3jcYYVEPgMFWQpUnggibThurkFLau6QQ2KRmibDXE72qXibMQUsJkg8JUiaib0HXMHNUkMGO1q7mQiaNXVLwxLyA/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-17",
          expirationTime: "2021-01-17",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "小倩",
          wechatTag: "ouNLA4kR3qix_PFIgQOCUZv001-c",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/OAaG3jcYYVEPgMFWQpUngkbyRt0mHpldsXKx2GtEqgCT7q5gib1dks4ZhnfPR7g0giaXZtpVsYgkv5qC18iaq71Sg/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-16",
          expirationTime: "2021-01-16",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "辛福",
          wechatTag: "ouNLA4owIFI_k37-RlRlBjeop6oQ",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJhKHLBS06LyIUtJDZs3yYpKG0C6WfmEXekvibFUSzkA5J1y2RsXVm6kZvZj5F1ZIE4aHBgsmCeVLg/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-15",
          expirationTime: "2021-01-15",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "全栈开发云-呤呤",
          wechatTag: "ouNLA4n4eIPQLzQYDU8n_42VQaqE",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJSZcno3GEdDIbXrMjWdib1Ivw6vDO3JHGAsEBUQTtkDzy3854aia7Sicib814WMf0icygQMafrdvhjgRQ/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-15",
          expirationTime: "2021-01-15",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "🇱 🇴 🇳 🇬",
          wechatTag: "ouNLA4qDba-3C_eQsUwOCl7W3uGM",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJSZcno3GEdDIbXrMjWdib1Ivw6vDO3JHGAsEBUQTtkDzy3854aia7Sicib814WMf0icygQMafrdvhjgRQ/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-14",
          expirationTime: "2021-01-14",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "李金潼",
          wechatTag: "ouNLA4mDoapOeEV69R8_enBojIhA",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/7Kt7kBRAia6zspQFMKBA1jXnic3525f5v6oMnIayRrYn8FqibXJeiak6M7C3xR6eM0fMLk0awTDBfhdOd0JyDP7OTw/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-13",
          expirationTime: "2021-01-13",
          qrcodeUrl: "无此图片",
        },

        {
          phoneNumber: "",
          nickName: "江山萌",
          wechatTag: "ouNLA4sUMBOIjcSlAoK7ohfIy_8A",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/WI2yDMKDSU0qJ1gY4Detp3P1hdeftOXdKwuRUkAsR7UxzBVlAEFBWwTW9iaz4ibJuC8DibibubA631HybviaM7IWLPw/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-13",
          expirationTime: "2021-01-13",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "梦啊啊啊啊",
          wechatTag: "ouNLA4iB7ESl7zG62baDgCB1XpMY",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/1qlKjHZnVp4pudD4oqRkicKQdvK5P2lRyg7bXURDVUM7MiaDhGbLLuQQoYKH7XLkFw0oPVLzQgh5F3lzFIrAqSwQ/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-12",
          expirationTime: "2021-01-12",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "暂别相见",
          wechatTag: "ouNLA4ofRH7vE7F4T6F7W9GdSPBw",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/EyQxj5PiczTiacb0t7J9wrjz4p3B1on8UBgTXdooXMp48YcibSxYSuV46kxpKlHbeicicsLiaMjpIRPasUXB15knbxdw/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-11",
          expirationTime: "2021-01-11",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "Lmran",
          wechatTag: "ouNLA4g9fQzw0Iis3sM45gRq0M3E",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/WwuGldAb7YQxyglbhsbXRj4lAxmO7qVgoIKEyK1dDOCdr8iazsQ3ZSPcGjSynm3a6L7cPgFicP5mebTmxlLvkABA/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-11",
          expirationTime: "2021-01-11",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "黄俊杰",
          wechatTag: "ouNLA4kSauOEJbkMjqAXrHbc7MPs",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/UjGjJB9tCaq1IVOPdZITcDMTuEzmPElVRCG5ChibOcKZeQah3GJEzHWOl7NYUfSqf58MIibNPsp22wnPH49AbPEw/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-11",
          expirationTime: "2021-01-11",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "A@陈刚【爱美造型】",
          wechatTag: "ouNLA4iCFYuM71xUmgLdRrILnAJU",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/VciagicrDGcKQxODVIqObXibdpAVcdeodSAeJUUz6CabuzlMrn3sMzmnGhUCQAD34Pmw2vYiaiarrqLKgQI27KzTPwQ/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-10",
          expirationTime: "2021-01-10",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "樂",
          wechatTag: "ouNLA4ohxBi__OPZSArHmRKE-HAk",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIloO6dAOJyib5C9rlXG8Feu4eyfXSMYKI0Jnw1wC5JGUglqwDjpu0D8pbRfaDZtl0GbI6mNFbr1YQ/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-06",
          expirationTime: "2021-01-06",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "吧啦吧啦",
          wechatTag: "ouNLA4hyQe3bU-Eq2lzc9JFEs7rk",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/aHHdC5jAC5WMjOYFpzfBnEGNbHkxUD4dcswaqgy96vwl140fAqderBnxOc82iazNGY4xJJwsiaetkS5j4wDySnnQ/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-04",
          expirationTime: "2021-01-04",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "✨淡定",
          wechatTag: "ouNLA4u-NaYWWKmO03ZjJwUrJZ64",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/6jLkluNJj7np20w3ubHMmiaF8PMoy3wFKQ0ALCpuk693nBEtCxIDqS015GjVh4VYMQIsh9W6iaA00vDTsNDTeugw/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-03",
          expirationTime: "2021-01-03",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "gdts",
          wechatTag: "ouNLA4sC4njMvUnREMBPTnpLbRsQ",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/6sQUSmPiacGZpHNCueVZtjBkAtSMj3v4lXx9nGysqUYNLXLcJg3UrZw0MncicFwmfUlAkOlNOwDWVLYib2WRFMjtA/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-03",
          expirationTime: "2021-01-03",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "18908329964",
          nickName: "浅浅微笑",
          wechatTag: "ouNLA4syLdb_VnuTL7lu92D_HFC0",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/rOP4bwP4L82jzLHpRe3IhhdmBBpzkicsMjBCLHuWDP0ehbQ55akpnoro22Oawgicgo0v6PX52N2BbZsiaQF8MvduA/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2020-12-28",
          expirationTime: "2020-12-28",
          qrcodeUrl: "无此图片",
        },
      ],
      formInline: {
        nickName: "",
        phone: "",
      },
      currentPage: 1,
      showList: [],
      size: 10,
      copyList: [
        {
          phoneNumber: "",
          nickName: "勿忘心安",
          wechatTag: "ouNLA4mRytInFpXRi5-EPMQdEVX4",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLksMje2kROmIj8xBO3svr6UYDibOrURibH8QMmzJLkjG15upe3Zvw1ynQNWYTmkBB9iaeDGcSNmA4Ng/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-29",
          expirationTime: "2021-01-29",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "福星高照",
          wechatTag: "ouNLA4ndQYMC7JJHJoei1-8JEa7Y",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/jwGOeRZ97OHicS1jFyrQ2IqCLNRbWvcRqhY8MicyISL96ibv7tvneN18rvRAwic6MK4HnKCNILaAK1g9dEicpk0b9Vw/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-25",
          expirationTime: "2021-01-25",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "爱美造型",
          wechatTag: "ouNLA4pn1n1nIFVw75WprXcRaNK4",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/aUddbUB5jSET7qXJibnhj0l6HMPvARVx8NL2vpOVHgx6icxsAACgUt4ZDNLU9mmUrHNg36GDq3Dg3ZsQk7RrXvkg/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-21",
          expirationTime: "2021-01-21",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "秦瀚 🐜",
          wechatTag: "ouNLA4luFlyl0Gayog40e2Wzku8w",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eo8jqKJZwD4iccthIFticL2YCeFibUBjRs3p0rQibfQzsTAjaafLMbHBwk4UXBQ92XqkZUCCdcEfclpVg/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-17",
          expirationTime: "2021-01-17",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "超_越梦想",
          wechatTag: "ouNLA4tSI8DTbEsTQlLq9uZIWryI",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/OAaG3jcYYVEPgMFWQpUnggibThurkFLau6QQ2KRmibDXE72qXibMQUsJkg8JUiaib0HXMHNUkMGO1q7mQiaNXVLwxLyA/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-17",
          expirationTime: "2021-01-17",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "小倩",
          wechatTag: "ouNLA4kR3qix_PFIgQOCUZv001-c",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/OAaG3jcYYVEPgMFWQpUngkbyRt0mHpldsXKx2GtEqgCT7q5gib1dks4ZhnfPR7g0giaXZtpVsYgkv5qC18iaq71Sg/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-16",
          expirationTime: "2021-01-16",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "辛福",
          wechatTag: "ouNLA4owIFI_k37-RlRlBjeop6oQ",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJhKHLBS06LyIUtJDZs3yYpKG0C6WfmEXekvibFUSzkA5J1y2RsXVm6kZvZj5F1ZIE4aHBgsmCeVLg/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-15",
          expirationTime: "2021-01-15",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "全栈开发云-呤呤",
          wechatTag: "ouNLA4n4eIPQLzQYDU8n_42VQaqE",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJSZcno3GEdDIbXrMjWdib1Ivw6vDO3JHGAsEBUQTtkDzy3854aia7Sicib814WMf0icygQMafrdvhjgRQ/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-15",
          expirationTime: "2021-01-15",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "🇱 🇴 🇳 🇬",
          wechatTag: "ouNLA4qDba-3C_eQsUwOCl7W3uGM",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJSZcno3GEdDIbXrMjWdib1Ivw6vDO3JHGAsEBUQTtkDzy3854aia7Sicib814WMf0icygQMafrdvhjgRQ/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-14",
          expirationTime: "2021-01-14",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "李金潼",
          wechatTag: "ouNLA4mDoapOeEV69R8_enBojIhA",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/7Kt7kBRAia6zspQFMKBA1jXnic3525f5v6oMnIayRrYn8FqibXJeiak6M7C3xR6eM0fMLk0awTDBfhdOd0JyDP7OTw/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-13",
          expirationTime: "2021-01-13",
          qrcodeUrl: "无此图片",
        },

        {
          phoneNumber: "",
          nickName: "江山萌",
          wechatTag: "ouNLA4sUMBOIjcSlAoK7ohfIy_8A",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/WI2yDMKDSU0qJ1gY4Detp3P1hdeftOXdKwuRUkAsR7UxzBVlAEFBWwTW9iaz4ibJuC8DibibubA631HybviaM7IWLPw/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-13",
          expirationTime: "2021-01-13",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "梦啊啊啊啊",
          wechatTag: "ouNLA4iB7ESl7zG62baDgCB1XpMY",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/1qlKjHZnVp4pudD4oqRkicKQdvK5P2lRyg7bXURDVUM7MiaDhGbLLuQQoYKH7XLkFw0oPVLzQgh5F3lzFIrAqSwQ/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-12",
          expirationTime: "2021-01-12",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "暂别相见",
          wechatTag: "ouNLA4ofRH7vE7F4T6F7W9GdSPBw",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/EyQxj5PiczTiacb0t7J9wrjz4p3B1on8UBgTXdooXMp48YcibSxYSuV46kxpKlHbeicicsLiaMjpIRPasUXB15knbxdw/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-11",
          expirationTime: "2021-01-11",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "Lmran",
          wechatTag: "ouNLA4g9fQzw0Iis3sM45gRq0M3E",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/WwuGldAb7YQxyglbhsbXRj4lAxmO7qVgoIKEyK1dDOCdr8iazsQ3ZSPcGjSynm3a6L7cPgFicP5mebTmxlLvkABA/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-11",
          expirationTime: "2021-01-11",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "黄俊杰",
          wechatTag: "ouNLA4kSauOEJbkMjqAXrHbc7MPs",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/UjGjJB9tCaq1IVOPdZITcDMTuEzmPElVRCG5ChibOcKZeQah3GJEzHWOl7NYUfSqf58MIibNPsp22wnPH49AbPEw/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-11",
          expirationTime: "2021-01-11",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "A@陈刚【爱美造型】",
          wechatTag: "ouNLA4iCFYuM71xUmgLdRrILnAJU",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/VciagicrDGcKQxODVIqObXibdpAVcdeodSAeJUUz6CabuzlMrn3sMzmnGhUCQAD34Pmw2vYiaiarrqLKgQI27KzTPwQ/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-10",
          expirationTime: "2021-01-10",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "樂",
          wechatTag: "ouNLA4ohxBi__OPZSArHmRKE-HAk",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIloO6dAOJyib5C9rlXG8Feu4eyfXSMYKI0Jnw1wC5JGUglqwDjpu0D8pbRfaDZtl0GbI6mNFbr1YQ/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-06",
          expirationTime: "2021-01-06",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "吧啦吧啦",
          wechatTag: "ouNLA4hyQe3bU-Eq2lzc9JFEs7rk",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/aHHdC5jAC5WMjOYFpzfBnEGNbHkxUD4dcswaqgy96vwl140fAqderBnxOc82iazNGY4xJJwsiaetkS5j4wDySnnQ/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-04",
          expirationTime: "2021-01-04",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "✨淡定",
          wechatTag: "ouNLA4u-NaYWWKmO03ZjJwUrJZ64",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/6jLkluNJj7np20w3ubHMmiaF8PMoy3wFKQ0ALCpuk693nBEtCxIDqS015GjVh4VYMQIsh9W6iaA00vDTsNDTeugw/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-03",
          expirationTime: "2021-01-03",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "",
          nickName: "gdts",
          wechatTag: "ouNLA4sC4njMvUnREMBPTnpLbRsQ",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/6sQUSmPiacGZpHNCueVZtjBkAtSMj3v4lXx9nGysqUYNLXLcJg3UrZw0MncicFwmfUlAkOlNOwDWVLYib2WRFMjtA/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2021-01-03",
          expirationTime: "2021-01-03",
          qrcodeUrl: "无此图片",
        },
        {
          phoneNumber: "18908329964",
          nickName: "浅浅微笑",
          wechatTag: "ouNLA4syLdb_VnuTL7lu92D_HFC0",
          wechatAvatar:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/rOP4bwP4L82jzLHpRe3IhhdmBBpzkicsMjBCLHuWDP0ehbQ55akpnoro22Oawgicgo0v6PX52N2BbZsiaQF8MvduA/132",
          userLevel: "1",
          points: "0",
          handle: "0",
          balance: "0",
          createTime: "2020-12-28",
          expirationTime: "2020-12-28",
          qrcodeUrl: "无此图片",
        },
      ],
      selectedList: [],
      dialogFormVisible: false,
      formLabelWidth: "130px",
      form: {},
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
      // console.log(`每页 ${val} 条`);
      this.size = val;
      this.showList = this.userList.slice(0, this.size);
    },
    handleCurrentChange(val) {
      this.showList = this.copyList.slice(
          val * this.size - this.size,
          this.size * val
        );
    },
    onSubmit() {
      let checkList = [];
      this.userList.map((item) => {
        // 如果昵称的输入框有内容
        if (this.formInline.nickName) {
          // 如果电话的输入框有内容
          if (this.formInline.phone) {
            // 同时满足两个条件的数据放入展示的列表
            if (
              item.nickName == this.formInline.nickName.trim() &&
              item.phone == this.formInline.phone.trim()
            ) {
              checkList.push(item);
            }
            // 如果电话的输入框没有内容
          } else {
            if (item.nickName == this.formInline.nickName.trim()) {
              checkList.push(item);
            }
          }
          // 昵称没有内容
        } else {
          // 昵称没有内容，电话有内容
          if (this.formInline.phone) {
            if (item.phone == this.formInline.phone.trim()) {
              checkList.push(item);
            }
            // 输入框都为空时点击了查询按钮
          } else {
            checkList = this.userList;
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
          that.userList.forEach(function (itemI, indexI) {
            // 如果选中数据跟原数据用户标识相等，删除对应的源数据
            if (item.wechatTag === itemI.wechatTag) {
              that.copyList.splice(indexI, 1);
            }
          });
        });
      }
      // 清除选中状态
      this.$refs.multipleTable.clearSelection();
      this.show = false;
      this.showList = this.copyList.slice(0, 10);
    },
    // 点击删除按钮
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.showList=this.copyList.slice(0,10)
    },
    // 编辑功能
    editRow(index, rows) {
      this.dialogFormVisible = true;
      this.form = rows[index];
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
  },
  created() {
    this.showList = this.userList.slice(0, 10);
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
.el-dialog__wrapper {
  ::v-deep .el-dialog {
    width:750px;
  .el-input {
    width: 500px;
    text-align: left;
  }
  .el-input__inner{
    width:500px;
    text-align: left;
  }
}
}
</style>