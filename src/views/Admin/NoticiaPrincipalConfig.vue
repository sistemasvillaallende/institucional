<template>
    <div v-if="noticia_principal != null && noticia_principal != 'undefined'">
        <Header></Header>
        <div class="about-one__shape float-bob-x">
            <img :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_0/about-one-shape.png'" alt="">
        </div>
        <v-container style="margin-top:50px; border: solid 1px lightgray; min-height: 400px;
                                        border-radius: 15px; margin-bottom: 50px;">
            <v-row>
                <v-col cols="6">
                    <h3>Noticia Principal</h3>
                </v-col>
                <v-col cols="6" style="text-align:right;">
                    <v-btn class="btn btn-primary" @click="salir()">Salir</v-btn>&nbsp;
                    <v-btn class="btn btn-primary" @click="update()">Guardar</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <hr />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-row>
                        <v-col cols="8">
                            <v-file-input style="padding-top:5px;" v-model="files" placeholder="Subir imagenes"
                                label="Subir imagenes" prepend-icon="fa fa-upload">
                                <template v-slot:selection="{ text }">
                                    <v-chip small label color="primary">
                                        {{ text }}
                                    </v-chip>
                                </template>
                            </v-file-input>
                        </v-col>
                        <v-col cols="4">
                            <v-btn @click="subirArchivos()" class="btn btn-primary">Subir Imagen</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <img :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/Pagina_0/' + noticia_principal.img"
                                alt="">
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="6">
                    <div class="about-one__right">
                        <div class="section-title text-left">
                            <label>Encabezado</label>
                            <v-text-field style="width:100%;" solo v-model="noticia_principal.encabezado">
                            </v-text-field>
                            <label>Titulo</label>
                            <v-text-field style="width:100%;" solo v-model="noticia_principal.titulo">
                            </v-text-field>
                            <editor v-model="noticia_principal.contenido" api-key="nca4ocr8a1sigzxs11jh85krowwvk01rdgz6xqgi71ra6kw6" :init="{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                    'code',
                                    'image'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic underline  backcolor | \
                                                            alignleft aligncenter alignright alignjustify | \
                                                            bullist numlist outdent indent | removeformat | help | code | image',
                                extended_valid_elements: 'a[class|name|href|target|title|onclick|rel],script[type|src],iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder],img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name]'
                            
                            }" />
                        </div>


                    </div>
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

<script>
import Header from "../../components/Headers/Tramites_Paso.vue";
import Footer from "../../components/Footer.vue";
import Editor from '@tinymce/tinymce-vue'
export default {
    data: () => ({
        img: "",
        encabezado: "",
        titulo: "",
        contenido: "",
        noticia_principal: null,
        dialogOk: false,
        files: [],
    }),
    components: {
        Header,
        Footer,
        Editor,
    },
    async mounted() {
        try {
            if (this.$storage.getTextOrInt("codUsuario") == null) {
                this.$router.push("/");
            }
            this.noticia_principal = (await this.$http.get("/NoticiaPrincipal/getByPk")).data;
        } catch (error) { }
    },
    methods: {
        salir() {
            this.$router.push("/Home/");
        },
        async update() {
            this.noticia_principal = (await this.$http.post("/NoticiaPrincipal/update", this.noticia_principal)).data;
            this.dialogOk = true;
        },
        async subirArchivos() {
            let InstFormData = new FormData();
            if (this.files != null && this.files != 'undefined' && this.files != '') {
                InstFormData.append('file', this.files);
                this.pagina = (await this.$http.post("/NoticiaPrincipal/setImg", InstFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })).data;
                this.files = null;
            }
            this.dialogOk = true;
        },
    },
}
</script>