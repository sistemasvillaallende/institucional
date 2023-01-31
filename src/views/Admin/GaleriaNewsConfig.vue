<template>
    <div v-if="imagenes != null && imagenes != 'undefined'">
        <Header></Header>
        <v-container style="margin-top:50px; border: solid 1px lightgray;
                                        border-radius: 15px;">
            <v-row>
                <v-col cols="12" style="text-align:right;">
                    <v-btn class="btn btn-primary" @click="salir()">Salir</v-btn>&nbsp;
                </v-col>
            </v-row>
        </v-container>
        <v-container style="margin-top:50px; border: solid 1px lightgray;
            border-radius: 15px; margin-bottom: 50px;">
            <v-row>
                <v-col cols="12">
                    <h3>Contenido Galeria</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <hr />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="8">
                    <v-file-input style="padding-top:5px;" v-model="files" multiple truncate-length="15"
                        placeholder="Subir imagenes" label="Subir imagenes" prepend-icon="mdi-paperclip">
                        <template v-slot:selection="{ text }">
                            <v-chip small label color="primary">
                                {{ text }}
                            </v-chip>
                        </template>
                    </v-file-input>
                </v-col>
                <v-col cols="4" style="text-align:right;">
                    <v-btn @click="subirArchivos()" class="btn btn-primary">Subir Archivos</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" style="text-align:right;" v-if="checkedNames.length > 0">
                    <v-btn @click="logicDelete()" class="btn btn-danger">Eliminar Seleccionadas</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <table style="width: 100%">
                        <Draggable :list="imagenes" tag="tbody" @end="saveorden()">
                            <tr v-for="(item, index) in imagenes" :key="index" style="border: solid 1px lightgray;">
                                <td><img style="height:80px;"
                                        :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_' + item.categoria + '/' + item.img"
                                        aspect-ratio="1" class="grey lighten-2" /></td>
                                <td>
                                    <input type="checkbox" class="check" :id="item.id" :value="item.id"
                                        v-model="checkedNames">
                                </td>
                            </tr>
                        </Draggable>
                    </table>
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
        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogDelete">
            <template v-slot:default="dialogDelete">
                <v-card>
                    <v-toolbar style="
              background-color: red !important;
              border-color: red !important;
            " dark>
                        <v-card-title>Confirmar</v-card-title>
                    </v-toolbar>
                    <v-card-text>
                        <div style="
                margin-top: 20px;
                text-align: center;
                color: black;
                font-size: 20px;
                font-family: 'DM Sans';
              ">
                            ¿Esta seguro de eliminar las imagenes seleccionadas?
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="dialogDelete.value = false">Cancelar</v-btn>
                        <v-btn text @click="deleteImagenes()">Eliminar</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>
<style>
.check {
    transform: scale(1.8);
    box-shadow: none !important;
}

.v-tab--active {
    background-color: var(--roofsie-gray) !important;
    color: var(--roofsie-white) !important;
    font-weight: 800;
}
</style>
<script>
import Draggable from "vuedraggable";
import Header from "../../components/Headers/Tramites_Paso.vue";
import Footer from "../../components/Footer.vue";
import Editor from '@tinymce/tinymce-vue'
export default {
    data: () => {
        return {
            checkedNames: [],
            tab: null,
            dialogDelete: false,
            dialogOk: false,
            files: [],
            dialogContenido: false,
            closeOnContentClick: false,
            seccion: null,
            id_contenido: 0,
            titulo_contenido: "",
            contenido_contenido: "",
            imagenes: null,
        };
    },
    components: {
        Header,
        Footer,
        Draggable,
        Editor,
    },
    async mounted() {
        try {
            if (this.$storage.getTextOrInt("codUsuario") == null) {
                this.$router.push("/");
            }
            this.imagenes = (await this.$http.get("/News/getImages?idNews=" + this.$route.params.id)).data;
        } catch (error) { }
    },
    methods: {
        salir() {
            this.$router.push("/Home/");
        },
        async saveorden() {
            (await this.$http.post("/News/reordenarGaleria", this.imagenes));
        },
        async deleteImagenes() {
            (await this.$http.post("/News/deleteGaleria", this.checkedNames));
            this.dialogDelete = false;
            this.imagenes = (await this.$http.get("/News/getImages?idNews=" + this.$route.params.id)).data;
            this.checkedNames = [];
        },
        logicDelete(id) {
            this.id = id;
            this.dialogDelete = true;
        },
        async subirArchivos() {
            let InstFormData = new FormData();

            if (this.files != null && this.files != 'undefined' && this.files != '') {
                //InstFormData.append('file', this.files);
                for (var index = 0; index < this.files.length; index++) {
                    InstFormData.append('file[]', this.files[index]);
                }
                InstFormData.append('id_news', this.$route.params.id);
                this.pagina = (await this.$http.post("/News/UploadGaleria", InstFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })).data;
                this.files = null;
            }
            this.imagenes = (await this.$http.get("/News/getImages?idNews=" + this.$route.params.id)).data;
            this.dialogOk = true;

        },
    },
};
</script>