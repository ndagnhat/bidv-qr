<script setup>
import InputQRPayment from '../components/InputQRPayment.vue'
</script>

<template>
    <div class="grid-container">
        <div class="item1">
            <InputQRPayment />
        </div>
        <div class="item2">
            <InputQRPayment />
        </div>
    </div>
</template>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: auto;
    gap: 10px;
}

@media (min-width: 768px) {
    .grid-container {
        grid-template-columns: auto auto;
    }

}

@media (min-width: 960px) {}
</style>