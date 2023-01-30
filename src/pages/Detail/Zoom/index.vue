<template>
  <div class="spec-preview">
    <img :src="imageUrl ? imageUrl : skuDefaultImg" />
    <div class="event" @mousemove="maskMove"></div>
    <div class="big">
      <img :src="imageUrl ? imageUrl : skuDefaultImg" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
export default {
  name: "Zoom",
  props: ["skuDefaultImg"],
  data() {
    return {
      imageUrl: "",
    };
  },
  methods: {
    maskMove: throttle(function (e) {
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      // div.event相当于罩了一层透明层在图片上
      // e.offsetX,Y 代表鼠标在整个透明层内坐标，离 左/上 距离越近，值越小，左上角为0,0
      // left/top 为遮罩层坐标，因为起始点在左上角，需要减去宽度一半的坐标值（相当于将遮罩层往左上移动）
      // 当遮罩层移动时，大图移动方向相反
      let left = e.offsetX - mask.offsetWidth / 2;
      let top = e.offsetY - mask.offsetHeight / 2;
      if (left <= 0) {
        left = 0;
      }
      if (top <= 0) {
        top = 0;
      }
      if (left >= mask.offsetWidth) {
        left = mask.offsetWidth;
      }
      if (top >= mask.offsetHeight) {
        top = mask.offsetHeight;
      }
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    }, 100),
  },
  mounted() {
    this.$bus.$on("changeImage", (imageUrl) => {
      this.imageUrl = imageUrl;
    });
  },
  beforeDestroy() {
    this.$bus.$off("changeImage", () => {
      console.log("changeImage event unbound from $bus");
    });
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(245, 80, 80, 0.296);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>