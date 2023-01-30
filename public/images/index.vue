<template>
  <div>
    <!-- Thumbs -->
    <div class="swiper" id="detail-swiper-thumbs">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="imageList in skuImageList"
          :key="imageList.id"
          @click="changeImage(imageList.imgUrl)"
        >
          <img :src="imageList.imgUrl" />
        </div>
        <div class="swiper-slide" @click="changeImage('../images/s1.png')">
          <img src="../images/s1.png" />
        </div>
        <div class="swiper-slide" @click="changeImage('../images/s2.png')">
          <img src="../images/s2.png" />
        </div>
        <div class="swiper-slide" @click="changeImage('../images/s3.png')">
          <img src="../images/s3.png" />
        </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </div>
</template>

<script>
import Swiper, { Navigation } from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  methods: {
    initSwiper() {
      // 两个轮播图，swiper为缩率图，swiper2为大图展示
      let thumbsSwiper = new Swiper("#detail-swiper-thumbs", {
        modules: [Navigation],
        slidesPerView: 7,
        spaceBetween: 40,
        watchSlidesProgress: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    },
    changeImage(imageUrl) {
      this.$bus.$emit("changeImage", imageUrl);
    },
  },
  watch: {
    skuImageList: {
      handler(newValue, oldValue) {
        this.$nextTick(this.initSwiper);
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper {
  height: 56px;
  width: 402px;
  box-sizing: border-box;
  padding: 0 12px;
  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0px;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>