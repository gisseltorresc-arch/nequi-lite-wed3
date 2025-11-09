import React, { useState, useEffect } from 'react'

export default function App() {
  const STORAGE_KEY = 'nequi-lite-balance'
  const [phone, setPhone] = useState('')
  const [saldo, setSaldo] = useState(0)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const saved = Number(localStorage.getItem(STORAGE_KEY)) || 0
    setSaldo(saved)
  }, [])

  function pushNotice(text) {
    const id = Date.now()
    setNotifications(n => [{ id, text }, ...n].slice(0, 5))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!phone.trim()) {
      pushNotice('Ingresá un número (no tiene que ser real)')
      return
    }
    const nuevo = saldo + 1000
    setSaldo(nuevo)
    localStorage.setItem(STORAGE_KEY, String(nuevo))
    pushNotice(`¡Listo! Se agregó $1.000 a tu saldo (número: ${phone})`)
    setPhone('')
  }

  function reset() {
    setSaldo(0)
    localStorage.removeItem(STORAGE_KEY)
    pushNotice('Saldo reseteado')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6 font-sans">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <header className="mb-4">
          <h1 className="text-2xl font-bold text-indigo-600">Nequi-Lite Web</h1>
          <p className="text-sm text-gray-500">
            Una página web con look de app — abre desde el navegador
          </p>
        </header>

        <section className="mb-4">
          <div className="bg-indigo-50 rounded-lg p-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Saldo actual</div>
              <div className="text-2xl font-semibold">${saldo.toLocaleString('es-CO')}</div>
            </div>
            <button onClick={reset} className="text-xs px-3 py-2 border rounded-lg">
              Resetear
            </button>
          </div>
        </section>

        <section className="mb-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block text-sm font-medium">
              Ingresá un número (no tiene que ser real)
            </label>
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+57 300 000 0000"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
              inputMode="tel"
              aria-label="Número telefónico"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2 rounded-lg"
              >
                Agregar $1.000
              </button>
              <button
                type="button"
                onClick={() => {
                  setPhone('')
                }}
                className="px-3 py-2 border rounded-lg"
              >
                Limpiar
              </button>
            </div>
          </form>
        </section>

        <section className="mb-4">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Secciones</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 bg-pink-50 rounded-lg text-center">Ahorros</div>
            <div className="p-3 bg-yellow-50 rounded-lg text-center">Bolsillos</div>
            <div className="p-3 bg-green-50 rounded-lg text-center">Paga</div>
            <div className="p-3 bg-blue-50 rounded-lg text-center">Envía</div>
            <div className="p-3 bg-indigo-50 rounded-lg text-center">Recarga</div>
            <div className="p-3 bg-gray-100 rounded-lg text-center">Soporte</div>
          </div>
        </section>

        <footer className="text-xs text-gray-400 text-center mt-4">
          Nequi-Lite • Página web demo
        </footer>
      </div>

      <div className="fixed right-6 top-6 max-w-xs space-y-2">
        {notifications.map(n => (
          <div key={n.id} className="bg-white shadow rounded-lg p-3">
            <div className="text-sm">{n.text}</div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(n.id).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
