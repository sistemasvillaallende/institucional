<template>
    <div>
        <Header></Header>
        <section class="page-header">
            <div class="page-header-bg" style="background-image: url(https://vecino.villaallende.gov.ar/estilos/Assets/Paginas/Pagina1.png)">
            </div>
            <div class="container">
                <div class="page-header__inner">
                    <h2>Work details</h2>
                </div>
            </div>
        </section>
        <Principal></Principal>
        <div v-for="(item, index) in componentname" :key="index">
            <component v-bind:is="item"></component>
        </div>

        <Footer></Footer>
    </div>
</template>
<style>
a:hover,
a:focus {
    box-shadow: 0 1px #6F6F6E !important;
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
import News from "../components/News.vue";
import Agenda from "../components/Agenda/Agenda.vue";
//import Galeria from "../components/Galeria.vue";
export default {
    data: () => {
        return {
            componentname: ['expansionpanel', 'geleria', 'tabpanel', 'tabpanelvertical', 'agenda', 'news'],
        };
    },
    components: {
        Header,
        Footer,
        'expansionpanel': ExpansionPanel,
        'tabpanel': TabPanel,
        'tabpanelvertical': TabPanelVertical,
        'geleria': Galeria,
        'news': News,
        'agenda': Agenda,        
        Principal,
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