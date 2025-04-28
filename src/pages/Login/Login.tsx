import React, { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthHook } from '../../hooks'
import { UserRole } from '../../types/authTypes'

interface LoginData {
  email: string
  password: string
}

interface RegisterData extends LoginData {
  firstname: string
  lastname: string
  confirmPassword: string
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' })
  const [registerData, setRegisterData] = useState<RegisterData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { onRegister } = useAuthHook()

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('dewd')
    onRegister({
      email: registerData.email,
      password: registerData.password,
      firstname: registerData.firstname,
      lastname: registerData.lastname,
      role: UserRole['STUDENT'],
    })
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      <motion.div
        className="w-full max-w-md rounded-2xl border border-black bg-white p-8 shadow-xl"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
        <div className="relative mb-6 flex border-b border-black">
          {['login', 'register'].map((tab) => (
            <button
              key={tab}
              onClick={() => setMode(tab as 'login' | 'register')}
              className={`flex-1 py-2 text-center font-semibold transition-colors ${
                mode === tab ? 'text-black' : 'text-gray-600'
              }`}
            >
              {tab === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
          <motion.div
            className="absolute bottom-0 h-1 rounded-full bg-black"
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{ width: '50%', left: mode === 'login' ? 0 : '50%' }}
          />
        </div>

        <AnimatePresence mode="wait">
          {mode === 'login' ? (
            <motion.form
              key="login"
              onSubmit={handleLoginSubmit}
              className="space-y-4"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
            >
              <div>
                <label className="block text-sm font-medium text-black">Email</label>
                <motion.input
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="mt-1 w-full rounded-md border border-black px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Password</label>
                <motion.input
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="mt-1 w-full rounded-md border border-black px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
              <motion.button
                type="submit"
                className="w-full rounded-md bg-black py-3 font-semibold text-white uppercase shadow-md hover:bg-gray-800 focus:outline-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
            </motion.form>
          ) : (
            <motion.form
              key="register"
              onSubmit={handleRegisterSubmit}
              className="space-y-4"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
            >
              {['firstname', 'lastname', 'email', 'password', 'confirmPassword'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-black capitalize">
                    {field === 'confirmPassword' ? 'Confirm Password' : field}
                  </label>
                  <motion.input
                    type={field.includes('password') ? 'password' : 'text'}
                    required
                    value={(registerData as any)[field]}
                    onChange={(e) => setRegisterData({ ...registerData, [field]: e.target.value })}
                    className="mt-1 w-full rounded-md border border-black px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
              ))}
              <motion.button
                type="submit"
                className="w-full rounded-md bg-black py-3 font-semibold text-white uppercase shadow-md hover:bg-gray-800 focus:outline-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Account
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
