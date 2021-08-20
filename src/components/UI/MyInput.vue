<template>
    <input :value="modelValue" @input="updateInput" class="input" type="text">
</template>
<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(event){
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>
<style scoped>
    .input{
        width: 100%;
        border: 2px solid green;
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 5px;
    }
</style>