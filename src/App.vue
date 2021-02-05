<template>
    <div id="app">
        <Nav />
        <RandomJoke />
    </div>
</template>

<script>
import Nav from "./components/Nav";
import RandomJoke from "./components/RandomJoke";

export default {
    name: "App",
    components: {
        Nav,
        RandomJoke,
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
