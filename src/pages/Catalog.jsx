import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog({ addToCart }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('All')

  let processedGuns = GUNS.filter((gun) => {
    const matchesSearch = gun.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || gun.type === filterType;
    return matchesSearch && matchesType;
  });

  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const toggleSort = (type) => {
    if (sortBy === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(type)
      setSortOrder('asc')
    }
  }

  processedGuns.sort((a, b) => {
    let result = 0
    if (sortBy === 'name') {
      result = a.name.localeCompare(b.name)
    } else if (sortBy === 'price') {
      result = a.price - b.price
    }
    return sortOrder === 'asc' ? result : -result
  });

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            <option value="Throwable">Throwable</option>
          </select>
          <button onClick={() => toggleSort('name')} style={{ 
            padding: '8px 14px', 
            border: sortBy === 'name' ? '2px solid var(--brass, #b8860b)' : '1px solid var(--line)', 
            background: sortBy === 'name' ? 'var(--brass, #b8860b)' : '#fff', 
            color: sortBy === 'name' ? '#fff' : 'inherit',
            cursor: 'pointer',
            fontWeight: sortBy === 'name' ? 'bold' : 'normal'
          }}>
            Sort by Name {sortBy === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
          </button>
          <button onClick={() => toggleSort('price')} style={{ 
            padding: '8px 14px', 
            border: sortBy === 'price' ? '2px solid var(--brass, #b8860b)' : '1px solid var(--line)', 
            background: sortBy === 'price' ? 'var(--brass, #b8860b)' : '#fff', 
            color: sortBy === 'price' ? '#fff' : 'inherit',
            cursor: 'pointer',
            fontWeight: sortBy === 'price' ? 'bold' : 'normal'
          }}>
            Sort by Price {sortBy === 'price' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
          </button>
        </div>

        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{processedGuns.length} pieces</span>
        </div>
        
        {processedGuns.length > 0 ? (
          <ul className="stock">
            {processedGuns.map((gun) => <GunCard key={gun.name} gun={gun} addToCart={addToCart} />)}
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
