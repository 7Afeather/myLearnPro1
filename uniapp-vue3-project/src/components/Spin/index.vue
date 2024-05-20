<template>
  <div class="loading4">
    <div class="three1"></div>
    <div class="three2"></div>
    <div class="three3"></div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.loading4 {
}
.loading4 > div {
  width: 10px;
  height: 10px;
  border-radius: 100%;
  display: inline-block;
  background-color: $primary-color;
  -webkit-animation: three 1.4s infinite ease-in-out;
  animation: three 1.4s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.loading4 .three1 {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
.loading4 .three2 {
  -webkit-animation-delay: -0.15s;
  animation-delay: -0.15s;
}
@-webkit-keyframes three {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}
@keyframes three {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}
</style>
