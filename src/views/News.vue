<template>
    <div>
        <Header></Header>
        <News></News>       
        <Footer></Footer>
    </div>
</template>
<style scoped>

</style>
<script>
import Header from "../components/Headers/Principal.vue";
import Footer from "../components/Footer.vue";
import News from "../components/NewsDetail.vue";
export default {
    data: () => {
        return {

            fav: true,
            menu: false,
            message: false,
            hints: true,
        };
    },
    components: {
        Header,
        Footer,
        News,
    },
    async mounted() {
        try {

        } catch (error) { }
    },
    methods: {

    },
};
</script>