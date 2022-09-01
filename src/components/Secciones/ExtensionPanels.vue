<template>
    <v-container fluid style="padding-top:80px; padding-bottom: 80px; background-color: rgb(244, 240, 237);">
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
                    <v-expansion-panels>
                        <v-expansion-panel v-for="(item, i) in 5" :key="i">
                            <v-expansion-panel-header>
                                Item
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        news: null,
    }),
    async mounted() {
        try {
            this.news = (await this.$http.get("/News/readHome")).data;
        } catch (error) { }
    },
}
</script>