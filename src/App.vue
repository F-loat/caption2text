<template>
  <Index />
</template>

<script>
import Index from './pages'

export default {
  name: 'app',
  components: {
    Index
  }
}
</script>

<style>
body {
  background-attachment: fixed;
}

::-webkit-scrollbar{
  display:none;
}
</style>
