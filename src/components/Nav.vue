<template>
    <div>
        <b-nav tabs align="center" bg-variant="dark">
            <b-nav-item to="/" :active="$route.name == 'Home'">Home</b-nav-item>
            <b-nav-item to="/about" :active="$route.name == 'About'"
                >About</b-nav-item
            >
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
