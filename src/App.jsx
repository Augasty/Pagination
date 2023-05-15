import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)



  const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=100')
    const data = await res.json()
    console.log(data)


    if (data && data.products) {
      setProducts(data.products)
    }
  }


  console.log(products)
  useEffect(() => {
    fetchProducts()
  }, [])



  const selectPageHandler = pg =>{
    if (
      pg >= 1 && pg <= products.length / 10 && pg !== page
    ){
      setPage(pg)
    }
    
  }


  
  return (
    <div>
      {products.length > 0 && (<div className='products'>
        {products.slice(page*10 - 10 , page*10).map((prod) => {
          return (<span className='products__single' key={prod.id}>
            <img src={prod.thumbnail} alt={prod.description} />
            <span>{prod.title}</span>
          </span>)
        })}

      </div>)}

      {
        products.length > 0 &&(
          <div className='pagination'>
            <span 
            className={page>1 ? '':'pagination__disable'} onClick={()=>selectPageHandler(page-1)}>👈</span>
            {
              [...Array(products.length / 10)].map((_,idx)=>{
                return(
                  <span key={idx} className={page===idx+1 ?"pagination__selected":""}
                  onClick={()=>selectPageHandler(idx+1)}>{idx+1}</span>
                )
              })
            }
            <span className={page < products.length / 10 ? '':'pagination__disable'}  
            onClick={()=>selectPageHandler(page+1)}>👉</span>
          </div>
        )
      }
    </div>
  )
}

export default App
