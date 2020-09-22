<template>
    <div class="display-block">
        Email: {{$store.getters.user_email}}
        <div><el-button class="my-5" @click="logout" type="danger">Выйти</el-button></div>
    </div>
</template>
<script>
export default {
    name: "Profile",
    methods: {
        logout(){
            this.$store.dispatch('logout')
            this.$router.replace('/login')
        }
    }
    
}
</script>