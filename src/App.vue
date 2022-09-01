<template>
  <v-app id="app">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<style>
h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
a,
div {
  word-break: break-word !important;
}
.v-application a {
    color: #6F6F6E !important;
}
.v-tab--active {
  background-color: white !important;
  color: black !important;
  font-weight: 800;
}

.v-tabs-slider {
  display: none !important;
}

.block-ellipsis {
  display: block;
  display: -webkit-box;
  max-width: 100%;
  height: 43px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 1;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.block-ellipsis3 {
  display: grid !important;
  display: -webkit-box;
  max-width: 100%;
  margin: 0 auto;
  font-size: 14px;
  line-height: 1;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 128px !important;
}
</style>
<script>
import Carrusel from "../src/components/Carrusel.vue";
export default {
  name: "App",
  components: {
    Carrusel,
  },

  data: () => ({
    drawer: false,
    drawer2: false,
    nombre_completo: '',
  }),
  mounted() {
    try {
      this.nombre_completo = this.$storage.getTextOrInt("nombre_completo");
    } catch (error) { }
  },
  methods: {
    cerrar_sesion() {
      this.$storage.set("codUsuario", null);
      this.$storage.set("nombre", null);
      this.$storage.set("nombre_completo", null);
      this.$forceUpdate();
      this.$router.push("/");
    },
    inicio(){
      this.$router.push("/Home");
    }
  }
};
</script>
