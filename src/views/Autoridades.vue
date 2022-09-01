<template>
    <div>
        <Header></Header>
        <div class="container" style="margin-top:50px; margin-bootom:50px"
            v-if="this.autoridades != null && this.autoridades != 'undefined' && this.autoridades.length > 0">
            <div class="row">
                <h3>Autoridades de la Ciudad de Villa Allende</h3>
                <hr />
                <div class="col-xl-3 col-lg-3 col-md-6 wow fadeInUp animated" data-wow-delay="100ms"
                    style="visibility: visible; animation-delay: 100ms; animation-name: fadeInUp;"
                    v-for="(item, index) in autoridades" :key="index">
                    <div class="team-one__single">
                        <div class="team-one__img-box">
                            <div class="team-one__img">
                                <img :src="'https://vecino.villaallende.gov.ar/estilos/Assets/Autoridades/' + item.img" alt="" 
                                >
                            </div>
                        </div>
                        <div class="team-one__content-box" style="height: 232px;">
                            <div class="team-one__content">
                                <h3 class="team-one__name"
                                    style="font-size: 16px;font-weight: 800; line-height: 26px; margin-bottom: 10px;">{{
                                            item.nombre_completo
                                    }}</h3>
                                <p class="team-one__sub-title">{{ item.cargo }}</p>

                                <div class="team-one__shape">
                                    <img src="assets/images/shapes/team-one-shape.png" alt="">
                                </div>
                                <div class="row" style="bottom: 45px; position: fixed;">
                                    <div class="col-12">
                                        <ul class="list-unstyled team-one__social-two" style="position: inherit; padding-left: 0;">
                                            <li><a href="#"><i class="fas fa-share-alt"></i></a></li>
                                        </ul>
                                        <ul class="list-unstyled team-one__social" style="right: inherit; bottom: 10px;">
                                            <li><a href="#"><i class="fab fa-facebook-square"></i></a></li>
                                            <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                            <li><a href="#"><i class="fab fa-pinterest-p"></i></a></li>
                                            <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<style scoped>
</style>
<script>
import Header from "../components/Headers/Principal.vue";
import Footer from "../components/Footer.vue";
export default {
    data: () => {
        return {

            autoridades: null,
        };
    },
    components: {
        Header,
        Footer,
    },
    async mounted() {
        try {
            this.autoridades = (await this.$http.get("/Autoridades/read")).data;
        } catch (error) { }
    },
    methods: {

    },
};
</script>