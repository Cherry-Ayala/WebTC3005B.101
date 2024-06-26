import Link from 'next/link'
import { paths } from '@/const/paths'
import { getCurrentFavoriteIds } from '@/helpers/characters'
import { getAllCharacters } from '@/services/getCharacter'
import { Characters } from '@/ui/pages/Characters'
import { Pagination } from '@/ui/molecules/Pagination'
import { PageProps } from '@/types/page'
import { Character } from '@/types/Character'

export default async function CharactersPage({ searchParams }: PageProps) {
  const currentPage = searchParams.page ?? '1'
  const {
    results: characters,
    info: { pages },
  } = await getAllCharacters<Character[]>(currentPage)
  const favoriteIds = getCurrentFavoriteIds()
  return (
    <>
      <Link href={paths.favoriteCharacter}>Favorites</Link>
      <Characters characters={characters ?? []} favoriteIds={favoriteIds} />
      <Pagination
        currentPage={currentPage}
        lastPage={`${pages}`}
        path={paths.allCharacters}
      />
    </>
  )
}
