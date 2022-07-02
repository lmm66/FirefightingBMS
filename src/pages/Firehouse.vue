<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <div class="addHouse">
        <el-button type="primary" plain @click="addFirehouse">新增</el-button>
      </div>
    </el-col>
    <el-col :span="6">
      <el-input
        v-model="search"
        size="small"
        placeholder="输入关键字搜索"
        suffix-icon="el-icon-search"
      />
    </el-col>
    <el-dialog
      title="新增信息"
      :visible.sync="dialogFormVisible"
      :showClose="false"
      width="480px"
    >
      <el-form>
        <el-form-item>
          <div class="houseMsg">
            <el-input
              v-for="(val, key, index) in firehouseEd[0]"
              :key="index"
              v-model="firehouse[firehouse.length - 1][key]"
              :placeholder="labelListAgain[index]"
              autocomplete="off"
              style="width: 200px; margin-bottom: 20px"
            ></el-input>
            <el-date-picker
              v-model="firehouse[firehouse.length - 1]['date']"
              type="date"
              placeholder="选择日期时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy/MM/dd"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" style="margin-top: -50px; margin-right: 10px">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑信息"
      :visible.sync="dialogFormVisible_Edit"
      :showClose="false"
      width="480px"
    >
      <el-form>
        <el-form-item>
          <div class="houseMsg">
            <el-input
              v-for="(val, key, index) in firehouseEd[0]"
              :key="index"
              v-model="firehouse[indexStore][key]"
              :placeholder="labelListAgain[index]"
              suffix-icon="el-icon-edit"
              autocomplete="off"
              style="width: 200px; margin-bottom: 20px"
            ></el-input>
            <el-date-picker
              v-model="firehouse[indexStore]['date']"
              type="date"
              placeholder="选择日期时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy/MM/dd"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" style="margin-top: -50px; margin-right: 10px">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
    <el-col :span="24">
      <el-card>
        <el-table border :data="filHouse" style="width: 100%" height="536">
          <el-table-column
            v-for="(item, index) in labelList"
            :key="item"
            :label="labelList[index]"
            :width="widthList[index]"
            :prop="propList[index]"
          >
          </el-table-column>
          <el-table-column label="状态" width="150" prop="state">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.state === '安全' ? 'success' : 'danger'"
                disable-transitions
                >{{ scope.row.state }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible_Edit: false,
      labelList: ["编号", "站名", "电话", "日期", "地址"],
      labelListAgain: ["编号", "站名", "电话", "地址", "状态"],
      widthList: ["100", "250", "150", "200", "250"],
      propList: ["index", "name", "phone", "date", "address"],
      firehouseEd: [
        {
          index: "",
          name: "",
          phone: "",
          address: "",
          state: "",
        },
      ],
      search: "",
      firehouse: [],
      indexStore: "0",
      idStore: "",
    };
  },
  computed: {
    filHouse() {
      return this.firehouse.filter((item) => {
        return (
          item.name.includes(this.search) || item.state.includes(this.search)
        );
      });
    },
  },
  methods: {
    addFirehouse() {
      this.dialogFormVisible = true;
      this.firehouse.push({
        index: "",
        name: "",
        phone: "",
        date: "",
        address: "",
        state: "",
      });
    },
    confirmAdd() {
      this.dialogFormVisible = false;
      axios({
        method: "POST",
        url: `http://1.117.61.116:8081/FireStation?purpose=addfirestation&ID=
        ${this.firehouse[this.firehouse.length - 1].index}&Name=${
          this.firehouse[this.firehouse.length - 1].name
        }&Telephone=${this.firehouse[this.firehouse.length - 1].phone}&Date=${
          this.firehouse[this.firehouse.length - 1].date
        }&Address=${this.firehouse[this.firehouse.length - 1].address}&state=${
          this.firehouse[this.firehouse.length - 1].state
        }`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((data) => {
        this.$notify({
          title: "添加成功!",
          type: "success",
          showClose: false,
          duration: 1500,
        });
      });
    },
    cancelAdd() {
      this.firehouse.pop();
      this.dialogFormVisible = false;
    },
    handleEdit(index, row) {
      this.dialogFormVisible_Edit = true;
      this.indexStore = index;
      this.idStore = row.index;
    },
    confirmEdit() {
      axios({
        method: "POST",
        url: `http://1.117.61.116:8081/FireStation?purpose=updatefirestation&ID1=${
          this.idStore
        }
        &ID2=${this.firehouse[this.indexStore].index}&Name=${
          this.firehouse[this.indexStore].name
        }
        &Telephone=${this.firehouse[this.indexStore].phone}&Date=${
          this.firehouse[this.indexStore].date
        }
        &Address=${this.firehouse[this.indexStore].address}&state=${
          this.firehouse[this.indexStore].state
        }`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((data) => {
        console.log(data);
      });
      this.dialogFormVisible_Edit = false;
    },
    cancelEdit() {
      this.dialogFormVisible_Edit = false;
    },
    handleDelete(index, row) {
      this.firehouse.splice(index, 1);
      this.$notify({
        title: "已删除!",
        type: "success",
        showClose: false,
        duration: 1500,
      });
      axios({
        method: "POST",
        url:
          "http://1.117.61.116:8081/FireStation?purpose=delfirestation&ID=" +
          row.index,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }).then((data) => {
        console.log(data);
      });
    },
  },
  created() {
    axios({
      method: "GET",
      url: "http://1.117.61.116:8081/FireStation?purpose=allfirestation",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((data) => {
      for (let i = 0; i < data.data.length; i++) {
        this.firehouse.push({
          index: "",
          name: "",
          phone: "",
          date: "",
          address: "",
          state: "",
        });
      }
      for (let i = 0; i < data.data.length; i++) {
        this.firehouse[i].index = data.data[i].ID;
        this.firehouse[i].name = data.data[i].Name;
        this.firehouse[i].phone = data.data[i].Telephone;
        this.firehouse[i].date = data.data[i].Date;
        this.firehouse[i].address = data.data[i].Address;
        this.firehouse[i].state = data.data[i].state;
      }
    });
  },
};
</script>

<style scoped>
.el-row {
  margin-top: 15px;
}
.addHouse {
  position: relative;
  top: -5px;
}
.houseMsg {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>