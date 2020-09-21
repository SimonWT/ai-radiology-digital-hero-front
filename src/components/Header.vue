<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    id="header-menu"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <div class="header__logo">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 224 18"
        fill="none"
        class="header__logo__image"
      >
        <path
          d="M34.748 17.307h3.934V9.703h4.457l7.605 7.604h4.72L47.86 9.703h.262c3.147 0 6.294 0 6.294-3.54V3.54C54.416 0 51.269 0 48.122 0H34.748v17.307zm3.934-9.833V2.229h10.227c.786 0 1.573 0 1.573.918v3.409c0 .918-.787.918-1.573.918H38.682zM56.767 17.307H60.7l2.753-5.506h8.916l2.754 5.506h3.933L70.403 0H65.42l-8.654 17.307zm7.735-7.604l3.41-6.818 3.408 6.818h-6.818zM81.407 17.307h10.227c4.72 0 9.441-1.573 9.441-7.867V7.867c0-6.294-4.72-7.867-9.44-7.867H81.406v17.307zm3.934-2.229V2.23h5.507c3.147 0 6.293 1.049 6.293 5.245v2.36c0 4.196-3.147 5.244-6.293 5.244H85.34zM104.737 17.307h3.933V0h-3.933v17.307zM112.343 13.767c0 3.54 3.146 3.54 6.293 3.54h7.081c3.146 0 6.293 0 6.293-3.54V3.54c0-3.54-3.147-3.54-6.293-3.54h-7.081c-3.147 0-6.293 0-6.293 3.54v10.227zm3.933.394V3.147c0-.918.787-.918 1.574-.918h8.653c.787 0 1.574 0 1.574.918V14.16c0 .917-.787.917-1.574.917h-8.653c-.787 0-1.574 0-1.574-.917zM135.672 17.307h18.357v-2.229h-14.423V0h-3.934v17.307zM156.646 13.767c0 3.54 3.147 3.54 6.293 3.54h7.081c3.147 0 6.293 0 6.293-3.54V3.54c0-3.54-3.146-3.54-6.293-3.54h-7.081c-3.146 0-6.293 0-6.293 3.54v10.227zm3.933.394V3.147c0-.918.787-.918 1.574-.918h8.653c.787 0 1.574 0 1.574.918V14.16c0 .917-.787.917-1.574.917h-8.653c-.787 0-1.574 0-1.574-.917zM179.975 13.767c0 3.54 3.147 3.54 6.294 3.54h7.08c3.147 0 6.294 0 6.294-3.54V6.556h-7.867v2.229h3.933v5.376c0 .917-.786.917-1.573.917h-8.654c-.786 0-1.573 0-1.573-.917V3.147c0-.918.787-.918 1.573-.918h12.85V0h-12.063c-3.147 0-6.294 0-6.294 3.54v10.227zM200.944 0l9.178 9.178v8.13h3.934v-8.13L223.234 0h-4.72l-6.425 6.425L205.664 0h-4.72z"
        ></path>
        <path
          d="M0 17.307h3.934l2.753-5.506h8.916l2.753 5.506h3.934L13.636 0H8.654L0 17.307zm7.736-7.604l3.409-6.818 3.409 6.818H7.736zM24.64 17.307h3.934V0h-3.933v17.307z"
          fill="#2BD600"
        ></path>
      </svg>
    </div>
    <el-menu-item index="/">Главная</el-menu-item>
    <el-menu-item index="/upload">Загрузить</el-menu-item>
    <el-menu-item @click.native="$emit('show-history')">История</el-menu-item>
    <el-menu-item index="/profile">Личный кабинет</el-menu-item>
    <el-menu-item index="/about">О нас</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
    };
  },
};
</script>

<style lang="scss">
.el-header {
  padding: 0 !important;
}
.header {
  &__logo {
    width: 200px;
    display: flex;
    height: 60px;
    align-items: center;
    float: left;
    justify-content: center;
    padding: 0;
    flex-direction: column;
    &__image {
      height: 20px;
      width: 120px;
      fill: hsla(0, 0%, 100%, 0.85);
    }
    &__text {
      font-size: 0.6em;
      line-height: 1em;
      color: hsla(0, 0%, 100%, 0.85);
      text-align: left;
    }
  }
}
</style>
