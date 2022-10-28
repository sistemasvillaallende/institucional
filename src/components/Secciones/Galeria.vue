<template>
    <v-container fluid style="padding-top:80px; padding-bottom: 80px;" v-if="seccion != null && seccion != 'undefined'">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h2 style="position: relative;
                        color: var(--roofsie-gray);
                        font-weight: 800;
                        line-height: 40px;
                        margin-bottom: 10px;">{{ seccion.titulo }}</h2>
                    <p style="
                        font-size: 18px;
                        color: var(--roofsie-gray);
                        line-height: 18px;
                        margin-bottom: 10px;">{{ seccion.subtitulo }}</p>
                </v-col>
            </v-row>

            <div class="work-page__bottom"
                style="margin-top:30px;">
                <hr />
                <div class="row filter-layout masonary-layout"
                    style="position: relative; margin-top: 30px;">
                    <!--Project One Single Start-->
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 filter-item comm res"
                        style="left: 0px; top: 0px; margin-top: 20px;" 
                        v-for="(item, index) in seccion.lstContenido" :key="index">
                        <div class="project-one__single">
                            <div class="project-one__img-box">
                                <div class="project-one__img" style="text-align:center;">
                                    <img :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + seccion.id_page + '/' + item.imagen"
                                        alt="" style="height: 300px; width: auto;">
                                </div>
                                <div class="project-one__content">
                                    <h4 class="project-one__title"><a href="#">{{ item.nombre }}</a>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-container>
    </v-container>
</template>
<style scoped>
.v-tab--active {
    background-color: var(--roofsie-gray) !important;
    color: var(--roofsie-white) !important;
    font-weight: 800;
}
</style>
<script>
export default {
    data: () => ({
        seccion: null,
    }),
    async mounted() {
        try {
            this.seccion = (await this.$http.get("/Seccion/getByPkActivos?pk=" + this.id)).data;
        } catch (error) { }
    },
    props: {
        id: {
            type: [Number, String],
            default: 0,
        },
        tipo: {
            type: [Number, String],
            default: "",
        },
    },
}
</script>