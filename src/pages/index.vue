<template>
  <v-app>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">字幕转文本工具</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark disabled>{{format}}</v-btn>
      <v-btn icon dark @click="switchFormat">
        <v-icon>swap_horiz</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="main" @drop.prevent="dropFile">
      <textarea ref="source" class="source" v-model="source" placeholder="支持文件拖入"></textarea>
      <textarea ref="result" class="result" v-model="result" placeholder="支持文本导出"></textarea>
    </div>
    <v-btn color="pink" dark fixed bottom right fab @click.stop="dialog = true">
      <v-icon>get_app</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>导出文本</v-card-title>
        <v-card-text>
          <v-text-field label="文件名" v-model="filename"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.stop="dialog = false">取消</v-btn>
          <v-btn color="primary" flat @click.stop="downFile">下载</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar :timeout="2000" v-model="snackbar.show" top>
      {{ snackbar.text }}
      <v-btn flat color="pink" @click.native="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import MaterialImage from 'material-image'

let scrollTimer

export default {
  name: 'Index',
  data () {
    return {
      format: 'ass',
      source: '',
      filename: '',
      snackbar: {
        show: false,
        text: ''
      },
      dialog: false
    }
  },
  computed: {
    result () {
      const { format, source } = this
      if (format === 'srt') {
        return source
          .replace(/(\d+:?){3},\d+ --> (\d+:?){3},\d?/g, '')
          .replace(/\d+\s*\n/g, '')
          .replace(/{\\an.*}/g, '')
          .replace(/{\\pos.*}/g, '')
      } else if (format === 'ass') {
        return source
          .replace(/[^]*\[Events\]\s*/, '')
          .replace(/Format:.*\s*/, '')
          .replace(/Dialogue.*,,(.*p0})?/g, '\n')
          .replace(/{.*?}/g, '')
          .replace(/\\N/g, '\n')
          .replace(/(\s*\n){3,}/g, '\n\n')
      } else {
        return source
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      new MaterialImage()
      this.$refs.source.addEventListener('scroll', this.scrollSync)
      this.$refs.result.addEventListener('scroll', this.scrollSync)
    })
  },
  methods: {
    switchFormat () {
      this.format = this.format === 'ass' ? 'srt' : 'ass'
    },
    dropFile (e) {
      const file = e.dataTransfer.files[0]
      const reader = new FileReader()
      reader.onload = this.getSourceFromFile
      reader.readAsText(file)
      this.format = file.name.replace(/.*\./, '')
      this.filename = file.name.replace(`.${this.format}`, '.txt')
      this.snackbar = {
        show: true,
        text: '字幕导入成功'
      }
    },
    getSourceFromFile (e) {
      this.source = e.target.result
    },
    downFile () {
      if (!this.filename) {
        this.snackbar = {
          show: true,
          text: '请输入文件名'
        }
        return
      }

      const eleLink = document.createElement('a')
      eleLink.download = this.filename
      eleLink.style.display = 'none'
      const blob = new Blob([this.result.replace(/\r?\n/g, '\r\n')])
      eleLink.href = URL.createObjectURL(blob)
      document.body.appendChild(eleLink)
      eleLink.click()
      document.body.removeChild(eleLink)

      this.dialog = false
      this.snackbar = {
        show: true,
        text: '文本导出成功'
      }
    },
    scrollSync (e) {
      clearTimeout(scrollTimer)
      const { scrollTop, scrollHeight } = e.target
      const scrollRatio = scrollTop / scrollHeight
      const { source, result } = this.$refs
      const follower = e.target === source ? result : source
      follower.removeEventListener('scroll', this.scrollSync)
      follower.scrollTop = follower.scrollHeight * scrollRatio
      scrollTimer = setTimeout(() => {
        follower.addEventListener('scroll', this.scrollSync)
      }, 300)
    }
  }
}
</script>

<style scoped>
#app {
  background-color: rgba(255, 255, 255, .9);
}

.main {
  flex: 1;
  display: flex;
}
.source, .result {
  flex: 1;
  padding: 5px 10px;
  margin: 0;
  font-size: 14px;
  line-height: 1.2;
  word-break: hyphenate;
  overflow: auto;
  border: none;
  outline: none;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .1), 0 1px 2px rgba(0, 0, 0, .1)
}

@media screen and (max-width: 540px) {
  .main {
    flex-direction: column;
  }
}
</style>
