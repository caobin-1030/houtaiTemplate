<template>
  <div id="FormSearch">
    <el-form size="medium" label-position="right" label-width="70px" @keypress.native.enter="submitForm">
      <el-form-item
        :style="item.type === 'datePicker' ? {width: '50%'} : {}"
        v-for="item in formList"
        :label="item.label"
        :key="item.id">
        <el-input
          v-if="item.type === 'input'"
          v-model="item.value"
          :placeholder="item.placeholder"
        ></el-input>
        <el-autocomplete
          @focus="getIndex"
          style="width: 100%;"
          v-if="item.type === 'inputSelect'"
          v-model="item.value"
          :data-id="item.id"
          :placeholder="item.placeholder"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="true"
        ></el-autocomplete>
        <el-select
          style="width: 100%;"
          v-if="item.type === 'select'"
          v-model="item.value"
          filterable
        >
          <el-option
            label="全部"
            value="">
          </el-option>
          <el-option
            v-for="list in item.option"
            :key="list.id"
            :label="list.label"
            :value="list.value">
          </el-option>
        </el-select>
        <el-date-picker
          v-if="item.type === 'datePicker'"
          v-model="item.value"
          type="daterange"
          :clearable="false"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item class="formBtn">
        <el-button size="small" type="primary" @click="submitForm">查询</el-button>
        <el-button size="small" plain @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      restaurants: [],
      iIndex: 0
    }
  },
  props: ['formList'],
  methods: {
    // input搜索部分（含模糊搜索）
    querySearch (queryString, cb) {
      const restaurants = this.restaurants
      const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    getIndex (e) {
      // 此处控制多个inputSearch的显示
      if (e.target.placeholder === '请填写标题') {
        this.iIndex = 0
      }
      if (this.loadAll(this.iIndex)) {
        this.restaurants = this.loadAll(this.iIndex)
      } else {
        return false
      }
    },
    loadAll (index) {
      const option = this.formList.filter(item => {
        return item.type === 'inputSelect'
      })
      if (option.length === 0) {
        return false
      } else {
        return option[index].option
      }
    },
    // 重置formSearch的value值回到初始状态
    resetForm () {
      this.formList.forEach(item => {
        if (item.type === 'datePicker') {
          item.value = []
        } else {
          item.value = ''
        }
      })
    },
    // 提交formSearch的value
    submitForm () {
      this.$emit('search', this.formList)
    }
  },
  mounted () {
    if (this.loadAll(this.iIndex)) {
      this.restaurants = this.loadAll(this.iIndex)
    } else {
      return false
    }
  }
}
</script>

<style scoped lang="less">
#FormSearch {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid rgb(220, 220, 220);
  border-radius: 10px;
}

.el-form {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}

.el-form-item {
  width: 25%;
  margin: 5px 0;
}

.formBtn {
  flex: 1;
  text-align: right;
  /deep/.el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
