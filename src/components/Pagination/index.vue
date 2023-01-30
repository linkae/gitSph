<template>
  <div class="pagination">
    <!-- 上面部分 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-show="startAndEndPage.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-show="startAndEndPage.start > 2">···</button>

    <!-- 中间部分，v-for 可遍历 数组|数字|字符串|对象 -->
    <button
      v-for="(page, index) in startAndEndPage.end"
      :key="index"
      v-show="page >= startAndEndPage.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- 下面部分 -->
    <button v-show="startAndEndPage.end < totalPage - 1">···</button>
    <button
      v-show="startAndEndPage.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continue"],
  computed: {
    totalPage() {
      return Math.floor(this.total / this.pageSize);
    },
    startAndEndPage() {
      let start = 0;
      let end = 0;
      // 连续页码大于总页数，页面数不够
      if (this.continue > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        start = this.pageNo - Math.floor(this.continue / 2);
        end = this.pageNo + Math.floor(this.continue / 2);
        if (start < 1) {
          // 如果页码接近首页，start可能会得出负数，纠错并把终止页end设为：连续页码数continue
          start = 1;
          end = this.continue;
        }
        if (end > this.totalPage) {
          // 同理如果页码接近尾页，end 可能会大于总页数，纠错并把起始页start设为：总页数total - 连续页码数continue + 1
          end = this.totalPage;
          start = this.totalPage - this.continue + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background-color: skyblue;
}
</style>