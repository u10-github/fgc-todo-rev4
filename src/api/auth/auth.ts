import { createClient } from '@supabase/supabase-js'
import { Request, Response, NextFunction } from 'express'
import { getUserByEmail, createUser } from '../db/user'
import { verifyToken } from '../middleware/auth'

const supabase = createClient(
  process.env.SUPABASE_URL!, 
  process.env.SUPABASE_KEY!
)

export const googleOAuthLogin = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body
    const ticket = await verifyToken(credential)
    const payload = ticket.getPayload()

    if (!payload) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const { email, name, picture } = payload
    let user = await getUserByEmail(email!)

    if (!user) {
      user = await createUser({
        email: email!,
        name: name!,
        avatar: picture
      })
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.REDIRECT_URL
      }
    })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json({ 
      user, 
      session: data.session 
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    await supabase.auth.signOut()
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}