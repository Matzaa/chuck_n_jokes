<template>
    <div id="list" v-if="jokeList">
        <div id="search" v-b-tooltip="'e-mail this joke!'">
            <TextSearch
                v-bind:searchText="searchText"
                @searchText="searchText"
            />
            <b-dropdown text="filter by category">
                <b-dropdown-item
                    v-for="cat in jokeCategories"
                    v-bind:key="cat"
                    @click="filterList(cat)"
                    >{{ cat }}</b-dropdown-item
                >
                <b-dropdown-item @click="showAll()">show all</b-dropdown-item>
            </b-dropdown>
        </div>
        <b-pagination
            bg-variant="dark"
            v-model="currentPage"
            :items="currentDisplay"
            :per-page="10"
            :total-rows="rows"
            aria-controls="my-table"
        ></b-pagination>
        <b-table
            :items="currentDisplay"
            :per-page="10"
            :current-page="currentPage"
        >
            <template #cell(joke)="data">
                <span v-html="data.value"></span>
            </template>
        </b-table>
    </div>
</template>

<script>
import TextSearch from "./TextSearch";
export default {
    name: "List",
    components: {
        TextSearch,
    },
    data() {
        return {
            jokeList: [],
            currentPage: 1,
            currentDisplay: [],
            jokeCategories: [],
            filteredList: [],
        };
    },
    mounted() {
        // As there is no get request specified by the chucknorris api to retrieve all of the jokes, and the request for random jokes doesn't
        // contain the joke's category, I'm first fetching all of the categories and retrieving jokes based on category which is randomly
        // set. As I cannot know the number of all the jokes, I arbitrarily set it to 150 requests so that it should give enough answers.
        // I then filtered out duplicates.

        fetch("https://api.chucknorris.io/jokes/categories")
            .then((res) => res.json())
            .then((categories) => {
                this.jokeCategories = categories;

                for (let i = 0; i < 150; i++) {
                    let randomNumber = Math.floor(
                        Math.random() * this.jokeCategories.length
                    );
                    fetch(
                        `https://api.chucknorris.io/jokes/random?category=${this.jokeCategories[randomNumber]}`
                    )
                        .then((res) => res.json())
                        .then((joke) => {
                            let double = false;
                            if (this.jokeList.length > 1) {
                                this.jokeList.forEach((element) => {
                                    if (element.joke == joke.value) {
                                        console.log("it's duplicate");
                                        double = true;
                                        return double;
                                    }
                                });
                            }
                            if (!double) {
                                let newJoke = {
                                    joke: `<a href="mailto:?body=${joke.value}" v-b-tooltip title="e-mail this joke!">${joke.value}</a>`,
                                    category: joke.categories[0],
                                };
                                this.jokeList.push(newJoke);
                                this.currentDisplay = this.jokeList;
                            }
                        })
                        .catch((err) =>
                            console.log("error in fetching jokes", err)
                        );
                }
            })
            .catch((err) =>
                console.log("error in fetsching categories: ", err)
            );
    },
    computed: {
        rows() {
            return this.currentDisplay.length;
        },
    },
    methods: {
        filterList: function(categoryName) {
            this.filteredList = this.jokeList.filter(
                (joke) => joke.category === categoryName
            );
            this.currentDisplay = this.filteredList;
        },
        showAll: function() {
            this.currentDisplay = this.jokeList;
        },
        searchText: function(val) {
            fetch(`https://api.chucknorris.io/jokes/search?query=${val}`)
                .then((res) => res.json())
                .then((results) => {
                    if (results.result.length < 1) {
                        this.jokeList = [];
                    } else {
                        this.jokeList = [];
                        results.result.forEach((element) => {
                            this.jokeList.push({
                                joke: `<a href="mailto:?body=${element.value}" v-b-tooltip title='e-mail this joke!'>${element.value}</a>`,
                                category: element.categories[0],
                            });
                        });
                    }
                    this.currentDisplay = this.jokeList;
                });
        },
    },
};
</script>

<style>
#list {
    padding: 30px 100px;
}

#search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}

.btn {
    height: 38px;
}

.input-group {
    margin-right: 20px;
}

a {
    text-decoration: none !important;
    color: black !important;
}
</style>
