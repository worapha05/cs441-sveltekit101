import { API_URL } from '$env/static/private'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { User } from '$lib/types/auth'

export const load: PageServerLoad = async ({ fetch, cookies }) => {
    const token = cookies.get('token') || ''
    
    if (!token) {
        throw error(401, 'กรุณาเข้าสู่ระบบ')
    }

    try {
        
        const response = await fetch(`${API_URL}/api/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })

        if (!response.ok) {
            throw error(response.status, 'ไม่สามารถดึงข้อมูลผู้ใช้ได้')
        }

        const data = await response.json()

        console.log('user data:', data)
        
        const user: User = data
        
        return {
            user
        }
    } catch (err) {
        console.error('Error fetching user profile:', err)
        throw error(500, { message: 'เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์' })
    }
}