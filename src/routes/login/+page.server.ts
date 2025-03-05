import { API_URL, APP_ENV } from '$env/static/private'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
    login: async ({ request, cookies, fetch }) => {
        const data = await request.formData()
        
        const email = data.get('email') || ''
        const password = data.get('password')

        if (!email || typeof email !== 'string') {
            return fail(400, {
                success: false,
                message: 'กรุณาระบุอีเมล',
                email: email
            })
        }

        if (!password || typeof password !== 'string') {
            return fail(400, {
                success: false,
                message: 'กรุณาระบุรหัสผ่าน',
                email: email
            })
        }

        try {
           
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const responseData = await response.json().catch(() => ({}))

            if (response.ok) {
                console.log("📝 responseData:", responseData)
                const token = responseData.token || responseData.access_token || responseData.data?.token

                if (!token) {
                    return fail(401, {
                        success: false,
                        message: 'เกิดข้อผิดพลาด: ไม่ได้รับ token',
                        email: email
                    })
                }

                cookies.set('token', token, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: APP_ENV === 'production',
                    maxAge: 60 * 60 * 24 * 7 // 1 สัปดาห์
                })

                return {
                    success: true,
                    redirectTo: '/profile'
                }
            } else {
                return fail(response.status, {
                    success: false,
                    message: responseData.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
                    email: email
                })
            }
        } catch (error) {
            console.error('Login error:', error)
            
            return fail(500, {
                success: false,
                message: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
                email: email
            })
        }
    }
} satisfies Actions