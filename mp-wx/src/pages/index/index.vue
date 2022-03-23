<template>
  <view class="content">
    <button open-type="getPhoneNumber" @getphonenumber="getphonenumber">
      登录
    </button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {},
  methods: {
    getphonenumber(data) {
      console.log("dataaaa", data);
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
