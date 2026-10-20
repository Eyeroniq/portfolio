import { useEffect, useState } from 'react'

/** True once the bottom of the hero (#top) has scrolled up under the nav bar. */
export function usePastHero(navHeight = 64) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const update = () => setPast(hero.getBoundingClientRect().bottom <= navHeight)
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [navHeight])

  return past
}
