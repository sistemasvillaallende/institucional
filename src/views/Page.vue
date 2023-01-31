<template>
    <div>
        <Header></Header>
        <Principal></Principal>
        <section v-for="(item, index) in componentname" :key="index" 
            :style="{ backgroundColor: item.background_color }">
            <component v-bind:is="item.tipo" :id="item.id"></component>
        </section>
        <Footer></Footer>
    </div>
</template>
<style>
a:hover,
a:focus {
    box-shadow: 0 1px var(--roofsie-gray) !important;
}
</style>
<script>
import Header from "../components/Headers/Principal.vue";
import Footer from "../components/Footer.vue";
import ExpansionPanel from "../components/Secciones/ExtensionPanels.vue";
import TabPanel from "../components/Secciones/TabPanels.vue";
import TabPanelVertical from "../components/Secciones/TabPanelsVertical.vue";
import Galeria from "../components/Secciones/Galeria.vue";
import Principal from "../components/Secciones/Principal.vue";
import Htmllibre from "../components/Secciones/HTML.vue";
import News from "../components/News.vue";
import Agenda from "../components/Agenda/Agenda.vue";
import Carrusel from "../components/Carrusel.vue";
import Cards from "../components/Secciones/Cards.vue";
import Cards2 from "../components/Secciones/Cards2.vue";
import Timeline from "../components/Secciones/TimeLine.vue";

export default {
    data: () => {
        return {
            componentname: null,
        };
    },
    components: {
    Header,
    Footer,
    "expansionpanel": ExpansionPanel,
    "tabpanel": TabPanel,
    "tabpanelvertical": TabPanelVertical,
    "geleria": Galeria,
    "news": News,
    "agenda": Agenda,
    "htmllibre": Htmllibre,
    "carrusel": Carrusel,
    "cards": Cards,
    "cards2": Cards2,
    "timeline": Timeline,    
    Principal,
    Agenda,
},
    async mounted() {
        try {
            this.componentname = (await this.$http.get("/Paginas/getLstSecciones?idPage=" + this.$route.params.id)).data;
        } catch (error) { }
    },
    methods: {

    },
};
</script>