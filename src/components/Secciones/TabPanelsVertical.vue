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
                    <v-tabs vertical>
                        <v-tab>Item One</v-tab>
                        <v-tab>Item Two</v-tab>
                        <v-tab>Item Three</v-tab>
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
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