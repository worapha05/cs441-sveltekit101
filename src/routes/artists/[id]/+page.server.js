import { API_URL } from '$env/static/private'

export async function load({params}) {
    console.log(`params.id: ${params.id}`)
    console.log(`API_URL: ${API_URL}`)

    const response = await fetch(`${API_URL}/api/artists/${params.id}`)

    const artist = await response.json()

    console.log(artist)

    return {
        id: params.id,
        artist: artist
    }
}