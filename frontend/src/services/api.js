const API_KEY = "nNX3g5VQjpWOXoI5yy4yfg==a6OY5i7J5Ss02mzJ"
const BASE_URL = "https://api.api-ninjas.com/v1/animals?name="

var searchTerm = "dog"

export const getAnimals = async () => {
    const response = await fetch(`${BASE_URL}${searchTerm}`, { headers: {"X-Api-Key": API_KEY}});
    const data = await response.json()
     // Fetch Wikipedia images for each animal
    
     const animalsWithImages = await Promise.all(
        data.map(async (animal) => ({
            ...animal,
            image: await getWikiImage(animal.name, animal.taxonomy.scientific_name) // Attach the image
        }))
    );
    
    return animalsWithImages; // Now includes images
   // return data
};

export const searchAnimals = async (query) => {
    const response = await fetch(`${BASE_URL}${encodeURIComponent(query)}`, { headers: {"X-Api-Key": API_KEY}});
    const data = await response.json()
    // Set initial animal data first (without images)
    const animalsWithoutImages = data.map(animal => ({ ...animal, image: "loading-placeholder.jpg" }));

    // Then, update each animal with its image separately
    const animalsWithImages = await Promise.all(
        animalsWithoutImages.map(async (animal) => {
            animal.image = await getWikiImage(animal.name);
            return animal;
        })
    );

    return animalsWithImages;
}



// WIKI

const specialNameMappings = {
    "Mountain Lion": "Cougar",
    "Puma": "Cougar",
    "Fox Snakes": "Fox Snake"
    
    
    // Add more mappings as needed
};

async function getWikiImage(animalName, scientificName = null) {
    try {
        // Check if the animal name has a special Wikipedia title
        const mappedName = specialNameMappings[animalName] || animalName;

        const formattedName = encodeURIComponent(mappedName);
        const titleCaseName = encodeURIComponent(toTitleCase(mappedName));
        const firstWordCapitalized = encodeURIComponent(toFirstWordCapitalized(mappedName));

        const possibleNames = [formattedName, titleCaseName, firstWordCapitalized];

        for (let name of possibleNames) {
            const imageUrl = await fetchWikiImage(name);
            if (imageUrl) return imageUrl;
        }

        // If all else fails, try scientific name
        if (scientificName) {
            return await getWikiImage(scientificName);
        }

        return ;
    } catch (error) {
        console.error(`Error fetching image for ${animalName}:`, error);
        return;
    }
}

async function fetchWikiImage(wikiTitle) {
    const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${wikiTitle}&prop=pageimages&piprop=thumbnail&pithumbsize=500`
    );
    const data = await response.json();
    const pageId = Object.keys(data.query.pages)[0];

    return data.query.pages[pageId]?.thumbnail?.source || null;
}

// Convert "mountain lion" → "Mountain Lion"
function toTitleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

// Convert "mountain lion" → "Mountain lion"
function toFirstWordCapitalized(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}