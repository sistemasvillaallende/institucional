<template>
    <v-container fluid style="padding-top:80px; padding-bottom: 80px;" 
        v-if="seccion != null && seccion != 'undefined'">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h2 style="position: relative; color: var(--roofsie-gray);
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
                   <div v-html="html"></div>
                </v-col>
            </v-row>
            <div v-for="(item2, i2) in this.seccion.lstContenido[0].lstArchivos" :key="i2" 
            style="margin-top: 15px;
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
        </v-container>
    </v-container>
</template>

<script>

$('#example').cardtable();
export default {
    data: () => ({
        seccion: null,
        id_contenido: 0,
        html: "",
    }),
    async mounted() {
        try {
            this.seccion = (await this.$http.get("/Seccion/getByPk?pk=" + this.id)).data;
            if (this.seccion.lstContenido.length > 0) {
                
                this.id_contenido = this.seccion.lstContenido[0].id;
                
                this.html = this.seccion.lstContenido[0].html;
            }
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