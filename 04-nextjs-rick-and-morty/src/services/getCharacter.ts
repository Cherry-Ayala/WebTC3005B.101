import { clientConfig } from '@/const/clientConfig'
import { Character } from '@/types/Character'
import { endpoints } from '@/const/endpoints'
import { Result } from '@/types/Result'

export async function getCharacter(id: number): Promise<Character> {
  const response = await fetch(
    new URL(`${endpoints.getCharacter}/${id}`, clientConfig.apiHost),
  )
  const character: Character = await response.json()
  return character
}

export async function getAllCharacters<T>(page: string): Promise<Result<T>> {
  const response = await fetch(
    new URL(
      `${endpoints.getCharacter}${page === '1' ? '' : `?page=${page}`}`,
      clientConfig.apiHost,
    ),
  )
  const result: Result<T> = await response.json()
  return result
}

export async function getMultipleCharacters(
  ids: number[],
): Promise<Character[]> {
  if (!ids) return []
  const response = await fetch(
    new URL(`${endpoints.getCharacter}/${ids.join(',')}`, clientConfig.apiHost),
  )
  if (ids.length === 1) {
    const singleCharacter: Character = await response.json()
    return singleCharacter ? [singleCharacter] : []
  }
  const result: Character[] = await response.json()
  return result ?? []
}
