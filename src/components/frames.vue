<template>
  <div class="frames">
    <ul>
      <li v-for="(item,index) in numberArr" :key="index" @click="tag(index)" :class="{active: isActive === index}">
        {{ item }}
        <div :class="{triangle: isActive === index}"></div>
      </li>
    </ul>

  </div>
</template>

<script>
  export default {
    name: "frames",
    data() {
      return {
        isActive: 0,
      }
    },

    methods: {
      tag(index) {
        this.isActive = index
        this.$emit('click', this.isActive)
      }
    },

    props: {
      numberArr: {
        type: Array,
        default() {
          return ['百 十 个']
        }
      },
      content: {
        type: String,
        default: ''
      }
    },
    watch: {
      content(val, oldVal) {
        if (val !== oldVal) this.isActive = 0
      }
    }

  }
</script>

<style lang="less" scoped>
  .frames {
    border: 0.02rem solid #065371;
    border-radius: 0.3rem;
    margin: 0.1rem 0.1rem 0.2rem;
    overflow-x: auto;
    ul {
      width: 100%;
      height: 0.4rem;
      white-space: nowrap;
      text-align: center;
      li {
        position: relative;
        display: inline-block;
        margin: 0.06rem 0.35rem;
        font-size: 0.18rem;
        .triangle {
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0);
          bottom: -0.16rem;
          width: 0;
          height: 0;
          border-left: 0.08rem solid transparent;
          border-right: 0.08rem solid transparent;
          border-bottom: 0.08rem solid #065371;
          transition: all 0.3s;
          &.show {
            display: none;
          }
        }
      }

      .active {
        color: #dd6f44;
      }
    }

  }
</style>
