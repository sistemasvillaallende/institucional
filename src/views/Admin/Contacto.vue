<template>
    <div>
        <Header></Header>
        <v-container style="padding-bottom: 40px; margin-bottom:60px; margin-top:30px; border: solid 1px lightgray;
                                        border-radius: 15px;">
            <v-row>
                <v-col cols="8">
                    <v-text-field v-model="Institucional.direccion" placeholder="Dirección"></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field v-model="Institucional.codigo_postal" placeholder="Código Postal"></v-text-field>
                </v-col>
            </v-row>
            <!--<v-row>
                <v-col cols="4">
                    <v-select v-model="select_ciudad" :items="items_ciudad" item-text="ciudad" label="Ciudad"
                        single-line>
                    </v-select>
                </v-col>
                <v-col cols="4">
                    <v-select v-model="select_provincia" :items="select_provincia" item-text="provincia"
                        label="Provincia" single-line>
                    </v-select>
                </v-col>
                <v-col cols="4">
                    <v-select v-model="select_pais" :items="items_pais" item-text="pais" label="Pais" single-line>
                    </v-select>
                </v-col>
            </v-row>-->
            <v-row>
                <v-col cols="8">
                    <v-text-field v-model="Institucional.mail" placeholder="Mail"></v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field v-model="Institucional.telefono" placeholder="Telefono"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="3">
                    <v-file-input style="padding-top:5px;" v-model="files" placeholder="Cambiar Logo" multiple
                        truncate-length="15" label="Cambiar Logo" prepend-icon="fa fa-upload">
                        <template v-slot:selection="{ text }">
                            <v-chip small label color="primary">
                                {{ text }}
                            </v-chip>
                        </template>
                    </v-file-input>
                    <img :src="$urlBase + '/Assets/Archivos_Pagina_Institucional/' + Institucional.logo"
                        style="width: 80%;" />
                </v-col>
                <v-col cols="1">
                    <v-btn class="mx-2" fab dark color="indigo" @click="subirArchivos()">
                        <v-icon dark class="fa fa-upload"></v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="8">
                    <h5>Redes Sociales</h5>
                    <hr />
                    <v-text-field v-model="Institucional.facebook" prepend-icon="fa-brands fa-facebook"></v-text-field>
                    <v-text-field v-model="Institucional.twitter" prepend-icon="fa-brands fa-twitter"></v-text-field>
                    <v-text-field v-model="Institucional.instagram" prepend-icon="fa-brands fa-instagram">
                    </v-text-field>
                    <v-text-field v-model="Institucional.youtube" prepend-icon="fa-brands fa-youtube"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" style="text-align:right;">
                    <v-btn class="btn btn-primary" href="/Home/">Salir</v-btn>&nbsp;
                    <v-btn class="btn btn-primary" @click="update()">Guardar</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <Footer></Footer>
        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogOk">
            <template v-slot:default="dialogOk">
                <v-card>
                    <v-toolbar style="background-color: green !important; border-color: green !important;" dark>Felicidades!</v-toolbar>
                    <v-card-text>
                        <div style="margin-top: 20px; text-align: center; color: black; font-size: 20px; font-family: 'DM Sans';">
                            Los datos se actualizaron de forma correcta
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="dialogOk.value = false">Salir</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <v-dialog transition="dialog-top-transition" max-width="600" v-model="dialogError">
            <template v-slot:default="dialogError">
                <v-card>
                    <v-toolbar style="background-color: red !important; border-color: red !important;" dark>Error!</v-toolbar>
                    <v-card-text>
                        <div style="margin-top: 20px; text-align: center; color: black; font-size: 20px; font-family: 'DM Sans';">
                            <v-text-field v-model="msjError"></v-text-field>
                        </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="dialogError.value = false">Salir</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>        
    </div>
</template>
<style>
a:hover,
a:focus {
    box-shadow: 0 1px var(--roofsie-gray) !important;
}
</style>
<script>
import Header from "../../components/Headers/Tramites_Paso.vue";
import Footer from "../../components/Footer.vue";
export default {
    data: () => {
        return {
            msjError: "",
            dialogError: false,
            dialogRedes: false,
            dialogOk: false,
            files: [],
            Institucional: {
                id: 0,
                nombre_sitio: "",
                direccion: "",
                codigo_postal: "",
                ciudad: "",
                provincia: "",
                pais: "",
                telefono: "",
                mail: "",
                logo: "",
                facebook: "",
                instagram: "",
                twitter: "",
                youtube: "",
            },
            redes: {
                id: 0,
                icono: "",
                nombre: "",
                link: "",
            },
            select_ciudad: { ciudad: 'Villa Allende' },
            items_ciudad: [
                { ciudad: 'Villa Allende' },
            ],
            select_provincia: { provincia: 'Cordoba' },
            items_provincia: [
                { provincia: 'Cordoba' },
            ],
            select_pais: { pais: 'Argentina' },
            items_pais: [
                { pais: 'Argentina' },
            ],
        };
    },
    components: {
        Header,
        Footer,
    },
    async mounted() {
        try {
            if (this.$storage.getTextOrInt("codUsuario") == null) {
                this.$router.push("/");
            }
            this.Institucional = (await this.$http.get("/Institucional/read")).data;
        } catch (error) { }
    },
    methods: {
        addRedes() {
            this.dialogRedes = true;
        },
        async subirArchivos() {
            let InstFormData = new FormData();
            if (this.files != null && this.files != 'undefined' && this.files != '') {
                for (var index = 0; index < this.files.length; index++) {
                    InstFormData.append('file[]', this.files[index]);
                }
                this.Institucional = (await this.$http.post("/Institucional/UploadFile", InstFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })).data;
                this.files = null;
                this.dialogOk = true;
            }


        },
        async update() {
            if(this.Institucional.direccion.trim() == ''){
                this.msjError = "Por favor ingrese la direccion";
                this.dialogError = true;
                return;
            }
            if(this.Institucional.codigo_postal.trim() == ''){
                this.msjError = "Por favor ingrese el codigo postal";
                this.dialogError = true;
                return;
            }
            if(this.Institucional.telefono.trim() == ''){
                this.msjError = "Por favor ingrese el telefono";
                this.dialogError = true;
                return;
            }
            if(this.Institucional.mail.trim() == ''){
                this.msjError = "Por favor ingrese el mail";
                this.dialogError = true;
                return;
            }                                    
            let post = {
                id: 1,
                direccion: this.Institucional.direccion,
                codigo_postal: this.Institucional.codigo_postal,
                telefono: this.Institucional.telefono,
                mail: this.Institucional.mail,
                facebook: this.Institucional.facebook,
                instagram: this.Institucional.instagram,
                twitter: this.Institucional.twitter,
                youtube: this.Institucional.youtube,
            };
            this.Institucional = (await this.$http.post("/Institucional/Update", post)).data;
            this.dialogOk = true;
        },
        async saveRedes() {

        },
    },
};
</script>