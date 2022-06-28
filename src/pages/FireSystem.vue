<template>
  <div>
    <iframe
      id="iframeId"
      src="http://192.168.10.9:5001/"
      frameborder="0"
      class="pc iframe"
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

<style>
</style>