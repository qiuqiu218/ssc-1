<template>
  <div class="index">
    <div class="content-wrapper">
      <keep-alive>
        <ul>
          <li v-for="(item,index) in items" :key="index" @click="intoSSC(index)">
            <i>
              <img :src="images[index]"/>
            </i>
            <span class="text">{{item}}</span>
          </li>
        </ul>
      </keep-alive>
    </div>
  </div>
</template>
<script>
  export default {
    name: "app",
    data() {
      return {
        items: ['欢迎进入时时彩'],
        images: ['http://src.onlinedown.net/images/h_imges/wdj/1/logo/3947160187ff604e6310504f440e6022_256_256.png'],
        // tagsArr 为了方便将本地所有标签存储，实际需要调用接口数据
        tagsArr: [
          'SINGLE_POS_GT', 'SINGLE_POS_LT', 'SINGLE_POS_OD', 'SINGLE_POS_EV', 'SINGLE_POS_EQ',
          'DOUBLE_POS_SUM_GT', 'DOUBLE_POS_SUM_LT', 'DOUBLE_POS_SUM_OD', 'DOUBLE_POS_SUM_EV', 'DOUBLE_POS_EQ',
          'TRIPLE_POS_SUM_GT', 'TRIPLE_POS_SUM_LT', 'TRIPLE_POS_SUM_OD', 'TRIPLE_POS_SUM_EV', 'TRIPLE_POS_EQ'
        ]
      }
    },
    methods: {
      intoSSC(index) {
        if (this.items[index] === '欢迎进入时时彩') {
          // 写入 localStorage
          localStorage.setItem('tagsArr', this.tagsArr)
          this.$router.push({name: 'ssc'});
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .index {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .content-wrapper {
    li {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1rem;
      margin: 0.12rem;
      background: #60E0B2;
      border-bottom: 0.01rem solid #ddd;
      i {
        position: absolute;
        top: 0.05rem;
        left: 0.1rem;
        img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          margin-bottom: 0.15rem;
        }
      }
      .text {
        margin-left: 0.2rem;
        font-size: 0.16rem;
        font-weight: 700;
        color: #fff;
      }
    }

  }
</style>
