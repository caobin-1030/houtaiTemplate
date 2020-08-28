<template>
<div id="BreadCrumb">
  <el-breadcrumb separator="/" style="margin-left: 15px;">
    <el-breadcrumb-item>{{breadcrumbTitle}}</el-breadcrumb-item>
    <el-breadcrumb-item v-if="breadcrumbTitleChildren">{{breadcrumbTitleChildren}}</el-breadcrumb-item>
    <el-breadcrumb-item v-if="breadcrumbTitleLast">{{breadcrumbTitleLast}}</el-breadcrumb-item>
  </el-breadcrumb>
</div>
</template>

<script>
export default {
  props: ['breadcrumbTitle', 'breadcrumbTitleChildren', 'breadcrumbTitleLast']
}
</script>
