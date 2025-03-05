import { API_URL } from '$env/static/private'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { Artist } from '$lib/types/music.js'

export const load : PageServerLoad = async ({params}) => {
    const response = await fetch(`${API_URL}/api/artists/${params.id}`)

    if (!response.ok) {
        throw error(response.status, {
            message: `Artist ID: ${params.id} not found`
        })
    }

    try {
        const result = await response.json()
        const artist : Artist = result.data || result

        return {
            artist
        }
    } catch (e) {
        console.error("Error occured: ", e)

        if (e instanceof Error) {
            throw error(500, {
                message: "เกิดข้อผิดพลาดในการดึงข้อมูล: " + e.message
            })
        }

        throw error(500, {
            message: "เกิดข้อผิดถลาดในการดึงข้อมูล"
        })
    }
}