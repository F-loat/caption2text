<template>
  <div class="container">
    <div class="header">
      <div class="title">字幕转文本工具</div>
      <form class="form">
        <div class="form-title">字幕格式：</div>
        <div class="form-item">
          <label for="ass">ass</label>
          <input v-model="format" type="radio" value="ass" name="ass" />
        </div>
        <div class="form-item">
          <label for="srt">srt</label>
          <input v-model="format" type="radio" value="srt" name="srt" />
        </div>
      </form>
    </div>
    <div class="main">
      <textarea class="source" v-model="source"></textarea>
      <pre class="result" v-text="result"></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      format: 'ass',
      source: ''
    }
  },
  computed: {
    result () {
      const { format, source } = this
      if (format === 'srt') {
        return source
          .replace(/(\d+\n)/g, '')
          .replace(/(\d+:?){3},\d+ --> (\d+:?){3},/g, '')
          .replace(/{\\an.*}/g, '')
          .replace(/{\\pos.*}/g, '')
      } else if (format === 'ass') {
        return source
          .replace(/{.*}/g, '')
          .replace(/[^]*\[Events\]\n/, '')
          .replace(/Format:.*\n/, '')
          .replace(/Dialogue.*,(.*p0})?/g, '\n')
          .replace(/\\N/g, '\n')
          .replace(/\n{3,}/g, '\n\n')
      } else {
        return source
      }
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  width: 100%;
  height: 60px;
  display: flex;
  padding: 10px;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
}
.form {
  display: flex;
}
.form-item {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  margin-right: 5px;
}

.main {
  flex: 1;
  display: flex;
  border-top: 1px solid #ccc;
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
}

@media screen and (max-width: 540px) {
  .main {
    flex-direction: column;
  }
  .source {
    border-bottom: 1px solid #ccc;
  }
}

@media screen and (min-width: 540px) {
  .source {
    border-right: 1px solid #ccc;
  }
}
</style>
