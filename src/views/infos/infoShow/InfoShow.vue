<!--
 * @Author: your name
 * @Date: 2021-01-04 09:52:23
 * @LastEditTime: 2021-01-06 10:41:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-elment-admin\src\views\infos\infoShow\InfoShow.vue
-->
<template>
  <div class="infoShow">
    <div class="infoShow_tableData">
      <el-form
        :inline="true"
        :model="search_data"
        ref="search_data"
        style="width:100%;background-color: #fff;    padding-top: 20px;
    padding-left: 20px;"
      >
        <el-form-item label="用户姓名">
          <el-input
            v-model="search_data.name"
            placeholder="搜索用户姓名"
            @keyup.enter.native="getServiceRecord"
            style="margin-right:20px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="投标时间筛选:" class="infoShow_form">
          <el-date-picker
            v-model="tab_datetime"
            size="large"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            :default-time="['00:00:00', '23:59:59']"
            @change="changeDateTime"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            icon="search"
            @click="onScreeoutMoney(search_data)"
            style="margin-left:20px;"
          >筛选</el-button>
        </el-form-item>

        <el-form-item class="btnRight">
          <el-button type="primary" size="mini" icon="view" @click="onAddMoney()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="infoShow_tableData">
      <el-table :data="tableData" stripe style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号" align="center" width="80"></el-table-column>
        <el-table-column v-if="idFlag" prop="id" label="id" align="center" width="220"></el-table-column>
        <el-table-column prop="name" label="用户姓名"></el-table-column>
        <el-table-column prop="address" label="籍贯"></el-table-column>
        <el-table-column prop="date" label="创建时间" sortable></el-table-column>
        <el-table-column prop="incomePayType" label="收支类型"></el-table-column>
        <el-table-column prop="income" label="收入">
          <template slot-scope="scope">
            <span style="color:#00d053">+ {{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pay" label="支出">
          <template slot-scope="scope">
            <span style="color:#f56767">- {{ scope.row.pay }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="accoutCash" label="账户现金" align="center" width="170" sortable>
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.accoutCash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button type="warning" icon="edit" size="mini" @click="onEditMoney(scope.row)">编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="mini"
              @click="onDeleteMoney(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
         <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            v-if="paginations.total > 0"
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.total"
            :current-page="paginations.page_index"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    </div>
 
    <addDialog v-if="add_dialog" v-bind:editid="editid" />
  </div>
</template>

<script>
import addDialog from "../components/addDialog";
export default {
  components: {
    addDialog
  },
  data() {
    return {
      tab_datetime: "",

      search_data: {
        startTime: "",
        endTime: "",
        name
      },
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          incomePayType: "提现锁定",
          income: "2569.82",
          pay: "71.15",
          accoutCash: "2415.78"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          incomePayType: "充值礼券",
          income: "2569.82",
          pay: "1054.67",
          accoutCash: "2415.78"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          incomePayType: "充值",
          income: "2569.82",
          pay: "5743.53",
          accoutCash: "2415.78"
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          incomePayType: "理财服务退出",
          income: "2569.82",
          pay: "348.67",
          accoutCash: "2415.78"
        }
      ],
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 1, // 总数
        page_size: 20, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      add_dialog: false,
      idFlag: false,
      editid: ""
    };
  },
  methods: {
    // 选择时间
    changeDateTime(val) {
      console.log("选择时间", val);

      if (val) {
        this.search_data.startTime = val[0];
        this.search_data.endTime = val[1];
      } else {
        this.search_data.startTime = "";
        this.search_data.endTime = "";
      }
      console.log(this.search_data.startTime, this.search_data.endTime);
    },
    // 添加
    onAddMoney() {
      console.log("添加");
      this.editid = "";
      this.add_dialog = true;
    },
    // 编辑
    onEditMoney(row) {
      console.log(row);
      this.editid = row.id;
      this.add_dialog = true;
      console.log("this.editid", this.editid);
    },
    // 删除
    onDeleteMoney(row, index) {
      this.tableData.splice(index, 1);
      console.log("删除", row);
    }
  }
};
</script>
<style>
</style>
<style scoped>
.infoShow {
  background: #f0f2f5;
  width: 100%;
  height: 100vh;
}
.infoShow_tableData {
  padding: 20px 20px 0px 20px;
}
</style>