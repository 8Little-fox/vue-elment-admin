<template>
  <div class="tinymce-box">
    <Editor v-model="myValue" :init="init" :disabled="false" @onClick="onClick" />
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce' // tinymce默认hidden，不引入不显示
tinymce.baseURL = '/tinymce' // 解决控制台警告
import Editor from '@tinymce/tinymce-vue'

import 'tinymce/themes/silver'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/preview'

import uploadQiniu from '@/utils/uploadQiniu.js'

export default {
  name: 'Tinymce',
  components: { Editor },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      init: {
        language_url: '/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        min_height: 500,
        plugins: 'link lists axupimgs table fullscreen wordcount preview',
        toolbar: 'undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists axupimgs media table | removeformat | preview | fullscreen',
        draggable_modal: true,
        branding: false,
        menubar: false,
        elementpath: false,
        toolbar_sticky: true,
        toolbar_mode: 'wrap',
        images_upload_handler: async(blobInfo, success, failure) => {
          uploadQiniu(blobInfo.blob(), (res) => {
            if (typeof res !== 'number') success(res)
          })
        }
      },
      myValue: this.value
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    onClick(e) {
      console.log(this.myValue)
    }
  }
}
</script>

<style scoped>
</style>
