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
        this.$router.push('/login');
      });
    },
    methods: {}
  };
</script>
<style lang="less" type="text/less">
</style>
