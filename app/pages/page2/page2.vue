<template>
  <h1>Page 1</h1>

  <el-input v-model="content" style="width: 150px"></el-input>

  <div>{{ content }}</div>
</template>

<script setup>
import { ref } from 'vue';
// import utils from '$common/utils';

const content = ref('');

console.log('page2 init');
</script>

<style lang="less" scoped>
h1 {
  color: blue;
}
</style>
