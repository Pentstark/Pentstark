import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pageVariants, itemVariants } from '@/lib/animations';

const NotFoundPage = ({ message }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="overflow-x-hidden relative min-h-screen pt-0 bg-gradient-to-br from-[#0F1117] via-[#1a1625] to-[#0F1117] flex flex-col items-center justify-center text-center px-4"
    >
      <motion.div variants={itemVariants}>
        <AlertTriangle className="h-24 w-24 text-yellow-400 mx-auto mb-8 animate-pulse-glow" />
      </motion.div>
      <motion.h1 variants={itemVariants} className="text-6xl font-bold text-gradient mb-4">
        404
      </motion.h1>
      <motion.p variants={itemVariants} className="text-2xl text-gray-300 mb-8">
        {message || "Oops! The page you're looking for doesn't exist."}
      </motion.p>
      <motion.div variants={itemVariants}>
        <Link to="/">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white cyber-glow">
            <Home className="mr-2 h-5 w-5" />
            Go to Homepage
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;