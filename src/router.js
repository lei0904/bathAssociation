import Vue from 'vue'
import Router from 'vue-router'

import Views from './components/Views.vue'
import Login from './components/Login/index.vue'
import Apply from './components/Apply/index.vue'
import Applying from './components/Apply/apply.vue'
import ApplyAudit from './components/Apply/audit.vue'
import ApplyReject from './components/Apply/reject.vue'
import Register from './components/Register/index.vue'
import Agreement from './components/Agreement/index.vue'
import PerfectInfo from './components/PerfectInfo/index.vue'
import SelectAddress from './components/SelectAddress/index.vue'
import ForgetPassword from './components/ForgetPassword/index.vue'
import OrderList from './components/OrderList/index.vue'
import Nav from './components/Nav/index.vue'
import GoodsDetail from './components/Goods/detail.vue'
import FirmOrder from './components/FirmOrder/index.vue'
import Cashier from './components/Cashier/index.vue'
import OrderSuccess from './components/Cashier/order_success.vue'
import PaySuccess from './components/Cashier/pay_success.vue'
import PayFailed from './components/Cashier/pay_failed.vue'
import MineAccount from './components/Mine/account.vue'
import Setting from './components/Setting/index.vue'
import Address from './components/Address/index.vue'
import AddAddress from './components/AddAddress/index.vue'
import EditAddress from './components/EditAddress/index.vue'
import Wallet from './components/Wallet/index.vue'
import WalletNote from './components/WalletNote/index.vue'
import Evaluate from './components/Evaluate/index.vue'
import EvaluateComplete from './components/Evaluate/evaluate.vue'
import Refund from './components/Refund/index.vue'
import RefundDetail from './components/Refund/refund_detail.vue'
import OrderDetail from './components/OrderList/detail.vue'
import Trace from './components/Trace/index.vue'
import Express from './components/Express/index.vue'
import StoreInfo from './components/StoreInfo/index.vue'
import StoreEvaluate from './components/StoreInfo/store_evaluate.vue'
import SerachResult from './components/SerachResult/index.vue'
import refundChannel from './components/Refund/refund_channel.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Views,
      meta: {
        title: 'e批小店'
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/apply',
      component: Apply,
      meta: {
        title: '登录成功'
      }
    },
    {
      path: '/applying',
      component: Applying,
      meta: {
        title: '申请'
      }
    },
    {
      path: '/apply_audit',
      component: ApplyAudit,
      meta: {
        title: '申请中'
      }
    },
    {
      path: '/apply_reject',
      component: ApplyReject,
      meta: {
        title: '审核被拒'
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        title: '用户注册'
      }
    },
    {
      path: '/agreement',
      component: Agreement,
      meta: {
        title: '服务条款'
      }
    },
    {
      path: '/forget_password',
      component: ForgetPassword,
      meta: {
        title: '忘记密码'
      }
    },
    {
      path: '/perfect_info',
      component: PerfectInfo,
      meta: {
        title: '完善信息'
      }
    },
    {
      path: '/select_address',
      component: SelectAddress,
      meta: {
        title: '选择地址'
      }
    },
    {
      path: '/mine_account',
      component: MineAccount,
      meta: {
        title: '账户管理'
      }
    },
    {
      path: '/order_list',
      component: OrderList,
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/nav',
      component: Nav,
      meta: {
        title: 'e批小店'
      }
    },
    {
      path: '/nav',
      component: Nav,
      meta: {
        title: 'e批小店'
      }
    },
    {
      path: '/goods_detail',
      component: GoodsDetail,
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/firm_order',
      component: FirmOrder,
      meta: {
        title: '确认订单'
      }
    },
    {
      path: '/cashier/:orderId/:orderNo',
      component: Cashier,
      meta: {
        title: '收银台'
      }
    },
    {
      path: '/order_success/:is_online_pay',
      component: OrderSuccess,
      meta: {
        title: '下单成功'
      }
    },
    {
      path: '/pay_success/:paid',
      component: PaySuccess,
      meta: {
        title: '支付成功'
      }
    },
    {
      path: '/pay_failed',
      component: PayFailed,
      meta: {
        title: '支付失败'
      }
    },
    {
      path: '/setting',
      component: Setting,
      meta: {
        title: '设置'
      }
    },
    {
      path: '/address/:from',
      component: Address,
      meta: {
        title: '收货地址'
      }
    },
    {
      path: '/add_address',
      component: AddAddress,
      meta: {
        title: '增加收货地址'
      }
    },
    {
      path: '/edit_address',
      name: 'edit_address',
      component: EditAddress,
      meta: {
        title: '编辑收货地址'
      }
    },
    {
      path: '/wallet',
      component: Wallet,
      meta: {
        title: '我的钱包'
      }
    },
    {
      path: '/walletnote',
      component: WalletNote,
      meta: {
        title: '钱包说明'
      }
    },
    {
      path: '/evaluate',
      component: Evaluate,
      meta: {
        title: '评价'
      }
    },
    {
      path: '/view_evaluation',
      component: EvaluateComplete,
      meta: {
        title: '评价'
      }
    },
    {
      path: '/refund',
      component: Refund,
      meta: {
        title: '减免退'
      }
    },
    {
      path: '/refund_detail',
      component: RefundDetail,
      meta: {
        title: '减免退详情'
      }
    },
    {
      path: '/order_detail',
      component: OrderDetail,
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/trace',
      component: Trace,
      meta: {
        title: '溯源信息'
      }
    },
    {
      path: '/express',
      component: Express,
      meta: {
        title: '订货追踪'
      }
    },
    {
      path: '/store_info',
      component: StoreInfo,
      meta: {
        title: '店铺信息'
      }
    },
    {
      path: '/store_evaluate',
      component: StoreEvaluate,
      meta: {
        title: '店铺评价'
      }
    },
    {
      path: '/serach-result',
      component: SerachResult,
      meta: {
        title: '搜索结果'
      }
    },
    {
      path: '/refund_channel',
      component: refundChannel,
      meta: {
        title: '退款渠道'
      }
    }
  ]
})
