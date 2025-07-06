'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Calendar, Home, Briefcase } from 'lucide-react';
import { LuckyNumberRequest } from '@/types';

interface LuckyNumberFormProps {
  onSubmit: (data: LuckyNumberRequest) => void;
  isLoading: boolean;
}

export function LuckyNumberForm({ onSubmit, isLoading }: LuckyNumberFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LuckyNumberRequest>();

  const birthDate = watch('birthDate');

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const onFormSubmit = (data: LuckyNumberRequest) => {
    data.age = calculateAge(data.birthDate);
    onSubmit(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Thông tin cá nhân
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Nhập thông tin để tính số may mắn theo phong thủy
        </p>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Họ tên */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <User className="w-4 h-4" />
            <span>Họ và tên *</span>
          </label>
          <input
            type="text"
            {...register('fullName', { 
              required: 'Vui lòng nhập họ tên',
              minLength: { value: 2, message: 'Tên phải có ít nhất 2 ký tự' }
            })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Nhập họ và tên đầy đủ"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Ngày sinh */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Calendar className="w-4 h-4" />
            <span>Ngày sinh *</span>
          </label>
          <input
            type="date"
            {...register('birthDate', { 
              required: 'Vui lòng chọn ngày sinh' 
            })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {errors.birthDate && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.birthDate.message}
            </p>
          )}
          {birthDate && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tuổi: {calculateAge(birthDate)} tuổi
            </p>
          )}
        </div>

        {/* Giới tính */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <span>Giới tính *</span>
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="male"
                {...register('gender', { required: 'Vui lòng chọn giới tính' })}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="w-4 h-4 text-pink-500">♂</span>
              <span className="text-gray-700 dark:text-gray-300">Nam</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="female"
                {...register('gender', { required: 'Vui lòng chọn giới tính' })}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="w-4 h-4 text-blue-500">♀</span>
              <span className="text-gray-700 dark:text-gray-300">Nữ</span>
            </label>
          </div>
          {errors.gender && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* Advanced Options */}
        <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            <span>{showAdvanced ? 'Ẩn' : 'Hiển thị'} tùy chọn nâng cao</span>
          </button>
        </div>

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-600"
          >
            {/* Hướng nhà */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Home className="w-4 h-4" />
                <span>Hướng nhà</span>
              </label>
              <select
                {...register('houseDirection')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Chọn hướng nhà</option>
                <option value="north">Bắc</option>
                <option value="south">Nam</option>
                <option value="east">Đông</option>
                <option value="west">Tây</option>
                <option value="northeast">Đông Bắc</option>
                <option value="northwest">Tây Bắc</option>
                <option value="southeast">Đông Nam</option>
                <option value="southwest">Tây Nam</option>
              </select>
            </div>

            {/* Nghề nghiệp */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Briefcase className="w-4 h-4" />
                <span>Nghề nghiệp</span>
              </label>
              <input
                type="text"
                {...register('profession')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Nhập nghề nghiệp"
              />
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-primary-600 hover:to-primary-700 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Đang tính toán...</span>
            </div>
          ) : (
            'Tính số may mắn'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
} 