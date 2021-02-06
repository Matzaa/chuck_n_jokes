<template>
    <div v-if="joke">
        <b-jumbotron id="jumbo" bg-variant="dark" text-variant="white">
            <h1>{{ joke }}</h1>
        </b-jumbotron>
        <div class="loading" v-if="loading">A joke is being loaded</div>
    </div>
</template>

<script>
export default {
    name: "RandomJoke",
    data() {
        return {
            joke: "",
            loading: false,
        };
    },
    mounted() {
        this.getjoke();
        setInterval(this.getjoke, 30000);
    },
    methods: {
        getjoke() {
            this.loading = true;
            fetch("https://api.chucknorris.io/jokes/random")
                .then((res) => res.json())
                .then((joke) => {
                    this.joke = joke.value;
                })
                .catch((err) => console.log("error in fetch", err))
                .finally(() => (this.loading = false));
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

.loading {
    color: red;
    padding-left: 100px;
}
</style>
