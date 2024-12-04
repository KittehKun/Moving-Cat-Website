import './src/styles/main.css'
import { catImageUrl } from './src/assets/cat.js'
import { createMovingElement } from './src/utils/animation.js'

// Create a fallback image URL in case the first one fails
const fallbackCatUrl = 'https://api.thecatapi.com/v1/images/search?mime_types=jpg,png&size=small'

async function loadCatImage() {
  try {
    // First try the primary cat image
    const response = await fetch(catImageUrl)
    if (!response.ok) throw new Error('Primary image failed to load')
    return catImageUrl
  } catch (error) {
    // If primary fails, try the fallback
    try {
      const response = await fetch(fallbackCatUrl)
      if (!response.ok) throw new Error('Fallback image failed to load')
      const data = await response.json()
      return data[0].url
    } catch (fallbackError) {
      // If both fail, use a reliable static image
      return 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/github-api/github-api.png'
    }
  }
}

async function initApp() {
  const imageUrl = await loadCatImage()
  
  document.querySelector('#app').innerHTML = `
    <img src="${imageUrl}" alt="Orange Cat" class="cat-image">
  `

  const catElement = document.querySelector('.cat-image')
  const animate = createMovingElement(catElement)
  animate()
}

initApp()