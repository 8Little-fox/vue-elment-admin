<!--
 * @Author: your name
 * @Date: 2021-01-05 18:45:44
 * @LastEditTime: 2021-01-05 21:41:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-elment-admin\src\views\infos\components\AddInfoShow.vue
-->
<template>
  <el-dialog
    :title="dialog.title"
    :visible="true"
    width="30%"
    :close-on-click-modal="false"
    @close="closeaddDialog"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="form_rules"
      label-width="120px"
      label-position="left"
      style="margin:10px;width:auto;"
    >
      <el-form-item label="收支类型:">
        <el-select v-model="form.incomePayType" placeholder="收支类型">
          <el-option label="提现" value="0"></el-option>
          <el-option label="提现手续费" value="1"></el-option>
          <el-option label="提现锁定" value="2"></el-option>
          <el-option label="理财服务退出" value="3"></el-option>
          <el-option label="购买宜定盈" value="4"></el-option>
          <el-option label="充值" value="5"></el-option>
          <el-option label="优惠券" value="6"></el-option>
          <el-option label="充值礼券" value="7"></el-option>
          <el-option label="转账" value="8"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="name" label="用户姓名:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item prop="income" label="收入:">
        <el-input type="income" v-model.number="form.income"></el-input>
      </el-form-item>

      <el-form-item prop="pay" label="支出:">
        <el-input type="pay" v-model.number="form.pay"></el-input>
      </el-form-item>

      <el-form-item prop="accoutCash" label="账户现金:">
        <el-input type="accoutCash" v-model.number="form.accoutCash"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeaddDialog">取 消</el-button>
      <el-button type="primary" @click="addDialog_commit('form')">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    editid: {
        type: [Number, String],
      default: 0
    }
  },
  data() {
    let validateData = (rule, value, callback) => {
      if (value === "") {
        let text;
        if (rule.field == "income") {
          text = "收入";
        } else if (rule.field == "pay") {
          text = "支出";
        } else {
          text = "账户现金";
        }
        callback(new Error(text + "不能为空~"));
      } else {
        let numReg = /^[0-9]+.?[0-9]*$/;
        if (!numReg.test(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }
    };

    return {
      form: {
        incomePayType: "",
        name: "",
        income: "",
        pay: "",
        accoutCash: ""
      },

      form_rules: {
        name: [{ required: true, message: "用户姓名！", trigger: "blur" }],
        income: [{ required: true, validator: validateData, trigger: "blur" }],
        pay: [{ required: true, validator: validateData, trigger: "blur" }],
        accoutCash: [
          { required: true, validator: validateData, trigger: "blur" }
        ]
      },
      //详情弹框信息
      dialog: {
        width: "400px",
        show: false,
        title: "修改资金信息",
        formLabelWidth: "120px"
      },
      // editid: ""
    };
  },
  mounted(){
    console.log("*********",this.editid)
       if (this.editid != "") {
            this.dialog.title = "修改资金信息";
          } else {
            this.dialog.title = "新增资金信息";
          }
  },
  methods: {
    // 确定
    addDialog_commit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          let formData = this[form];
          let data = {};

          for (var i in formData) {
            data.id = this.editid;
            data.accoutCash = Number(formData["accoutCash"]);
            data.income = Number(formData["income"]);
            data.pay = Number(formData["pay"]);
            data.incomePayType = parseInt(formData["incomePayType"]);
            data.name = formData["name"];
          }
          console.log(data);
          if (this.editid != "") {
            this.dialog.title = "修改资金信息";
            this.$parent.add_dialog = false;
            // this.editMoneyIncomePay(data)
          } else {
            this.dialog.title = "新增资金信息";
            this.$parent.tableData.push(this.form)
            this.$parent.add_dialog = false;
            // this.addMoneyIncomePay(data)
          }
        }
      });
    },
    // 关闭弹窗
    closeaddDialog() {
      this.$parent.add_dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form--label-left .el-form-item__label {
  color: #ebeef5;
}
</style>