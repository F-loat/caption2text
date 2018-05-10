<template>
  <v-app>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">字幕转文本工具</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark disabled>{{format}}</v-btn>
      <v-btn icon dark @click="switchFormat">
        <v-icon>swap_horiz</v-icon>
      </v-btn>
      <a href="https://github.com/F-loat/caption2text" target="_blank">
        <v-btn icon dark @click="switchFormat">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true">
            <path fill-rule="evenodd" fill="#fff" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </v-btn>
      </a>
    </v-toolbar>
    <div class="main" @drop.prevent="dropFile">
      <textarea ref="source" class="source" v-model="source" placeholder="支持文件拖入"></textarea>
      <textarea ref="result" class="result" v-model="result" placeholder="支持文本导出"></textarea>
    </div>
    <v-btn color="secondary" dark fixed bottom right fab @click.stop="dialog = true">
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
      <v-btn flat color="secondary" @click.native="snackbar.show = false">Close</v-btn>
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
  resize: none;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .1), 0 1px 2px rgba(0, 0, 0, .1)
}

@media screen and (max-width: 540px) {
  .main {
    flex-direction: column;
  }
}
</style>
