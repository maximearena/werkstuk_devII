class MovieList {
    constructor(htmlElement) {
        this.htmlElement = document.getElementById(htmlElement);
        this.data = [];
        this.movies = [];
        this.userSearch;
    }
    async init() {
        await this.fetch();
        await this.fetchSearchData();
        this.render();
    }

    async fetch() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=3fab369827f78498557f8e469f9910fb&language=en-US&page=1`);
        const json = await response.json();
        this.movies = json.results.map(data => {

            return new Movie(data);
        })
    }

    render() {
        let htmlString = '';
        this.movies.forEach(movie => {
            htmlString += movie.htmlString
        });
        this.htmlElement.insertAdjacentHTML('beforeend', htmlString);
    }

    async fetchSearchData() {
        const search = document.getElementById('inputValue');
        search.addEventListener('keyup', async function () {
            this.userSearch = search.value;
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=3fab369827f78498557f8e469f9910fb&query=${this.userSearch}`);
            const json = await response.json();
            this.movies = json.results.map(data => {
                return new Movie(data)
            });
        
            let htmlStringResult = '';
            this.movies.forEach(result => {
                htmlStringResult += result.htmlString
            });
  
            let printedResult = document.getElementById('result');
            printedResult.innerHTML = '';

            document.getElementById('result').insertAdjacentHTML('beforeend', htmlStringResult);

        })
    }
}



class Movie {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.overview = data.overview;
        this.language = data.original_language;
        this.date = data.release_date;
        this.poster = data.poster_path;
    }

    get htmlString() {
        return `<section>
                <img src="https://image.tmdb.org/t/p/w200${this.poster}" alt="poster">
                <h2>${this.title}</h2>
                <p><span>Overview: </span>${this.overview}</p>
                <p><span>Language: </span>${this.language}</p>
                <p><span>Release: </span>${this.date}</p>
                </section>`
    }

}

const movieList = new MovieList('movies');
movieList.init();