<template>
    <v-container fluid style="padding: 80px; padding-bottom: 30px; max-width: 100% !important;"  
    v-if="pagina != null && pagina != 'undefined' && pagina.seccion_pricipal">
        <section class="page-header" style="margin-bottom: 50px; height:460px; padding: 171px 0 138px">
            <div class="page-header-bg">
            <img style="height:460px; width: 100%;" 
            :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + pagina.id + '/' + pagina.imagen"/>
            </div>
            <div class="container">
                <div class="page-header__inner">
                    <h2>{{ pagina.nombre }}</h2>                    
                </div>
            </div>
        </section>        
    </v-container>
</template>
<style>
.work-details__name {
    font-size: 14px;
}
</style>
<script>
export default {
    data: () => ({
        pagina: null,
        tab: null,
        dialog_ubicacion_vista: false,
    }),
    async mounted() {
        try {
            this.pagina = (await this.$http.get("/Paginas/getByPk?pk=" + this.$route.params.id)).data;
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