<template>
  <div style="margin: 20px 30px 100px;">
    <el-divider content-position="center">防抖函数 ---> 与 <--- 千分位</el-divider>
    <el-button v-preventReClick="5000" @click="addNum">伪防抖函按钮</el-button>
    <span style="margin-left: 300px;">{{ num | thousands }}</span>

    <el-divider content-position="center">测试401页面</el-divider>
    <el-button @click="$router.push('/test401')">测试401页面</el-button>

    <el-divider content-position="center">将多张base64图片下载至ZIP</el-divider>
    <el-button v-preventReClick @click="$tool.downloadZipImg(img_list, 'imgs')">下载图片ZIP</el-button>


    <el-divider content-position="center">数字转换为大写</el-divider>
    <div>{{ 9999999.999 | RMBcapital }}</div>

    <el-divider content-position="center">隐藏数位</el-divider>
    <div>{{ '15641783308' | plusXing(3,4) }}</div>

    <el-divider content-position="center">img预览测试</el-divider>
    <el-image
      style="width: 100px; height: 100px"
      :src="url"
      fit="cover"
      :preview-src-list="srcList"
    />

    <el-divider content-position="center">testLoading</el-divider>
    <el-button v-preventReClick @click="testLoading">testLoading</el-button>

    <el-divider content-position="center">测试默认值</el-divider>
    <div>{{ $$('user_info.family_num.father_name') }}</div>

    <el-divider content-position="center">测试el-cascader</el-divider>
    <el-cascader :props="props"></el-cascader>

    <el-divider content-position="center">测试el-select分页</el-divider>
    <el-select
      v-model="patientName"
      v-loadmore="psrAddFollowVoUserLoadmore"
      placeholder="请输入患者姓名"
      filterable

    >
      <el-option
        v-for="(item, index) in distributor_list"
        :key="index"
        :label="item.name"
        :value="item.id"
      >
        <span style="float: left">{{ item.name }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
      </el-option>
    </el-select>

  </div>
</template>

<script>
import { img_list } from './common'
import { mapGetters } from 'vuex'
import { Loading } from 'element-ui'

let id = 0
export default {
  name: 'TestDemo',
  data() {
    return {
      distributor_list: [],
      patientName: '',
      /* 当前页数 */
      current_page: 1,
      url:
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://img.alicdn.com/imgextra/i2/370627083/O1CN01oHcBWd22C3xBwtIFb_!!0-item_pic.jpg_430x430q90.jpg',
        'https://img.alicdn.com/imgextra/i3/370627083/O1CN018xpT4C22C3xB27tqw_!!370627083.jpg_430x430q90.jpg'
      ],
      num: 1000,
      img_list: img_list,
      user_info: {},
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 }).map(
              (item) => ({
                value: ++id,
                label: `选项${id}`,
                leaf: level >= 2
              })
            )
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          }, 1000)
        }
      }
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    this.adminPortalPmsSpuGetListByCon(1)
  },
  methods: {
    psrAddFollowVoUserLoadmore() {
      this.adminPortalPmsSpuGetListByCon(this.current_page)
    },
    /**
     * @Description: 获取商品列表
     * @Author: WenBo Wei
     * @Date: 2020/10/17
     * @param:
     * @return:
     * 注意 如果想要展现分页效果， 那么 page_size 必须设置在能让 el-select 出现在能出现滚动条的样式
     */
    adminPortalPmsSpuGetListByCon(page) {
      // window._api.adminPortal_pmsSpu_getListByCon({ page, page_size: 10 }).then(res => {
      //   if (this.current_page <= res.last_page) {
      //     this.distributor_list = this.distributor_list.concat(res.data)
      //     this.current_page = res.current_page + 1
      //   }
      // })
    },
    /**
     * @Description: 测试Loading
     * @Author: WenBo Wei
     * @Date: 2020/9/8
     * @param:
     * @return:
     */
    testLoading() {
      let loading = Loading.service({
        lock: true,
        text: '',
        spinner: 'el-icon-my-loading',
        background: 'hsla(0,0%,100%,.8)'
      })
      setTimeout(() => {
        loading.close()
      }, 5000)
    },

    /**
     * @Description: 测试防抖函数
     * @Author: WenBo Wei
     * @Date: 2020/9/2
     */
    addNum() {
      this.num += 1
    }
  }
}
</script>

<style scoped>
</style>
