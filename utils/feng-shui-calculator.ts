import { LuckyNumberRequest, LuckyNumberResult } from '@/types';

// Vietnamese name to number mapping
const nameToNumber: { [key: string]: number } = {
  'a': 1, 'ă': 1, 'â': 1, 'b': 2, 'c': 3, 'd': 4, 'đ': 5, 'e': 6, 'ê': 6, 'f': 7, 'g': 8, 'h': 9, 'i': 1, 'j': 2, 'k': 3, 'l': 4, 'm': 5, 'n': 6, 'o': 7, 'ô': 7, 'ơ': 7, 'p': 8, 'q': 9, 'r': 1, 's': 2, 't': 3, 'u': 4, 'ư': 4, 'v': 5, 'w': 6, 'x': 7, 'y': 8, 'z': 9
};

// Five elements based on birth year
const fiveElementsByYear: { [key: number]: string } = {
  0: 'Kim', 1: 'Kim', 2: 'Thủy', 3: 'Thủy', 4: 'Mộc', 5: 'Mộc', 6: 'Hỏa', 7: 'Hỏa', 8: 'Thổ', 9: 'Thổ'
};

// Heavenly stems
const heavenlyStems = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];

// Earthly branches
const earthlyBranches = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

// Lucky colors by element
const luckyColorsByElement: { [key: string]: string[] } = {
  'Kim': ['Trắng', 'Bạc', 'Xám'],
  'Mộc': ['Xanh lá', 'Xanh dương', 'Nâu'],
  'Thủy': ['Đen', 'Xanh dương', 'Xanh lá'],
  'Hỏa': ['Đỏ', 'Cam', 'Hồng'],
  'Thổ': ['Vàng', 'Nâu', 'Cam']
};

// Lucky days by element
const luckyDaysByElement: { [key: string]: string[] } = {
  'Kim': ['Thứ 2', 'Thứ 6'],
  'Mộc': ['Thứ 3', 'Thứ 7'],
  'Thủy': ['Thứ 4', 'Thứ 8'],
  'Hỏa': ['Thứ 5', 'Thứ 9'],
  'Thổ': ['Thứ 2', 'Thứ 6', 'Chủ nhật']
};

// Lucky hours by element
const luckyHoursByElement: { [key: string]: string[] } = {
  'Kim': ['7h-9h', '15h-17h'],
  'Mộc': ['5h-7h', '13h-15h'],
  'Thủy': ['21h-23h', '3h-5h'],
  'Hỏa': ['11h-13h', '19h-21h'],
  'Thổ': ['9h-11h', '17h-19h']
};

// Feng Shui advice by element
const fengShuiAdviceByElement: { [key: string]: string } = {
  'Kim': 'Nên đặt vật phẩm kim loại ở hướng Tây, tránh hướng Nam để tăng vận may.',
  'Mộc': 'Trồng cây xanh ở hướng Đông, sử dụng màu xanh lá để thu hút tài lộc.',
  'Thủy': 'Đặt bể cá hoặc thác nước ở hướng Bắc, tránh hướng Nam để cân bằng âm dương.',
  'Hỏa': 'Sử dụng đèn đỏ hoặc vật phẩm màu đỏ ở hướng Nam để tăng năng lượng tích cực.',
  'Thổ': 'Đặt đá phong thủy hoặc gốm sứ ở trung tâm nhà để ổn định vận khí.'
};

export function calculateLuckyNumbers(request: LuckyNumberRequest): LuckyNumberResult {
  const { fullName, birthDate, gender, age, houseDirection, profession } = request;
  
  // Calculate name number
  const nameNumber = calculateNameNumber(fullName);
  
  // Calculate birth year element
  const birthYear = new Date(birthDate).getFullYear();
  const yearLastDigit = birthYear % 10;
  const element = fiveElementsByYear[yearLastDigit];
  
  // Calculate heavenly stem and earthly branch
  const stemIndex = (birthYear - 4) % 10;
  const branchIndex = (birthYear - 4) % 12;
  const heavenlyStem = heavenlyStems[stemIndex];
  const earthlyBranch = earthlyBranches[branchIndex];
  
  // Generate lucky numbers
  const luckyNumbers = generateLuckyNumbers(nameNumber, birthYear, gender, element);
  
  // Get lucky colors, days, hours
  const luckyColors = luckyColorsByElement[element] || ['Đỏ', 'Vàng', 'Xanh'];
  const luckyDays = luckyDaysByElement[element] || ['Thứ 2', 'Thứ 6'];
  const luckyHours = luckyHoursByElement[element] || ['9h-11h', '15h-17h'];
  
  // Get Feng Shui advice
  const fengShuiAdvice = fengShuiAdviceByElement[element] || 'Hãy giữ tâm thái tích cực và tin tưởng vào vận may của mình.';
  
  return {
    id: Date.now().toString(),
    request,
    luckyNumbers,
    luckyDays,
    luckyHours,
    luckyColors,
    fengShuiAdvice,
    fiveElements: {
      element,
      description: `Bạn thuộc hành ${element}, có tính cách ${getElementDescription(element)}`
    },
    heavenlyStems: {
      stem: heavenlyStem,
      description: `Thiên can ${heavenlyStem} mang lại ${getStemDescription(heavenlyStem)}`
    },
    earthlyBranches: {
      branch: earthlyBranch,
      description: `Địa chi ${earthlyBranch} tượng trưng cho ${getBranchDescription(earthlyBranch)}`
    },
    createdAt: new Date()
  };
}

