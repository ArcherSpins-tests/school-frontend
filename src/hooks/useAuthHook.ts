import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginDataType, RegisterDataType } from '../types/authTypes'

export const useAuthHook = () => {
  const [authToken, setAuthToken] = useState<string | null>(null)
  const navigate = useNavigate()

  const saveTokenToCookie = (token: string) => {
    // срок жизни: 7 дней
    const maxAge = 7 * 24 * 60 * 60
    document.cookie = `token=${token}; Max-Age=${maxAge}; Path=/; Secure; SameSite=Strict`
  }

  const onRegister = async (data: RegisterDataType) => {
    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const text = await res.text()
        console.error('Registration failed:', res.status, text)
        return
      }
      const json = await res.json()
      const token = json.access_token || json.token
      const user = json.user || json

      if (token) {
        setAuthToken(token)
        saveTokenToCookie(token)
      }

      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      }

      navigate('/')
    } catch (e) {
      console.error('Network error during registration:', e)
    }
  }

  const onLogin = async (data: LoginDataType) => {
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const text = await res.text()
        console.error('Login failed:', res.status, text)
        return
      }
      const json = await res.json()
      const token = json.access_token || json.token
      const user = json.user || json

      if (token) {
        setAuthToken(token)
        saveTokenToCookie(token)
      }

      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      }

      navigate('/')
    } catch (e) {
      console.error('Network error during login:', e)
    }
  }

  return { onRegister, onLogin, authToken }
}
