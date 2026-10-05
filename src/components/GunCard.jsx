import { useRef } from 'react'

function GunCard({ gun, addToCart }) {
  const popup = useRef(null)

  return (
    <li className="card">
      <div className="card-btn" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div onClick={() => popup.current.showModal()} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <img className="card-img" src={gun.image} alt="" width="120" height="90" />
          <span className="name display">{gun.name}</span>
          <span className="type">
            {gun.type} · {gun.caliber}
          </span>
          <span className="price">${gun.price.toLocaleString()}</span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (addToCart) addToCart(gun);
          }}
          style={{ 
            marginTop: '10px', 
            padding: '8px', 
            background: 'var(--brass, #b8860b)', 
            color: '#fff', 
            border: 'none', 
            cursor: 'pointer',
            width: 'calc(100% - 28px)',
            margin: '10px 14px 0',
            fontWeight: 'bold'
          }}
        >
          Add to Cart
        </button>
      </div>

      <dialog
        className="popup"
        ref={popup}
        onClick={(e) => e.target === popup.current && popup.current.close()}
      >
        <img className="popup-img" src={gun.image} alt="" width="240" height="180" />
        <h3 className="display">{gun.name}</h3>
        <p className="type">
          {gun.type} · {gun.caliber} · <span className="price">${gun.price.toLocaleString()}</span>
        </p>
        <p>{gun.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 20px 0' }}>
          <button 
            onClick={(e) => {
              e.preventDefault();
              if (addToCart) addToCart(gun);
              popup.current.close();
            }}
            style={{ 
              padding: '8px 18px', 
              background: 'var(--brass, #b8860b)', 
              color: '#fff', 
              border: 'none', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Add to Cart
          </button>
          <form method="dialog" style={{ margin: 0 }}>
            <button className="popup-close" style={{ marginTop: 0 }}>Close</button>
          </form>
        </div>
      </dialog>
    </li>
  )
}

export default GunCard
