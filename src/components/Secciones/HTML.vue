<template>
    <v-container fluid style="padding-top:30px; padding-bottom: 30px;">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <div v-html="contenido"></div>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        contenido: null,
    }),
    async mounted() {
        try {
            this.news = (await this.$http.get("/News/readHome")).data;
        } catch (error) { }
    },
}
</script>