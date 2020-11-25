<template>
    <div id="app">
        <img alt="Vue logo" src="../assets/logo.png">
        <div class="hello">
            <h1>{{ msg }}</h1>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        }
    }
</script>


<style scoped>

</style>