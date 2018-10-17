<template>
  <section class="page-demo">
    <mt-cell :to="'/login'" is-link><div slot="title">登录</div></mt-cell>
    <mt-cell :to="'/applying'" is-link><div slot="title">申请</div></mt-cell>
    <mt-cell :to="'/apply_audit'" is-link><div slot="title">申请中</div></mt-cell>
    <mt-cell :to="'/apply_reject'" is-link><div slot="title">申请被拒</div></mt-cell>
    <mt-cell :to="'/pay_success'" is-link><div slot="title">支付成功</div></mt-cell>
    <mt-cell :to="'/pay_failed'" is-link><div slot="title">支付失败</div></mt-cell>
    <mt-cell :to="'/refund'" is-link><div slot="title">减免退</div></mt-cell>
  </section>
</template>

<script>
  export default {
    name: 'Views'
  }

</script>
