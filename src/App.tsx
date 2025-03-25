import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MenuItem } from './components/MenuItem';
import { Cart } from './components/Cart';
import { CheckoutPage } from './components/CheckoutPage';
import { menuItems } from './data';
import { ShoppingCart, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <UtensilsCrossed className="text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">FoodDelivery</h1>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="p-2 hover:bg-gray-100 rounded-full relative"
          >
            <ShoppingCart size={24} />
          </motion.button>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`flex-1 ${isCartOpen ? 'hidden md:block' : ''}`}
          >
            <h2 className="text-2xl font-semibold mb-6">Our Menu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <MenuItem item={item} />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <AnimatePresence>
            {isCartOpen && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-0 bg-white md:relative md:w-96"
              >
                <div className="h-full overflow-auto p-4">
                  <Cart />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;