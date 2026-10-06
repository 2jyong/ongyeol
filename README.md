# 온결 단일 페이지 홈페이지

건강기능식품 브랜드를 가정한 실전 연습용 시안입니다. 제품 구성과 가격은 이 프로젝트를 위해 작성한 가상 데이터입니다. 결제와 상담 접수 시스템은 연결하지 않았습니다. 실제 회사 주소나 사업자 정보는 게시하지 않습니다.

정적 사이트이므로 저장소 루트의 index.html을 웹 서버로 열면 됩니다. Vercel은 GitHub main 브랜치를 배포합니다.

## 디자인 방향

세 레퍼런스에서 화면의 원리를 참고하고, 온결의 색·문구·이미지·구성을 새로 제작했습니다.

- PBH: 큰 제목과 넓은 여백, 명료한 기업형 내비게이션, 성분을 살펴보는 가로 카드.
- 더파인: 자연 원료에서 제품으로 이어지는 긴 화면의 서사, 자연 사진과 명조 계열 글꼴.
- 록텐: 한 페이지 안에서 기준·제품·사용 장면으로 이어지는 순서, 눈에 띄는 행동 버튼.

오프닝, 원료 사진 확장, 성분 카드 넘기기, 제품별 이미지와 정보 전환, 과정 강조, 하루별 제품 연결, 질문 펼치기가 작동합니다. 오프닝은 해시 없이 홈을 열 때마다 나타나며 0.9초 페이드 아웃으로 끝납니다. 모션 줄이기 환경에서는 영상을 멈춘 정적 오프닝을 보여줍니다. 모바일에서는 긴 구간을 고정 스크롤로 묶지 않았습니다. 화살표는 운영체제의 이모지 글꼴에 영향을 받지 않도록 SVG로 작성했습니다.

## 검색 및 공유

- 정식 주소 `https://ongyeol-omega.vercel.app/`를 canonical과 Open Graph URL로 사용합니다.
- `robots.txt`와 단일 페이지 `sitemap.xml`을 제공합니다.
- 페이지 제목, 설명, 한국어 설정, Open Graph 및 X 카드, 1200×630 JPEG 공유 이미지를 제공합니다.
- `Organization`, `WebSite`, `WebPage` JSON-LD는 화면에서 확인할 수 있는 브랜드와 페이지 정보만 담습니다. 가상 상품의 가격·효능·실제 회사 정보는 구조화 데이터에 넣지 않습니다.
- 화면에 표시되는 질문과 답변은 제품 선택 및 정보 확인 방법을 직접 설명합니다. 검색 또는 AI 답변 노출을 보장하는 전용 마크업은 사용하지 않습니다.
- ICO·SVG·PNG 파비콘, 180px Apple 터치 아이콘, 512px 브랜드 아이콘을 제공합니다.

## 미디어와 글꼴

- assets/citrus-film.mp4: Mixkit [Orange Slices Splashing With Navy Backdrop](https://mixkit.co/free-stock-video/orange-slices-splashing-with-navy-backdrop-101350/)를 웹용으로 압축한 영상. 오프닝과 마지막 장면에서 사용합니다.
- assets/citrus-poster.webp: 위 영상에서 추출한 로딩용 프레임.
- assets/og-image.jpg: 히어로 연출 사진에 온결 문구를 조합한 1200×630 공유 이미지.
- assets/favicon.svg, assets/favicon-48.png, assets/apple-touch-icon.png, assets/icon-512.png: 온결 브랜드 아이콘.
- assets/hero-editorial.webp, assets/origin-grove.webp, assets/product-magnesium.webp, assets/product-vitamin-d.webp: imagegen으로 제작한 연출 이미지. 실제 제품이나 실제 원료 산지 사진이 아닙니다.
- assets/fonts/PretendardVariable.woff2: [Pretendard](https://github.com/orioncactus/pretendard)의 웹폰트. [OFL 1.1 라이선스](assets/fonts/LICENSE-Pretendard.txt)를 함께 보관합니다.
- 장면별 명조 글꼴은 Google Fonts의 Noto Serif KR을 사용합니다.
- 이전 시안의 assets/hero.webp, assets/ingredients.webp는 과거 이미지 URL이 깨지지 않도록 유지합니다.

## 이미지 생성 프롬프트

모두 built-in imagegen 도구로 생성한 뒤 WebP로 압축했습니다.

1. **히어로**: “Three elegant unbranded supplement bottles in deep midnight blue glass with blank warm ivory labels, natural limestone, sliced orange, capsules and subtle pine sprig; warm editorial product photography, morning light, landscape 16:9, product cluster on right, clean copy space on left; no people, text, logos, badges or watermarks.”
2. **원료**: “Sunlit orange grove macro photograph with ripe fruit on a leafy branch, bark and a subtle pine edge; deep forest-green shadows, early morning light, landscape 16:9, main fruit on right and darker open space on left; no people, bottles, text or logos.”
3. **마그네슘**: “One midnight-blue supplement bottle with blank ivory label, pale sage backdrop, limestone plinth, capsules and folded linen, realistic late-afternoon light, square crop, center-right product; no people, text, logos or badges.”
4. **비타민 D**: “One midnight-blue supplement bottle with blank ivory label, pale apricot background, morning window shadow, limestone plinth, orange slice and capsules, square crop, center-right product; no people, text, logos or badges.”
