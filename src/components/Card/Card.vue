<template>
  <div id="Card">
    <div
      v-for="(item,index) in cardList"
      :key="item.id"
      class="item"
      :style="(index+1)%3 !== 0 ? {marginRight: '0.5%'} : {marginRight: '0'}">
      <el-card :body-style="{padding: '0px'}">
        <div style="padding: 14px;">
          <span>{{item.title}}</span>
          <div class="bottom clearfix">
            <time class="time">{{$formatDate(item.date).format('YYYY-MM-DD HH:mm:ss')}}</time>
            <div class="button">
              <el-button
                type="text"
                @click="clickBtn(item, btn.name)"
                v-for="(btn, index) in item.btnList"
                :key="index">
                {{btn.name}}
              </el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['cardList'],
  methods: {
    clickBtn (option, name) {
      this.$emit('clickBtn', option, name)
    }
  }
}
</script>

<style scoped>
#Card {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.clearfix {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.item {
  width: 33%;
  margin-bottom: 10px;
}
</style>
