<template>
  <div class="history">
    <h5 class="h5">История</h5>
    <ul class="infinite-list" style="overflow:auto">
      <li v-for="(item, i) in history" class="infinite-list-item" :key="i">
        <el-card shadow="hover" class="card" @click.native="showItem(item.id)">
          <div class="id">#{{ item.id }}</div>
          <div class="date">{{ item.Date }}</div>
          <div class="action">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="icon el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="showItem(item.id)"
                  ><i class="el-icon-view" />Открыть</el-dropdown-item
                >
                <el-dropdown-item @click.native="showAccess(item.id)"
                  ><i class="el-icon-key"/>Дать доступ пациенту</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-card>
      </li>
    </ul>
    <UserAccessModal ref="modal"/>
  </div>
</template>

<script>
import UserAccessModal from './UserAccessModal';
export default {
    props: {history:{
        type: Array,
        default: []
    }},
  components: { UserAccessModal },
  data() {
    return {
    //   history: [
    //     {
    //       id: 1,
    //       name: 'test',
    //       datetime: '26.01.1999 00:00:00',
    //     },
    //   ],
    };
  },
  methods: {
    showItem() {},
    showAccess(id) {
        this.$refs.modal.open()
    }
  },
};
</script>

<style lang="scss">
.history {
  height: 100%;
  width: 100%;
  text-align: center;
  padding: 20px 15px;
  overflow: hidden;
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
</style>
