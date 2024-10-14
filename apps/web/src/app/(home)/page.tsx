"use client"
import { useEffect } from 'react'
import { Button } from '@ui/index'
import { Shield, Zap, Lock } from "lucide-react"
import { motion } from 'framer-motion'
import "@fontsource/inter"

export default function LandingPage() {
  useEffect(() => {
    document.body.style.fontFamily = "'Inter', sans-serif"
  }, [])

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <motion.section
          className="container mx-auto px-4 py-20 text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Secure and Autonomous Crypto Management
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10">
            Experience the future of cryptocurrency wallets with Liberdex
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
              Get Started
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
              Learn More
            </Button>
          </div>
        </motion.section>

        <section className="bg-black py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Why Choose Liberdex?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: "Absolute Control", description: "Your mnemonics and private keys are stored securely in your browser's IndexedDB, not in a centralized database." },
                { icon: Zap, title: "Easy Management", description: "Simple yet professional design allows you to easily manage your wallet and cryptocurrencies." },
                { icon: Lock, title: "Cutting-Edge Security", description: "Advanced encryption and hashing algorithms ensure the highest level of security for your assets." }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className=" bg-gray-900 p-6 rounded-lg text-center border-2 border-white text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * (index + 1), duration: 0.6 }}
                >
                  <item.icon className="h-12 w-12 mb-4 text-white mx-auto" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <motion.section
          className="container mx-auto px-4 py-20 text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control?</h2>
          <p className="text-xl text-gray-400 mb-10">Join Liberdex today and experience true ownership of your digital assets.</p>
          <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
            Create Your Wallet
          </Button>
        </motion.section>
      </main>

      <footer className="bg-black py-10 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-white">
          <p>&copy; 2024 Liberdex. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}