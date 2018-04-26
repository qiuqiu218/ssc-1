<template>
  <div class="ratio">
    <ul>
      <li @click="clickValue(index)" v-for="(item,index) in items"
          :class="item.isActive === true ? 'active' : '' "
          :key="index">{{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ratio",
    props: {
      itemType: {
        type: Number,
        default: 0
      },
      ratioArr: {
        type: Array
      },
    },
    data() {
      return {
        items: [
          {
            title: '大',
            isActive: false
          },
          {
            title: '小',
            isActive: false
          },
          {
            title: '单',
            isActive: false
          },
          {
            title: '双',
            isActive: false
          }]
      }
    },
    methods: {
      clickValue(index) {
        let temp = this.items[index]
        temp.tag = this.ratioArr[index]
        let position = temp.tag.split('_')[0]
        switch (position) {
          case 'SINGLE':
            temp.location = '一定位'
            break
          case 'DOUBLE':
            temp.location = '二定位'
            break
          case 'TRIPLE':
            temp.location = '三定位'
            break
          default:
            console.log('大小单双定位错误', position)
        }

        temp.odd = 1.95
        temp.isActive = !temp.isActive
        temp.pos = this.itemType
        if (!temp.isActive) delete temp.pos

        this.$emit('click', temp)
      }
    }
  }
</script>

<style lang="less" scoped>
  .ratio {
    ul {
      display: flex;
      margin: 0 0.15rem;
      text-align: center;
      li {
        flex: 1;
        height: 0.4rem;
        line-height: 0.4rem;
        border: 0.02rem solid #ccc;
        border-radius: 0.1rem;
        font-size: 0.16rem;
        background: #eee;
      }
      .active {
        color: #fff;
        background: #dd6f44;
      }
    }
  }
</style>
