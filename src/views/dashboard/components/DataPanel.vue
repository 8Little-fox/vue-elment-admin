<template>
  <div class="data-panel">
    <el-row :gutter="40">

      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="m-b-30"
      >
        <div
          class="card-panel"
        >
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon
              icon-class="peoples"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              企业人数
            </div>
            <count-to
              :start-val="0"
              :end-val="102400"
              :duration="2600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>

      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="m-b-30"
      >
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon
              icon-class="message"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              企业余额
            </div>
            <count-to
              :start-val="0"
              :end-val="812212"
              :duration="3000"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>

      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="m-b-30"
      >
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon
              icon-class="money"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              福利金发放总额
            </div>
            <count-to
              :start-val="0"
              :end-val="9280"
              :duration="3200"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>

      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="m-b-30"
      >
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon
              icon-class="shopping"
              class-name="card-panel-icon"
            />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              发放未消费数额
            </div>
            <count-to
              :start-val="0"
              :end-val="13600"
              :duration="3600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DataPanel',
  components: {},
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped>
  .data-panel {
    width: 100%;
    height: 108px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
  }

  .card-panel:hover .card-panel-icon-wrapper {
    color: #fff;
  }

  .card-panel:hover .icon-people {
    background: #40c9c6;
  }

  .card-panel:hover .icon-message {
    background: #36a3f7;
  }

  .card-panel:hover .icon-money {
    background: #f4516c;
  }

  .card-panel:hover .icon-shopping {
    background: #34bfa3;
  }

  .card-panel .icon-people {
    color: #40c9c6;
  }

  .card-panel .icon-message {
    color: #36a3f7;
  }

  .card-panel .icon-money {
    color: #f4516c;
  }

  .card-panel .icon-shopping {
    color: #34bfa3;
  }

  .card-panel .card-panel-icon-wrapper {
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }

  .card-panel .card-panel-icon {
    float: left;
    font-size: 48px;
  }

  .card-panel .card-panel-description {
    float: right;
    font-weight: bold;
    margin: 26px;
    margin-left: 0px;
  }

  .card-panel .card-panel-description .card-panel-text {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
    text-align: right;
  }

  .card-panel .card-panel-description .card-panel-num {
    display: block;
    font-size: 20px;
    text-align: right;
  }

  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;
    }

    .card-panel-icon-wrapper .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
</style>
