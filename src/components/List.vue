<template>
    <div>
        <b-pagination
            v-model="currentPage"
            :items="joke_list"
            :per-page="10"
            :total-rows="rows"
            aria-controls="my-table"
        ></b-pagination>
        <b-table
            :items="joke_list"
            :per-page="10"
            :current-page="currentPage"
        ></b-table>
    </div>
</template>

<script>
export default {
    name: "List",
    data() {
        return {
            joke_list: [],
            currentPage: 1,
        };
    },
    mounted() {
        let categories = [
            "animal",
            "career",
            "celebrity",
            "dev",
            "explicit",
            "fashion",
            "food",
            "history",
            "money",
            "movie",
            "music",
            "political",
            "religion",
            "science",
            "sport",
            "travel",
        ];
        for (let i = 0; i < 70; i++) {
            let randomNumber =
                Math.floor(Math.random() * 10) + (categories.length - 10);
            console.log("randomnum", randomNumber);
            fetch(
                `https://api.chucknorris.io/jokes/random?category=${categories[randomNumber]}`
            )
                .then((res) => res.json())
                .then((joke) => {
                    console.log("category joke", joke);
                    let newJoke = {
                        joke: joke.value,
                        category: joke.categories[0],
                    };
                    this.joke_list.push(newJoke);
                });
        }
        console.log("this list", this.joke_list);
    },
    computed: {
        rows() {
            return this.joke_list.length;
        },
    },
};
</script>

<style></style>
