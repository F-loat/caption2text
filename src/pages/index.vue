<template>
  <v-app v-resize="resizeHandler">
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">字幕转文本工具</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat dark @click="switchEncoding">{{encoding}}</v-btn>
      <v-btn icon dark @click="switchFormat">{{files[0].format}}</v-btn>
      <a href="https://github.com/F-loat/caption2text" target="_blank">
        <v-btn icon dark>
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true">
            <path fill-rule="evenodd" fill="#fff" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </v-btn>
      </a>
    </v-toolbar>
    <div class="main" @drop.prevent="dropFile">
      <textarea ref="source" class="source" v-model="files[0].source" placeholder="支持多文件拖入"></textarea>
      <pre ref="result" class="result" :class="{ holder: !files[0].source }">{{files[0].source ? getResult(files[0].source, files[0].format) : '支持批量导出'}}</pre>
    </div>
    <v-btn color="secondary" dark fixed bottom right fab @click.stop="dialog = true">
      <v-icon>get_app</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>导出文本</v-card-title>
        <v-card-text>
          <v-text-field
            v-for="file of files" :key="file.name"
            label="文件名"
            v-model="file.name"
            :suffix="`.${outputFormat}`"></v-text-field>
          <v-radio-group label="文件格式" v-model="outputFormat" row>
            <v-radio label="Word" value="docx"></v-radio>
            <v-radio label="Text" value="txt"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.stop="dialog = false">取消</v-btn>
          <v-btn color="primary" flat @click.stop="downFile">下载</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      :timeout="2000"
      v-model="snackbar.show"
      bottom
    >
      {{ snackbar.text }}
      <v-btn flat color="secondary" @click.native="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import MaterialImage from 'material-image'
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'

let file, scrollTimer

export default {
  name: 'Index',
  data () {
    return {
      windowSize: {
        x: window.innerWidth,
        y: window.innerHeight
      },
      encoding: 'utf-8',
      outputFormat: 'docx',
      files: [{
        format: 'ass',
        source: ''
      }],
      snackbar: {
        show: false,
        text: ''
      },
      dialog: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.source.addEventListener('scroll', this.scrollSync)
      this.$refs.result.addEventListener('scroll', this.scrollSync)
      /* eslint-disable-next-line no-new */
      new MaterialImage()
    })
  },
  methods: {
    getResult (source = '', format) {
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
      } else if (format === 'txt') {
        return source
          .replace(/(，|。|\.)+/g, '\n')
      } else {
        return source
      }
    },
    resizeHandler () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    switchEncoding () {
      this.encoding = this.encoding === 'utf-8' ? 'gb2312' : 'utf-8'
      this.dropFile(null, file)
    },
    switchFormat () {
      this.format = this.format === 'ass' ? 'srt' : 'ass'
    },
    dropFile (e, f) {
      const files = f ? [f] : e.dataTransfer.files
      for (let i = 0; i < files.length; i += 1) {
        const file = {}
        const reader = new FileReader()
        reader.onload = (e) => {
          file.source = e.target.result
        }
        reader.readAsText(files[i], this.encoding)
        file.format = files[i].name.replace(/.*\./, '')
        file.name = files[i].name.replace(`.${file.format}`, '')
        this.files[i] = file
      }
      if (this.files.length > 1) {
        this.dialog = true
      }
      this.snackbar = {
        show: true,
        text: '字幕导入成功'
      }
    },
    async downFile () {
      const { files, outputFormat } = this

      for (const file of files) {
        if (!file.name) {
          this.snackbar = {
            show: true,
            text: '请输入文件名'
          }
          continue
        }
        const result = this.getResult(file.source, file.format)
        let outputBlob
        if (outputFormat === 'docx') {
          try {
            outputBlob = await this.generateDoc(result)
          } catch (err) {
            if (err) {
              this.snackbar = {
                show: true,
                text: '出错了...'
              }
            }
          }
        } else {
          outputBlob = new Blob([result.replace(/\r?\n/g, '\r\n')])
        }

        saveAs(outputBlob, `${file.name}.${outputFormat}`)

        this.snackbar = {
          show: true,
          text: `已导出 ${file.name}`
        }

        this.dialog = false
      }
    },
    generateDoc (data) {
      return new Promise((resolve, reject) => {
        JSZipUtils.getBinaryContent('template.docx', (err, content) => {
          if (err) return reject(err)
          console.log(content)
          const zip = new JSZip(content)
          const doc = new Docxtemplater().loadZip(zip)
          doc.setData({
            author: 'F-loat',
            content: data.split('\n').map(text => ({ text }))
          })
          doc.render()
          const output = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          })
          console.log(output)
          resolve(output)
        })
      })
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
  height: 100vh;
  background: transparent;
}

.main {
  flex: 1;
  display: flex;
}
.source, .result {
  flex: 1;
  padding: 5px 10px;
  margin: 0;
  color: #000;
  font-size: 14px;
  line-height: 1.2;
  word-break: hyphenate;
  overflow: auto;
  border: none;
  outline: none;
  resize: none;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .1), 0 1px 2px rgba(0, 0, 0, .1);
  background-color: rgba(255, 255, 255, .9);
}
.result.holder {
  color: #888;
}

@media screen and (max-width: 600px) {
  .main {
    flex-direction: column;
  }
}
</style>
