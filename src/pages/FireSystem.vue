<template>
  <div class="body">
    <iframe
      id="iframeId"
      src="http://192.168.10.9:5001/"
      frameborder="0"
      scrolling="auto"
      @load="loadfrom"
    >
    </iframe>
  </div>
</template>

<script>
export default {
  name: "fireSystem",
};
</script>

<style scoped>
.bod {
  margin-left: -21px;
  margin-right: -20px;
  margin-bottom: -100px;
}
</style>