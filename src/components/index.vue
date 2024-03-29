<template>
  <v-app v-resize="resizeHandler">
    <v-app-bar app dark color="primary">
      <v-toolbar-title class="white--text">字幕转换工具</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark @click="syncSource" v-text="'<-'" />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text dark @click="switchEncoding" v-bind="attrs" v-on="on">
            {{encoding}}
          </v-btn>
        </template>
        <span>编码切换</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark @click="switchFormat" v-bind="attrs" v-on="on">
            {{files[0].format}}
          </v-btn>
        </template>
        <span>格式切换</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark @click="switchInvert" v-bind="attrs" v-on="on">
            <v-icon>mdi-call-split</v-icon>
          </v-btn>
        </template>
        <span>顺序切换</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark @click="switchRange" v-bind="attrs" v-on="on">
            <v-icon>mdi-google-translate</v-icon>
          </v-btn>
        </template>
        <span>范围切换</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <a href="https://img.alicdn.com/imgextra/i2/O1CN01VhAWVx25SV6pfoc7C_!!6000000007525-0-tps-720-720.jpg" target="_blank" v-bind="attrs" v-on="on">
            <v-btn icon dark>
              <v-icon>mdi-arm-flex</v-icon>
            </v-btn>
          </a>
        </template>
        <span>赞赏</span>
      </v-tooltip>
      <a href="https://github.com/F-loat/caption2text" target="_blank">
        <v-btn icon dark>
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </a>
    </v-app-bar>
    <v-main>
      <div class="main" @drop.prevent="dropFile">
        <textarea
          ref="source"
          class="source"
          v-model="files[0].source"
          placeholder="支持多文件拖入"
          spellcheck="false"
          @input="syncResult"
        />
        <textarea
          ref="result"
          class="result"
          v-model="files[0].result"
          placeholder="支持批量导出"
          spellcheck="false"
        />
      </div>
      <v-btn class="file-btn" color="secondary" dark fixed bottom right fab>
        <v-icon>mdi-plus</v-icon>
        <input type="file" multiple @input="dropFile" />
      </v-btn>
      <v-btn color="secondary" dark fixed bottom right fab @click.stop="dialog = true">
        <v-icon>mdi-arrow-down</v-icon>
      </v-btn>
    </v-main>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>导出文本</v-card-title>
        <v-card-text>
          <v-text-field
            label="文件名"
            v-for="file of files"
            :key="file.name"
            :value="file.name"
            :suffix="`.${outputFormat}`"
            @blur="e => file.name = e.target.value"
          />
          <v-radio-group label="文件格式" v-model="outputFormat" row>
            <v-radio label="Word" value="docx"></v-radio>
            <v-radio label="Text" value="txt"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click.stop="dialog = false">取消</v-btn>
          <v-btn color="primary" text @click.stop="downFile">下载</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      :timeout="2000"
      v-model="snackbar.show"
      bottom
    >
      {{ snackbar.text }}
      <v-btn text color="secondary" @click.native="snackbar.show = false">关闭</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import MaterialImage from 'material-image'
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'

const readFile = (f, e) => new Promise((resolve) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    resolve(e.target.result)
  }
  reader.readAsText(f, e)
})

