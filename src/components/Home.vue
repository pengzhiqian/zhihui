<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAAmCAIAAABGa57+AAAFCklEQVR4Ae1aT0sbQRT/WfohInpUD+JBChLQTxALxW8geEjwpJfeRLF486InSQ5Cr55CofETKISCzaF4qB4NzbdI3+7szLzZ3dk/ZqO7YYZiZ968mfdv3ps3bzM3Ho/hWsU18KHi/Dv2PQ04K87COXBWdFacBQ3MggzOF50VZ0EDsyCD88VZsOJHmxDPt1ju2iY1vLmP9roeVqw3wtYJ7onpOsZ7FeOdszuX+upvtdBRKxbwdIwlf2iYuZpauPyGw2EgW+xxJBnP5ytwTNMj6uqCsqHRWWpgfIpNAetjroVbY776gxF2M0SjMsiZbsUkLmv4vqPnt6tmyIOmPIX1GIdriWCr5StvbzIrAuSRTSbdWbX8sYa7Nsb0L3IpGvcIE7Cc3UmtSFLt1LVo993qx1VKeXgqoIUrb8+ao2ZneXnewO0O0AhlrQPMXTEcliIpqJErEVTiKJ+4OMVBDTwfIazNHdw1AL4/z7NscFrJp3wmRHYTZgPoXAXJXTj9Ce0gGfY38/6Et5IIXKLHE5Y5ypUBIXN/Ib5ECf9fgC8umVbsPBg0SO/ChD0Ru/aBIZZb2DJjL0XmJ3bFeluYPnHY82AHx+gx1yfI7bV5RCjPuvYwFV1vQE3CxQjrXiDld4GAeylbGxcsoSOdeiG3bVycavMEobJI1DZpEQ+0YfBy8zkUnBCQTnBCK8CKqMkcQdB5wbMkqFyHdEE+47X1QEcUe1sDAQr+hk7D7gmO2hHTAtz1aZNtBFrWJvET5puNGPjlyKDI7wJjInGQXagsEukMyydKkSzUtOpCE2xYhBXZdkZ3oF9jq+worSwGWJ0f2t7GQhoMseYbnk60OI8XZK5oY/GTmySItD4+fyk9mlaM7pcOebVQNonMPN/QyQg3wNfQ9RTH4hSteGuGVkVdO9MQP+1q3ZHcUxSlgBYbUjbNYK5ITK8ziVA2ieik6kAyxLl0x+ffwEZQY0mWqAgrjvwilqKzGBDu9hXI2rkhRmPbApZj4e8NfL1QiRLxQKLc8byLo+AeShG7CCuaJJqfzLE/WmERNWa6mqAChWpss9xChKgBOnWZTKTpp4CXRijIqLhhI/30zzZTYfikQtVwVMe2jF5eQv6CCx1nUzRTgC/+fWE02PHhUeKv5f5be/OLjfFq7ar8K4oxPaEMd+zjEPicOYBNbEWWs5HMvT0teCMutOpp6i1kSsCMJe89mKJQvjsq+ZpfMuU1An9SK7ZYUYYep8ZlLJ+GRImn+Mp3czGqxHvjzh8//lNtIXhrTlMofkRSLyauh3QrPsovcN6yIZ7Ual5boXdbyIQ+Gj0SRGynOpao1VBdSnzSoyddUKSQGz7z+9L+COE30P0v/eJUh4P2u2dbcf6FSSRB8ISTl5y4NqmwQB/dzub1Uye7UBklUvyokggpx/AHjRHfs34lDpcB45cjKPpZZgU4ulXYa6NVR38lf7yLrVTdRBP065Pn0fq1DS4KBWaVUu2mGVM/A1DVWoXkd1KFiiLQuqhE5q5BgTe5ahpeAlitGEV1kLfQAB2vh5gvZcmk0yNq8no3W6wG6NkW++BOpuKsmKyfqc/SHUH3rvgOQ59xzvrIldcI/pwVp26nJALqndb3sr9L+plazrxGbF5A7SaJSzeXWQP0qyVqvePMCxii80WmjLfvrhsfUHWGnJMTl6PmVFgp0Z0vltIsOZlyVsypsFKiOyuW0iw5mXJWzKmwUqL/B8KnrYlgLGISAAAAAElFTkSuQmCC"
          class="sidebar-logo"
        />
        <span>智慧宿管云平台</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#304156"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 首页 -->
          <el-menu-item-group>
            <el-menu-item @click="sye">首页</el-menu-item>
          </el-menu-item-group>
          <!-- 一级菜单 -->
          <el-submenu :index="item.name + ''" v-for="item in menulist" :key="item.name">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-edit"></i>
              <!-- 文本 -->
              <span>{{item.meta.title}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + item2.path"
              v-for="(item2,key2) in item.children"
              :key="key2"
              @click="saveNavTate('/' + item2.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-tickets"></i>
                <!-- 文本 -->
                <span>{{ item2.meta.title }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //左侧菜单数据
      menulist: [],
      iconsObj: {
        Basedata: 'el-icon-tickets',
        Smartdor: 'el-icon-date',
        Report: 'el-icon-edit',
        System: 'el-icon-document-add',
        Sysset: 'el-icon-takeaway-box',
        Monitor: 'el-icon-umbrella',
        Tool: 'el-icon-headset'
      },
      //是否折叠
      isCollapse: false,
      //被激活的链接地址
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    //获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('/sys/menu/getRouters')
      if (res.code !== 200) return this.$message.error(res.message)
      this.menulist = res.data
      console.log(res)
    },
    //点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    saveNavTate(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    sye(){
      this.$router.push({
        path:'/index'
      })
    },
  }
}
</script>

<style lang="less" scoped>
.sidebar-logo {
  width: 35px;
  height: 35px;
  padding-left: 20px;
}
.home-container {
  height: 100%;
}
.el-header {
  background-color: #2b2f3a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  color: white;
  font-size: 15px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #304156;
  .el-menu {
    border-radius: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 25px;
  height: 25px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>