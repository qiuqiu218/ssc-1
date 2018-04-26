<template>
  <div class="shishicai">
    <div class="header">
      <img class="back" src="../common/imgs/back.png" alt="返回" @click="returnIndex">
      <span class="text" @click="">下注结果</span>
    </div>
    <div class="g-content-wrapper">
      <div class="number-wrapper">
        <div class="bet-number">受注期号
          <span class="number">2018072</span>
        </div>
        <div class="next-bet">下一期
          <!-- 倒计时 -->
          <span class="time number">{{timeDown || '00:00'}} </span>
        </div>
      </div>

      <!-- 点击提交注单 弹出浮层 -->
      <div class="note-wrapper" :class="{noteVal: classNote}" @click="sendRequest">
        <span class="text" :class="{classColor: classColor}">
          注单 {{ this.summaryArr.length > 0 ? this.summaryArr.length : '' }}
        </span>
      </div>

      <transition name="fade">
        <div class="detail" v-show="detailShow">
          <div class="detail-wrapper">
            <div class="blank"></div>
            <div class="header-hook">
              <i class="iconfont icon-garbage" @click="deleteAll"></i>
              <span class="text">注单 {{this.summaryArr.length}}</span>
              <i class="iconfont icon-error" @click="closeLayer"></i>
            </div>

            <div class="content">
              <!-- vue 的组件的 props 属性支持驼峰命名, 不支持连接线命名, 使用是用连接线进行赋值或者数据绑定! -->
              <!-- 结算列表组件 -->
              <settle-list
                :summaryArr="summaryArr"
                :itemPos="itemPos"
                :respMessage="responseMessage"
                :classNote="classNote"
                @changeColor="classNote=false"
              ></settle-list>

              <div class="total">
                <div class="total-text">总计 {{this.summaryArr.length}}</div>
                <div class="bet">
                  <span class="text">下注:</span>
                  <div class="money">
                    <span class="num">{{getMoneyBet || '0.00'}}</span>
                    <span class="rmb">RMB</span>
                  </div>
                </div>
                <div class="win">
                  <span class="text">总计可赢额:</span>
                  <div class="money">
                    <span class="num">{{getMoneyWin || '0.00'}}</span>
                    <span class="rmb">RMB</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer" @click="betSubmit">
              <span class="text">下注</span>
            </div>
          </div>
        </div>
      </transition>

      <div class="main-wrapper">
        <div class="position">
          <ul>
            <li v-for="(item,index) in totalTagsArr" @click="initSwitch(`content${index+1}`)">{{item}}</li>
          </ul>
        </div>
      </div>

      <div class="border-wrapper">
        <!-- 蓝色的选框 -->
        <frames
          :numberArr="numberArr"
          :content="content"
          @click="switchTag"
        ></frames>
      </div>

      <div class="content">
        <!-- 一定位 -->
        <div id="content1" class="hide">
          <div class="tab1" ref="tab1">
            <number @click="clickNum"
                    :content="content"
                    :class="{number : true}"
                    :item-type="itemType"
                    :numberTagArr="numberTagArr">
            </number>
            <ratio @click="clickNum" :item-type="itemType" :ratioArr="ratioArr"></ratio>
          </div>
          <div class="tab2 hide" ref="tab2">
            <number @click="clickNum"
                    :content="content"
                    :class="{number : true}"
                    :item-type="itemType"
                    :numberTagArr="numberTagArr">
            </number>
            <ratio @click="clickNum" :item-type="itemType" :ratioArr="ratioArr"></ratio>
          </div>
          <div class="tab3 hide" ref="tab3">
            <number @click="clickNum"
                    :content="content"
                    :class="{number : true}"
                    :item-type="itemType"
                    :numberTagArr="numberTagArr">
            </number>
            <ratio @click="clickNum" :item-type="itemType" :ratioArr="ratioArr"></ratio>
          </div>
        </div>

        <!-- 二定位 -->
        <div id="content2" class="hide">
          <div class="content-bai" ref="baishi">
            <div class="num-wrapper">
              <div class="text hundred"><span>百</span></div>
              <number @click="clickNum"
                      :content="content"
                      :class="{numberSmall : true}"
                      :item-type="itemType"
                      :numberTagArr="numberTagArr">
              </number>
            </div>
            <div class="num-wrapper">
              <div class="text ten"><span>十</span></div>
              <number @click="clickNum"
                      :content="content"
                      :class="{numberSmall : true}"
                      :item-type="itemType"
                      :numberTagArr="numberTagArr">
              </number>
            </div>
            <countBet
              :disabled="join"
              :sumTempArr="sumTempArr"
              :countLength="countLength"
              @join="joinSum"
              @clear="clearSum"
            ></countBet>

            <div class="hewei">
              <span>和尾</span>
              <i></i>
              <ratio class="rat" @click="clickNum" :item-type="itemType" :ratioArr="ratioArr"></ratio>
            </div>
          </div>


          <div class="content-ten hide" ref="baige">
            <div class="num-wrapper">
              <div class="text hundred"><span>百</span></div>
              <number @click="clickNum"
                      :content="content"
                      :class="{numberSmall : true}"
                      :item-type="itemType"
                      :numberTagArr="numberTagArr">
              </number>
            </div>
            <div class="num-wrapper">
              <div class="text one"><span>个</span></div>
              <number @click="clickNum"
                      :content="content"
                      :class="{numberSmall : true}"
                      :item-type="itemType"
                      :numberTagArr="numberTagArr">
              </number>
            </div>
            <countBet
              :disabled="join"
              :sumTempArr="sumTempArr"
              :countLength="countLength"
              @join="joinSum"
              @clear="clearSum"
            ></countBet>

            <div class="hewei">
              <span>和尾</span>
              <i></i>
              <ratio class="rat" @click="clickNum" :item-type="itemType" :ratioArr="ratioArr"></ratio>
            </div>
          </div>

          <div class="content-ge hide" ref="shige">
            <div class="num-wrapper">
              <div class="text ten"><span>十</span></div>
              <number @click="clickNum"
                      :content="content"
                      :class="{numberSmall : true}"
                      :item-type="itemType"
                      :numberTagArr="numberTagArr">
              </number>
            </div>
            <div class="num-wrapper">
              <div class="text one"><span>个</span></div>
              <number @click="clickNum"
                      :content="content"
                      :class="{numberSmall : true}"
                      :item-type="itemType"
                      :numberTagArr="numberTagArr">
              </number>
            </div>
            <countBet
              :disabled="join"
              :sumTempArr="sumTempArr"
              :countLength="countLength"
              @join="joinSum"
              @clear="clearSum"
            ></countBet>

            <div class="hewei">
              <span>和尾</span>
              <i></i>
              <ratio class="rat" @click="clickNum" :item-type="itemType" :ratioArr="ratioArr"></ratio>
            </div>
          </div>

        </div>

        <!-- 三定位 -->
        <div id="content3">
          <div class="num-wrapper">
            <div class="text"><span>百</span></div>
            <number @click="clickNum"
                    :content="content"
                    :class="{numberSmall : true}"
                    :item-type="itemType"
                    :numberTagArr="numberTagArr">
            </number>
          </div>
          <div class="num-wrapper">
            <div class="text ten"><span>十</span></div>
            <number @click="clickNum"
                    :content="content"
                    :class="{numberSmall : true}"
                    :item-type="itemType"
                    :numberTagArr="numberTagArr">
            </number>
          </div>
          <div class="num-wrapper">
            <div class="text one"><span>个</span></div>
            <number @click="clickNum"
                    :content="content"
                    :class="{numberSmall : true}"
                    :item-type="itemType"
                    :numberTagArr="numberTagArr">
            </number>
          </div>

          <countBet
            :disabled="join"
            :sumTempArr="sumTempArr"
            :countLength="countLength"
            @join="joinSum"
            @clear="clearSum"
          ></countBet>

          <div class="hewei">
            <span>和尾</span>
            <i></i>
            <ratio class="rat" @click="clickNum" :item-type="itemType" :ratioArr="ratioArr"></ratio>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import frames from '../components/frames'
  import number from '../components/number'
  import ratio from '../components/ratio'
  import countBet from '../components/countBet'
  import settleList from '../components/settleList'
  import moment from 'moment'

  export default {
    name: 'shishicai',
    data() {
      return {
        totalTagsArr: ['一定位', '二定位', '三定位'],
        timeDown: '',         // 倒计时
        timeFlag: false,        // 倒计时是否暂停
        goRoomFirstTime: '',    // 用户首次进入房间时间
        leftTime: 0,            // 从接口获取倒计时
        timeout: 0,             // 清除倒计时
        classNote: false,     // 注单是否添加类
        classColor: false,    // 注单文字是否添加类
        summaryArr: [],       // 最后下注的总数据
        numberArr: [],        // 蓝色选框中的二级菜单
        content: '',            // 定位百十个
        detailShow: false,      // 下注浮层默认隐藏
        itemPos: '',            // 注单列表里的定位 pos
        itemType: 0,            // 注单列表里的定位 pos
        join: false,            // 加入按钮状态
        ratioArr: [],           // 大小单双标签
        tempArr: [],            // 二三定位的小数字盘数组
        countLength: 0,         // 默认注单总数长度
        sumTempArr: [],         // 通过点击事件加入 summaryArr
        numberTagArr: [],       // 数字标签
        responseMessage: false, // 点击button后响应子组件发送消息
      }
    },

    // mounted 阶段初始化
    mounted() {
      this.initSwitch('content1')
    },

    created() {
      // 显示用户进入池子初始时间
      this.goRoomFirstTime = moment().format('YYYY-MM-DD')
      this.getCountDown()
    },

    computed: {
      // 总投注额
      // 暂时不写
      getMoneyBet() {
        // let moneyCount = this.moneybet
        // console.log(moneyCount)
        // return moneyCount++
        // return '0.00'
      },

      // 总计可赢额
      getMoneyWin() {
      },
    },

    methods: {
      // 加入按钮
      joinSum(count, arr) {
        this.summaryArr = this.summaryArr.concat(arr)
        this.join = false
        this._clearArrStatus(this.tempArr)
        this.tempArr = []
        this.sumTempArr = []
      },

      // 清除按钮
      clearSum() {
        this.join = false
        this.sumTempArr = []
        this._clearArrStatus(this.tempArr)
        this.tempArr = []
      },

      // 加入和清除的公用部分
      _clearArrStatus(arr) {
        arr.forEach(item => {
          item.isActive = false
        })
      },

      // 返回首页
      returnIndex() {
        this.$router.push('/')
      },

      // 判断进入的房间并获取倒计时
      getCountDown() {
//        ssc.API_getActivePools()
//          .then(res => {
        // 这里应该有个房间列表，先判断去哪个房间，暂时没有写
        // let str = res.data.data[0].pool_id
//         localStorage.setItem('pool_id', 'd8a0ac90-29b8-11e8-bfa7-f1659ee6cf7c')
//         let pool_update_interval = res.data.data[0].pool_update_interval / 1000
//         let pool_update_interval = res.data.data[0].pool_update_interval / 1000
//         localStorage.setItem('pool_update_interval', pool_update_interval)
//
//         let now = new Date().getTime()
//         let nextUpdate = res.data.data[0].pool_next_update
//         let nextTime = moment(nextUpdate).format('X') * 1000

//         this.leftTime = (nextTime - now) / 1000

        // 实际上首次进入房间和退出房间后再进入的时间是从接口获取一次的，不像现在这样是写死的
        // 如果玩家一直在当前房间，则不需要重复请求接口
        this.leftTime = 30
        this.getInterval()
//            }
//          )
//          .catch(err => {
//            console.log(err)
//          })
      },

      // 倒计时轮询
      getInterval() {
        if (this.leftTime < 1) {
          this.leftTime = Number(localStorage.getItem('pool_update_interval'))
        }

        this.timeFlag = false
        this.timeout = setInterval(() => {
          if (this.timeFlag === true) {
            clearInterval(this.timeout)
          } else this.countdown()
        }, 1000)
      },

      // 倒计时核心逻辑
      countdown() {
        let hours = this.formatTime(parseInt(this.leftTime / (60 * 60) % 24))
        let minutes = this.formatTime(parseInt(this.leftTime / 60 % 60))
        let seconds = this.formatTime(parseInt(this.leftTime % 60))
        if (hours > 0) minutes = hours * 60 + minutes

        this.leftTime = this.leftTime - 1

        if (this.leftTime <= 0) {
          clearInterval(this.timeout)
          this.timeFlag = true
          this.getInterval()
//          let startTime = this.goRoomFirstTime
//          let endTime = moment().format("YYYY-MM-DD")
//          let startIndex = 0
          let count = localStorage.getItem('summaryArr')
          if (count <= 0) {
//            this.show = false
            clearInterval(this.timeout)
            this.getInterval()
            return
          }
//          ssc.API_getBetRecords(startTime, endTime, startIndex, count)
//            .then(res => {
//          console.log(res.data.data)
          localStorage.removeItem('summaryArr')
//          this.show = true
          clearInterval(this.timeout)
          this.getInterval()
//          res.data.data.forEach(item => {
//              this.getBetResults.push(item.result)
//           })
//           let sum = this.getBetResults.reduce((a, b) => a + b)
//           console.log(sum)
//           if (sum > 0) this.getBetResults = `恭喜您中了${sum}元！`
//           else if (sum <= 0) this.getBetResults = `很遗憾中您没有中奖！`
//           else this.getBetResults = `系统异常，请联系管理员！`
//            })
//            .catch(err => {
//              console.log(err)
//            })
        }
        this.timeDown = `${minutes}:${seconds}`
      },

      // 格式化时间
      formatTime(time) {
        if (time >= 10) return time
        else return `0${time}`
      },

      // 删除 下注的属性
      _delete(item) {
        delete item.isActive
        delete item.title
        delete item.pos
        delete item.sidePos
        delete item.location
        this._getBetByUser(item)
      },

      // 显示下注遮罩层，并给每一注添加 tag 和 odd 字段
      sendRequest() {
        this._convertTag()
        this.detailShow = true
      },

      // 从 descartes 函数中抽离
      _createObjByArr(arr1, arr2, arr3, res) {
        if (this.content === 'content2') {
          arr1.forEach(i => {
            arr2.forEach(j => {
              if (i.sidePos !== j.sidePos) {
                let item = {
                  isActive: true,
                  tag: 'DOUBLE_POS_EQ',
                  location: i.location,
                  odd: i.odd,
                  money: 0,
                  title: Number(`${i.title}${j.title}`),
                  pos: `${i.pos}${j.pos}`,
                  value: JSON.stringify(`{"bet": [{"pos": ${i.pos}, "val": ${i.title}}, {"pos": ${j.pos}, "val": ${j.title}}]}`),
                }
                res.push(item)
              }
            })
          })
        }
        if (this.content === 'content3') {
          arr1.forEach(i => {
            arr2.forEach(j => {
              arr3.forEach(m => {
                if (i.sidePos !== j.sidePos !== m.sidePos) {
                  let item = {
                    isActive: true,
                    tag: 'TRIPLE_POS_EQ',
                    location: i.location,
                    odd: i.odd,
                    money: 0,
                    title: Number(`${i.title}${j.title}${m.title}`),
                    pos: `${i.pos}${j.pos}${m.pos}`,
                    value: JSON.stringify(`{"bet": [{"pos": ${i.pos}, "val": ${i.title}}, {"pos": ${j.pos}, "val": ${j.title}}]}, {"pos": ${m.pos}, "val": ${m.title}}]}`),
                  }
                  res.push(item)
                }
              })
            })
          })
        }
      },

      // 二定位格式化数据
      _descartes() {
        let baiArr = [], tenArr = [], oneArr = [], res = []

        this.tempArr.forEach(item => {
          if (item.sidePos === '百') {
            item.pos = 0
            baiArr.push(item)
          }
          if (item.sidePos === '十') {
            item.pos = 1
            tenArr.push(item)
          }
          if (item.sidePos === '个') {
            item.pos = 2
            oneArr.push(item)
          }
        })

        if (this.content === 'content2') {
          if (this.itemType === 0) {
            this._createObjByArr(baiArr, tenArr, null, res)
          }
          if (this.itemType === 1) {
            this._createObjByArr(baiArr, oneArr, null, res)
          }
          if (this.itemType === 2) {
            this._createObjByArr(tenArr, oneArr, null, res)
          }

          this.sumTempArr = Array.from(new Set(res))
          this.countLength = this.sumTempArr.length
        }

        if (this.content === 'content3') {
          this._createObjByArr(baiArr, tenArr, oneArr, res)
          this.sumTempArr = Array.from(new Set(res))
          this.countLength = this.sumTempArr.length
        }
      },

      // 抽离 clickNum 函数公共部分
      _clickByOne(tagItem) {
        if (tagItem.isActive === true) {
          this.summaryArr.push(tagItem)
        } else {
          this.summaryArr.pop()
        }
        this._convertTag()
      },

      // 抽离 item.pos 转换的函数
      _convertTag() {
        this.summaryArr.forEach(item => {
          let arr = item.tag.split('_')[0]

          if (arr === 'SINGLE') {
            switch (item.pos) {
              case 0:
                item.pos = '百'
                break
              case 1:
                item.pos = '十'
                break
              case 2:
                item.pos = '个'
                break
            }
          }
          if (arr === 'DOUBLE') {
            switch (item.pos) {
              case 0:
                item.pos = '百十'
                break
              case 1:
                item.pos = '百个'
                break
              case 2:
                item.pos = '十个'
                break
              case '01':
                item.pos = '百十'
                break
              case '02':
                item.pos = '百个'
                break
              case '12':
                item.pos = '十个'
                break
            }
          }
          if (arr === 'TRIPLE') item.pos = '百十个'
        })
      },

      // 恢复初始状态
      _statusByBet() {
        this.join = false
        this.countLength = 0
      },

      // 小键盘入口函数 判断是否允许加入
      // this.tempArr => this.sumTempArr => this.summaryArr
      clickNum(tagItem) {
        if (this.content === 'content1') this._clickByOne(tagItem)
        if (this.content === 'content2') {
          if (tagItem.tag !== 'DOUBLE_POS_EQ') {
            this._clickByOne(tagItem)
          } else {
            this._addTempArr(tagItem)

            if (this.tempArr.length === 0) return
            if (this.tempArr.length <= 1) this._statusByBet()

            if (this.tempArr.length > 1) {
              let zero = this.tempArr[0].sidePos, temp = []
              // 加入是否为真
              for (let i = 1; i < this.tempArr.length; i++) {
                temp.push(this.tempArr[i].sidePos)
              }
              // 通过数组中第一项和其他项比较，如果存在不相等就为 true
              this.join = temp.some(item => item !== zero)
              this.join ? this._descartes() : this._statusByBet()
            }
          }
        }

        if (this.content === 'content3') {
          // 三定位
          if (tagItem.tag === 'TRIPLE_POS_EQ') {
            this._addTempArr(tagItem)

            if (this.tempArr.length === 0) return
            if (this.tempArr.length <= 2) this._statusByBet()

            if (this.tempArr.length > 2) {
              let temp = []
              // 加入是否为真
              for (let i = 0; i < this.tempArr.length; i++) {
                temp.push(this.tempArr[i].sidePos)
              }

              // 判断数据中不重复元素，可以使用 Set
              this.join = new Set(temp).size === 3

              this.join ? this._descartes() : this._statusByBet()
            }
          } else this._clickByOne(tagItem)
        }
      },

      // 需要选择多个数组组成一注的加入 tempArr 数组
      _addTempArr(tagItem) {
        if (tagItem.isActive) {
          this.tempArr.push(tagItem)
        } else {
          let index = this.tempArr.indexOf(tagItem)
          this.tempArr.splice(index, 1)
        }
      },

      // tag 内部抽离函数，做样式处理
      _changeStyle(a, b, c) {
        a.classList.remove('hide')
        b.classList.add('hide')
        c.classList.add('hide')
      },

      // 选择第一层定位
      initSwitch(content) {
        this.content = content
        for (let i = 1; i < 4; i++) {
          if ("content" + i === content) {
            document.getElementById(content).className = ""
          } else {
            document.getElementById("content" + i).className = "hide"
          }
          switch (content) {
            case 'content1':
              this.ratioArr = ['SINGLE_POS_GT', 'SINGLE_POS_LT', 'SINGLE_POS_OD', 'SINGLE_POS_EV']
              this.numberTagArr = ['SINGLE_POS_EQ', 'SINGLE_POS_EQ', 'SINGLE_POS_EQ', 'SINGLE_POS_EQ', 'SINGLE_POS_EQ',
                'SINGLE_POS_EQ', 'SINGLE_POS_EQ', 'SINGLE_POS_EQ', 'SINGLE_POS_EQ', 'SINGLE_POS_EQ']
              this.numberArr = ['百', '十', '个']
              break
            case 'content2':
              this.ratioArr = ['DOUBLE_POS_SUM_GT', 'DOUBLE_POS_SUM_LT', 'DOUBLE_POS_SUM_OD', 'DOUBLE_POS_SUM_EV']
              this.numberTagArr = ['DOUBLE_POS_EQ', 'DOUBLE_POS_EQ', 'DOUBLE_POS_EQ', 'DOUBLE_POS_EQ', 'DOUBLE_POS_EQ',
                'DOUBLE_POS_EQ', 'DOUBLE_POS_EQ', 'DOUBLE_POS_EQ', 'DOUBLE_POS_EQ', 'DOUBLE_POS_EQ']
              this.numberArr = ['百 十', '百 个', '十 个']
              break
            case 'content3':
              this.ratioArr = ['TRIPLE_POS_SUM_GT', 'TRIPLE_POS_SUM_LT', 'TRIPLE_POS_SUM_OD', 'TRIPLE_POS_SUM_EV']
              this.numberTagArr = ['TRIPLE_POS_EQ', 'TRIPLE_POS_EQ', 'TRIPLE_POS_EQ', 'TRIPLE_POS_EQ', 'TRIPLE_POS_EQ',
                'TRIPLE_POS_EQ', 'TRIPLE_POS_EQ', 'TRIPLE_POS_EQ', 'TRIPLE_POS_EQ', 'TRIPLE_POS_EQ']
              this.numberArr = ['百 十 个']
              break
            case 'content4':
              this.numberArr = ['和尾', '和值', '跨度', '一定位', '二定位', '三定位']
              break
            default:
              console.log('content error message')
          }
        }
      },

      // 选择第二层定位
      switchTag(type) {
        this.itemType = type
        this.countLength = 0
        let content = this.content

        let tab1 = this.$refs.tab1
        let tab2 = this.$refs.tab2
        let tab3 = this.$refs.tab3
        let baishi = this.$refs.baishi
        let shige = this.$refs.shige
        let baige = this.$refs.baige

        // 一定位
        if (type === 0 && content === 'content1') {
          this._changeStyle(tab1, tab2, tab3)
        }
        if (type === 1 && content === 'content1') {
          this._changeStyle(tab2, tab1, tab3)
        }
        if (type === 2 && content === 'content1') {
          this._changeStyle(tab3, tab1, tab2)
        }

        // 二定位
        if (type === 0 && content === 'content2') {
          this._changeStyle(baishi, shige, baige)
        }
        if (type === 1 && content === 'content2') {
          this._changeStyle(baige, shige, baishi)
        }
        if (type === 2 && content === 'content2') {
          this._changeStyle(shige, baishi, baige)
        }

        // 三定位不需要

        // 最后一栏 百十个
//        if (content === 'content4') this._forContent(type)
      },

      // 删除所有下注
      deleteAll() {
        this.summaryArr.forEach(item => {
          item.isActive = false
        })
        this.summaryArr = []

        this.tempArr.forEach(item => {
          item.isActive = false
        })
        this.tempArr = []

        this.classNote = false
      },

      // 关闭浮层
      closeLayer() {
        this.detailShow = false
      },

      // 点击提交注单
      betSubmit() {
        // 为了不影响原数组，这里使用深拷贝复制数组，
        // 注意 JSON.parse(JSON.stringify(this.summaryArr)) 无法拷贝 undefined 和 function
        this.responseMessage = true
        let arr = JSON.parse(JSON.stringify(this.summaryArr))
        localStorage.setItem('summaryArr', arr.length)
        arr.forEach(item => {
          if (this.content === 'content1') {
            switch (item.pos) {
              case '百':
                item.pos = 0
                break
              case '十':
                item.pos = 1
                break
              case '个':
                item.pos = 2
                break
              default :
            }
            if (typeof item.title === "number") {
              item.value = JSON.stringify(`{"bet": {"pos": ${item.pos}, "val": ${item.title}}}`)
            } else {
              item.value = JSON.stringify(`{"bet": {"pos": ${item.pos}}}`)
            }

            this._delete(item)
          }

          if (this.content === 'content2') {
            switch (item.pos) {
              case '百十':
                item.pos = 0
                break
              case '百个':
                item.pos = 1
                break
              case '十个':
                item.pos = 2
                break
              default :
                console.log('this.bannerPos error')
            }

            if (typeof item.title !== "number") {
              switch (item.pos) {
                case 0:
                  item.value = JSON.stringify(`{"bet": {"pos": 0},{"pos": 1}}`)
                  break
                case 1:
                  item.value = JSON.stringify(`{"bet": {"pos": 0},{"pos": 2}}`)
                  break
                case 2:
                  item.value = JSON.stringify(`{"bet": {"pos": 1},{"pos": 2}}`)
                  break
                default:
                  console.log(`item.pos 不存在~`)
              }
            }
            this._delete(item)
          }
          if (this.content === 'content3') {
            item.pos = 0
            if (typeof item.title !== "number") {
              item.value = JSON.stringify(`{"bet": {"pos": 0},{"pos": 1},{"pos": 2}}`)
            }
            this._delete(item)
          }
        })

      },

      // 获取下注结果
      _getBetByUser(item) {
        console.log(item);
        this.deleteAll()
        this.closeLayer()
      },
    },

    watch: {
      // 注单数量状态管理, 通过 watch 观测更方便检测数据变动
      summaryArr(val) {
        if (val.length === 0) {
          this.classNote = false
          this.classColor = false
        } else {
          this.classNote = true
          this.classColor = true
        }
      }
    },

    components: {
      frames,
      number,
      ratio,
      settleList,
      countBet
    }
  }
</script>

<style lang="less" scoped>
  @import "../common/css/index";
</style>
