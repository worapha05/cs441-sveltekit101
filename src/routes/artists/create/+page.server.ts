import { API_URL } from '$env/static/private'
import { fail } from '@sveltejs/kit'
import type { Actions } from './$types.js'

export const actions = {
    create : async ( { request }) => {
        const data = await request.formData()
        
        let name = data.get("name")

        if (!name || typeof name !== 'string' || name.trim() === '') {
            return fail(400, {
                success: false,
                message: "Artist name should not empty",
                name: name || ''
            })
        }

        try {
            const response = await fetch(`${API_URL}/api/artists`, {
                method: "POST",
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
                console.log("Artist created successfully")
            
                return {
                    success: true,
                    redirectTo: `/artists/${responseData.data?.id}`
                }
            } else {
                console.error("API error:", responseData)
                return fail(response.status, {
                    success: false, 
                    message: responseData.message || 'Failed to create artist',
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