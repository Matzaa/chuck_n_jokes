<template>
    <div v-if="joke">
        <b-jumbotron id="jumbo" bg-variant="dark" text-variant="white">
            <h1>{{ joke }}</h1>
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
        this.getjoke();
        setInterval(this.getjoke, 30000);
    },
    methods: {
        getjoke() {
            fetch("https://api.chucknorris.io/jokes/random")
                .then((res) => res.json())
                .then((joke) => {
                    this.joke = joke.value;
                })
                .catch((err) => console.log("error in fetch", err));
        },
    },
};
</script>

<style>
h1 {
    padding: 60px 100px;
}

#jumbo {
    padding: 0;
}
</style>
