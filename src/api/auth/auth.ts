import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { createUserProfile, getUserProfile } from '../db/user'
import { OAuth2Client } from 'google-auth-library'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const verifyGoogleToken = async (token: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    return ticket
  } catch (error) {
    console.error('Error verifying token:', error)
    return null
  }
}

export const googleOAuthLogin = async (req: NextRequest) => {
  try {
    const { credential } = await req.json()
    const ticket = await verifyGoogleToken(credential)
    
    if (!ticket) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const payload = ticket.getPayload()
    if (!payload || !payload.email) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 401 })
    }

    let user = await getUserProfile(payload.sub!)

    if (!user) {
      const now = new Date()
      user = await createUserProfile({
        email: payload.email,
        name: payload.name || '',
        image: payload.picture || '',
        emailVerified: now,
        createdAt: now,
        updatedAt: now
      })
    }

    if (!user) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NEXTAUTH_URL
      }
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      user, 
      session: data
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Logged out successfully' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const profile = await getUserProfile(user.id)
    if (!profile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 })
    }

    return NextResponse.json(profile)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}