<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @click="updateChecked(cart,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handlerNumber('minus',cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt"
                   @change="handlerNumber('change',cart)">
            <a href="javascript:void(0)" class="plus" @click="handlerNumber('add',cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartBySkuId(cart.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isCheckedAll && cartList.length > 0" @click="checkedAll">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}.00</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import debounce from 'lodash/debounce'

export default {
  name: 'ShopCart',
  computed: {
    ...mapGetters('cart', ['cartList']),
    totalPrice() {
      let sum = 0
      this.cartList.forEach(item => {
        if (item.isChecked == 1)
          sum += item.skuNum * item.skuPrice
      })
      return sum
    },
    isCheckedAll() {
      return this.cartList.every(item => item.isChecked === 1)
    }
  },
  methods: {
    getData() {
      this.$store.dispatch('cart/getCartList')
    },
    handlerNumber: debounce(async function (type, cart) {
      let disNum = 0
      switch (type) {
        case 'add':
          disNum = 1
          break
        case 'minus':
          disNum = cart.skuNum > 1 ? -1 : 0
          break
        case 'change':
          disNum = isNaN(event.target.value) ? 0 : Math.abs(parseInt(event.target.value)) - cart.skuNum
          break
      }
      try {
        await this.$store.dispatch('detail/updateCart', {skuId: cart.skuId, skuNum: disNum})
        this.getData()
      } catch (e) {
      }
    }, 500),
    /*async handlerNumber(type, cart) {
      let disNum = 0
      switch (type) {
        case 'add':
          disNum = 1
          break
        case 'minus':
          disNum = cart.skuNum > 1 ? -1 : 0
          break
        case 'change':
          disNum = isNaN(event.target.value) ? 0 : Math.abs(parseInt(event.target.value)) - cart.skuNum
          break
      }
      try {
        await this.$store.dispatch('detail/updateCart', { skuId: cart.skuId, skuNum: disNum })
        this.getData()
      } catch (e) {
      }
    }*/
    async deleteCartBySkuId(skuId) {
      try {
        await this.$store.dispatch('cart/deleteGood', skuId)
        this.getData()
      } catch (e) {
      }
    },
    async updateChecked(cart, event) {
      try {
        await this.$store.dispatch('cart/updateCheckCart', {
          skuId: cart.skuId,
          isChecked: event.target.checked ? '1' : '0'
        })
        this.getData()
      } catch (e) {
      }
    },
    async deleteChecked() {
      try {
        await this.$store.dispatch('cart/deleteChecked')
        this.getData()
      } catch (e) {
      }
    },
    async checkedAll(event) {
      const isChecked = event.target.checked ? 1 : 0
      try {
        await this.$store.dispatch('cart/checkedAll', isChecked)
        this.getData()
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.getData()
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;

        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
