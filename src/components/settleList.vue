<template>
  <div class="settle-list">
    <ul>
      <li class="eachBet" v-for="(item,index) in summaryArr" :key="index">
        <div class="header-wrapper">
          <span class="title">上海(2018032704)</span>
          <span class="delete" @click="deleteForItem(index)">
            <i class="iconfont icon-garbage"></i>
          </span>
        </div>
        <div class="content-item">
          <div class="item">
            <span>{{item.pos}}</span>
            <span>| {{item.location}}</span>
            <span>: {{item.title}}</span>
            <span class="sign">@</span>
            <span class="bet-color">{{item.odd}}</span>
          </div>
          <div class="betting">
            <div class="bet-money">投注额</div>
            <input class="input-odds" placeholder="10-5,000" readonly v-model="moneyBetArr[index]"
                   @click="toggleInput(index)">
            <span class="text">可赢额 : {{(item.odd * (moneyBetArr[index] || 0)).toFixed(2) || '0.00'}}</span>
            <div class="selectMoney" v-show="selectedIndex === index">
              <calculate-block @click="getMoneyByClick($event, index)"
                               @delete="deleteBetByClick($event, index)"></calculate-block>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="input-single">
      <div class="text">单式 :</div>
      <div class="number">X {{this.summaryArr.length}}</div>
      <label>
        <input class="input-odds" type="number" placeholder="请选择金额" v-model="setEachMoney"
               @click="toggleInput">
        <div class="selectMoney2" v-show="selectedIndex">
          <calculate-block @click="getMoneyByTotal($event, selectedIndex)"
                           @delete="deleteBetByTotal($event, selectedIndex)"></calculate-block>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
  import calculateBlock from '../components/calculateBlock.vue'

  export default {
    name: "settle-list",
    props: {
      summaryArr: {
        type: Array
      },
      classNote: {
        type: Boolean,
        default: false
      },
      respMessage: {
        type: Boolean,
        default: false
      }
    },

    created() {
      this.summaryArr.forEach(item => {
        this.moneyBetArr.push('')
      })
    },

    data() {
      return {
        selectedIndex: 0,
        moneyBetArr: [],
        setEachMoney: ''
      }
    },

    methods: {
      // 计算金额组件，内部接口
      // 子项添加
      _calByIndex(sum, index) {
        this.$set(this.moneyBetArr, index, sum)
        this.summaryArr.forEach((item, i) => {
          if (i === index) {
            item.money = sum
          }
        })
      },

      // 点击下方给子项数据，内部接口
      _calByIndexTotal(sum, index) {
        this.$set(this.moneyBetArr, index, sum)
        this.summaryArr.forEach(item => {
          item.money = sum
          this.setEachMoney = sum
        })
      },

      // 计算金额组件
      getMoneyByClick(sum, index) {
        this._calByIndex(sum, index)
      },

      deleteBetByClick(sum, index) {
        this._calByIndex(sum, index)
      },

      getMoneyByTotal(sum, index) {
        this._calByIndexTotal(sum, index)
      },

      deleteBetByTotal(sum, index) {
        this._calByIndexTotal(sum, index)
      },


      // 删除单个已选的下注；
      deleteForItem(index) {
        this.summaryArr[index].isActive = false;
        this.summaryArr.splice(index, 1);
        if (this.summaryArr.length === 0) {
          console.log(213);
          this.setEachMoney = ''
          this.$emit('changeColor', this.classNote)
        }
      },

      // 投注额 toggle 操作
      toggleInput(index) {
        this.selectedIndex = index
      }
    },
    components: {
      calculateBlock
    },

    watch: {
      setEachMoney(val) {
        this.moneyBetArr = []
        this.summaryArr.forEach(item => {
          item.money = val
          this.moneyBetArr.push(val)
        })
      },

      respMessage() {
        this.moneyBetArr = []
        this.setEachMoney = ''
      },

      summaryArr(val) {
        if (val.length === 0) this.setEachMoney = ''
      }
    }


  }
</script>

<style lang="less" scoped>
  .settle-list {
    .eachBet {
      .header-wrapper {
        position: relative;
        color: #fff;
        background: #333;
        height: 0.4rem;
        .title {
          font-size: 0.16rem;
          line-height: 0.4rem;
          margin-left: 0.05rem;
        }
        .delete {
          position: absolute;
          display: flex;
          top: 0;
          right: 0;
          background: #222;
          width: 0.4rem;
          height: 0.4rem;
          justify-content: center;
          align-items: center;
          .icon-garbage {
            font-size: 0.2rem;
            color: #fff;
          }
        }

      }
      .content-item {
        position: relative;
        background: #fff;
        color: #000;
        padding-bottom: 0.05rem;
        .item {
          font-size: 0;
          span {
            display: inline-block;
            font-size: 0.15rem;
            margin: 0.05rem;
          }
          .sign {
            margin: 0.05rem -0.05rem 0.05rem 0.05rem;
          }
          .bet-color {
            color: #ff9b3b;
          }
        }
        .betting {
          font-size: 0;
          .bet-money {
            display: inline-block;
            font-size: 0.15rem;
            margin: 0 0.05rem;
          }

          .input-odds {
            display: inline-block;
            font-size: 0.15rem;
            width: 1rem;
            height: 0.25rem;
            padding: 0 0.06rem;
            outline: medium;
            border: 0.01rem solid #ccc;
            border-radius: 0.05rem;
            text-align: right;
          }
          .text {
            display: inline-block;
            font-size: 0.15rem;
            margin-left: 0.15rem;
          }
          .selectMoney {
            width: 100%;
            font-size: 0;
            background: #ddd;
            margin-top: 0.05rem;
            padding-top: 0.03rem;
          }
        }
      }
    }

    .input-single {
      position: relative;
      min-height: 0.4rem;
      color: #fff;
      font-size: 0;
      padding-bottom: 0.05rem;
      .text {
        display: inline-block;
        top: 50%;
        margin: 0.25rem 0.45rem 0 0.05rem;
        transform: translateY(-50%);
        font-size: 0.15rem;
      }
      .number {
        position: relative;
        top: 50%;
        left: 20%;
        transform: translate(-50%, -50%);
        display: inline-block;
        font-size: 0.15rem;
      }
      .input-odds {
        display: inline-block;
        position: absolute;
        width: 1.35rem;
        height: 0.32rem;
        margin-top: 0.1rem;
        font-size: 0.15rem;
        padding: 0 0.06rem;
        right: 0.1rem;
        outline: medium;
        border: none;
        border-radius: 0.05rem;
        text-align: right;
      }
      .selectMoney2 {
        width: 100%;
        height: 0.45rem;
        background: #ddd;
        margin-top: 0.05rem;
        padding-top: 0.03rem;
      }
    }
  }

</style>
