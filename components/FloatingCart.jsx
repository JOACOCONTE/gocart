'use client'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemFromCart, removeFromCart } from '@/lib/features/cart/cartSlice';
import { X, Trash2Icon, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FloatingCart({ isOpen, onClose }) {
    const router = useRouter();
    const dispatch = useDispatch();
    
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const { cartItems } = useSelector(state => state.cart);
    const products = useSelector(state => state.product.list);
    
    const [cartArray, setCartArray] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const createCartArray = () => {
        setTotalPrice(0);
        const cartArray = [];
        for (const [key, value] of Object.entries(cartItems)) {
            const product = products.find(product => product.id === key);
            if (product) {
                cartArray.push({
                    ...product,
                    quantity: value,
                });
                setTotalPrice(prev => prev + product.price * value);
            }
        }
        setCartArray(cartArray);
    }

    useEffect(() => {
        if (products.length > 0) {
            createCartArray();
        }
    }, [cartItems, products]);

    const handleDeleteItem = (productId) => {
        dispatch(deleteItemFromCart({ productId }));
    };

    const handleIncreaseQuantity = (productId) => {
        // This will be handled by add to cart action if we have it
        // For now, we'll just show the current quantity
    };

    const handleDecreaseQuantity = (productId) => {
        dispatch(removeFromCart({ productId }));
    };

    const handleCheckout = () => {
        onClose();
        router.push('/cart');
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                    onClick={onClose}
                />
            )}

            {/* Floating Cart Panel */}
            <div
                className={`fixed right-0 top-0 h-screen w-full sm:w-96 bg-white shadow-2xl z-50 transition-transform duration-300 ease-out transform ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
                    <h2 className="text-lg font-semibold text-slate-800">Shopping Cart</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-slate-700 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col h-[calc(100%-180px)] overflow-hidden">
                    {cartArray.length > 0 ? (
                        <>
                            {/* Items List */}
                            <div className="flex-1 overflow-y-auto px-6 py-4">
                                <div className="space-y-4">
                                    {cartArray.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 pb-4 border-b border-slate-100 last:border-b-0"
                                        >
                                            {/* Product Image */}
                                            <div className="flex-shrink-0">
                                                <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center">
                                                    <Image
                                                        src={item.images[0]}
                                                        alt={item.name}
                                                        width={80}
                                                        height={80}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-slate-800 truncate">
                                                    {item.name}
                                                </h3>
                                                <p className="text-xs text-slate-500 mt-1">{item.category}</p>
                                                <p className="text-sm font-semibold text-slate-700 mt-2">
                                                    {currency}{item.price.toLocaleString()}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => handleDecreaseQuantity(item.id)}
                                                        className="p-1 hover:bg-slate-100 rounded transition-colors"
                                                    >
                                                        <ChevronDown size={16} className="text-slate-600" />
                                                    </button>
                                                    <span className="w-6 text-center text-sm font-medium text-slate-700">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleIncreaseQuantity(item.id)}
                                                        className="p-1 hover:bg-slate-100 rounded transition-colors"
                                                    >
                                                        <ChevronUp size={16} className="text-slate-600" />
                                                    </button>
                                                    <span className="ml-auto text-sm font-semibold text-slate-700">
                                                        {currency}{(item.price * item.quantity).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDeleteItem(item.id)}
                                                className="flex-shrink-0 text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                                            >
                                                <Trash2Icon size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Summary and Actions */}
                            <div className="border-t border-slate-200 bg-slate-50 p-6">
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Subtotal</span>
                                        <span className="font-semibold text-slate-800">
                                            {currency}{totalPrice.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-600">Shipping</span>
                                        <span className="font-semibold text-slate-800">Free</span>
                                    </div>
                                    <div className="border-t border-slate-200 pt-3 flex justify-between">
                                        <span className="font-semibold text-slate-800">Total</span>
                                        <span className="text-lg font-bold text-slate-900">
                                            {currency}{totalPrice.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors"
                                    >
                                        Checkout
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="w-full border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium py-2 rounded-lg transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        // Empty Cart
                        <div className="flex-1 flex flex-col items-center justify-center px-6">
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                                    <X size={40} className="text-slate-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                                    Your cart is empty
                                </h3>
                                <p className="text-slate-500 text-sm mb-4">
                                    Add items to get started!
                                </p>
                                <button
                                    onClick={onClose}
                                    className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
