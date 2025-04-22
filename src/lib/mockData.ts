export interface Event {
  id: string;
  title: string;
  description: string;
  previewImageUrl: string;
  startTime: string;
  endTime: string;
  maxTickets: number;
  remainingTickets: number;
  price: number;
  creatorAddress: string;
}

export const mockEvents: Event[] = [
  {
    id: '1',
    title: '2024全球区块链峰会',
    description: '全球领先的区块链会议，汇集行业最具影响力的领导者，探讨最新技术发展和应用场景。本次峰会将邀请全球顶尖专家分享前沿研究成果，并为参与者提供独特的社交和商业合作机会。',
    previewImageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    startTime: '2024-11-15T09:00:00Z',
    endTime: '2024-11-17T18:00:00Z',
    maxTickets: 1000,
    remainingTickets: 350,
    price: 0.2,
    creatorAddress: '0x123456789abcdef123456789abcdef123456789a'
  },
  {
    id: '2',
    title: '元宇宙艺术展',
    description: '探索数字艺术的未来。本次展览将展示来自世界各地知名数字艺术家的作品，展现AI、区块链和元宇宙如何重塑艺术创作。参与者将有机会在虚拟和现实世界中体验沉浸式艺术。',
    previewImageUrl: 'https://images.unsplash.com/photo-1496954748981-0555dfde40fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    startTime: '2024-10-01T10:00:00Z',
    endTime: '2024-10-15T20:00:00Z',
    maxTickets: 500,
    remainingTickets: 125,
    price: 0.05,
    creatorAddress: '0xabcdef123456789abcdef123456789abcdef1234'
  },
  {
    id: '3',
    title: '区块链开发者训练营',
    description: '为期一周的密集训练营，专为想要掌握区块链开发技能的工程师设计。课程涵盖智能合约编程、dApp开发和最佳安全实践。每位参与者将在训练营结束时完成一个实际项目。',
    previewImageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    startTime: '2024-09-05T08:00:00Z',
    endTime: '2024-09-12T18:00:00Z',
    maxTickets: 100,
    remainingTickets: 45,
    price: 0.3,
    creatorAddress: '0x89abcdef123456789abcdef123456789abcdef12'
  },
  {
    id: '4',
    title: 'Web3游戏嘉年华',
    description: '探索区块链游戏的未来。体验最新的Web3游戏，与游戏开发者交流，了解如何通过游戏赚取加密货币。参与者将有机会赢取专属游戏NFT和其他数字奖品。',
    previewImageUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    startTime: '2024-12-20T13:00:00Z',
    endTime: '2024-12-22T22:00:00Z',
    maxTickets: 300,
    remainingTickets: 280,
    price: 0.1,
    creatorAddress: '0xdef123456789abcdef123456789abcdef12345678'
  }
];

export const getEvents = (): Event[] => {
  return mockEvents;
};

export const getEventById = (id: string): Event | undefined => {
  return mockEvents.find(event => event.id === id);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const createEvent = (event: Omit<Event, 'id' | 'remainingTickets'>): Event => {
  const newEvent: Event = {
    id: (mockEvents.length + 1).toString(),
    remainingTickets: event.maxTickets,
    ...event
  };
  mockEvents.push(newEvent);
  return newEvent;
};

export const buyTicket = (eventId: string, quantity: number = 1): boolean => {
  const event = getEventById(eventId);
  if (!event || event.remainingTickets < quantity) {
    return false;
  }
  
  event.remainingTickets -= quantity;
  return true;
}; 