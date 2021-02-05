<template>
    <div v-if="joke">
        <b-jumbotron
            bg-variant="dark"
            text-variant="white"
            border-variant="dark"
        >
            <template #header>{{ joke }}</template>
        </b-jumbotron>
    </div>
</template>

<script>
export default {
    name: "RandomJoke",
    data() {
        return {
            joke: "",
        };
    },
    mounted() {
        fetch("https://api.chucknorris.io/jokes/random")
            .then((res) => res.json())
            .then((joke) => {
                console.log("joke", joke.value);
                this.joke = joke.value;
            })
            .catch((err) => console.log("error in fetch", err));
    },
};
</script>

<style></style>
