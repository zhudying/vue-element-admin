<template>
  <div class="upload_page">
    <div
      class="upload_img"
      @mouseover="enterImg"
      @mouseleave="leaveImg"
    >
      <div
        class="delIcon"
        v-if="delShow && fileData"
        @click="delImg"
      >
        <i class="el-icon-delete"></i>
      </div>
      <img
        :src="fileData"
        alt=""
      />
    </div>
    <div
      class="upload_content"
      v-if="!fileData"
    >

      <el-upload
        class="upload-demo"
        action="#"
        :http-request="changeImage"
        accept=".JPG,.jpg"
      >
        <el-button size="medium">上传</el-button>

      </el-upload>
      <div
        class="upload_tip"
        :class="tipShow ? 'error' : ''"
      >
        <i
          class="el-icon-error"
          v-if="tipShow"
        ></i>
        仅支持JPG格式 尺寸690 * 350 大小1M
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tipShow: false,
      fileData: "",
      delShow: false
    };
  },
  methods: {
    // 鼠标划入图片
    enterImg() {
      this.delShow = true;
    },
    // 鼠标移出图片
    leaveImg() {
      this.delShow = false;
    },
    // 删除图片
    delImg() {
      this.fileData = "";
      this.$emit("imageData", this.fileData);
    },
    // 上传图片
    changeImage(files) {
      let file = files.file;
      let _this = this;
      // 大小限制
      const is100k = file.size / 1024 / 1024 < 1; // 限制小于1M
      if (!is100k) {
        // _this.$message.error('大小不可超过1M')
        _this.tipShow = true;
        return;
      }
      // 尺寸限制
      const isSize = new Promise(function (resolve, reject) {
        let width = 690; // 限制图片尺寸为690X350
        let height = 350;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function () {
          let valid = img.width === width && img.height === height;
          valid ? resolve() : reject();
        };
        img.src = _URL.createObjectURL(file);
      }).then(
        () => {
          this.fileData = file;
          _this.$emit("imageData", this.fileData);
          return file;
        },
        () => {
          // _this.$message.error('图片尺寸限制为690 x 350')
          _this.tipShow = true;

          return Promise.reject();
        }
      );
      return isSize;
    }
  }
};
</script>

<style lang="scss" scoped>
.upload_tip {
  margin-top: 10px;
}
</style>
