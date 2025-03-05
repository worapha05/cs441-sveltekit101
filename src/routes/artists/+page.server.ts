import { API_URL } from "$env/static/private"
import type { PageServerLoad } from "./$types"
import type { Artist } from "$lib/types/music"

export const load: PageServerLoad = async () =>  {
    const response = await fetch(`${API_URL}/api/artists`)
    let artists: Artist[] = []
    try {
        const jsonData = await response.json()
        artists = jsonData.data
    } catch (e) {
        console.error((e as Error).message)
    }

    return {
        artists
    }
}