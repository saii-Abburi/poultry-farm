import React from 'react';
import { motion } from 'framer-motion';

const PHONE = '7207062315'; // ← update with real WhatsApp number

const WhatsAppButton = () => (
  <motion.a
    href={`https://wa.me/${PHONE}`}
    target="_blank"
    rel="noreferrer"
    aria-label="Chat on WhatsApp"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 bg-green-500 text-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40"
  >
    {/* WhatsApp SVG icon */}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
      <path d="M16 0C7.165 0 0 7.165 0 16c0 2.825.74 5.48 2.034 7.786L0 32l8.445-2.01A15.935 15.935 0 0 0 16 32c8.835 0 16-7.165 16-16S24.835 0 16 0zm0 29.09a13.056 13.056 0 0 1-6.65-1.815l-.477-.284-4.946 1.178 1.228-4.808-.316-.496A13.056 13.056 0 0 1 2.91 16C2.91 8.76 8.76 2.91 16 2.91S29.09 8.76 29.09 16 23.24 29.09 16 29.09zm7.156-9.725c-.39-.196-2.305-1.136-2.663-1.265-.357-.13-.617-.196-.877.196-.26.39-1.007 1.265-1.234 1.524-.228.26-.455.293-.845.098-.39-.196-1.648-.607-3.139-1.937-1.16-1.034-1.943-2.311-2.17-2.701-.228-.39-.024-.601.172-.796.176-.175.39-.455.585-.683.196-.228.26-.39.39-.65.13-.26.065-.488-.033-.683-.097-.196-.877-2.114-1.2-2.895-.317-.76-.638-.657-.877-.67l-.747-.013c-.26 0-.683.097-.1.04 1.007-.39 1.69-1.524 1.69-2.69 0-.26-.033-.508-.097-.748-.098-.39-.39-1.59-1.069-2.439-.423-.52-.99-.845-1.59-.974-.39-.083-.8-.13-1.2-.13a3.247 3.247 0 0 0-2.31.975C8.52 11.3 7.9 12.665 7.9 14.19c0 1.53.975 3.008 1.11 3.217.13.21 1.917 2.93 4.65 4.11.65.28 1.157.447 1.552.572.65.208 1.24.179 1.708.108.52-.078 1.6-.654 1.826-1.286.228-.63.228-1.17.16-1.285-.065-.114-.26-.179-.553-.326z"/>
    </svg>
  </motion.a>
);

export default WhatsAppButton;
