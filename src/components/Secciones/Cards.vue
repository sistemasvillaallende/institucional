<template>
    <v-container>
        <v-row v-if="seccion != null && seccion != 'undefined'">
            <v-col cols="12">
                <h2 
                    style="position: relative;                        
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
        <v-row v-if="cards != null && cards != 'undefined'" v-for="i in Math.ceil(cards.length / 3)" :key="i">
            <v-col cols="12" lg="4" xl="4" v-if="i * 3 - 3 < cards.length">
                <v-card class="mx-auto my-12" elevation="10">
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>
                    <v-img height="250"
                        :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + cards[i * 3 - 3].id_page + '/' + cards[i * 3 - 3].imagen">
                    </v-img>
                    <v-card-title>{{ cards[i * 3 - 3].titulo }}</v-card-title>
                    <v-card-text>
                        <div class="elipsis" v-html="cards[i * 3 - 3].bajada"></div>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-actions style="text-align:center; display:block; padding: 20px;">
                        <a :target="cards[i * 3 - 3].callToActionTarget" class="btn"
                            style="background-color:var(--roofsie-gray); color: var(--roofsie-white) !important;"
                            :href="cards[i * 3 - 3].callToActionlink" color="deep-purple lighten-2">
                            {{ cards[i * 3 - 3].callToActionTexto }}
                        </a>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" lg="4" xl="4" v-if="i * 3 - 2 < cards.length">
                <v-card class="mx-auto my-12" elevation="10">
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>
                    <v-img height="250"
                        :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + cards[i * 3 - 2].id_page + '/' + cards[i * 3 - 2].imagen">
                    </v-img>
                    <v-card-title>{{ cards[i * 3 - 2].titulo }}</v-card-title>
                    <v-card-text>
                        <div class="elipsis" v-html="cards[i * 3 - 2].bajada"></div>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-actions style="text-align:center; display:block; padding: 20px;">
                        <a :target="cards[i * 3 - 2].callToActionTarget" class="btn"
                            style="background-color:var(--roofsie-gray); color: var(--roofsie-white) !important;"
                            :href="cards[i * 3 - 2].callToActionlink" color="deep-purple lighten-2">
                            {{ cards[i * 3 - 2].callToActionTexto }}
                        </a>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" lg="4" xl="4" v-if="i * 3 - 1 < cards.length">
                <v-card class="mx-auto my-12" elevation="10">
                    <template slot="progress">
                        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                    </template>
                    <v-img height="250"
                        :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + cards[i * 3 - 1].id_page + '/' + cards[i * 3 - 1].imagen">
                    </v-img>
                    <v-card-title>{{ cards[i * 3 - 1].titulo }}</v-card-title>
                    <v-card-text>
                        <div class="elipsis" v-html="cards[i * 3 - 1].bajada"></div>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-actions style="text-align:center; display:block; padding: 20px;">
                        <a :target="cards[i * 3 - 1].callToActionTarget" class="btn"
                            style="background-color:var(--roofsie-gray); color: var(--roofsie-white) !important;"
                            :href="cards[i * 3 - 1].callToActionlink" color="deep-purple lighten-2">
                            {{ cards[i * 3 - 1].callToActionTexto }}
                        </a>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<style>
.elipsis {
    display: block;
    display: -webkit-box;
    max-width: 100%;
    margin: 0 auto;
    line-height: 1.5;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
<script>
export default {
    data: () => ({
        cards: null,
        filas: 0,
        seccion: null,
    }),
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
    async mounted() {
        try {
            this.seccion = (await this.$http.get("/Seccion/getByPk?pk=" + this.id)).data;
            this.cards = (await this.$http.get("/Card/readActivas?id_seccion=" + this.id)).data;
            if (this.cards != null && this.cards != 'undefined') {
                var cant = this.cards.length;
                if (cant / 4 < 1) {
                    this.filas = 1;
                }
                else {
                    var mod = cant % 4;
                    if (mod > 0) {
                        this.filas = cant + 1;
                    }
                    else {
                        this.filas = cant;
                    }
                }
            }
        } catch (error) { }
    },
    components: {

    },
}
</script>