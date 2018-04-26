<template>
  <div class="countBet">
    <span>注单总数 = {{ count }}</span>
    <button class="clear" @click="clearAll">清除</button>
    <button class="join" :disabled="!disabled" @click="joinArr" :class="{active: disabled}">加入</button>
  </div>
</template>

<script>
  export default {
    name: "count-bet",
    props: {
      sumTempArr: {
        type: Array,
        default() {
          return []
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      countLength: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        count: this.countLength,
      }
    },

    methods: {
      clearAll() {
        this.count = 0
        this.$emit('clear', this.count)
      },
      joinArr() {
        this.count = 0
        this.$emit('join', this.count, this.sumTempArr)
      }
    },
    watch: {
      countLength(val) {
        this.count = val
      }
    }
  }
</script>

<style lang="less" scoped>
  .countBet {
    margin-left: 0.15rem;
    span {
      display: inline-block;
      width: 1.8rem;
      font-size: 0.20rem;
    }
    button {
      display: inline-block;
      width: 0.8rem;
      height: 0.4rem;
      outline: none;
      border: none;
      border-radius: 0.4rem;
    }
    .clear {
      color: #fff;
      background: #333;

    }
    .active {
      color: #fff;
      background: #333;
    }
  }
</style>
