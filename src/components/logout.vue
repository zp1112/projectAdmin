<template>
  <div>
  </div>
</template>
<script type="text/babel">
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {};
    },
    mounted() {
      this.$api.logout.request().then(() => {
        window.location.href = `/login?backup=${this.$route.query.backup}`;
      });
    },
    methods: {}
  };
</script>
<style lang="less" type="text/less">
</style>
