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
              v-for="(val, key, index) in firehouse[0]"
              :key="index"
              v-model="firehouse[firehouse.length - 1][key]"
              :placeholder="labelList[index]"
              autocomplete="off"
              style="width: 200px; margin-bottom: 20px"
            ></el-input>
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
              v-for="(val, key, index) in firehouse[0]"
              :key="index"
              v-model="firehouse[indexStore][key]"
              :placeholder="labelList[index]"
              suffix-icon="el-icon-edit"
              autocomplete="off"
              style="width: 200px; margin-bottom: 20px"
            ></el-input>
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
      labelList: ["序号", "事故地点", "火灾原因", "出警消防队", "伤亡人数"],
      widthList: ["100", "350", "200", "200", "150"],
      propList: ["id", "address", "fire", "firestation", "casualties"],
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
          item.fire.includes(this.search) ||
          item.address.includes(this.search) ||
          item.firestation.includes(this.search)
        );
      });
    },
  },
  methods: {
    addFirehouse() {
      this.dialogFormVisible = true;
      this.firehouse.push({
        id: "",
        address: "",
        fire: "",
        firestation: "",
        casualties: "",
      });
    },
    confirmAdd() {
      this.dialogFormVisible = false;
      axios({
        method: "POST",
        url: `http://1.117.61.116:8081/Alarm?purpose=addalarm&ID=
        ${this.firehouse[this.firehouse.length - 1].id}&address=${
          this.firehouse[this.firehouse.length - 1].address
        }&fire=${this.firehouse[this.firehouse.length - 1].fire}&firestation=${
          this.firehouse[this.firehouse.length - 1].firestation
        }&casualties=${this.firehouse[this.firehouse.length - 1].casualties}`,
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
      this.idStore = row.id;
    },
    confirmEdit() {
      axios({
        method: "POST",
        url: `http://1.117.61.116:8081/Alarm?purpose=updatealarm&ID1=${
          this.idStore
        }
        &ID2=${this.firehouse[this.indexStore].id}&address=${
          this.firehouse[this.indexStore].address
        }
        &fire=${this.firehouse[this.indexStore].fire}&firestation=${
          this.firehouse[this.indexStore].firestation
        }
        &casualties=${this.firehouse[this.indexStore].casualties}`,
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
        url: "http://1.117.61.116:8081/Alarm?purpose=delalarm&ID=" + row.id,
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
      url: "http://1.117.61.116:8081/Alarm?purpose=allalarm",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }).then((data) => {
      for (let i = 0; i < data.data.length; i++) {
        this.firehouse.push({
          id: "",
          address: "",
          fire: "",
          firestation: "",
          casualties: "",
        });
      }
      for (let i = 0; i < data.data.length; i++) {
        this.firehouse[i].id = data.data[i].ID;
        this.firehouse[i].address = data.data[i].address;
        this.firehouse[i].fire = data.data[i].fire;
        this.firehouse[i].firestation = data.data[i].firestation;
        this.firehouse[i].casualties = data.data[i].casualties;
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