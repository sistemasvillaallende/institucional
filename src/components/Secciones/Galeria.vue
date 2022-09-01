<template>
    <v-container fluid style="padding-top:80px; padding-bottom: 80px;">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h2 style="position: relative;
                        font-size: 40px;
                        color: #6f6f6e;
                        font-weight: 800;
                        line-height: 40px;
                        margin-bottom: 10px;">Titulo</h2>
                    <p style="
                        font-size: 18px;
                        color: #6f6f6e;
                        line-height: 18px;
                        margin-bottom: 10px;">Subtitulo</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-tabs color="deep-purple accent-4" right>
                            <v-tab>Landscape</v-tab>
                            <v-tab>City</v-tab>
                            <v-tab>Abstract</v-tab>

                            <v-tab-item v-for="n in 3" :key="n">
                                <v-container fluid>
                                    <v-row>
                                        <v-col v-for="i in 6" :key="i" cols="12" md="4">
                                            <v-img :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                                                :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                                                aspect-ratio="1"></v-img>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-tab-item>
                        </v-tabs>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>
<style scoped>
.v-tab--active {
    background-color: #6f6f6e !important;
    color: #ffd142 !important;
    font-weight: 800;
}
</style>
<script>
export default {
    data: () => ({
        news: null,
        tab: null
    }),
    async mounted() {
        try {
            this.news = (await this.$http.get("/News/readHome")).data;
        } catch (error) { }
    },
}
</script>