const invertText = (text, invert, range) => {
  let result = text.split('\n\n')

  if (range === 'all' && invert) {
    result = result.map(item => item.split('\n').reduce((rst, p) => [p, ...rst], []).join('\n'))
  } else if (range === 'main') {
    result = result.map(item => item.split('\n')[0])
  } else if (range === 'sub') {
    result = result.map(item => item.split('\n')[1])
  }

  return result.join('\n\n')
}

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
      outputRange: 'all',
      outputInvert: false,
      files: [{
        format: 'ass',
        source: '',
        result: '',
        name: ''
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
      this.$refs.source.addEventListener('scroll', this.syncScroll)
      this.$refs.result.addEventListener('scroll', this.syncScroll)
      /* eslint-disable-next-line no-new */
      new MaterialImage()
    })
  },
  methods: {
    getResult (source = '', format) {
      const { outputInvert, outputRange } = this

      if (format === 'srt' || format === 'vtt') {
        const result = source
          .replace(/\d+\s*(\d+:?){3},\d* --> (\d+:?){3},\d*/g, '')
          .replace(/{\\an.*}/g, '')
          .replace(/{\\pos.*}/g, '')
          .replace(/(\s*\n){3,}/g, '\n\n')
          .trim()
        return invertText(result, outputInvert, outputRange)
      } else if (format === 'ass' || format === 'ssa') {
        const result = source
          .replace(/[^]*\[Events\]\s*/, '')
          .replace(/Format:.*\s*/, '')
          .replace(/Dialogue.*,,(.*p0})?/g, '\n')
          .replace(/{.*?}/g, '')
          .replace(/\\N/g, '\n')
          .replace(/(\s*\n){3,}/g, '\n\n')
          .trim()
        return invertText(result, outputInvert, outputRange)
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
      const file = this.files[0]
      if (!file.raw) return
      this.dropFile({
        target: {
          files: [file.raw]
        }
      })
    },
    switchFormat () {
      const file = this.files[0]
      if (file.format === 'srt') {
        file.format = 'ass'
      } else if (file.format === 'ass') {
        file.format = 'srt'
      }
      this.syncResult()
    },
    switchInvert () {
      this.outputInvert = !this.outputInvert
      this.syncResult()
    },
    switchRange () {
      const { outputRange } = this
      if (outputRange === 'all') {
        this.outputRange = 'main'
      } else if (outputRange === 'main') {
        this.outputRange = 'sub'
      } else {
        this.outputRange = 'all'
      }
      this.syncResult()
    },
    async dropFile (e) {
      const files = e.target.files || e.dataTransfer.files
      for (let i = 0; i < files.length; i += 1) {
        const source = await readFile(files[i], this.encoding)
        const format = files[i].name.replace(/.*\./, '')
        const name = files[i].name.replace(`.${format}`, '')
        this.files[i] = {
          raw: files[i],
          source,
          format,
          name
        }
      }
      if (this.files.length > 1) {
        this.dialog = true
      }
      this.snackbar = {
        show: true,
        text: '字幕导入成功'
      }
      this.syncResult()
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
        const result = file.result || this.getResult(file.source, file.format)
        let outputBlob
        if (outputFormat === 'docx') {
          try {
            outputBlob = await this.generateDoc(result)
          } catch (err) {
            console.log(err)
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
          resolve(output)
        })
      })
    },
    syncScroll (e) {
      clearTimeout(this.scrollTimer)
      const { scrollTop, scrollHeight } = e.target
      const scrollRatio = scrollTop / scrollHeight
      const { source, result } = this.$refs
      const follower = e.target === source ? result : source
      follower.removeEventListener('scroll', this.syncScroll)
      follower.scrollTop = follower.scrollHeight * scrollRatio
      this.scrollTimer = setTimeout(() => {
        follower.addEventListener('scroll', this.syncScroll)
      }, 300)
    },
    syncSource () {
      const file = this.files[0]
      this.$set(this.files, 0, { ...file, source: file.result })
    },
    syncResult () {
      const file = this.files[0]
      const result = this.getResult(file.source, file.format)
      this.$set(this.files, 0, { ...file, result })
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
  height: 100%;
  display: flex;
}

.source, .result {
  flex: 1;
  padding: 5px 10px;
  margin: 0;
  color: #000;
  font-size: 14px;
  line-height: 1.4;
  word-break: hyphenate;
  overflow: auto;
  border: none;
  outline: none;
  resize: none;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .1), 0 1px 2px rgba(0, 0, 0, .1);
  background-color: rgba(255, 255, 255, .9);
}

.file-btn {
  right: 52% !important;
  cursor: pointer;
}

.file-btn input {
  width: 56px;
  height: 56px;
  position: absolute;
  opacity: 0;
}

@media screen and (max-width: 600px) {
  .main {
    flex-direction: column;
  }
  .file-btn {
    right: 16px !important;
    bottom: 48% !important;
  }
}
</style>
