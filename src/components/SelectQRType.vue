<script setup>

const emit = defineEmits(['selectedQrType'])

</script>

<template>
    <div class="container">
        <div class="grid-item w3-border w3-hover-border w3-round-xlarge" @click="$emit('selectedQrType', 'payment')"><img src="https://support.apple.com/library/content/dam/edam/applecare/images/en_US/cas/v1/payment.svg" alt="" width="42" height="42" /> <span>QR Payment</span></div>
        <div class="grid-item w3-border w3-hover-border w3-round-xlarge" @click="$emit('selectedQrType', 'link')">Link</div>
        <div class="grid-item w3-border w3-hover-border w3-round-xlarge" @click="$emit('selectedQrType', '1')">Text</div>
        <div class="grid-item w3-border w3-hover-border w3-round-xlarge" @click="$emit('selectedQrType', '1')">Wifi</div>
        <div class="grid-item w3-border w3-hover-border w3-round-xlarge" @click="$emit('selectedQrType', '1')">5</div>
        <div class="grid-item w3-border w3-hover-border w3-round-xlarge" @click="$emit('selectedQrType', '1')">6</div>
        <div class="grid-item w3-border w3-hover-border w3-round-xlarge" @click="$emit('selectedQrType', '1')">7</div>
        <div class="grid-item w3-border w3-hover-border w3-round-xlarge" @click="$emit('selectedQrType', '1')">8</div>
        <div class="grid-item w3-border w3-hover-border w3-round-xlarge" @click="$emit('selectedQrType', '1')">9</div>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 10px;
    gap: 16px;
}

.grid-item {
    display: flex;
    align-items: center;
    padding: 15px;
    font-size: 17px;
    font-weight: 600;
    min-height: 83px;
    cursor: pointer;   
}

.grid-item img {
    margin-left: 5px;
    margin-right: 20px;
}
</style>