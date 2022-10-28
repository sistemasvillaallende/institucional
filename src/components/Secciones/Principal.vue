<template>
    <v-container fluid style="padding: 0px; padding-bottom: 30px; max-width: 100% !important;"  
    v-if="pagina != null && pagina != 'undefined' && pagina.seccion_pricipal">
        <section class="page-header" style="margin-bottom: 50px;">
            <div class="page-header-bg">
            <img style="height:360px; width: 100%;" 
            :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + pagina.id + '/' + pagina.imagen"/>
            </div>
            <div class="container">
                <div class="page-header__inner">
                    <h2>{{ pagina.nombre }}</h2>
                    
                </div>
            </div>
        </section>        
        <v-container>            
            <v-row>
                <v-col cols="12" lg="8" xl="8">
                    <div class="work-details__content-left" v-html="pagina.contenido_principal">

                    </div>
                </v-col>
                <v-col cols="12" lg="4" xl="4">
                    <div class="work-details__content-right">
                        <div class="work-details__details-box" style="background-color: var(--roofsie-base);">
                            <ul class="list-unstyled work-details__details-list">
                                <li style="margin-top: 15px;">
                                    <p class="work-details__client" style="margin-bottom: 0;">Secretario</p>
                                    <h4 class="work-details__name">{{ pagina.nombre_secretario }}</h4>
                                </li>
                                <li style="margin-top: 15px;">
                                    <p class="work-details__client" style="margin-bottom: 0;">Direccion:</p>
                                    <h4 class="work-details__name">
                                        <a @click="dialog_ubicacion_vista = true" style="color:black !important;">
                                            {{ pagina.direccion }}
                                        </a>
                                    </h4>
                                </li>
                                <li style="margin-top: 15px;">
                                    <p class="work-details__client" style="margin-bottom: 0;">Mail:</p>
                                    <h4 class="work-details__name">{{ pagina.mail }}</h4>
                                </li>
                                <li style="margin-top: 15px;">
                                    <p class="work-details__client" style="margin-bottom: 0;">Telefono:</p>
                                    <h4 class="work-details__name">{{ pagina.telefono }}</h4>
                                </li>
                                <li style="margin-top: 15px;">
                                    <p class="work-details__client" style="margin-bottom: 0;">Horario de atención:</p>
                                    <h4 class="work-details__name">{{ pagina.horario_atension }}</h4>
                                </li>
                            </ul>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="dialog_ubicacion_vista" persistent max-width="60%">
            <template v-slot:activator="{ on, attrs }">
            </template>
            <v-card>
                <v-card-title class="text-h5" style="text-align:center; display: block;">
                    {{ this.pagina.nombre }}
                    <hr style="border: solid 1px lightgrey;
              margin-top: 10px;
              margin-bottom: 10px;" />
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" style="text-align:center;">
                            <p>{{ pagina.direccion }}</p>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" style="text-align:center;">
                            <div v-html="pagina.maps" class="map-responsive"></div>
                        </v-col>

                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog_ubicacion_vista = false">
                        Salir
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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