'use client'
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import AdminProductForm from "@/components/admin/AdminProductForm"
import { setProduct } from "@/lib/features/product/productSlice"
import { toast } from "react-hot-toast"
import logoArteJoyas from "@/assets/Logo Arte en Joyas PAGINA.png"

export default function AddProduct() {

    const dispatch = useDispatch()
    const router = useRouter()
    const products = useSelector(state => state.product.list)

    const handleSubmit = async (formData) => {
        try {
            // Convertir imágenes a base64
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
            const allImages = [...formData.existingImages, ...base64Images]

            const productData = {
                name: formData.name,
                description: formData.description,
                mrp: parseFloat(formData.mrp),
                price: parseFloat(formData.price),
                category: formData.category,
                images: allImages,
                inStock: formData.inStock,
                isFeatured: formData.isFeatured,
                storeId: "store_admin"
            }

            // Guardar en servidor (API)
            const response = await fetch('/api/product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            })

            if (!response.ok) throw new Error('Error creating product')
            
            const createdProduct = await response.json()

            // Actualizar Redux con el producto creado
            const newProduct = {
                ...createdProduct,
                store: {
                    id: "store_admin",
                    name: "Arte en Joyas",
                    username: "arteenjoyas",
                    logo: logoArteJoyas,
                    email: "arteenjoyas@example.com",
                    status: "approved"
                }
            }

            const updatedProducts = [newProduct, ...products]
            dispatch(setProduct(updatedProducts))
            toast.success("Producto agregado exitosamente")
            router.push('/admin/products')

        } catch (error) {
            toast.error("Error al agregar el producto")
            console.error(error)
        }
    }

    return <AdminProductForm onSubmit={handleSubmit} />
}
