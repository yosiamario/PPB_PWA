import { useState, useMemo } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [sortBy, setSortBy] = useState('name') // 'name', 'price-asc', 'price-desc'

  const filteredGuns = useMemo(() => {
    let result = GUNS

    // 1. Search (Name filter)
    if (search) {
      result = result.filter(gun => gun.name.toLowerCase().includes(search.toLowerCase()))
    }

    // 2. Filter by type
    if (filterType !== 'All') {
      result = result.filter(gun => gun.type === filterType)
    }

    // 3. Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name)
      } else if (sortBy === 'price-asc') {
        return a.price - b.price
      } else if (sortBy === 'price-desc') {
        return b.price - a.price
      }
      return 0
    })

    return result
  }, [search, filterType, sortBy])

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every
          piece listed with its type, caliber, and price — nothing else.
        </p>
      </section>
      
      <section>
        <div style={{ display: 'flex', gap: '10px', margin: '20px 0', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Search guns..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '8px', border: '1px solid var(--line)', flex: '1 1 200px' }}
          />
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            style={{ padding: '8px', border: '1px solid var(--line)' }}
          >
            <option value="All">All Types</option>
            <option value="Pistol">Pistol</option>
            <option value="Rifle">Rifle</option>
            <option value="Shotgun">Shotgun</option>
          </select>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '8px', border: '1px solid var(--line)' }}
          >
            <option value="name">Sort by Name (A-Z)</option>
            <option value="price-asc">Sort by Price (Low to High)</option>
            <option value="price-desc">Sort by Price (High to Low)</option>
          </select>
        </div>

        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{filteredGuns.length} pieces</span>
        </div>
        
        {filteredGuns.length > 0 ? (
          <ul className="stock">
            {filteredGuns.map((gun) => <GunCard key={gun.name} gun={gun} />)}
          </ul>
        ) : (
          <p style={{ padding: '40px 0', textAlign: 'center', color: 'var(--steel)' }}>
            no guns match
          </p>
        )}
      </section>
    </>
  )
}

export default Catalog
