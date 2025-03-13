// This is a placeholder service for authentication
// In a real implementation, this would connect to a database and authentication service

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  points: number
}

// Mock user storage - in a real app, this would be a database
const users: Record<string, User> = {}

export async function createUser(userData: Omit<User, "id">): Promise<User> {
  const id = `user-${Date.now()}`
  const newUser = { id, ...userData }
  users[id] = newUser
  return newUser
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = Object.values(users).find((u) => u.email === email)
  return user || null
}

export async function updateUserPoints(userId: string, points: number): Promise<User> {
  if (!users[userId]) {
    throw new Error("User not found")
  }

  users[userId].points = points
  return users[userId]
}

export async function sendVerificationCode(email: string): Promise<string> {
  // In a real implementation, this would send an email with a verification code
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  console.log(`Verification code for ${email}: ${code}`)
  return code
}

export async function verifyCode(email: string, code: string, expectedCode: string): Promise<boolean> {
  // In a real implementation, this would verify the code against what was sent
  return code === expectedCode
}
