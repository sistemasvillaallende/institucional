<template>
    <v-container fluid style="padding-top:80px; padding-bottom: 80px;"
        v-if="seccion != null && seccion != 'undefined'">
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
            <v-row>
                <v-col cols="12">
                    <v-tabs v-model="tab">
                        <v-tab v-for="(item, i) in seccion.lstContenido" :key="i">
                            {{ item.titulo_contenido }}</v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <v-tab-item v-for="(item, i) in 
                            seccion.lstContenido" :key="i">
                            <v-card flat style="padding-top:40px;">
                                <div v-html="item.contenido_contenido">
                                </div>
                                <div v-if="item.lstArchivos.length > 0" style="padding:20px; padding-bottom: 5px;">
                                    <h4>Descargas</h4>
                                    <hr/>
                                </div>
                                <div v-for="(item2, i2) in item.lstArchivos" :key="i2" style="margin-top: 15px;
                                    padding-top: 15px;
                                    padding-bottom: 15px;
                                    border: solid 1px lightgray;
                                    border-radius: 15px;
                                    padding-left: 20px;
                                    padding-right: 20px;">
                                    <a :href="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + seccion.id_page + '/' + item2.link_archivo" 
                                        style="width:100%; display:block;" target="_blank">{{item2.nombre_archivo}}
                                        <span class="fa fa-download" style="float: right;"></span>
                                    </a>
                                </div>                                
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-col>
            </v-row>
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
            tab: null,
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