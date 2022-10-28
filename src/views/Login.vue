<template>
    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Web Institucional - Inicio de Sesion</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field v-model="usuario" label="Usuario" type="text"></v-text-field>
                                    <v-text-field v-model="password" label="Contraseña" type="password">
                                    </v-text-field>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="validate()">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title style="background-color: red !important;
    color: white;">
                    Error de autenticacion
                </v-card-title>


                <v-divider></v-divider>

                <v-card-actions style="padding-top:50px; text-align:center; display:block;">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                        Salir
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
export default {
    data: () => {
        return {
            dialog: false,
            name: 'Login',
            usuario: '',
            password: "",
            objUser: null,
            props: {
                source: String,
            },
        };
    },
    methods: {
        async validate() {
            if (this.usuario == "") {
                this.txtError = "Por favor ingrese su nombre de usuario";
                this.dialogError = true;
                return;
            }
            if (this.password == "") {
                this.txtError = "Por favor ingrese su contraseña";
                this.dialogError = true;
                return;
            }
            let post2 = {
                nombre: this.usuario,
                PASSWD: this.password,
                EMAIL:'',
                nombre_oficina: '',
                nombre_completo: '',
            };
            this.objUser = (
                await this.$http.post("/Login/Validar", post2)
            ).data;

            if (this.objUser) {
                this.$storage.set("codUsuario", this.objUser.cod_usuario);
                this.$storage.set("nombre", this.objUser.nombre);
                this.$storage.set("nombre_completo", this.objUser.nombre_completo);
                this.$forceUpdate();
                this.$router.push("/Home");
            } else {
                this.$storage.set("codUsuario", null);
                this.$storage.set("nombre", null);
                this.$storage.set("nombre_completo", null);
                this.dialog = true;
            }
        },

    }
};
</script>

<style>
</style>
