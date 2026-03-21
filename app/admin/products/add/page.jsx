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
            const newProduct = {
                id: `prod_${Date.now()}`,
                name: formData.name,
                description: formData.description,
                mrp: parseFloat(formData.mrp),
                price: parseFloat(formData.price),
                category: formData.category,
                images: [...formData.existingImages],
                inStock: formData.inStock,
                storeId: "store_admin",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                rating: [],
                store: {
                    id: "store_admin",
                    name: "Arte en Joyas",
                    username: "arteenjoyas",
                    logo: logoArteJoyas,
                    email: "arteenjoyas@example.com",
                    status: "approved"
                }
            }

            // Convertir imágenes a base64 para localStorage
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
            newProduct.images = [...newProduct.images, ...base64Images]

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
