import React from 'react';
import { motion } from 'framer-motion';
import FoxiLogo from './assets/Foxi_logo 1.png';

const Logo = ({ className = '' }) => {
  return (
    <motion.div 
      className={`flex items-center ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      <img 
        src={FoxiLogo} 
        alt="Foxi Cafe Logo" 
        className="h-12 md:h-16 w-auto" 
      />
    </motion.div>
  );
};

export default Logo;