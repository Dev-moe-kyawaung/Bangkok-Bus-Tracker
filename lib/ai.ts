import { Lang } from './types';
import { routes, stations } from './data';
import { tx } from './i18n';

function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/[?؟؟!.,、]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const aliases: Record<string, string[]> = {
  'mo-chit': [
    'mo chit', 'mochit', 'หมอชิต', 'หมอชิต 2', 'หมอชิต2', 'จตุจักร',
    'မော်ချစ်', 'မော်ချစ် ၂', 'မော်ချစ်၂', 'chatuchak', 'northern', 'เหนือ', 'อีสาน',
  ],
  'sai-tai': [
    'sai tai', 'สายใต้', 'สายใต้ใหม่', 'southern', 'ตลิ่งชัน',
    'ဆိုင်တိုင်း', 'ဆိုင်တိုင်းအသစ်', 'borom',
  ],
  ekkamai: [
    'ekkamai', 'เอกมัย', 'eastern', 'สุขุมวิท', 'အက်ကမိုင်', 'pattaya station',
  ],
  maesot: [
    'mae sot', 'แม่สอด', 'เมียวดี', 'myawaddy', 'myawadi', 'မဲဆောက်', 'မြဝတီ', 'border', 'ด่าน',
  ],
  chiangmai: ['chiang mai', 'เชียงใหม่', 'ချင်းမိုင်', 'chiangmai'],
  chiangrai: ['chiang rai', 'เชียงราย', 'ချင်းရိုင်း'],
  phuket: ['phuket', 'ภูเก็ต', 'ဖူးခက်'],
  pattaya: ['pattaya', 'พัทยา', 'ပတ္တားယား'],
  ranong: ['ranong', 'ระนอง', 'ရနောင်း', 'kawthaung', 'เกาะท่อง', 'ကော့သောင်း'],
  huaHin: ['hua hin', 'หัวหิน', 'ဟွာဟင်'],
  trat: ['trat', 'ตราด', 'ထရာ့ဒ်', 'koh chang', 'เกาะช้าง'],
  hatyai: ['hat yai', 'หาดใหญ่', 'ဟတ်ယိုင်'],
  udon: ['udon', 'อุดร', 'အူဒွန်'],
  khonkaen: ['khon kaen', 'ขอนแก่น', 'ခွန်ကဲန်'],
  krabi: ['krabi', 'กระบี่', 'ခရာဘီ'],
  kan: ['kanchanaburi', 'กาญจนบุรี', 'ကန်ချနဘူရီ'],
  airportBkk: ['suvarnabhumi', 'สุวรรณภูมิ', 'bkk', 'သုဝဏ္ဏဘူမိ', 'สนามบินใหญ่'],
  airportDmk: ['don mueang', 'ดอนเมือง', 'dmk', 'ဒွန်မောင်း'],
};

function has(q: string, keys: string[]) {
  return keys.some((k) => q.includes(k));
}

function hit(q: string, group: keyof typeof aliases) {
  return aliases[group].some((a) => q.includes(a));
}

type Reply = { text: string; suggestions: string[] };

function reply(lang: Lang, th: string, my: string, en: string, suggestions: string[]): Reply {
  const text = lang === 'my' ? my : lang === 'en' ? en : th;
  return { text, suggestions };
}

