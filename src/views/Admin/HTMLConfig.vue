<template>
    <div v-if="seccion != null && seccion != 'undefined'">
        <Header></Header>
        <v-container style="margin-top:50px; border: solid 1px lightgray;
                                        border-radius: 15px;">
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="seccion.titulo" placeholder="Titulo de la Sección"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="seccion.subtitulo" placeholder="Subtitulo de la Sección"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" style="text-align:right;">
                    <v-btn class="btn btn-primary" @click="salir()">Salir</v-btn>&nbsp;
                    <v-btn class="btn btn-primary" @click="updateSeccion()">Guardar</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-container style="margin-top:50px; border: solid 1px lightgray;
                                        border-radius: 15px; margin-bottom: 50px;">
            <v-row>
                <v-col cols="8">
                    <h3>Contenido Sección</h3>
                </v-col>
                <v-col cols="4">
                    <SubirArchivos :id_contenido="this.id_contenido" style="margin-top: 20px; width: 160px;">
                    </SubirArchivos>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <VueEditor v-model="html"></VueEditor>
                </v-col>
                <v-col cols="12" style="text-align:right;">
                    <v-btn @click="guardarContenido()" class="btn btn-primary">Guardar</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <Footer></Footer>
        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogOk">
            <template v-slot:default="dialogOk">
                <v-card>
                    <v-toolbar style="
              background-color: green !important;
              border-color: green !important;
            " dark>Felicidades!</v-toolbar>
                    <v-card-text>
                        <div style="
                margin-top: 20px;
                text-align: center;
                color: black;
                font-size: 20px;
                font-family: 'DM Sans';
              ">
                            Los datos se actualizaron de forma correcta
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="dialogOk.value = false">Salir</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>




    </div>
</template>
<style scoped>

</style>
<script>
import Draggable from "vuedraggable";
import Header from "../../components/Headers/Tramites_Paso.vue";
import Footer from "../../components/Footer.vue";
import { VueEditor } from 'vue2-editor'
import SubirArchivos from "../../components/SubirArchivos.vue";
export default {
    data: () => {
        return {
            dialogDelete: false,
            dialogOk: false,
            dialogContenido: false,
            closeOnContentClick: false,
            seccion: null,
            id_contenido: 0,
            html: "",
        };
    },
    components: {
        Header,
        Footer,
        Draggable,
        VueEditor,
        SubirArchivos,
    },
    async mounted() {
        try {
            if (this.$storage.getTextOrInt("codUsuario") == null) {
                this.$router.push("/");
            }
            this.seccion = (await this.$http.get("/Seccion/getByPk?pk=" + this.$route.params.id)).data;
            if (this.seccion.lstContenido.length > 0) {
                this.id_contenido = this.seccion.lstContenido[0].id;
                this.html = this.seccion.lstContenido[0].html;
            }
        } catch (error) { }
    },
    methods: {
        salir() {
            this.$router.push("/PageConfig/" + this.seccion.id_page);
        },
        async updateSeccion() {
            let post = {
                id: this.$route.params.id,
                titulo: this.seccion.titulo,
                subtitulo: this.seccion.subtitulo,
                _tipo: "",
            };
            this.seccion = (await this.$http.post("/Seccion/update", post)).data;
            this.dialogOk = true;
        },

        async guardarContenido() {
            let post = {
                id: this.id_contenido,
                html: this.html,
                id_seccion: this.$route.params.id,
            };
            if (this.id_contenido == 0) {
                this.seccion = (await this.$http.post("/Seccion/insertContenido", post)).data;
                this.id_contenido = this.seccion.lstContenido[0].id;
            }
            else {
                this.seccion = (await this.$http.post("/Seccion/updateContenido", post)).data;
                this.id_contenido = this.seccion.lstContenido[0].id;
            }
            this.dialogOk = true;
        },
    },
};
</script>