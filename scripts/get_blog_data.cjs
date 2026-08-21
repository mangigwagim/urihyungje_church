const https = require('https');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function getPostDetail(logNo, title) {
  // Try fetching mobile page which contains rich text directly
  const html = await fetchUrl(`https://m.blog.naver.com/ljj617/${logNo}`);
  // Extract text paragraphs
  const pRegex = /<p[^>]*>(.*?)<\/p>/gi;
  let matches = [];
  let m;
  while ((m = pRegex.exec(html)) !== null) {
    const text = m[1].replace(/<[^>]+>/g, '').trim();
    if (text) matches.push(text);
  }
  // Extract images
  const imgRegex = /https:\/\/[^"'\s<>]+\.(?:jpg|jpeg|png|webp|JPG|PNG)/gi;
  const imgs = [...new Set(html.match(imgRegex) || [])].filter(u => 
    u.includes('postfiles.pstatic.net') || 
    u.includes('blogfiles.pstatic.net') || 
    u.includes('blogthumb.pstatic.net') ||
    u.includes('mblogthumb-phinf.pstatic.net')
  );

  console.log(`\n========================================`);
  console.log(`Title: ${title} (${logNo})`);
  console.log(`Text summary:`, matches.slice(0, 15).join('\n'));
  console.log(`Key Images:`, imgs.slice(0, 5));
}

async function run() {
  const targetPosts = [
    { logNo: '224125553952', title: 'VISION2026' },
    { logNo: '224221935977', title: '6주년 Since2020' },
    { logNo: '224369885978', title: '2026년 8월 첫 주일 주보' },
    { logNo: '224364378775', title: '중직자(권사 안수집사)피택' },
    { logNo: '224357715069', title: '2027여름성경학교' },
    { logNo: '224245491094', title: '426전도축제' },
    { logNo: '224190889057', title: '2026 겨울성경학교' },
    { logNo: '224177048253', title: '마더와이즈 수료' },
    { logNo: '224086487500', title: '담임목사님 외부설교' },
    { logNo: '224047505413', title: '송솔나무 초청 간증콘서트' }
  ];

  for (const post of targetPosts) {
    await getPostDetail(post.logNo, post.title);
  }
}

run().catch(console.error);
