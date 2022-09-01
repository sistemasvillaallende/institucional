<template>
    <v-container fluid style="padding-top:80px; padding-bottom: 80px; background: rgb(198,198,197);
background: linear-gradient(17deg, rgba(198,198,197,1) 30%, rgba(255,251,235,1) 70%);">
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
                    <v-tabs v-model="tab">
                        <v-tab href="#tab-1">Item One</v-tab>
                        <v-tab href="#tab-2">Item Two</v-tab>
                        <v-tab href="#tab-3">Item Three</v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <v-tab-item value="tab-1">
                            <v-card flat>
                                <v-card-text>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item value="tab-2">
                            <v-card flat>
                                <v-card-text>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item value="tab-3">
                            <v-card flat>
                                <v-card-text>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
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