<template>
    <!--Services One Start-->
    <div>
        <div class="container">
            <div class="container py-5" v-if="seccion != null && seccion != 'undefined'">
                <div class="row">
                    <div class="col-md-12">
                        <div class="main-timeline">
                            <div class="timeline" v-if="cards != null && cards != 'undefined'" v-for="(item, i) in cards" :key="i">
                                <div class="timeline-content">
                                    <div class="circle"><span class="homebox">
                                            <img style="width: 100%; height: 100%;" :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + item.id_page + '/' + item.imagen"  class="img">
                                        </span></div>
                                    <div class="content">
                                        <span class="year">{{ item.titulo }}</span>
                                        <h3 class="title h4">{{ item.subtitulo }}</h3>
                                        <p class="description" v-html="item.bajada">
                                            
                                        </p>
                                        <div class="icon"><span></span></div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--Services One End-->

</template>
<style>
.main-timeline .timeline-content {
    width: 100% !important;
}
.main-timeline .year {
    background: rgb(111 111 110);
}
.main-timeline .title {
    color: rgb(55 152 201);
}
</style> 
<script>
export default {
    data: () => ({
        seccion: null,
        cards: null,
    }),
    async mounted() {
        try {
            this.seccion = (await this.$http.get("/Seccion/getByPk?pk=" + this.id)).data;
            this.cards = (await this.$http.get("/Card/readActivas?id_seccion=" + this.id)).data;
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