<template>
  <div class="body">
    <iframe
      id="iframeId"
      src="http://127.0.0.1:5001/"
      frameborder="0"
      scrolling="auto"
    >
    </iframe>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div class="showPhoto">
            <img src="../assets/camera.jpg" width="250px" />
            <img src="../assets/f1.jpg" width="524px" />
            <img src="../assets/f2.jpg" width="455px" />
          </div>
        </el-card>
        <el-card>
          <div class="distribution">
            <img src="../assets/map.jpg" width="1250px" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "fireSystem",
};
</script>

<style scoped>
.bod {
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: -100px;
}
#iframeId {
  height: 600px;
  width: 100%;
}
.distribution {
  display: flex;
  justify-content: center;
}
.showPhoto {
  display: flex;
  justify-content: space-around;
  /* margin-right: 5px; */
}
</style>