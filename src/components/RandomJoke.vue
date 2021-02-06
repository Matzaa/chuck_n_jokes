<template>
    <div>
        <div v-if="!errorFetching">
            <b-jumbotron id="jumbo" bg-variant="dark" text-variant="white">
                <h1>{{ joke }}</h1>
            </b-jumbotron>
            <div class="loading" v-if="loading">A joke is being loaded</div>
        </div>
        <div v-if="errorFetching" class="error">
            <p>There was an error loading your random joke: {{ error }}</p>
            <b-button v-on:click="getjoke">
                Please try again
            </b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "RandomJoke",
    data() {
        return {
            joke: "",
            loading: false,
            errorFetching: false,
            error: "",
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
                    this.errorFetching = false;
                    this.joke = joke.value;
                })
                .catch((err) => {
                    this.errorFetching = true;
                    console.log("error in fetch", err);
                    this.error = err;
                })
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

.error {
    padding: 100px;
    color: red;
}
</style>
