import { Lang } from './types';

const dict = {
  appName: { th: 'บางกอกบัส', my: 'ဘန်ကောက်ဘတ်စ်', en: 'BKK Terminal' },
  tagline: {
    th: 'คู่มือสถานีขนส่งกรุงเทพฯ',
    my: 'ဘန်ကောက်ဘတ်စ်ဂိတ်လမ်းညွှန်',
    en: 'Bangkok bus terminal guide',
  },
  tabs: {
    home: { th: 'หน้าหลัก', my: 'ပင်မ', en: 'Home' },
    maps: { th: 'แผนที่', my: 'မြေပုံ', en: 'Maps' },
    times: { th: 'ตารางเวลา', my: 'အချိန်ဇယား', en: 'Times' },
    guides: { th: 'คู่มือ', my: 'လမ်းညွှန်', en: 'Guides' },
    ai: { th: 'ผู้ช่วย AI', my: 'AI အကူ', en: 'AI Help' },
  },
  greetMorning: { th: 'สวัสดีตอนเช้า', my: 'မင်္ဂလာနံနက်ခင်းပါ', en: 'Good morning' },
  greetAfternoon: { th: 'สวัสดีตอนบ่าย', my: 'မင်္ဂလာနေ့လည်ခင်းပါ', en: 'Good afternoon' },
  greetEvening: { th: 'สวัสดีตอนเย็น', my: 'မင်္ဂလာညနေခင်းပါ', en: 'Good evening' },
  searchPlaceholder: {
    th: 'ค้นหาปลายทาง สถานี หรือสายรถ…',
    my: 'ဦးတည်ရာ၊ ဂိတ် သို့မဟုတ် လမ်းကြောင်း ရှာရန်…',
    en: 'Search destination, station or route…',
  },
  liveDepartures: { th: 'เที่ยวถัดไปวันนี้', my: 'ယနေ့နောက်ထွက်ခွာမည့်ကားများ', en: 'Next departures today' },
  seeAll: { th: 'ดูทั้งหมด', my: 'အားလုံးကြည့်ရန်', en: 'See all' },
  terminals: { th: 'สถานีขนส่งกรุงเทพฯ', my: 'ဘန်ကောက်ဘတ်စ်ဂိတ်များ', en: 'Bangkok terminals' },
  quickGuides: { th: 'คู่มือด่วน', my: 'အမြန်လမ်းညွှန်', en: 'Quick guides' },
  askAi: { th: 'ถามผู้ช่วย AI', my: 'AI အကူအညီကိုမေးရန်', en: 'Ask AI assistant' },
  askAiHint: {
    th: 'ถามเป็นภาษาไทยหรือพม่าได้เลย เช่น “ไปแม่สอดยังไง”',
    my: 'မြန်မာ သို့မဟုတ် ထိုင်းလို မေးနိုင်သည်။ ဥပမာ “မဲဆောက် ဘယ်လိုသွားမလဲ”',
    en: 'Ask in Thai or Burmese — e.g. “How do I go to Mae Sot?”',
  },
  noticeTitle: { th: 'ประกาศวันนี้', my: 'ယနေ့အသိပေးချက်', en: "Today's notice" },
  noticeBody: {
    th: 'ตรวจตารางเวลาก่อนเดินทาง รถบางเที่ยวอาจเต็มช่วงสุดสัปดาห์และวันหยุดนักขัตฤกษ์',
    my: 'ခရီးမထွက်မီ အချိန်ဇယားကို စစ်ဆေးပါ။ စနေ၊ တနင်္ဂနွေနှင့် ရုံးပိတ်ရက်များတွင် ကားပြည့်တတ်သည်။',
    en: 'Check times before you travel. Weekend and holiday trips often sell out.',
  },
  updated: { th: 'อัปเดต', my: 'အပ်ဒိတ်', en: 'Updated' },
  hours: { th: 'เวลาทำการ', my: 'ဖွင့်ချိန်', en: 'Hours' },
  phone: { th: 'โทร', my: 'ဖုန်း', en: 'Call' },
  address: { th: 'ที่อยู่', my: 'လိပ်စာ', en: 'Address' },
  gettingThere: { th: 'การเดินทางมาสถานี', my: 'ဂိတ်သို့လာရောက်ပုံ', en: 'Getting there' },
  facilities: { th: 'สิ่งอำนวยความสะดวก', my: 'အဆောက်အအုံများ', en: 'Facilities' },
  platforms: { th: 'โซนชานชาลา', my: 'ပလက်ဖောင်းဇုန်များ', en: 'Platform zones' },
  tips: { th: 'เคล็ดลับ', my: 'အကြံပြုချက်များ', en: 'Tips' },
  routesFromHere: { th: 'เส้นทางจากที่นี่', my: 'ဤဂိတ်မှလမ်းကြောင်းများ', en: 'Routes from here' },
  viewMap: { th: 'ดูแผนที่สถานี', my: 'ဂိတ်မြေပုံကြည့်ရန်', en: 'View station map' },
  viewRoads: { th: 'แผนที่ถนนเข้า–ออก', my: 'ဝင်ထွက်လမ်းမြေပုံ', en: 'Access road map' },
  duration: { th: 'ระยะเวลา', my: 'ကြာချိန်', en: 'Duration' },
  price: { th: 'ราคา', my: 'ဈေးနှုန်း', en: 'Price' },
  baht: { th: 'บาท', my: 'ဘတ်', en: 'THB' },
  platform: { th: 'ชานชาลา', my: 'ပလက်ဖောင်း', en: 'Platform' },
  company: { th: 'บริษัท', my: 'ကုမ္ပဏီ', en: 'Company' },
  via: { th: 'ผ่าน', my: 'ဖြတ်သန်း', en: 'Via' },
  days: { th: 'วันเดินรถ', my: 'ပြေးဆွဲသည့်နေ့', en: 'Days' },
  notes: { th: 'หมายเหตุ', my: 'မှတ်ချက်', en: 'Notes' },
  departures: { th: 'รอบออก', my: 'ထွက်ခွာချိန်များ', en: 'Departures' },
  nextIn: { th: 'เที่ยวถัดไปใน', my: 'နောက်ကား', en: 'Next in' },
  min: { th: 'นาที', my: 'မိနစ်', en: 'min' },
  hr: { th: 'ชม.', my: 'နာရီ', en: 'hr' },
  type: {
    vip: { th: 'VIP', my: 'VIP', en: 'VIP' },
    first: { th: 'ชั้น 1', my: 'ပထမတန်း', en: '1st class' },
    second: { th: 'ชั้น 2', my: 'ဒုတိယတန်း', en: '2nd class' },
    express: { th: 'รถด่วน', my: 'အမြန်ကား', en: 'Express' },
  },
  allStations: { th: 'ทุกสถานี', my: 'ဂိတ်အားလုံး', en: 'All stations' },
  filter: { th: 'กรอง', my: 'စစ်ထုတ်ရန်', en: 'Filter' },
  noResults: { th: 'ไม่พบรายการ', my: 'မတွေ့ပါ', en: 'No results' },
  noResultsHint: {
    th: 'ลองเปลี่ยนคำค้นหรือเลือกสถานีอื่น',
    my: 'ရှာဖွေစကားလုံး သို့မဟုတ် အခြားဂိတ်ကို စမ်းကြည့်ပါ',
    en: 'Try another search or station',
  },
  emptyFav: {
    th: 'ยังไม่มีรายการโปรด',
    my: 'အကြိုက်ဆုံးများ မရှိသေးပါ',
    en: 'No favorites yet',
  },
  mapsTitle: { th: 'แผนที่และผังสถานี', my: 'မြေပုံနှင့် ဂိတ်ပုံစံများ', en: 'Maps & layouts' },
  mapsHint: {
    th: 'ผังอาคาร แผนที่ถนน และจุดเชื่อมต่อ BTS/MRT อัปเดตล่าสุด',
    my: 'အဆောက်အအုံပုံစံ၊ လမ်းမြေပုံနှင့် BTS/MRT ချိတ်ဆက်မှု အသစ်ဆုံး',
    en: 'Terminal layouts, road maps and BTS/MRT links — freshly updated',
  },
  legend: { th: 'คำอธิบายสัญลักษณ์', my: 'အမှတ်အသားရှင်းလင်းချက်', en: 'Legend' },
  howToRead: { th: 'วิธีใช้แผนที่', my: 'မြေပုံအသုံးပြုပုံ', en: 'How to use this map' },
  nearbyRoads: { th: 'ถนนโดยรอบ', my: 'ပတ်ဝန်းကျင်လမ်းများ', en: 'Nearby roads' },
  lastUpdated: { th: 'อัปเดตล่าสุด', my: 'နောက်ဆုံးအပ်ဒိတ်', en: 'Last updated' },
  guidesTitle: { th: 'คู่มือการเดินทาง', my: 'ခရီးသွားလမ်းညွှန်', en: 'Travel guides' },
  readMins: { th: 'นาทีในการอ่าน', my: 'ဖတ်ရန် မိနစ်', en: 'min read' },
  aiTitle: { th: 'ผู้ช่วยสถานีขนส่ง', my: 'ဘတ်စ်ဂိတ် AI အကူအညီ', en: 'Terminal assistant' },
  aiHello: {
    th: 'สวัสดีค่ะ ฉันคือผู้ช่วยสถานีขนส่งกรุงเทพฯ ถามได้เลยเรื่องตารางรถ แผนที่ จุดขึ้นรถ หรือการเดินทางจากเมียนมา',
    my: 'မင်္ဂလာပါ။ ကျွန်မက ဘန်ကောက်ဘတ်စ်ဂိတ် အကူအညီပေးသူပါ။ အချိန်ဇယား၊ မြေပုံ၊ ကားတက်ရာနေရာ သို့မဟုတ် မြန်မာပြည်မှလာပုံများကို မေးနိုင်ပါတယ်။',
    en: 'Hi — I am the Bangkok bus terminal assistant. Ask me about times, maps, platforms, or travel from Myanmar.',
  },
  aiPlaceholder: {
    th: 'พิมพ์คำถามเป็นไทยหรือพม่า…',
    my: 'မြန်မာ သို့မဟုတ် ထိုင်းလို မေးခွန်းရိုက်ပါ…',
    en: 'Type a question in Thai or Burmese…',
  },
  send: { th: 'ส่ง', my: 'ပို့ရန်', en: 'Send' },
  thinking: { th: 'กำลังคิด…', my: 'စဉ်းစားနေသည်…', en: 'Thinking…' },
  suggestions: { th: 'คำถามยอดนิยม', my: 'လူကြိုက်များသောမေးခွန်းများ', en: 'Popular questions' },
  language: { th: 'ภาษา', my: 'ဘာသာစကား', en: 'Language' },
  thai: { th: 'ไทย', my: 'ထိုင်း', en: 'Thai' },
  burmese: { th: 'พม่า', my: 'မြန်မာ', en: 'Burmese' },
  english: { th: 'อังกฤษ', my: 'အင်္ဂလိပ်', en: 'English' },
  favorites: { th: 'รายการโปรด', my: 'အကြိုက်ဆုံးများ', en: 'Favorites' },
  addFav: { th: 'บันทึกรายการโปรด', my: 'အကြိုက်ဆုံးထည့်ရန်', en: 'Save favorite' },
  saved: { th: 'บันทึกแล้ว', my: 'သိမ်းပြီး', en: 'Saved' },
  from: { th: 'จาก', my: 'မှ', en: 'From' },
  to: { th: 'ไป', my: 'သို့', en: 'To' },
  daily: { th: 'ทุกวัน', my: 'နေ့စဉ်', en: 'Daily' },
  soldHint: {
    th: 'แนะนำซื้อล่วงหน้าช่วงวันหยุด',
    my: 'ရုံးပိတ်ရက်များတွင် ကြိုတင်ဝယ်ရန် အကြံပြုသည်',
    en: 'Book ahead on holidays',
  },
  refresh: { th: 'ดึงลงเพื่ออัปเดต', my: 'အပ်ဒိတ်လုပ်ရန် အောက်ဆွဲပါ', en: 'Pull to refresh' },
  cityOverview: { th: 'ภาพรวมกรุงเทพฯ', my: 'ဘန်ကောက်အနှစ်ချုပ်', en: 'Bangkok overview' },
  north: { th: 'เหนือ / อีสาน', my: 'မြောက် / အရှေ့မြောက်', en: 'North / Isaan' },
  south: { th: 'ใต้ / ตะวันตก', my: 'တောင် / အနောက်', en: 'South / West' },
  east: { th: 'ตะวันออก', my: 'အရှေ့', en: 'East' },
  ticketCounter: { th: 'เคาน์เตอร์ตั๋ว', my: 'လက်မှတ်ကောင်တာ', en: 'Ticket counter' },
  waitingHall: { th: 'ห้องรอ', my: 'စောင့်ဆိုင်းခန်း', en: 'Waiting hall' },
  foodCourt: { th: 'ศูนย์อาหาร', my: 'အစားအသောက်ဆိုင်', en: 'Food court' },
  restroom: { th: 'ห้องน้ำ', my: 'အိမ်သာ', en: 'Restroom' },
  taxi: { th: 'แท็กซี่ / Grab', my: 'တက္ကစီ / Grab', en: 'Taxi / Grab' },
  platformArea: { th: 'ชานชาลาขึ้นรถ', my: 'ကားတက်ရာပလက်ဖောင်း', en: 'Boarding platforms' },
  infoDesk: { th: 'จุดประชาสัมพันธ์', my: 'အချက်အလက်စားပွဲ', en: 'Info desk' },
  leftIn: { th: 'อีก', my: 'နောက်', en: 'in' },
  departed: { th: 'ออกแล้ว', my: 'ထွက်ပြီး', en: 'Departed' },
  boardingSoon: { th: 'ใกล้ขึ้นรถ', my: 'မကြာမီတက်ရမည်', en: 'Boarding soon' },
  searchResults: { th: 'ผลการค้นหา', my: 'ရှာဖွေမှုရလဒ်များ', en: 'Search results' },
  clear: { th: 'ล้าง', my: 'ရှင်းရန်', en: 'Clear' },
  close: { th: 'ปิด', my: 'ပိတ်ရန်', en: 'Close' },
  details: { th: 'รายละเอียด', my: 'အသေးစိတ်', en: 'Details' },
  allDay: { th: 'ทั้งวัน', my: 'တစ်နေ့လုံး', en: 'All day' },
  more: { th: 'เพิ่มเติม', my: 'ပိုမို', en: 'More' },
  emergency: { th: 'ฉุกเฉิน', my: 'အရေးပေါ်', en: 'Emergency' },
  police: { th: 'ตำรวจท่องเที่ยว 1155', my: 'ခရီးသွားရဲ ၁၁၅၅', en: 'Tourist police 1155' },
  medical: { th: 'ฉุกเฉินแพทย์ 1669', my: 'ဆေးအရေးပေါ် ၁၆၆၉', en: 'Medical 1669' },
  noTrips: {
    th: 'ไม่มีเที่ยวที่ตรงกับตัวกรอง',
    my: 'စစ်ထုတ်မှုနှင့် ကိုက်ညီသောခရီး မရှိပါ',
    en: 'No trips match this filter',
  },
  tapZone: { th: 'แตะโซนเพื่อดูรายละเอียด', my: 'အသေးစိတ်ကြည့်ရန် ဇုန်ကိုနှိပ်ပါ', en: 'Tap a zone for details' },
  accessTitle: { th: 'ทางเข้า–ออก', my: 'ဝင်ပေါက်–ထွက်ပေါက်', en: 'Access' },
  btsMrt: { th: 'รถไฟฟ้า', my: 'ရထားသံလမ်း', en: 'Rail' },
  bus: { th: 'รถเมล์', my: 'မြို့တွင်းဘတ်စ်', en: 'City bus' },
  airport: { th: 'สนามบิน', my: 'လေဆိပ်', en: 'Airport' },
  favoriteOn: { th: 'อยู่ในรายการโปรด', my: 'အကြိုက်ဆုံးတွင်ရှိသည်', en: 'In favorites' },
  tonight: { th: 'ค่ำนี้', my: 'ဒီည', en: 'Tonight' },
  morning: { th: 'เช้า', my: 'နံနက်', en: 'Morning' },
  afternoon: { th: 'บ่าย', my: 'နေ့လည်', en: 'Afternoon' },
  night: { th: 'กลางคืน', my: 'ည', en: 'Night' },
  resultsFor: { th: 'ผลลัพธ์สำหรับ', my: 'အတွက် ရလဒ်များ', en: 'Results for' },
  aiPowered: { th: 'ขับเคลื่อนด้วย AI ในเครื่อง', my: 'စက်တွင်း AI ဖြင့် လုပ်ဆောင်သည်', en: 'On-device AI support' },
  newChat: { th: 'แชทใหม่', my: 'စကားပြောအသစ်', en: 'New chat' },
  copyHint: { th: 'แตะค้างเพื่อคัดลอก', my: 'ကူးယူရန် ကြာကြာနှိပ်ပါ', en: 'Long-press to copy' },
} as const;

type Path = string;

function lookup(obj: any, parts: string[]): any {
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

export function t(lang: Lang, key: string): string {
  const parts = key.split('.');
  const node = lookup(dict, parts);
  if (node == null) return key;
  if (typeof node === 'string') return node;
  if (node[lang]) return node[lang];
  if (node.en) return node.en;
  return key;
}

export function tx(lang: Lang, text: { th: string; my: string; en: string }): string {
  return text[lang] || text.en;
}

export default dict;