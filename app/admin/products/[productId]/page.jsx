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
            const updatedProductData = {
                name: formData.name,
                description: formData.description,
                mrp: parseFloat(formData.mrp),
                price: parseFloat(formData.price),
                category: formData.category,
                inStock: formData.inStock,
                isFeatured: formData.isFeatured,
                storeId: product.storeId || "store_admin"
            }

            // Mantener imágenes existentes
            let images = [...formData.existingImages]
            
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
                images = [...images, ...base64Images]
            }

            updatedProductData.images = images

            // Actualizar en servidor (API)
            const response = await fetch(`/api/product/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProductData)
            })

            if (!response.ok) throw new Error('Error updating product')
            
            const updatedProduct = await response.json()

            // Actualizar Redux
            const productsUpdated = products.map(p => 
                p.id === product.id ? updatedProduct : p
            )
            dispatch(setProduct(productsUpdated))
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
