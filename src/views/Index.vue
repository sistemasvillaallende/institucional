<template>
    <div>
        <Header></Header>
        <Carrusel></Carrusel>
        <FeaturesOne></FeaturesOne>
        <NoticiaPrincipal></NoticiaPrincipal>
            <component v-bind:is="componentname"></component>
        <!--<Galeria></Galeria>-->
        <Footer></Footer>
    </div>
</template>
<style>
a:hover, a:focus {
    box-shadow: 0 1px #6F6F6E !important;
}
</style>
<script>
import Header from "../components/Headers/Principal.vue";
import Footer from "../components/Footer.vue";
import Carrusel from "../components/Carrusel.vue";
import FeaturesOne from "../components/FeaturesOne.vue";
import NoticiaPrincipal from "../components/NoticiaPrincipal.vue";
import News from "../components/News.vue";
//import Galeria from "../components/Galeria.vue";
export default {
    data: () => {
        return {
            componentname: 'noticia',
        };
    },
    components: {
    Header,
    Footer,
    Carrusel,
    FeaturesOne,
    NoticiaPrincipal,
    'noticia': News,
    //Galeria,
},
    async mounted() {
        try {

        } catch (error) { }
    },
    methods: {

    },
};
</script>