const quote = document.getElementById('quote');
const author = document.getElementById('author');
const generateBtn = document.getElementById('generate');
const bio = document.getElementById('bio');
const brief = document.getElementById('brief');
const img = document.getElementById('image');

function generateQuote() {
    generateBtn.innerHTML = 'Generating...';
    generateBtn.disabled = true;
    generateBtn.style.cursor = 'not-allowed';
    generateBtn.style.opacity = '0.5';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': "2e92a0807fmsh980f8efa545337bp12db81jsnfaa6b1cf03ed",
            'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
        }
    };
    fetch('https://quotes15.p.rapidapi.com/quotes/random/', options)
        .then(response => response.json())
        .then(response => {
            quote.innerHTML = response.content;
            if (response.originator && response.originator.name) {
                author.innerHTML = response.originator.name;
                const authorName = response.originator.name;

                // use Wikipedia API to get person's summary and image
                const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(authorName)}`;
                fetch(wikiUrl)
                    .then(response => response.json())
                    .then(response => {
                        generateBtn.innerHTML = 'Generate';
                        generateBtn.disabled = false;
                        generateBtn.style.cursor = 'pointer';
                        generateBtn.style.opacity = '1';
                        const summary = response.description;
                        const thumbnail = response.thumbnail;
                        const detailed = response.extract;

                        // Update the bio and image elements
                        if (summary) {
                            bio.innerHTML = summary;
                        }
                        else {
                            bio.innerHTML = 'No information available.';
                        }
                        if (detailed)   {
                            brief.innerHTML = detailed;
                        }
                        else {
                            brief.innerHTML = 'No information available.';
                        }
                        if (thumbnail && thumbnail.source) {
                            img.src = thumbnail.source;
                        }
                        else {
                            img.src = 'https://via.placeholder.com/150';
                        }

                        // Check if text overflows and add the "quote-more" class if it does
                        if (quote.offsetWidth < quote.scrollWidth) {
                            quote.classList.add('quote-more');
                        }
                    })
                    .catch(err => console.error(err));
            }
        })
        .catch(err => {
            if (err = 'TypeError: Failed to fetch') {
                alert('Please check your internet connection and try again.');
            }
            if (err = 'TypeError: NetworkError when attempting to fetch resource.') {
                alert('Please check your internet connection and try again.');
            }
            if (err = 'Failed to load resource: the server responded with a status of 429 ()') {
                alert('Could not fetch quote. Please try again later.');
            }
            if (err = 'GET https://quotes15.p.rapidapi.com/quotes/random/ 429') {
                alert('Could not fetch quote. Please try again later.');
            }
            console.error(err)
        });
}

// generate a quote on page load
generateQuote();

generateBtn.addEventListener('click', () => {
    generateQuote();
    if (quote.classList.contains('quote-more')) {
        quote.classList.remove('quote-more');
    }
});

//on click, show full quote
quote.addEventListener('click', () => {
    console.log('clicked');
    quote.classList.toggle('quote-more');
});