function calculateNameNumber(name: string): number {
  const cleanName = name.toLowerCase().replace(/[^a-zăâđêôơư]/g, '');
  let total = 0;
  
  for (const char of cleanName) {
    total += nameToNumber[char] || 0;
  }
  
  // Reduce to single digit
  while (total > 9) {
    total = Math.floor(total / 10) + (total % 10);
  }
  
  return total;
}

function generateLuckyNumbers(nameNumber: number, birthYear: number, gender: string, element: string): number[] {
  const numbers: number[] = [];
  
  // Base numbers from name
  numbers.push(nameNumber);
  numbers.push((nameNumber + birthYear % 10) % 10 || 10);
  
  // Element-based numbers
  const elementNumbers = getElementNumbers(element);
  numbers.push(...elementNumbers);
  
  // Gender-based numbers
  if (gender === 'male') {
    numbers.push(1, 3, 5, 7, 9);
  } else {
    numbers.push(2, 4, 6, 8, 10);
  }
  
  // Age-based numbers
  const ageNumber = (birthYear % 100) % 9 || 9;
  numbers.push(ageNumber);
  
  // Remove duplicates and limit to 7 numbers
  const uniqueNumbers = Array.from(new Set(numbers)).slice(0, 7);
  
  // Ensure numbers are between 1-99
  return uniqueNumbers.map(num => num > 99 ? num % 99 || 99 : num);
}

function getElementNumbers(element: string): number[] {
  const elementNumberMap: { [key: string]: number[] } = {
    'Kim': [1, 6, 7, 8],
    'Mộc': [3, 4, 8, 9],
    'Thủy': [1, 2, 6, 7],
    'Hỏa': [2, 3, 7, 9],
    'Thổ': [2, 5, 8, 9]
  };
  
  return elementNumberMap[element] || [1, 2, 3, 4, 5];
}

function getElementDescription(element: string): string {
  const descriptions: { [key: string]: string } = {
    'Kim': 'kiên định, mạnh mẽ, có khả năng lãnh đạo',
    'Mộc': 'sáng tạo, linh hoạt, thích khám phá',
    'Thủy': 'thông minh, nhạy cảm, có trực giác tốt',
    'Hỏa': 'nhiệt tình, năng động, có sức ảnh hưởng',
    'Thổ': 'ổn định, đáng tin cậy, có tinh thần trách nhiệm'
  };
  
  return descriptions[element] || 'đặc biệt và độc đáo';
}

function getStemDescription(stem: string): string {
  const descriptions: { [key: string]: string } = {
    'Giáp': 'sự khởi đầu và lãnh đạo',
    'Ất': 'sự phát triển và mềm mại',
    'Bính': 'năng lượng và sức mạnh',
    'Đinh': 'sự ổn định và kiên nhẫn',
    'Mậu': 'sự trung thành và đáng tin cậy',
    'Kỷ': 'sự thông minh và khéo léo',
    'Canh': 'sự quyết đoán và mạnh mẽ',
    'Tân': 'sự tinh tế và nhạy cảm',
    'Nhâm': 'sự sâu sắc và trí tuệ',
    'Quý': 'sự hoàn thiện và viên mãn'
  };
  
  return descriptions[stem] || 'những đặc điểm tích cực';
}

function getBranchDescription(branch: string): string {
  const descriptions: { [key: string]: string } = {
    'Tý': 'sự thông minh và nhanh nhẹn',
    'Sửu': 'sự kiên nhẫn và chăm chỉ',
    'Dần': 'sự dũng cảm và lãnh đạo',
    'Mão': 'sự nhanh nhẹn và thông minh',
    'Thìn': 'sự mạnh mẽ và quyền lực',
    'Tỵ': 'sự khéo léo và thông minh',
    'Ngọ': 'sự năng động và nhiệt tình',
    'Mùi': 'sự hiền hòa và nhân từ',
    'Thân': 'sự thông minh và linh hoạt',
    'Dậu': 'sự chính xác và cẩn thận',
    'Tuất': 'sự trung thành và đáng tin',
    'Hợi': 'sự hào phóng và tốt bụng'
  };
  
  return descriptions[branch] || 'những phẩm chất đặc biệt';
} 