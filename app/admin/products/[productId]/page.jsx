'use client'
import { useDispatch, useSelector } from "react-redux"
import { useRouter, useParams } from "next/navigation"
import AdminProductForm from "@/components/admin/AdminProductForm"
import { setProduct } from "@/lib/features/product/productSlice"
import { toast } from "react-hot-toast"
import Loading from "@/components/Loading"

export default function EditProduct() {

    const dispatch = useDispatch()
    const router = useRouter()
    const params = useParams()
    const products = useSelector(state => state.product.list)
    
    const product = products.find(p => p.id === params.productId)

    const handleSubmit = async (formData) => {
        try {
            const updatedProduct = {
                ...product,
                name: formData.name,
                description: formData.description,
                mrp: parseFloat(formData.mrp),
                price: parseFloat(formData.price),
                category: formData.category,
                inStock: formData.inStock,
                updatedAt: new Date().toISOString(),
            }

            // Mantener imágenes existentes
            updatedProduct.images = [...formData.existingImages]
            
            // Convertir nuevas imágenes a base64
            if (formData.images.length > 0) {
                const imagePromises = formData.images.map(file => {
                    return new Promise((resolve) => {
                        const reader = new FileReader()
                        reader.onload = (e) => {
                            resolve(e.target.result)
                        }
                        reader.readAsDataURL(file)
                    })
                })

                const base64Images = await Promise.all(imagePromises)
                updatedProduct.images = [...updatedProduct.images, ...base64Images]
            }

            // Mantener store si existe, sino crear uno por defecto
            if (!updatedProduct.store) {
                updatedProduct.store = {
                    id: "store_admin",
                    name: "Arte en Joyas",
                    username: "arteenjoyas",
                    email: "arteenjoyas@example.com",
                    status: "approved"
                }
            }

            const updatedProducts = products.map(p => 
                p.id === product.id ? updatedProduct : p
            )
            dispatch(setProduct(updatedProducts))
            toast.success("Producto actualizado exitosamente")
            router.push('/admin/products')

        } catch (error) {
            toast.error("Error al actualizar el producto")
            console.error(error)
        }
    }

    if (!product) {
        return <Loading />
    }

    return <AdminProductForm product={product} onSubmit={handleSubmit} />
}
