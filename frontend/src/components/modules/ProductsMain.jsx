import { useEffect, useState } from "react"
import { ProductsApi } from "../../lib/axios";
import { Product } from "../shared/Product";
import { useLocation } from "react-router-dom";
import { useUser } from "../../contexts/UserProvider";

export function ProductsMain() {
    const [products, setProducts] = useState([]);
    const location = useLocation(); 
    const { user } = useUser()
   // console.log(user)
    useEffect(() => {

        const productsApi = new ProductsApi()

        async function fetchProducts() {
            const data = await productsApi.getProducts();
            setProducts (data);
        }

        fetchProducts();
    }, [])

    return (
        <main className="p-5 flex flex-col gap-10">
            {
                location.pathname === '/' &&
                <section className="min-h-[80vh] bg-main-bg rounded text-white p-10 flex justify-start items-center">
                    <div className="flex flex-col gap-2.5 bg-black/50 rounded p-5 w-fit">
                        <h1 className="text-3xl font-bold">
                            Novidades da temporada
                        </h1>
                        <p>
                            Descubra as últimas tendências e atualize seu guarda-roupa com estilo!
                        </p>
                        <p>
                            Faça seu pedido agora e destaque-se nesta temporada!
                        </p>
                    </div>
                </section>
            }
            <section className="flex flex-col gap-7">
                <h1 className="w-full p-1 text-center text-white text-5xl">
                    Produtos mais recentes
                </h1>
                <div className="flex p-5 gap-2.5 flex-wrap p-2.5 items-start justify-center" >
                    {
                        products &&
                        products.map((product, index) => {
                            return (
                             <Product
                                key={index}
                                image = {"https://exbxwvxqlnbphyieygiz.supabase.co/storage/v1/object/public/Roupas/" +product.image}
                                title={product.name}
                                description ={product.description}
                                price = {product.price}
                                product={product}
                            />   
                            )
                        })
                    }
                    
                </div>
            </section>
        </main>
    )
}
