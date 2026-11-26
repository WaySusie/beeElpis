<template>
  <h1>Page 1</h1>

  <el-input v-model="content" style="width: 300px"> </el-input>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="Name" width="180"></el-table-column>
    <el-table-column prop="desc" label="desc" width="180"></el-table-column>
  </el-table>
  <div>{{ content }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import $curl from '$common/curl';

const content = ref('');
console.log('page1 init');

const tableData = ref([]);

onMounted(async () => {
  console.log('%c [ 122 ]-23', 'font-size:13px; background:pink; color:#bf2c9f;', 121);
  const res = await $curl({
    method: 'get',
    url: '/api/project/list',
    // errorMessages: '获取应用列表失败',
    query: {
      proj_key: 'aaa',
    },
  });

  tableData.value = res.data;
});
</script>

<style lang="less" scoped>
h1 {
  color: red;
}
</style>
