<template>
    <div class="container-fluid py-5">
        <div class="d-flex justify-content-center align-items-center flex-column">
            <div class="row mb-4">
                <a href="" class="col-2">
                    <i class="fa-brands fa-facebook"></i>
                </a>
                <a href="" class="col-2">
                    <i class="fa-brands fa-youtube"></i>
                </a>
                <a href="" class="col-2">
                    <i class="fa-solid fa-location-dot"></i>
                </a>
                <a href="" class="col-2">
                    <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="" class="col-2">
                    <i class="fa-brands fa-github"></i>
                </a>
                <a href="" class="col-2">
                    <i class="fa-brands fa-tiktok"></i>
                </a>
            </div>
            <form action="" class="w-25 d-flex justify-content-center align-items-center flex-sm-nowrap flex-wrap gap-2">
                <input type="text" name="" v-model="register" class="form-control w-100">
                <button class="btn btn-primary" type="submit">Register</button>
            </form>
            <div class="my-3">
                <p class="brand">NodeHome</p>
            </div>
            <div class="d-flex">
                <p class="me-2">
                    <b>
                        Tel:
                    </b>
                    (+84) 082 938 8509
                </p>
                <p>
                    <b>
                        |
                    </b>
                </p>

                <p class="ms-2">
                    <b>
                        Email:
                    </b>
                    nhanb1910113@student.ctu.edu.vn
                </p>
            </div>
            <div class="mb-2">
                <p class=""> 2A-4A Ton Duc Thang Street District 1, Ho Chi Minh, Vietnam </p>
            </div>
            <div class="mt-2">
                <p class="">Copyright 2023 © All rights Reserved. Design by DamTrongNhan</p>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    data() {
        return { register: "customer@gmail.com" }
    }
}



</script>

<style scoped>
* {
    font-family: Arial, Helvetica, sans-serif;
}

.container-fluid {
    background-color: #0c713d;
}

p {
    font-size: 20px;
    margin: 0;
    color: white;
}

.fa-brands,
.fa-solid {
    font-size: 40px;
    color: white;
    transition: all 0.2s linear;

}

.brand {
    font-size: 50px;
    font-family: Georgia, 'Times New Roman', Times, serif;
}

.fa-brands:hover,
.fa-solid:hover {
    transform: scale(1.2);
    color: black;
}
</style>