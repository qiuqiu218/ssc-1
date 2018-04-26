<template>
  <div class="calculate-block">
    <div class="block">
      <ul>
        <li v-for="(data,index) in blocks" :key="index" @click="onSelectBlock(index)">+{{data}}</li>
      </ul>
    </div>
    <!-- 计算模块暂时去掉 -->
    <!--<div class="calculate">-->
    <!--<ul>-->
    <!--<li v-for="(item,i) in calculates" :key="i" @click="onCalculate(i)">{{item}}</li>-->
    <!--</ul>-->
    <!--</div>-->
    <div class="deleteNum" @click="deleteBetMoney()">X</div>
  </div>
</template>

<script>
  export default {
    name: "calculate-block",
    data() {
      return {
        blocks: [10, 20, 50, 100, 200],
        // calculates: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        temparr: [],              //  投注额缓存数组
        sum: ''
      }
    },

    methods: {
      // 投注额可选区块
      onSelectBlock(index) {
        this.blocks.forEach((item, i) => {
          if (i === index) {
            this.temparr.push(item);
          }
        });
        this.sum = this.temparr.reduce((pre, cur) => {
          return pre + cur
        })

        this.$emit('click', this.sum)
      },

      // 投注额计算区域
      // onCalculate(index) {
      //   this.calculates.forEach((item, i) => {
      //     if (i === index) {
      //       this.temparr.push(item)
      //     }
      //   })
      //   this.moneybet = this.temparr.reduce((pre, cur) => {
      //     if (pre === 0) this.moneybet = 0
      //     console.log(pre, cur);
      //     let sum = pre.toString() + cur.toString()
      //     return Number(sum)
      //   })
      // },

      // 投注额删除按钮
      deleteBetMoney() {
        let str = this.sum.toString();
        this.sum = str.substring(0, str.length - 1);
        this.temparr = [];
        this.temparr.push(Number(this.sum))
        this.$emit('delete', Number(this.sum))
      }
      ,
    },
  }
</script>

<style lang="less" scoped>
  .calculate-block {
    .block {
      margin: 0.03rem 0.4rem 0.03rem -0.1rem;
      text-align: center;
      font-size: 0;
      padding-bottom: 0.05rem;
      li {
        display: inline-block;
        font-size: 0.16rem;
        width: 0.45rem;
        height: 0.3rem;
        line-height: 0.3rem;
        border-radius: 0.05rem;
        border: 0.02rem solid #666;
        margin: 0 0.05rem;
        color: #dd6f44;
        background: #eee;
      }
    }
    //.calculate{
    //  text-align: center;
    //  overflow: hidden;
    //  margin:0  0.35rem 0 0.17rem;
    //  li{
    //    float: left;
    //    font-size: 0.15rem;
    //    width: 0.45rem;
    //    height: 0.2rem;
    //    line-height: 0.2rem;
    //    margin: 0.02rem;
    //    color: #fff;
    //    border: 0.02rem solid #666;
    //    border-radius: 0.05rem;
    //    background: #666;
    //  }
    //}
    .deleteNum {
      position: absolute;
      float: right;
      width: 0.45rem;
      height: 0.3rem;
      line-height: 0.3rem;
      margin-bottom: 0.05rem;
      bottom: 0.08rem;
      right: 0.05rem;
      font-size: 0.2rem;
      text-align: center;
      color: #222;
      border: 0.02rem solid #666;
      border-radius: 0.05rem;
      background: #ddd;
    }
  }


</style>
