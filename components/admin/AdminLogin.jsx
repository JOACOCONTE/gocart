'use client'
import { useState } from "react"
import Link from "next/link"
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from "lucide-react"

const AdminLogin = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        // Validar credenciales contra las credenciales hardcodeadas
        if (username === "Orfebre" && password === "arteenjoyas26") {
            // Guardar sesión en localStorage
            localStorage.setItem("adminSession", JSON.stringify({
                username: "Orfebre",
                timestamp: new Date().getTime()
            }))
            setLoading(false)
            onLoginSuccess()
        } else {
            setError("Usuario o contraseña incorrectos")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-6">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-semibold text-slate-700 mb-2">
                        <span className="text-green-600">go</span>cart<span className="text-green-600 text-5xl leading-0">.</span>
                    </h1>
                    <p className="text-xs font-semibold px-3 p-0.5 rounded-full inline-flex items-center gap-2 text-white bg-green-500">
                        Admin Panel
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Iniciar Sesión</h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Usuario
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Ingresa tu usuario"
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                disabled={loading}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ingresa tu contraseña"
                                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                    disabled={loading}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon size={18} />
                                    ) : (
                                        <EyeIcon size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !username || !password}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                        >
                            {loading ? "Cargando..." : "Iniciar Sesión"}
                            {!loading && <ArrowRightIcon size={18} />}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <Link href="/" className="text-sm text-slate-600 hover:text-slate-800 transition">
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
