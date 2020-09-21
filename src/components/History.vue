<template>
  <div class="history">
    <h5 class="h5">
      История
      <i
        @click="$emit('hide-history')"
        style="position: absolute; right: 14px; cursor: pointer; top: 16px;"
        class="el-icon-close"
      ></i>
    </h5>
    <ul class="infinite-list" style="overflow:auto">
      <li v-for="(item, i) in history" class="infinite-list-item" :key="i">
        <el-card shadow="hover" class="card" @click.native="showItem(i)">
          <div class="card-info mb-1">
            <span class="id mb-1">#{{ item.Num }}</span>
            <el-tag
              size="small"
              class="status processing"
              v-if="!item.Predicted"
              >Обработка</el-tag
            >
            <el-tag size="small" type="success" class="status done" v-else
              >Обработан</el-tag
            >
          </div>
          <div class="file-info">
            <i class="el-icon-document mr-1" /> {{item.Filename}}
          </div>
          <div class="card-info">
            <div class="date">
              <i class="el-icon-date mr-1" /> {{ getDate(item.Date) }}
            </div>

            <div class="action">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="icon el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="showItem(i)"
                    ><i class="el-icon-view" />Открыть</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="showAccess(i)"
                    ><i class="el-icon-key" />Дать доступ
                    пациенту</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script>
// import UserAccessModal from './UserAccessModal';
export default {
  props: {
    history: {
      type: Array,
      default: [],
    },
  },
  // components: { UserAccessModal },
  methods: {
    showItem(id) {
      this.$store.dispatch('setObservation', this.history[id]);
      this.$router.push(`/observation/${this.history[id].id}`);
    },
    showAccess(id) {
      const key = this.history[id].id;
      const code = this.history[id].PatientPassword;
      this.$emit('show-user-access', {key, code})
    },
    getDate(mili) {
      var date = new Date(mili);
      var datetext = date.toTimeString();
      datetext = datetext.split(' ')[0];

      console.log(datetext);
      return (
        (date.getMonth() > 8
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1)) +
        '.' +
        (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
        '.' +
        date.getFullYear() +
        ' ' +
        datetext
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.history {
  width: 100%;
  height: calc(100vh - 60px);
  text-align: center;
  padding: 15px 0 0 10px;
  overflow: hidden;
  position: relative;
}
.infinite-list {
  margin-top: 30px;
  padding: 0 10px 0 0;
  padding-bottom: 20px;
  overflow-y: scroll;
  height: calc(100% - 50px);
  &-item {
    width: 100%;
    margin: 0;
  }
}

::v-deep .el-card {
  width: calc(100% - 8px);
  margin-bottom: 8px;
  cursor: pointer;
  &__body {
    // display: flex;
    padding: 10px !important;
    // align-items: center;
    // justify-content: space-between;
  }
}

.card {
}

.id {
  color: rgba(0, 0, 0, 0.3);
}

.el-dropdown-menu {
  //   display: block;
  // flex-direction: column;
}

li {
  display: block;
}

.icon {
  font-size: 15px;
  font-weight: bold;
}

.card-info {
  display: flex;
  justify-content: space-between;
}

.date {
  font-size: 14px;
}

.status {
  // margin-top: -15px;
  // margin-right: -15px;
}

.file-info {
  font-size: 14px;
  text-align: left;
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
