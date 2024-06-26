import { FAVORITE_CHARACTER_KEY } from '@/const/cookies'
import { setCookie } from '@/helpers/cookies'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const setFavoriteCharacterSchema = z.object({
  characterId: z.number(),
})
export type SetFavoriteCharacterRequest = z.infer<
  typeof setFavoriteCharacterSchema
>

export async function POST(request: NextRequest) {
  const payload: SetFavoriteCharacterRequest = await request.json()
  const { characterId } = payload
  const cookieStore = cookies()
  const currentFavoriteId = cookieStore.get(FAVORITE_CHARACTER_KEY)?.value
  if (currentFavoriteId === `${characterId}`)
    cookieStore.delete(FAVORITE_CHARACTER_KEY)
  else setCookie(FAVORITE_CHARACTER_KEY, characterId.toString())

  return NextResponse.json({})
}
