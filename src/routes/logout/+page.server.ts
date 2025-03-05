import { API_URL } from '$env/static/private'
import { error, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch, cookies }) => {
    const token = cookies.get('token') || ''
    
    if (!token) {
        throw redirect(302, '/login') 
    }

    try {
        
        const response = await fetch(`${API_URL}/api/revoke`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })

        if (!response.ok) {
            throw error(response.status, "ไม่สามารถ revoke สิทธิ์ได้")
        }

        const data = await response.json()

        console.log('revoke data:', data)
        
        cookies.delete('token', {
            path: '/'
        })

        throw redirect(302, '/login')
        
        
    } catch (e) {
        if (e.status === 302) {
            throw e
        }

        console.error('Error revoking user:', e)
        throw error(500, { message: 'เกิดข้อผิดพลาดในการ revoke สิทธิ์ผู้ใช้' })
    }
}