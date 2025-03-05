import { API_URL } from "$env/static/private"
import type { Actions, PageServerLoad } from "./$types"
import { error, fail } from "@sveltejs/kit"

export const load : PageServerLoad = async ({params}) => {
    try {
        const id = params.id
        if (!id) {
            throw error(404, 'Artist not found')
        }

        const response = await fetch(`${API_URL}/api/artists/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw error(response.status, errorData.message || 'Failed to load artist')
        }

        const result = await response.json()
        return {
            artist: result.data
        }

    } catch (e) {
        console.error("Error loading artist:", e)
        throw error(500, {
            message: "Failed to load artist data"
        })
    }
}

export const actions = {
    update : async ({ request, params }) => {
        const data = await request.formData()
        const id = params.id
        
        let name = data.get("name")

        if (!name || typeof name !== 'string' || name.trim() === '') {
            return fail(400, {
                success: false,
                message: "Artist name should not empty",
                name: name || ''
            })
        }

        try {
            const response = await fetch(`${API_URL}/api/artists/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    name : name.trim()
                }),
                headers : {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })

            const responseData = await response.json()

            if (response.ok) {
                console.log("Artist updated successfully")
                console.log(responseData)
            
                return {
                    success: true,
                    redirectTo: `/artists/${id}`
                }
            } else {
                console.error("API error:", responseData)
                return fail(response.status, {
                    success: false, 
                    message: responseData.message || 'Failed to update artist',
                    name: name
                })
            }
            
        } catch (e) {
            if (e instanceof Response) throw e;
            console.error("Unexpected error:", e)

            let errorMessage = 'An unexpected error occurred';
            
            if (e && typeof e === 'object' && 'message' in e) {
                errorMessage = String(e.message);
            } else if (e && typeof e === 'string') {
                errorMessage = e;
            }

            return fail(500, {
                success: false,
                message: errorMessage,
                name: name
            })
        }
    }
} satisfies Actions