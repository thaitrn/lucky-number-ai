'use client';

import { motion } from 'framer-motion';
import { Share2, Copy, Star, Clock, Palette, Calendar, Sparkles } from 'lucide-react';
import type { LuckyNumberResult } from '@/types';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface LuckyNumberResultProps {
  result: LuckyNumberResult;
}

export function LuckyNumberResult({ result }: LuckyNumberResultProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    const text = `Số may mắn của tôi: ${result.luckyNumbers.join(', ')}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Đã sao chép vào clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Không thể sao chép');
    }
  };

  const shareResult = async () => {
    const text = `Số may mắn của tôi: ${result.luckyNumbers.join(', ')}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Số May Mắn Phong Thủy',
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Kết quả số may mắn
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Dựa trên phong thủy và ngũ hành
        </p>
      </div>

      {/* Lucky Numbers */}
      <div className="mb-6">
        <h3 className="flex items-center justify-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
          <Star className="w-5 h-5 text-yellow-500" />
          <span>Số may mắn chính</span>
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {result.luckyNumbers.map((number, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-lucky-gold to-yellow-500 text-white font-bold text-xl rounded-lg p-4 text-center lucky-glow"
            >
              {number}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Five Elements */}
      <div className="mb-6">
        <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <span>Ngũ hành</span>
        </h3>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Hành: </span>
            {result.fiveElements.element}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {result.fiveElements.description}
          </p>
        </div>
      </div>

      {/* Heavenly Stems & Earthly Branches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Thiên can
          </h3>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <p className="text-blue-700 dark:text-blue-300 font-semibold">
              {result.heavenlyStems.stem}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {result.heavenlyStems.description}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Địa chi
          </h3>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <p className="text-green-700 dark:text-green-300 font-semibold">
              {result.earthlyBranches.branch}
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              {result.earthlyBranches.description}
            </p>
          </div>
        </div>
      </div>

      {/* Lucky Days */}
      <div className="mb-6">
        <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
          <Calendar className="w-5 h-5 text-green-500" />
          <span>Ngày thuận lợi</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.luckyDays.map((day, index) => (
            <span
              key={index}
              className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium"
            >
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* Lucky Hours */}
      <div className="mb-6">
        <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
          <Clock className="w-5 h-5 text-blue-500" />
          <span>Giờ tốt nhất</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.luckyHours.map((hour, index) => (
            <span
              key={index}
              className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
            >
              {hour}
            </span>
          ))}
        </div>
      </div>

      {/* Lucky Colors */}
      <div className="mb-6">
        <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
          <Palette className="w-5 h-5 text-purple-500" />
          <span>Màu sắc hỗ trợ</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.luckyColors.map((color, index) => (
            <span
              key={index}
              className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium"
            >
              {color}
            </span>
          ))}
        </div>
      </div>

      {/* Feng Shui Advice */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Lời khuyên phong thủy
        </h3>
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg p-4 border-l-4 border-primary-500">
          <p className="text-gray-700 dark:text-gray-300 italic">
            &quot;{result.fengShuiAdvice}&quot;
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareResult}
          className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
        >
          <Share2 className="w-4 h-4" />
          <span>Chia sẻ</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className={`flex items-center justify-center space-x-2 font-semibold py-3 px-4 rounded-lg transition-all duration-200 ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <Copy className="w-4 h-4" />
          <span>{copied ? 'Đã sao chép!' : 'Sao chép'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
} 