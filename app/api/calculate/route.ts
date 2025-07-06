import { NextRequest, NextResponse } from 'next/server';
import { LuckyNumberRequest } from '@/types';
import { calculateLuckyNumbers } from '@/utils/feng-shui-calculator';

export async function POST(request: NextRequest) {
  try {
    const body: LuckyNumberRequest = await request.json();
    
    // Validate input
    if (!body.fullName || !body.birthDate || !body.gender) {
      return NextResponse.json(
        { success: false, message: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      );
    }

    // Calculate lucky numbers using feng shui logic
    const result = calculateLuckyNumbers(body);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Error calculating lucky numbers:', error);
    return NextResponse.json(
      { success: false, message: 'Có lỗi xảy ra khi tính toán' },
      { status: 500 }
    );
  }
} 