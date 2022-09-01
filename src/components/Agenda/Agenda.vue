<template>
    <v-container fluid style="padding-top:80px; padding-bottom: 80px; background-color: rgb(244, 240, 237);">
        <v-container>
            <v-row>
                <v-col cols="12" style="margin-bottom: 25px;">
                    <h2 style="position: relative;
                        font-size: 40px;
                        color: #6f6f6e;
                        font-weight: 800;
                        line-height: 40px;
                        margin-bottom: 10px;">Agenda</h2>
                    <hr />
                    <v-alert border="top"
                        style="background-color: #ffd142 !important; color: #1c1b1f; font-weight: 700; text-align: center;"
                        dark>
                        AGOSTO
                    </v-alert>
                </v-col>
            </v-row>

            <article class="mec-event-article  mec-clear  mec-divider-toggle mec-toggle-202207-99626" v-for="i in 3"
                :key="i">
                <Evento></Evento>
            </article>
        </v-container>
    </v-container>

</template>
<script>
import Evento from "./Evento.vue";
export default {
    data: () => ({
        news: null,
    }),
    components: {
        Evento,
    },
    async mounted() {
        try {
            this.news = (await this.$http.get("/News/readHome")).data;
        } catch (error) { }
    },
}
</script>