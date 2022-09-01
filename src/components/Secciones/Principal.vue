<template>
    <v-container fluid style="padding-top:50px; padding-bottom: 30px;">
        <v-container>
            <v-row>
                <v-col cols="12" lg="8" xl="8">
                    <div class="work-details__content-left">
                        <h3 class="work-details__title">Modern roofing style</h3>
                        <p class="work-details__text-1">Tincidunt elit magnis nulla facilisis sagittis sapien nunc amet
                            ultrices dolores sit ipsum velit purus aliquet massa fringilla leo orci. Sapien nunc amet
                            ultrices, dolores sit ipsum velit massa fringilla leo orci dolors sit amet elit amet. </p>
                        <p class="work-details__text-2">It is a long established fact that a reader will be distracted
                            by the readable content of a page when looking at its layout. The point of using Lorem Ipsum
                            is that it has a more-or-less normal distribution of letters, as opposed to using 'Content
                            here, content here', making it look like readable English. Many desktop publishing packages
                            and web page editors now use Lorem Ipsum as their default model text, and a search for
                            'lorem ipsum' will uncover many web sites still in their infancy. Various versions have
                            evolved over the years, sometimes by accident, humour and the like.</p>
                    </div>
                </v-col>
                <v-col cols="12" lg="4" xl="4">
                    <div class="work-details__content-right">
                        <div class="work-details__details-box" style="background-color: #f5f0ed;">
                            <ul class="list-unstyled work-details__details-list">
                                <li style="margin-top: 15px;">
                                    <p class="work-details__client" style="margin-bottom: 0;">Secretario</p>
                                    <h4 class="work-details__name">Jessica Brown</h4>
                                </li>
                                <li style="margin-top: 15px;">
                                    <p class="work-details__client" style="margin-bottom: 0;">Direccion:</p>
                                    <h4 class="work-details__name">Roofing, installation</h4>
                                </li>
                                <li style="margin-top: 15px;">
                                    <p class="work-details__client" style="margin-bottom: 0;">Mail:</p>
                                    <h4 class="work-details__name">20 April, 2022</h4>
                                </li>
                                <li style="margin-top: 15px;">
                                    <p class="work-details__client" style="margin-bottom: 0;">Telefono:</p>
                                    <h4 class="work-details__name">20 April, 2022</h4>
                                </li>   
                                <li style="margin-top: 15px;">
                                    <p class="work-details__client" style="margin-bottom: 0;">Horario de atención:</p>
                                    <h4 class="work-details__name">20 April, 2022</h4>
                                </li>                                                               
                            </ul>
                        </div>
                    </div>
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