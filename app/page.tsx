'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LuckyNumberForm } from '@/components/lucky-number-form';
import { LuckyNumberResult } from '@/components/lucky-number-result';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { LuckyNumberRequest, LuckyNumberResult as LuckyNumberResultType } from '@/types';

export default function HomePage() {
  const [result, setResult] = useState<LuckyNumberResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async (data: LuckyNumberRequest) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (result.success) {
        setResult(result.data);
      } else {
        throw new Error(result.message || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error calculating lucky numbers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-600 mb-4">
              Số May Mắn Phong Thủy
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Khám phá số may mắn của bạn dựa trên phong thủy, ngũ hành và thiên can địa chi
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <LuckyNumberForm onSubmit={handleCalculate} isLoading={isLoading} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {result && <LuckyNumberResult result={result} />}
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
} 