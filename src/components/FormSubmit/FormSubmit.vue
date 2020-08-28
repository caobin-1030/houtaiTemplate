<template>
  <div id="FormSubmit">
    <el-form
      style="width: 380px;"
      size="small"
      :model="form"
      label-width="80px">
      <el-form-item
        style="width: 380px;"
        v-for="item in formSubmitList"
        :required="item.required"
        :key="item.id"
        :label="item.label">
        <!--普通输入-->
        <el-input
          style="width: 300px;"
          v-if="item.type === 'input'"
          v-model="item.value">
        </el-input>
        <!--密码输入-->
        <el-input
          style="width: 300px;"
          v-if="item.type === 'password'"
          type="password"
          v-model="item.value">
        </el-input>
        <!--下拉选择-->
        <el-select
          style="width: 300px;"
          v-if="item.type === 'select'"
          v-model="item.value"
          placeholder="请选择">
          <el-option
            v-for="key in item.options"
            :key="key.id"
            :label="key.label"
            :value="key.value">
          </el-option>
        </el-select>
        <!--日期段选择-->
        <el-date-picker
          style="width: 300px;"
          value-format="timestamp"
          v-if="item.type === 'dateRange'"
          :clearable="false"
          v-model="item.value"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <!--switch开关-->
        <el-switch
          style="width: 300px;"
          v-if="item.type === 'switch'"
          v-model="item.value"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        <!--单选-->
        <el-radio-group
          v-if="item.type === 'radio'"
          v-model="item.value">
          <el-radio
            v-for="key in item.options"
            :key="key.id"
            :label="key.label">
          </el-radio>
        </el-radio-group>
        <!--多选-->
        <el-checkbox-group
          v-if="item.type === 'checkbox'"
          v-model="item.value">
          <el-checkbox
            v-for="key in item.options"
            :key="key.id"
            :label="key.label"
            :name="key.label">
          </el-checkbox>
        </el-checkbox-group>
        <!--数量选择器-->
        <el-input-number
          v-if="item.type === 'num'"
          v-model="item.value"
          :min="1"
          :max="10"
          label="描述文字">
        </el-input-number>
        <!--多行输入-->
        <el-input
          type="textarea"
          style="width: 300px;"
          :rows="item.rows"
          resize="none"
          v-if="item.type === 'textarea'"
          v-model="item.value">
        </el-input>
      </el-form-item>
      <el-form-item label-width="80px">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {}
    }
  },
  props: ['formSubmitList'],
  methods: {
    onSubmit () {
      this.formSubmitList.map(item => {
        this.form[item.key] = item.value
      })
      this.$emit('formSubmitData', this.form)
    }
  }
}
</script>

<style scoped lang="less">
#FormSubmit {
  width: 380px;
}
</style>
