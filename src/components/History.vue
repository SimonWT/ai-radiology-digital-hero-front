<template>
  <div class="history">
    <h5 class="h5">
      История
      <i
        @click="$emit('hide-history')"
        style="position: absolute; right: 14px; cursor: pointer;
    top: 16px;"
        class="el-icon-close"
      ></i>
    </h5>
    <ul class="infinite-list" style="overflow:auto">
      <li v-for="(item, i) in history" class="infinite-list-item" :key="i">
        <el-card shadow="hover" class="card" @click.native="showItem(i)">
        <div class="card-info">
            <span class="id mb-1">#{{ item.Num }}</span>
            <span class="processing" v-if="!item.Predicted">Обработка</span>
            <span class="done" v-else>Готово</span>
        </div>
          <div class="card-info">
            <div class="date">{{ getDate(item.Date) }}</div>
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
    <UserAccessModal ref="modal" />
  </div>
</template>

<script>
import UserAccessModal from './UserAccessModal';
export default {
  props: {
    history: {
      type: Array,
      default: [],
    },
  },
  components: { UserAccessModal },
  methods: {
    showItem(id) {
      this.$store.dispatch('setObservation', this.history[id]);
      this.$router.push(`/observation/${this.history[id].id}`);
    },
    showAccess(id) {
      const key = this.history[id].id
      const code = this.history[id].PatientPassword
      this.$refs.modal.open(key, code);
    },
    getDate(mili){
        var date = new Date(mili);
        var datetext = date.toTimeString();
        datetext = datetext.split(' ')[0];
        return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear() + ' ' + datetext
    }
  },
};
</script>

<style lang="scss" scoped>
.history {
  height: 100%;
  width: 100%;
  text-align: center;
  padding: 20px 15px;
  overflow: hidden;
  position: relative;
  padding: 15px 10px;
}
.infinite-list {
  margin-top: 30px;
  padding: 0;
  padding-bottom: 40px;
  overflow-y: scroll;
  height: calc(100% - 115px);
  &-item {
    width: 100%;
    margin: 0;
  }
}
.el-card {
  width: calc(100% - 8px);
  margin-bottom: 8px;
  cursor: pointer;
  &__body {
    display: flex;
    padding: 10px !important;
    align-items: center;
    justify-content: space-between;
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

.card-info{
    display: flex;
    justify-content: space-between;
}

.processing{
    color: #409EFF;
}

.done{
    color: #67C23A;
}
</style>
