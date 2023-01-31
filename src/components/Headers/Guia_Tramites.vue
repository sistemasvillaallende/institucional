<template>
    <header class="main-header-two clearfix" style="margin-top: -16px;">
        <div class="main-header-two__top" style="background-color:white;">
            <div class="container">
                <div>
                    <div class="main-header-two__top-left">
                        <p class="main-header-two__top-left-text"></p>
                    </div>
                    <div class="main-header-two__top-right" style="min-height:40px;">

                    </div>
                </div>
            </div>
        </div>

        <div class="main-header-two__middle" style="background-color: var(--roofsie-blanco);">
            <div class="container">
                <div class="main-header-two__middle-inner clearfix">
                    <div class="main-header-two__shape-1" style="border-top: 144px solid #0F99CA;"></div>
                    <div class="main-header-two__shape-2" style="border-top: 96px solid var(--roofsie-white);"></div>
                    <div class="main-header-two__shape-3"></div>
                    <div class="main-header-two__shape-4" style="background-color: var(--roofsie-base);"></div>
                    <div class="main-header-two__shape-5"></div>
                    <div class="main-header-two__shape-6" style="border-bottom: 93px solid var(--roofsie-white);"></div>
                    <div class="main-header-two__shape-7"></div>
                    <div class="main-header-two__logo">
                        <a  href="../Guia"><img src="../../assets/img/LogoVertical2.png" alt=""></a>
                    </div>
                    <div class="main-header-two__address">
                        <h2 class="section-title__title"
                            style="color: var(--roofsie-gray); font-size: 40px; line-height: 10px; text-decoration-line: overline;">
                            <img src="../../assets/img/Tramites.png" style="height: 70px; margin-top: -20px;" /> Guia de
                            Tramites
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <nav class="main-menu main-menu-two clearfix">
            <div class="main-menu-two__wrapper clearfix">
                <div class="container">
                    <div class="main-menu-two__wrapper-inner clearfix"
                        style="min-height: 90px; max-height:90px;  background-color: var(--roofsie-base);">
                        <div class="main-menu-two__wrapper-inner-bg" style="background-color: var(--roofsie-base);">
                        </div>
                        <div class="main-menu-two__right" style="float:none; display:block;">
                            <div class="main-menu-two__search-box" style="padding: 20px 0;">
                                <div class="input-group mb-3" style="height: 50px;">
                                    <input type="text" class="form-control" placeholder="¿Qué trámites estas buscando?"
                                        aria-label="Recipient's username" aria-describedby="button-addon2">
                                    <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i
                                            class="fa fa-search" aria-hidden="true"></i>&nbsp; Buscar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>
<style>
@import '../../assets/css/css2.css';
@import '../../assets/css/bootstrap.min.css';
@import '../../assets/css/style.css';
@import '../../assets/css/roofsie.css';
@import '../../assets/css/roofsie-responsive.css';
</style>
<script>
export default {
    data: () => ({

    }),
}
</script>