export function answerQuestion(raw: string, lang: Lang): Reply {
  const q = norm(raw);

  if (hit(q, 'maesot') || has(q, ['border', 'ด่าน', 'နယ်စပ်', 'myawaddy', 'เมียวดี'])) {
    return reply(
      lang,
      'เส้นทางยอดนิยมจากเมียนมาคือ เมียวดี → ด่านไทย (เปิด 05:30–20:00) → วิน/สองแถว 15–25 นาทีเข้าแม่สอด → รถทัวร์จากสถานีแม่สอดไปหมอชิต 2 ใช้เวลา 8–9 ชม. ราคา 420–560 บาท เที่ยวสำคัญ 07:30, 09:00, 11:00, 20:00, 21:00 ชานชาลา B-20 ที่หมอชิตฝั่งขาเข้า กรุงเทพฯ อย่าลืมซื้อตั๋วล่วงหน้าช่วงเช้า',
      'မြန်မာမှ အသုံးများသောလမ်းမှာ မြဝတီ → ထိုင်းဂိတ် (၀၅:၃၀–၂၀:၀၀) → ဆိုင်ကယ်/ဆွန် grav ၁၅–၂၅ မိနစ် မဲဆောက်မြို့ → မဲဆောက်ဂိတ်မှ မော်ချစ် ၂ သို့ ၈–၉ နာရီ၊ ၄၂၀–၅၆၀ ဘတ်။ အဓိကထွက်ချိန် ၀၇:၃၀၊ ၀၉:၀၀၊ ၁၁:၀၀၊ ၂၀:၀၀၊ ၂၁:၀၀။ ဘန်ကောက်ရောက်လျှင် ပလက်ဖောင်း B-20။ နံနက်ပိုင်းတွင် ကြိုတင်ဝယ်ပါ။',
      'The usual Myanmar route is Myawaddy → Thai gate (05:30–20:00) → 15–25 min into Mae Sot → coach to Mo Chit 2 in 8–9 hrs, 420–560 THB. Key times 07:30, 09:00, 11:00, 20:00, 21:00. Arrival platform B-20. Buy in the morning.',
      lang === 'my'
        ? ['မော်ချစ် ၂ ဘယ်လိုသွားမလဲ?', 'ကော့သောင်းလမ်း', 'လက်မှတ်ဘယ်နှစ်ကျပ်လဲ?']
        : lang === 'en'
        ? ['How do I reach Mo Chit 2?', 'Kawthaung route', 'Ticket prices']
        : ['หมอชิต 2 ไปยังไง?', 'เส้นทางเกาะท่อง', 'ราคาตั๋วเท่าไหร่?']
    );
  }

  if (hit(q, 'ranong') || has(q, ['kawthaung', 'เกาะท่อง', 'ကော့သောင်း'])) {
    return reply(
      lang,
      'ไป Kawthaung (เกาะท่อง) ให้ขึ้นรถที่สายใต้ใหม่ ไประนอง เที่ยว 08:20 และ 20:00 ใช้เวลาประมาณ 8 ชม. ราคา 420–540 บาท ชานชาลา 18 จากนั้นต่อเรือ 20–45 นาที ด่านเปิด 07:00–16:00 ตามเวลาไทย',
      'ကော့သောင်းသို့ ဆိုင်တိုင်းအသစ်မှ ရနောင်းကား တက်ပါ။ ၀၈:၂၀ နှင့် ၂၀:၀၀၊ ၈ နာရီခန့်၊ ၄၂၀–၅၄၀ ဘတ်၊ ပလက်ဖောင်း ၁၈။ ထို့နောက် လှေ ၂၀–၄၅ မိနစ်။ ဂိတ်ဖွင့် ထိုင်းစံတော်ချိန် ၀၇:၀၀–၁၆:၀၀။',
      'For Kawthaung, take Sai Tai Mai to Ranong at 08:20 or 20:00 (~8 hrs, 420–540 THB, platform 18) then a 20–45 min boat. Immigration 07:00–16:00 Thai time.',
      lang === 'my' ? ['ဆိုင်တိုင်းအသစ် ဘယ်မှာလဲ?', 'မဲဆောက်လမ်း'] : lang === 'en' ? ['Where is Sai Tai Mai?', 'Mae Sot route'] : ['สายใต้ใหม่อยู่ไหน?', 'เส้นทางแม่สอด']
    );
  }

  if (hit(q, 'chiangmai')) {
    const r = routes.filter((x) => x.id.includes('cmai'));
    const times = r.flatMap((x) => x.times).sort().join(', ');
    return reply(
      lang,
      `เชียงใหม่ขึ้นที่หมอชิต 2 โซน B ชานชาลา 14–16 VIP นครชัยแอร์ ราคา 720–890 บาท ชั้น 1 ประมาณ 580–680 บาท ใช้เวลา 10–10.5 ชม. รอบวันนี้: ${times} แนะนำเที่ยว 19:00–21:00 ถ้าต้องการถึงเช้า`,
      `ချင်းမိုင်ကို မော်ချစ် ၂ ဇုန် B ပလက်ဖောင်း ၁၄–၁၆ မှတက်ပါ။ VIP နခွန်ချိုင်အဲယား ၇၂၀–၈၉၀ ဘတ်၊ ပထမတန်း ၅၈၀–၆၈၀ ဘတ်၊ ၁၀–၁၀.၅ နာရီ။ ယနေ့အချိန်: ${times}။ မနက်ရောက်ချင်ရင် ၁၉:၀၀–၂၁:၀၀ ကိုရွေးပါ။`,
      `Chiang Mai leaves Mo Chit 2 zone B platforms 14–16. VIP Nakhonchai Air 720–890 THB, 1st class 580–680 THB, 10–10.5 hrs. Times today: ${times}. Pick 19:00–21:00 to arrive in the morning.`,
      lang === 'my' ? ['မော်ချစ် ၂ မြေပုံ', 'VIP နဲ့ ပထမတန်း ကွာခြားချက်'] : lang === 'en' ? ['Mo Chit 2 map', 'VIP vs 1st class'] : ['ผังหมอชิต 2', 'VIP ต่างจากชั้น 1 อย่างไร']
    );
  }

  if (hit(q, 'phuket') || hit(q, 'krabi') || hit(q, 'hatyai')) {
    return reply(
      lang,
      'รถภาคใต้ทั้งหมดออกจากสายใต้ใหม่ (ตลิ่งชัน) ไม่ใช่หมอชิต ภูเก็ต VIP ออก 18:00–20:30 ราคา 780–980 บาท ประมาณ 12 ชม. กระบี่ 18:30/19:30 หาดใหญ่ 17:30–19:15 สถานีอยู่ชานเมือง เผื่อเดินทางจากสุขุมวิทอย่างน้อย 90 นาที',
      'တောင်ပိုင်းကားအားလုံး ဆိုင်တိုင်းအသစ် (တလင်ချန်) မှထွက်သည်။ မော်ချစ်မဟုတ်ပါ။ ဖူးခက် VIP ၁၈:၀၀–၂၀:၃၀၊ ၇၈၀–၉၈၀ ဘတ်၊ ၁၂ နာရီခန့်။ ခရာဘီ ၁၈:၃၀/၁၉:၃၀။ ဟတ်ယိုင် ၁၇:၃၀–၁၉:၁၅။ ဂိတ်သည် ဆင်ခြေဖုံးတွင်ရှိသဖြင့် သုခွမ်ဝစ်မှ အနည်းဆုံး ၉၀ မိနစ် ကြိုတင်ပါ။',
      'All southern coaches leave Sai Tai Mai (Taling Chan), not Mo Chit. Phuket VIP 18:00–20:30, 780–980 THB, ~12 hrs. Krabi 18:30/19:30. Hat Yai 17:30–19:15. Allow 90+ min from Sukhumvit.',
      lang === 'my' ? ['ဆိုင်တိုင်းအသစ် သွားပုံ', 'ရနောင်းကား'] : lang === 'en' ? ['How to reach Sai Tai Mai', 'Ranong bus'] : ['ไปสายใต้ใหม่ยังไง', 'รถระนอง']
    );
  }

  if (hit(q, 'pattaya') || hit(q, 'trat')) {
    return reply(
      lang,
      'พัทยาและชายฝั่งตะวันออกขึ้นที่เอกมัย (BTS เอกมัย ทางออก 2 เดิน 2 นาที) รถตู้พัทยาทุก 30 นาที 06:00–20:00 ราคา 130–180 บาท ใช้เวลา 2 ชม. ตราดมี 07:00, 09:00, 12:00, 23:00 ต่อเกาะช้างที่แหลมงอบ',
      'ပတ္တားယားနှင့် အရှေ့ကမ်းရိုးတန်းကို အက်ကမိုင်မှတက်ပါ (BTS အက်ကမိုင် ထွက်ပေါက် ၂၊ ၂ မိနစ်လမ်းလျှောက်)။ ပတ္တားယားဗန် ၃၀ မိနစ်တစ်ကြိမ် ၀၆:၀၀–၂၀:၀၀၊ ၁၃၀–၁၈၀ ဘတ်၊ ၂ နာရီ။ ထရာ့ဒ် ၀၇:၀၀၊ ၀၉:၀၀၊ ၁၂:၀၀၊ ၂၃:၀၀။ ကိုးချန်ကို လမ်ငော့မှဆက်ပါ။',
      'Pattaya and the east coast leave Ekkamai (BTS Ekkamai exit 2, 2-min walk). Pattaya vans every 30 min 06:00–20:00, 130–180 THB, 2 hrs. Trat at 07:00, 09:00, 12:00, 23:00. Koh Chang via Laem Ngop.',
      lang === 'my' ? ['အက်ကမိုင် မြေပုံ', 'သုဝဏ္ဏဘူမိမှ အက်ကမိုင်'] : lang === 'en' ? ['Ekkamai map', 'BKK to Ekkamai'] : ['ผังเอกมัย', 'จากสุวรรณภูมิไปเอกมัย']
    );
  }

  if (hit(q, 'airportBkk') || hit(q, 'airportDmk') || has(q, ['airport', 'สนามบิน', 'လေဆိပ်'])) {
    const dmk = hit(q, 'airportDmk') || has(q, ['ดอนเมือง', 'dmk']);
    if (dmk) {
      return reply(
        lang,
        'ดอนเมืองใกล้หมอชิตที่สุด แท็กซี่ 25–40 นาที 150–250 บาท หรือรถ A1 ไปอนุสาวรีย์แล้วต่อ BTS ถ้าจะไปเอกมัยใช้ Airport Rail Link ไม่ได้จากดอนเมือง ใช้แท็กซี่หรือเข้าเมืองด้วยรถไฟแดงแล้วต่อ BTS',
        'ဒွန်မောင်းသည် မော်ချစ်နှင့် အနီးဆုံး။ တက္ကစီ ၂၅–၄၀ မိနစ်၊ ၁၅၀–၂၅၀ ဘတ်၊ သို့မဟုတ် A1 ဖြင့် အထိမ်းအမှတ်သို့ပြီး BTS ဆက်။ ဒွန်မောင်းမှ အက်ကမိုင်သို့ Airport Rail Link မရှိပါ။ တက္ကစီ သို့မဟုတ် အနီရောင်ရထားဖြင့် မြို့ဝင်ပြီး BTS ဆက်ပါ။',
        'Don Mueang is closest to Mo Chit: taxi 25–40 min, 150–250 THB, or A1 bus then BTS. There is no Airport Rail Link from DMK to Ekkamai — taxi or red line + BTS.',
        lang === 'my' ? ['မော်ချစ် ၂', 'သုဝဏ္ဏဘူမိလမ်း'] : lang === 'en' ? ['Mo Chit 2', 'Suvarnabhumi route'] : ['หมอชิต 2', 'เส้นทางสุวรรณภูมิ']
      );
    }
    return reply(
      lang,
      'จากสุวรรณภูมิ: เอกมัยใช้ Airport Rail Link ถึงพระโขนง ต่อ BTS 1 สถานี รวม 45–60 นาที · หมอชิตใช้ Airport Rail Link ถึงพญาไท ต่อ BTS หมอชิต แล้ววิน 10 นาที · สายใต้ใหม่เข้าเมืองแล้ว Grab 90–130 นาที',
      'သုဝဏ္ဏဘူမိမှ: အက်ကမိုင် — Airport Rail Link ဖြင့် ဖရာခနောင်၊ BTS တစ်ဘူတာ၊ ၄၅–၆၀ မိနစ် · မော်ချစ် — ပယာထိုင်းအထိ ရထား၊ BTS မော်ချစ်၊ ဆိုင်ကယ် ၁၀ မိနစ် · ဆိုင်တိုင်းအသစ် — မြို့တွင်းဝင်ပြီး Grab ၉၀–၁၃၀ မိနစ်။',
      'From Suvarnabhumi: Ekkamai via Airport Rail Link to Phra Khanong + 1 BTS stop (45–60 min). Mo Chit via rail to Phaya Thai + BTS Mo Chit + 10 min motorbike. Sai Tai Mai: into town then Grab 90–130 min.',
      lang === 'my' ? ['အက်ကမိုင်', 'မော်ချစ် ၂'] : lang === 'en' ? ['Ekkamai', 'Mo Chit 2'] : ['เอกมัย', 'หมอชิต 2']
    );
  }

  if (hit(q, 'mo-chit') || has(q, ['northern', 'เหนือ', 'อีสาน', 'မြောက်'])) {
    const s = stations[0];
    return reply(
      lang,
      `หมอชิต 2 คือสถานีสายเหนือและอีสาน เปิด ${s.hours} ที่อยู่ถนนกำแพงเพชร 2 จตุจักร โทร ${s.phone} มาด้วย BTS หมอชิต ทางออก 3 หรือ MRT สวนจตุจักร ทางออก 2 อย่าไปหมอชิตเก่า โซน A = อีสาน โซน B = เหนือ (รวมแม่สอด ชานชาลา B-20)`,
      `မော်ချစ် ၂ သည် မြောက်နှင့် အီစန်ဂိတ်ဖြစ်သည်။ ဖွင့်ချိန် ${s.hours}။ လိပ်စာ ကမ်ဖန်ဖက် ၂ လမ်း၊ ချာတူချက်။ ဖုန်း ${s.phone}။ BTS မော်ချစ် ထွက်ပေါက် ၃ သို့မဟုတ် MRT ချာတူချက်ဥယျာဉ် ထွက်ပေါက် ၂။ မော်ချစ်အဟောင်း မသွားပါနှင့်။ ဇုန် A = အီစန်၊ ဇုန် B = မြောက် (မဲဆောက် ပလက်ဖောင်း B-20 အပါအဝင်)။`,
      `Mo Chit 2 is the North & Isaan terminal, open ${s.hours}, Kamphaeng Phet 2 Rd, Chatuchak, tel ${s.phone}. BTS Mo Chit exit 3 or MRT Chatuchak Park exit 2 — not old Mo Chit. Zone A = Isaan, Zone B = North (Mae Sot is B-20).`,
      lang === 'my' ? ['မဲဆောက်ကား', 'ချင်းမိုင်အချိန်ဇယား', 'ဂိတ်မြေပုံ'] : lang === 'en' ? ['Mae Sot bus', 'Chiang Mai times', 'Terminal map'] : ['รถแม่สอด', 'ตารางเชียงใหม่', 'ผังสถานี']
    );
  }

  if (hit(q, 'sai-tai')) {
    return reply(
      lang,
      'สายใต้ใหม่อยู่ถนนบรมราชชนนี ตลิ่งชัน เปิด 04:00–23:00 โทร 02-894-6122 ไม่มี BTS หน้าสถานี ใช้รถเมล์ 511/515 จากสนามหลวง หรือ BTS บางหว้าแล้วต่อแท็กซี่ 15–20 นาที รถภาคใต้และตะวันตกทั้งหมดออกจากที่นี่ รวมระนองไป Kawthaung',
      'ဆိုင်တိုင်းအသစ်သည် ဘိုရမ်ရာ့ချာနီလမ်း၊ တလင်ချန်တွင်ရှိသည်။ ဖွင့် ၀၄:၀၀–၂၃:၀၀။ ဖုန်း ၀၂-၈၉၄-၆၁၂၂။ ဂိတ်ရှေ့ BTS မရှိ။ စနမ်လွမ်မှ ဘတ်စ် ၅၁၁/၅၁၅ သို့မဟုတ် BTS ဘန်ဝါမှ တက္ကစီ ၁၅–၂၀ မိနစ်။ တောင်နှင့် အနောက်ကားအားလုံး ဤမှထွက်သည်။ ကော့သောင်းသို့ ရနောင်းအပါအဝင်။',
      'Sai Tai Mai is on Borommaratchachonnani Rd, Taling Chan, 04:00–23:00, tel 02-894-6122. No BTS at the door — bus 511/515 from Sanam Luang, or BTS Bang Wa + 15–20 min taxi. All south and west coaches leave here, including Ranong for Kawthaung.',
      lang === 'my' ? ['ဖူးခက်ညကား', 'ဂိတ်ကိုကားမောင်းဝင်ပုံ'] : lang === 'en' ? ['Phuket night bus', 'Driving in'] : ['รถดึกภูเก็ต', 'ขับรถเข้าสถานี']
    );
  }

  if (hit(q, 'ekkamai')) {
    return reply(
      lang,
      'เอกมัยเป็นสถานีเล็กที่สุด เชื่อม BTS เอกมัยทางออก 2 เดิน 2 นาที เปิด 05:00–23:00 โทร 02-391-8097 ใช้ไปพัทยา ระยอง จันทบุรี ตราด ที่จอดรถน้อยมาก แนะนำรถไฟฟ้า',
      'အက်ကမိုင်သည် အငယ်ဆုံးဂိတ်ဖြစ်ပြီး BTS အက်ကမိုင် ထွက်ပေါက် ၂ နှင့် ၂ မိနစ်လမ်းလျှောက်ချိတ်ထားသည်။ ဖွင့် ၀၅:၀၀–၂၃:၀၀။ ဖုန်း ၀၂-၃၉၁-၈၀၉၇။ ပတ္တားယား၊ ရယောင်း၊ ချန်သဘူရီ၊ ထရာ့ဒ်သို့သွားရန်။ ရပ်နားရန်နည်းသည်။ ရထားကို အကြံပြုသည်။',
      'Ekkamai is the smallest terminal, 2 minutes from BTS Ekkamai exit 2. Open 05:00–23:00, tel 02-391-8097. Use it for Pattaya, Rayong, Chanthaburi and Trat. Almost no parking — take the BTS.',
      lang === 'my' ? ['ပတ္တားယားဗန်', 'သုဝဏ္ဏဘူမိမှ'] : lang === 'en' ? ['Pattaya van', 'From Suvarnabhumi'] : ['รถตู้พัทยา', 'จากสุวรรณภูมิ']
    );
  }

  if (has(q, ['ticket', 'ตั๋ว', 'လက်မှတ်', 'ราคา', 'price', 'vip', 'ชั้น'])) {
    return reply(
      lang,
      'ซื้อตั๋วที่เคาน์เตอร์บริษัทในสถานีเท่านั้น เงินสดหรือพร้อมเพย์ VIP = ที่นั่งน้อย ปรับเอน มีอาหาร แพงกว่า 150–250 บาท ชั้น 1 = คุ้มสุดสำหรับแม่สอด/หัวหิน ชั้น 2 และรถตู้ = ถูก ที่นั่งแคบ อย่าซื้อจากนายหน้าหน้าสถานี',
      'လက်မှတ်ကို ဂိတ်တွင်း ကုမ္ပဏီကောင်တာတွင်သာ ဝယ်ပါ။ ငွေသား သို့မဟုတ် PromptPay။ VIP = ခုံနည်း၊ လှဲအိပ်၊ ထမင်းပါ၊ ၁၅၀–၂၅၀ ဘတ်ပို။ ပထမတန်း = မဲဆောက်/ဟွာဟင်အတွက် အတန်ဆုံး။ ဒုတိယတန်းနှင့် ဗန် = သက်သာ၊ ခုံကျဉ်း။ ဂိတ်ရှေ့ ပွဲစားထံ မဝယ်ပါနှင့်။',
      'Buy only at company counters inside. Cash or PromptPay. VIP = fewer deep-recline seats and a meal, 150–250 THB extra. 1st class is best value for Mae Sot/Hua Hin. 2nd class and vans are cheaper and tighter. Ignore touts outside.',
      lang === 'my' ? ['မဲဆောက်လက်မှတ်', 'VIP ဆိုတာဘာလဲ'] : lang === 'en' ? ['Mae Sot tickets', 'What is VIP?'] : ['ตั๋วแม่สอด', 'VIP คืออะไร']
    );
  }

  if (has(q, ['map', 'แผนที่', 'ผัง', 'မြေပုံ', 'road', 'ถนน', 'လမ်း'])) {
    return reply(
      lang,
      'เปิดแท็บแผนที่เพื่อดูผังอาคารและถนนเข้า–ออกทั้งสามสถานี หมอชิตใช้ถ.กำแพงเพชร 2 จากพหลโยธิน สายใต้ใหม่ใช้ถ.บรมราชชนนี (รถติดเย็น) เอกมัยอยู่ซอยสุขุมวิท 40 ข้าง BTS',
      'ဂိတ်သုံးခု၏ အဆောက်အအုံပုံစံနှင့် ဝင်ထွက်လမ်းများကို မြေပုံတဘ်တွင် ကြည့်ပါ။ မော်ချစ်သည် ဖဟိုယိုသင်မှ ကမ်ဖန်ဖက် ၂ ကိုသုံးသည်။ ဆိုင်တိုင်းအသစ်သည် ဘိုရမ်ရာ့ချာနီ (ညနေပိတ်)။ အက်ကမိုင်သည် BTS ဘေး သုခွမ်ဝစ် ဆွိုင် ၄၀။',
      'Open the Maps tab for terminal layouts and access roads. Mo Chit uses Kamphaeng Phet 2 off Phahonyothin. Sai Tai Mai uses Borommaratchachonnani (evening jams). Ekkamai is Soi Sukhumvit 40 beside the BTS.',
      lang === 'my' ? ['မော်ချစ်လမ်းမြေပုံ', 'ဆိုင်တိုင်းအသစ်ပုံစံ'] : lang === 'en' ? ['Mo Chit road map', 'Sai Tai layout'] : ['แผนที่ถนนหมอชิต', 'ผังสายใต้ใหม่']
    );
  }

  if (has(q, ['time', 'ตาราง', 'အချိန်', 'when', 'กี่โมง', 'ဘယ်အချိန်', 'schedule'])) {
    return reply(
      lang,
      'เปิดแท็บตารางเวลา เลือกสถานีแล้วค้นหาปลายทาง เวลาในแอปเป็นรอบประจำล่าสุดที่อัปเดต มีทั้ง VIP ชั้น 1 และรถตู้ ตรวจอีกครั้งที่เคาน์เตอร์เพราะวันหยุดอาจเต็มหรือเลื่อน',
      'အချိန်ဇယားတဘ်ကိုဖွင့်ပြီး ဂိတ်ရွေးကာ ဦးတည်ရာရှာပါ။ အက်ပ်ရှိချိန်များသည် နောက်ဆုံးပုံမှန်ရက်စဉ်များဖြစ်သည်။ VIP၊ ပထမတန်းနှင့် ဗန်ပါသည်။ ရုံးပိတ်ရက်တွင် ပြည့် သို့မဟုတ် ရွှေ့နိုင်သဖြင့် ကောင်တာတွင် ထပ်စစ်ပါ။',
      'Open Times, pick a terminal and search a destination. App times are the latest regular schedule (VIP, 1st class and vans). Recheck at the counter on holidays — trips sell out or shift.',
      lang === 'my' ? ['ချင်းမိုင်', 'မဲဆောက်', 'ပတ္တားယား'] : lang === 'en' ? ['Chiang Mai', 'Mae Sot', 'Pattaya'] : ['เชียงใหม่', 'แม่สอด', 'พัทยา']
    );
  }

  if (has(q, ['hello', 'hi', 'สวัสดี', 'မင်္ဂလာပါ', 'hey', 'ช่วย', 'help', 'အကူ'])) {
    return reply(
      lang,
      'สวัสดีค่ะ ถามได้เลยเรื่องสถานีหมอชิต 2 สายใต้ใหม่ เอกมัย ตารางรถ แผนที่ถนน ชั้นตั๋ว หรือเส้นทางจากเมียวดี/แม่สอด',
      'မင်္ဂလာပါ။ မော်ချစ် ၂၊ ဆိုင်တိုင်းအသစ်၊ အက်ကမိုင်၊ အချိန်ဇယား၊ လမ်းမြေပုံ၊ လက်မှတ်အဆင့် သို့မဟုတ် မြဝတီ/မဲဆောက်လမ်းကြောင်းများကို မေးနိုင်ပါတယ်။',
      'Hello. Ask about Mo Chit 2, Sai Tai Mai, Ekkamai, timetables, road maps, ticket classes, or the Myawaddy/Mae Sot route.',
      lang === 'my' ? ['မဲဆောက် ဘယ်လိုသွားမလဲ?', 'မော်ချစ် ၂ ဘယ်မှာလဲ?'] : lang === 'en' ? ['How do I go to Mae Sot?', 'Where is Mo Chit 2?'] : ['ไปแม่สอดยังไง?', 'หมอชิต 2 อยู่ที่ไหน?']
    );
  }

  const destHit = routes.find((r) => {
    const blob = `${r.destination.th} ${r.destination.my} ${r.destination.en} ${r.province.th} ${r.province.en}`.toLowerCase();
    return blob.split(' ').some((w) => w.length > 3 && q.includes(w.toLowerCase()));
  });
  if (destHit) {
    const st = stations.find((s) => s.id === destHit.stationId)!;
    const related = routes.filter((r) => r.destination.en === destHit.destination.en);
    const times = related.flatMap((r) => r.times).sort().join(', ');
    return reply(
      lang,
      `${tx(lang, destHit.destination)} ขึ้นที่${tx(lang, st.name)} ชานชาลา ${related.map((r) => r.platform).join('/')} ราคา ${Math.min(...related.map((r) => r.priceMin))}–${Math.max(...related.map((r) => r.priceMax))} บาท รอบ: ${times} ${tx(lang, destHit.notes)}`,
      `${tx(lang, destHit.destination)} ကို ${tx(lang, st.name)} မှတက်ပါ။ ပလက်ဖောင်း ${related.map((r) => r.platform).join('/')}။ ဈေး ${Math.min(...related.map((r) => r.priceMin))}–${Math.max(...related.map((r) => r.priceMax))} ဘတ်။ အချိန်: ${times}။ ${tx(lang, destHit.notes)}`,
      `${tx(lang, destHit.destination)} leaves ${tx(lang, st.name)}, platforms ${related.map((r) => r.platform).join('/')}, ${Math.min(...related.map((r) => r.priceMin))}–${Math.max(...related.map((r) => r.priceMax))} THB. Times: ${times}. ${tx(lang, destHit.notes)}`,
      lang === 'my' ? [tx(lang, st.name), 'လက်မှတ်ဝယ်ပုံ'] : lang === 'en' ? [tx(lang, st.name), 'How to buy tickets'] : [tx(lang, st.name), 'วิธีซื้อตั๋ว']
    );
  }

  return reply(
    lang,
    'ฉันช่วยเรื่องสถานีขนส่งกรุงเทพฯ ได้ค่ะ ลองถามว่า “ไปแม่สอดยังไง” “ตารางรถเชียงใหม่” “หมอชิตอยู่ไหน” หรือ “จากสุวรรณภูมิไปเอกมัย”',
    'ဘန်ကောက်ဘတ်စ်ဂိတ်အကြောင်း ကူညီနိုင်ပါတယ်။ “မဲဆောက် ဘယ်လိုသွားမလဲ”၊ “ချင်းမိုင်အချိန်ဇယား”၊ “မော်ချစ် ဘယ်မှာလဲ” သို့မဟုတ် “သုဝဏ္ဏဘူမိမှ အက်ကမိုင်” စသည်ဖြင့် မေးကြည့်ပါ။',
    'I can help with Bangkok bus terminals. Try “How do I go to Mae Sot?”, “Chiang Mai timetable”, “Where is Mo Chit?” or “BKK airport to Ekkamai”.',
    lang === 'my'
      ? ['မဲဆောက် ဘယ်လိုသွားမလဲ?', 'မော်ချစ် ၂ ဘယ်မှာလဲ?', 'ချင်းမိုင် အချိန်ဇယား']
      : lang === 'en'
      ? ['How do I go to Mae Sot?', 'Where is Mo Chit 2?', 'Chiang Mai timetable']
      : ['ไปแม่สอดยังไง?', 'หมอชิต 2 อยู่ที่ไหน?', 'ตารางรถเชียงใหม่']
  );
}

export function detectLangHint(text: string): Lang | null {
  if (/[\u1000-\u109F]/.test(text)) return 'my';
  if (/[\u0E00-\u0E7F]/.test(text)) return 'th';
  return null;
}
