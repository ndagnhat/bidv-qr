<script setup>

const emit = defineEmits(['selectedQrType'])

</script>

<template>
    <div class="container">
        <div class="item w3-border w3-hover-border w3-round-large" @click="$emit('selectedQrType', 'payment')"><img
                src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/cas/v1/payment.svg" alt=""
                width="42" height="42" /> <span>QR Payment</span></div>
        <div class="item w3-border w3-hover-border w3-round-large" @click="$emit('selectedQrType', 'link')">Link</div>
        <div class="item w3-border w3-hover-border w3-round-large" @click="$emit('selectedQrType', '1')">Text</div>
        <div class="item w3-border w3-hover-border w3-round-large" @click="$emit('selectedQrType', '1')">Wifi</div>
        <div class="item w3-border w3-hover-border w3-round-large" @click="$emit('selectedQrType', '1')">5</div>
        <div class="item w3-border w3-hover-border w3-round-large" @click="$emit('selectedQrType', '1')">6</div>
        <div class="item w3-border w3-hover-border w3-round-large" @click="$emit('selectedQrType', '1')">7</div>
        <div class="item w3-border w3-hover-border w3-round-large" @click="$emit('selectedQrType', '1')">8</div>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: auto;
    padding: 10px 0;
    gap: 16px;
}

@media (min-width: 520px) {
    .container {
    padding: 10px 16px;
    }
}

@media (min-width: 768px) {
    .container {
        grid-template-columns: 5fr 5fr;
    }
}

.item {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    font-size: 17px;
    font-weight: 600;
    min-height: 62px;
    cursor: pointer;
}

.item img {
    margin-right: 15px;
}
</style>