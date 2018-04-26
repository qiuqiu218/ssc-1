<template>
  <div class="number" ref="numberPos">
    <ul>
      <li @click="clickNum(i)" v-for="(item,i) in items"
          :class="item.isActive === true ? 'active' : ''"
          :key="i">{{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "number",
    props: {
      content: {
        type: String
      },
      itemType: {
        type: Number
      },
      numberTagArr: {
        type: Array
      }
    },
    data() {
      return {
        items: [
          {
            title: 0,
            isActive: false
          },
          {
            title: 1,
            isActive: false
          },
          {
            title: 2,
            isActive: false
          },
          {
            title: 3,
            isActive: false
          },
          {
            title: 4,
            isActive: false
          },
          {
            title: 5,
            isActive: false
          },
          {
            title: 6,
            isActive: false
          },
          {
            title: 7,
            isActive: false
          },
          {
            title: 8,
            isActive: false
          },
          {
            title: 9,
            isActive: false
          },
        ],
        sidePos: ''
      }
    },
    methods: {
      clickNum(index) {
        if (this.content === 'content1') {
          let temp = this.items[index]
          temp.tag = this.numberTagArr[index]
          temp.location = '一定位'
          temp.odd = 9.5
          temp.isActive = !temp.isActive
          temp.pos = this.itemType
          if (!temp.isActive) delete temp.pos
          this.$emit('click', temp)
        } else {
          this.sidePos = this.$refs.numberPos.parentNode.firstChild.innerText
          let temp = this.items[index]
          temp.tag = this.numberTagArr[index]

          let position = temp.tag.split('_')[0]
          if (position === 'DOUBLE') {
            temp.location = '二定位'
            temp.odd = 95
          } else {
            temp.location = '三定位'
            temp.odd = 920
          }
          temp.sidePos = this.sidePos
          temp.isActive = !temp.isActive
          temp.pos = this.itemType
          if (!temp.isActive) delete temp.pos
          this.$emit('click', temp)
        }
      },
    },

  }
</script>

<style lang="less" scoped>
  .number {
    ul {
      display: inline-block;
      margin: 0 0.15rem;
      text-align: center;
      overflow: hidden;
      li {
        float: left;
        width: 0.65rem;
        height: 0.34rem;
        line-height: 0.34rem;
        vertical-align: middle;
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

  .numberSmall {
    ul {
      display: inline-block;
      margin-left: 0.65rem;
      text-align: center;
      overflow: hidden;
      li {
        float: left;
        width: 0.59rem;
        height: 0.4rem;
        box-sizing: border-box;
        line-height: 0.4rem;
        vertical-align: middle;
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
