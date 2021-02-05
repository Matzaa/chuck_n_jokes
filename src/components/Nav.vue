<template>
    <div>
        <b-nav align="center">
            <b-nav-item to="/">Home</b-nav-item> |
            <b-nav-item to="/about">About</b-nav-item>
        </b-nav>
        <RandomJoke />
        <router-view />
    </div>
</template>

<script>
import RandomJoke from "./RandomJoke";
export default {
    name: "Nav",
    components: {
        RandomJoke,
    },
};
</script>

<style></style>
