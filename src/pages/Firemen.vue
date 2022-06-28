<template>
  <div id="all">
    <el-row :gutter="20">
      <el-col :span="14">
        <div class="addHouse">
          <el-button type="primary" plain @click="enrollFiremen"
            >注册</el-button
          >
          <el-input
            v-model="search"
            size="small"
            placeholder="输入关键字搜索"
            suffix-icon="el-icon-search"
          />
        </div>
      </el-col>
      <el-dialog
        title="消防员注册"
        :visible.sync="dialogFormVisible"
        :showClose="false"
        width="480px"
      >
        <el-form>
          <el-form-item>
            <div class="houseMsg">
              <el-input
                v-for="(val, key, index) in firemenEd[0]"
                :key="index"
                v-model="firemen[firemen.length - 1][key]"
                :placeholder="labelListEdit[index]"
                autocomplete="off"
                suffix-icon="el-icon-edit"
                style="width: 200px; margin-bottom: 20px"
              ></el-input>
              <el-select
                v-model="firemen[firemen.length - 1]['belongs']"
                slot="prepend"
                placeholder="所属消防站"
              >
                <el-option
                  v-for="(item, index) in houseName"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
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
                v-for="(val, key, index) in firemenEd[0]"
                :key="index"
                v-model="firemen[indexStore][key]"
                :placeholder="labelListEdit[index]"
                suffix-icon="el-icon-edit"
                autocomplete="off"
                style="width: 200px; margin-bottom: 20px"
              ></el-input>
              <el-select
                v-model="firemen[indexStore]['belongs']"
                slot="prepend"
                placeholder="所属消防站"
              >
                <el-option
                  v-for="(item, index) in houseName"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" style="margin-top: -50px; margin-right: 10px">
          <el-button @click="cancelEdit">取 消</el-button>
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
        </div>
      </el-dialog>
      <el-col :span="14">
        <el-card>
          <el-table border :data="filFiremen" style="width: 100%" height="540">
            <el-table-column
              v-for="(item, index) in labelList"
              :key="item"
              :label="labelList[index]"
              :width="widthList[index]"
              :prop="propList[index]"
            >
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
      <el-col :span="5">
        <el-card style="margin-top: -39px">
          <chart-four></chart-four>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card style="margin-top: -39px">
          <chart-six></chart-six>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card style="margin-top: 10px">
          <chart-seven></chart-seven>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartFour from "../Echarts/chartFour.vue";
import ChartSix from "../Echarts/chartSix.vue";
import ChartSeven from "../Echarts/chartSeven.vue";
export default {
  components: {
    ChartFour,
    ChartSix,
    ChartSeven,
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible_Edit: false,
      labelList: ["编号", "姓名", "电话", "职务", "所属消防站"],
      widthList: ["60", "100", "150", "100", "150"],
      propList: ["index", "name", "phone", "office", "belongs"],
      search: "",
      firemen: [],
      firemenEd: [
        {
          index: "",
          name: "",
          phone: "",
          office: "",
        },
      ],
      labelListEdit: ["编号", "姓名", "电话", "职务"],
      indexStore: "0",
      idStore: "",
    };
  },
  computed: {
    filFiremen() {
      return this.firemen.filter((item) => {
        return (
          item.name.includes(this.search) ||
          item.office.includes(this.search) ||
          item.belongs.includes(this.search)
        );
      });
    },
    houseName() {
      return JSON.parse(JSON.stringify(this.$store.state.houseName.houseName));
    },
  },
  methods: {
    enrollFiremen() {
      this.dialogFormVisible = true;
      this.firemen.push({
        index: "",
        name: "",
        phone: "",
        office: "",
        belongs: "",
      });
    },
    confirmAdd() {
      this.dialogFormVisible = false;
      axios({
        method: "POST",
        url: `http://1.117.61.116:8081/FireMan?purpose=addfireman&ID=
        ${this.firemen[this.firemen.length - 1].index}&Name=${
          this.firemen[this.firemen.length - 1].name
        }&Phone=${this.firemen[this.firemen.length - 1].phone}&Post=${
          this.firemen[this.firemen.length - 1].office
        }&Belongs=${this.firemen[this.firemen.length - 1].belongs}`,
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
      this.firemen.pop();
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
        url: `http://1.117.61.116:8081/FireMan?purpose=updatefireman&ID1=${
          this.idStore
        }
        &ID2=${this.firemen[this.indexStore].index}&Name=${
          this.firemen[this.indexStore].name
        }
        &Phone=${this.firemen[this.indexStore].phone}&Post=${
          this.firemen[this.indexStore].office
        }
        &Belongs=${this.firemen[this.indexStore].belongs}`,
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
      this.firemen.splice(index, 1);
      this.$notify({
        title: "已删除!",
        type: "success",
        showClose: false,
        duration: 1500,
      });
      axios({
        method: "POST",
        url:
          "http://1.117.61.116:8081/FireMan?purpose=delfireman&ID=" + row.index,
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
      url: "http://1.117.61.116:8081/FireMan?purpose=allfireman",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((data) => {
      for (let i = 0; i < data.data.length; i++) {
        this.firemen.push({
          index: "",
          name: "",
          phone: "",
          office: "",
          belongs: "",
        });
      }
      for (let i = 0; i < data.data.length; i++) {
        this.firemen[i].index = data.data[i].ID;
        this.firemen[i].name = data.data[i].Name;
        this.firemen[i].phone = data.data[i].Phone;
        this.firemen[i].office = data.data[i].Post;
        this.firemen[i].belongs = data.data[i].Belongs;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.addHouse .el-input {
  width: 200px;
}
.addHouse .el-button {
  margin-bottom: 5px;
}
.houseMsg {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>