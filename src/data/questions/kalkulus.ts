import { Question } from '../../types/quiz';

export const kalkulusQuestions: Question[] = [
  // Soal 21 - PG - Limit Aljabar: Pemfaktoran
  {
    id: 21,
    number: 21,
    element: 'kalkulus',
    subtopic: 'Limit Aljabar: Bentuk Tak Tentu & Pemfaktoran',
    difficulty: 'menengah',
    type: 'pg',
    title: 'Kecepatan Sesaat Kendaraan Otomatis pada Titik Kritis',
    stimulus:
      'Pergerakan mobil otonom di laboratorium uji dimonitor oleh komputer. Kecepatan sesaat pada saat mendekati detik ke-$2$ ditentukan oleh limit rasio perubahan posisi terhadap waktu:\n$$v = \\lim_{x\\to 2} \\frac{x^3 - 3x^2 + 4}{x^2 - 4}$$\ndengan $x$ adalah waktu (dalam detik) dan $v$ dalam meter per detik. Jika disubstitusikan langsung $x = 2$, diperoleh bentuk tak tentu $\\left[\\frac{0}{0}\\right]$.',
    questionText:
      'Nilai kecepatan sesaat kendaraan pada detik ke-$2$ yang dihitung secara eksak dengan metode aljabar murni (tanpa L\'Hôpital) adalah...',
    options: [
      { id: 'A', text: '$0\\text{ m/s}$' },
      { id: 'B', text: '$\\frac{3}{4}\\text{ m/s}$' },
      { id: 'C', text: '$\\frac{1}{2}\\text{ m/s}$' },
      { id: 'D', text: '$1\\text{ m/s}$' },
      { id: 'E', text: '$\\frac{5}{4}\\text{ m/s}$' },
    ],
    correctAnswer: 'A',
    diagram: {
      type: 'limit_graph',
      title: 'Perilaku Fungsi Limit di Dekat Titik Kritis x = 2',
      params: {
        c: '2',
      },
    },
    pembahasan: {
      memahamiMasalah:
        'Diberikan $\\lim_{x\\to 2} \\frac{x^3 - 3x^2 + 4}{x^2 - 4}$. Substitusi langsung $x = 2$ menghasilkan bentuk $\\frac{2^3 - 3(2)^2 + 4}{2^2 - 4} = \\frac{8 - 12 + 4}{4 - 4} = \\frac{0}{0}$. Kita harus menyelesaikan limit aljabar ini secara analitis menggunakan pemfaktoran suku banyak tanpa Teorema L\'Hôpital.',
      konsep:
        'Jika substitusi menghasilkan $\\frac{0}{0}$, maka $(x - 2)$ merupakan faktor dari pembilang dan penyebut. Kita faktorkan pembilang $x^3 - 3x^2 + 4$ dan penyebut $x^2 - 4 = (x-2)(x+2)$, lalu menyederhanakan faktor sekutu pembuat nol $(x - 2)$.',
      rumusKunci:
        '$$\\lim_{x\\to c} \\frac{P(x)}{Q(x)} = \\lim_{x\\to c} \\frac{(x-c) P_1(x)}{(x-c) Q_1(x)} = \\lim_{x\\to c} \\frac{P_1(x)}{Q_1(x)}$$',
      langkahPenyelesaian: [
        'Faktorkan penyebut:\n$$x^2 - 4 = (x - 2)(x + 2)$$',
        'Faktorkan pembilang $x^3 - 3x^2 + 4$ menggunakan metode Horner atau pembagian suku banyak oleh $(x - 2)$:\nKoefisien: $1, -3, 0, 4$.\nEvaluasi Horner untuk $x = 2$:\n- Baris 1: $1$\n- Baris 2: $-3 + 2(1) = -1$\n- Baris 3: $0 + 2(-1) = -2$\n- Baris 4: $4 + 2(-2) = 0$ (Sisa 0).\nHasil bagi adalah $x^2 - x - 2$.\nFaktorkan lebih lanjut kuadrat tersebut: $x^2 - x - 2 = (x - 2)(x + 1)$.\nSehingga pembilang terfaktorkan secara utuh menjadi: $(x - 2)^2 (x + 1)$.',
        'Tuliskan kembali ekspresi limit:\n$$\\lim_{x\\to 2} \\frac{(x - 2)^2 (x + 1)}{(x - 2)(x + 2)} = \\lim_{x\\to 2} \\frac{(x - 2)(x + 1)}{x + 2}$$',
        'Lakukan evaluasi dengan substitusi langsung nilai $x = 2$:\n$$= \\frac{(2 - 2)(2 + 1)}{2 + 2} = \\frac{0 \\cdot 3}{4} = \\frac{0}{4} = 0$$',
      ],
      pemeriksaan:
        'Perhatikan bahwa pembilang memiliki faktor $(x - 2)$ berderajat 2 (faktor ganda), sedangkan penyebut hanya berderajat 1. Oleh karena itu, setelah faktor $(x - 2)$ dicoret, pembilang masih memuat satu faktor $(x - 2)$ yang bernilai 0 di $x = 2$, sedangkan penyebut bernilai $2 + 2 = 4 \\neq 0$. Nilai $0 / 4 = 0$. Sangat logis dan tepat.',
      kesimpulan: 'Nilai limit tersebut adalah $0\\text{ m/s}$ (Pilihan A).',
      caraCepat:
        'Cermati derajat pembuat nol: pembilang memiliki akar ganda di $x=2$ karena turunan pertama pembilang $3x^2 - 6x$ di $x=2$ adalah $3(4) - 12 = 0$. Karena pembilang nol dengan kelipatan lebih tinggi daripada penyebut, limitnya pasti tepat 0!',
      kesalahanUmum:
        'Banyak siswa salah mengira limit berbentuk 0/0 selalu menghasilkan bilangan bukan nol, sehingga memaksakan membagi ulang atau salah memfaktorkan $x^3 - 3x^2 + 4$.',
    },
    narration: {
      intro:
        'Selamat datang di elemen Kalkulus! Pada soal nomor dua puluh satu, kita mengkaji limit aljabar bentuk tak tentu.',
      stimulus:
        'Kecepatan sesaat kendaraan dimodelkan oleh limit pembagian polinomial saat x mendekati dua.',
      hint: 'Faktorkan pembilang suku banyak derajat tiga menggunakan metode Horner dengan pembagi x minus dua.',
      question:
        'Berapakah nilai kecepatan sesaat yang dihasilkan tanpa menggunakan Teorema L\'Hôpital?',
      explanation:
        'Pembilang dapat difaktorkan menjadi x minus dua kuadrat dikali x plus satu. Saat satu faktor x minus dua disederhanakan dengan penyebut, pembilang masih menyisakan x minus dua. Ketika x disubstitusi dua, hasilnya menjadi nol dibagi empat yaitu nol.',
      quickTrick:
        'Karena pembilang memiliki akar kembar di x sama dengan dua, nilai limitnya pasti nol.',
      conclusion: 'Jawaban yang tepat adalah opsi A.',
    },
  },

  // Soal 22 - PG - Limit Trigonometri: Identitas 1 - cos(ax)
  {
    id: 22,
    number: 22,
    element: 'kalkulus',
    subtopic: 'Limit Trigonometri: Identitas Sudut Ganda',
    difficulty: 'menengah',
    type: 'pg',
    title: 'Model Osilasi Gelombang Mikro Frekuensi Tinggi',
    stimulus:
      'Amplitudo resonansi gelombang mikro pada celah resonator berosilasi mendekati titik ekuilibrium $x = 0$ mengikuti persamaan limit trigonometri:\n$$A = \\lim_{x\\to 0} \\frac{1 - \\cos(4x)}{x \\sin(3x)}$$\nBentuk ini menghasilkan $\\left[\\frac{0}{0}\\right]$ saat $x = 0$.',
    questionText:
      'Nilai amplitudo resonansi $A$ yang dihitung menggunakan identitas trigonometri murni adalah...',
    options: [
      { id: 'A', text: '$\\frac{4}{3}$' },
      { id: 'B', text: '$\\frac{8}{3}$' },
      { id: 'C', text: '$\\frac{16}{3}$' },
      { id: 'D', text: '$\\frac{2}{3}$' },
      { id: 'E', text: '$\\frac{8}{9}$' },
    ],
    correctAnswer: 'B',
    pembahasan: {
      memahamiMasalah:
        'Diberikan $\\lim_{x\\to 0} \\frac{1 - \\cos(4x)}{x \\sin(3x)}$. Harus diselesaikan menggunakan identitas trigonometri sudut ganda tanpa aturan L\'Hôpital.',
      konsep:
        'Identitas sudut rangkap kosinus:\n$$\\cos(2\\theta) = 1 - 2\\sin^2(\\theta) \\implies 1 - \\cos(4x) = 2\\sin^2(2x)$$\nSifat limit dasar trigonometri:\n$$\\lim_{x\\to 0} \\frac{\\sin(ax)}{bx} = \\frac{a}{b}$$',
      rumusKunci:
        '$$1 - \\cos(kx) = 2 \\sin^2\\left(\\frac{kx}{2}\\right), \\quad \\lim_{x\\to 0}\\frac{\\sin(ax)}{x} = a$$',
      langkahPenyelesaian: [
        'Ubah bentuk $1 - \\cos(4x)$ menggunakan identitas sinus sudut setengahnya:\n$$1 - \\cos(4x) = 2 \\sin^2(2x) = 2 \\cdot \\sin(2x) \\cdot \\sin(2x)$$',
        'Tuliskan kembali pecahan limit:\n$$\\lim_{x\\to 0} \\frac{2 \\sin(2x) \\sin(2x)}{x \\sin(3x)}$$',
        'Pisahkan faktor-faktor pembentuk limit dasar:\n$$= 2 \\cdot \\left(\\lim_{x\\to 0} \\frac{\\sin(2x)}{x}\\right) \\cdot \\left(\\lim_{x\\to 0} \\frac{\\sin(2x)}{\\sin(3x)}\\right)$$',
        'Hitung masing-masing limit dasar:\n$$\\lim_{x\\to 0} \\frac{\\sin(2x)}{x} = 2$$\n$$\\lim_{x\\to 0} \\frac{\\sin(2x)}{\\sin(3x)} = \\frac{2}{3}$$',
        'Kalikan seluruh konstanta:\n$$A = 2 \\cdot 2 \\cdot \\frac{2}{3} = \\frac{8}{3}$$',
      ],
      pemeriksaan:
        'Rumus cepat limit identitas: $1 - \\cos(kx) \\sim \\frac{1}{2}(kx)^2 = \\frac{1}{2}(16x^2) = 8x^2$. Penyebut: $x \\sin(3x) \\sim x(3x) = 3x^2$. Maka rasionya adalah $\\frac{8x^2}{3x^2} = \\frac{8}{3}$. Hasil identik sempurna!',
      kesimpulan: 'Nilai amplitudo resonansi gelombang adalah $\\frac{8}{3}$ (Pilihan B).',
      caraCepat:
        'Gunakan aproksimasi deret Taylor di dekat 0: $1 - \\cos(4x) \\approx \\frac{1}{2}(4x)^2 = 8x^2$, dan penyebut $x \\cdot (3x) = 3x^2$. Bagi keduanya langsung: $\\frac{8x^2}{3x^2} = \\frac{8}{3}$. Selesai dalam 5 detik!',
      kesalahanUmum:
        'Banyak siswa lupa mengalikan koefisien 2 di depan $\\sin^2(2x)$ atau salah mengira $1 - \\cos(4x) = \\sin^2(4x)$.',
    },
    narration: {
      intro:
        'Soal nomor dua puluh dua membahas limit fungsi trigonometri dengan bentuk tak tentu nol per nol.',
      stimulus:
        'Amplitudo resonansi dinyatakan sebagai limit satu minus cosinus empat x dibagi x dikali sinus tiga x.',
      hint: 'Ubah bentuk satu minus cosinus empat x menjadi dua dikali sinus kuadrat dua x menggunakan rumus sudut ganda.',
      question:
        'Berapakah nilai limit tersebut dengan metode identitas trigonometri?',
      explanation:
        'Setelah diubah menjadi dua kali sinus dua x kali sinus dua x, kita pasangkan dengan x dan sinus tiga x. Diperoleh dua dikali dua dikali dua per tiga, menghasilkan delapan per tiga.',
      quickTrick:
        'Trik kilat Mister Jo: satu minus cosinus k x setara dengan setengah k kuadrat x kuadrat. Setengah kali enam belas adalah delapan, dibagi tiga menghasilkan delapan per tiga.',
      conclusion: 'Jawaban yang tepat adalah opsi B.',
    },
  },

  // Soal 23 - PG - Limit Aljabar: Perkalian Sekawan
  {
    id: 23,
    number: 23,
    element: 'kalkulus',
    subtopic: 'Limit Aljabar: Bentuk Akar & Perkalian Sekawan',
    difficulty: 'sulit',
    type: 'pg',
    title: 'Model Laju Difusi Membran Sel Biologis',
    stimulus:
      'Laju perpindahan ion kalium melewati saluran membran sel biologis pada saat konsentrasi ion $x$ mendekati nilai $3\\text{ mmol/L}$ dinyatakan oleh fungsi limit aljabar bentuk akar:\n$$L = \\lim_{x\\to 3} \\frac{\\sqrt{2x + 10} - 4}{x^2 - 2x - 3}$$',
    questionText:
      'Nilai laju difusi membran $L$ yang diperoleh melalui penyelesaian perkalian bentuk sekawan adalah...',
    options: [
      { id: 'A', text: '$\\frac{1}{16}$' },
      { id: 'B', text: '$\\frac{1}{8}$' },
      { id: 'C', text: '$\\frac{1}{32}$' },
      { id: 'D', text: '$\\frac{1}{4}$' },
      { id: 'E', text: '$\\frac{3}{16}$' },
    ],
    correctAnswer: 'A',
    pembahasan: {
      memahamiMasalah:
        'Diberikan limit aljabar $\\lim_{x\\to 3} \\frac{\\sqrt{2x + 10} - 4}{x^2 - 2x - 3}$. Substitusi langsung $x = 3$ menghasilkan $\\frac{\\sqrt{16} - 4}{9 - 6 - 3} = \\frac{0}{0}$. Harus diselesaikan dengan mengalikan bentuk sekawan dari pembilang.',
      konsep:
        'Rasionalkan bentuk akar $(\\sqrt{A} - B)$ dengan mengalikan faktor sekawan $(\\sqrt{A} + B)$ pada pembilang dan penyebut, memanfaatkan selisih kuadrat $(\\sqrt{A}-B)(\\sqrt{A}+B) = A - B^2$.',
      rumusKunci:
        '$$(\\sqrt{2x+10} - 4)(\\sqrt{2x+10} + 4) = (2x + 10) - 16 = 2x - 6 = 2(x - 3)$$',
      langkahPenyelesaian: [
        'Faktorkan penyebut suku kuadrat:\n$$x^2 - 2x - 3 = (x - 3)(x + 1)$$',
        'Kalikan pembilang dan penyebut dengan sekawan $(\\sqrt{2x+10} + 4)$:\n$$\\lim_{x\\to 3} \\frac{\\sqrt{2x + 10} - 4}{(x - 3)(x + 1)} \\times \\frac{\\sqrt{2x + 10} + 4}{\\sqrt{2x + 10} + 4}$$',
        'Sederhanakan pembilang:\n$$(\\sqrt{2x + 10})^2 - 4^2 = (2x + 10) - 16 = 2x - 6 = 2(x - 3)$$',
        'Tuliskan kembali pecahan limit:\n$$\\lim_{x\\to 3} \\frac{2(x - 3)}{(x - 3)(x + 1)(\\sqrt{2x + 10} + 4)}$$',
        'Coret faktor pembuat nol $(x - 3)$:\n$$= \\lim_{x\\to 3} \\frac{2}{(x + 1)(\\sqrt{2x + 10} + 4)}$$',
        'Substitusi nilai $x = 3$:\n$$= \\frac{2}{(3 + 1)(\\sqrt{2(3) + 10} + 4)} = \\frac{2}{4 \\cdot (\\sqrt{16} + 4)} = \\frac{2}{4 \\cdot (4 + 4)} = \\frac{2}{4 \\cdot 8} = \\frac{2}{32} = \\frac{1}{16}$$',
      ],
      pemeriksaan:
        'Verifikasi nilai penyebut: $(4) \\times (8) = 32$. Pembilang adalah 2. Rasio: $2/32 = 1/16$. Sangat teliti dan akurat.',
      kesimpulan: 'Nilai laju difusi tersebut adalah $\\frac{1}{16}$ (Pilihan A).',
      caraCepat:
        'Turunan bentuk akar di pembilang secara aljabar menghasilkan $\\frac{1}{2\\sqrt{2x+10}} \\cdot 2 = \\frac{1}{4}$ di $x=3$. Turunan penyebut adalah $2x - 2 = 6 - 2 = 4$. Rasio kecepatan perubahan: $\\frac{1/4}{4} = \\frac{1}{16}$. Selesai seketika!',
      kesalahanUmum:
        'Siswa sering keliru menghitung $(4+4)$ pada suku sekawan sebagai $4 \\times 4 = 16$ sehingga menghasilkan penyebut yang terlalu besar.',
    },
    narration: {
      intro:
        'Soal nomor dua puluh tiga melatih teknik penting perkalian sekawan pada limit aljabar bentuk akar.',
      stimulus:
        'Model laju difusi membran sel melibatkan pembilang akar dua x tambah sepuluh dikurang empat.',
      hint: 'Kalikan pembilang dan penyebut dengan sekawannya yaitu akar dua x tambah sepuluh ditambah empat.',
      question:
        'Berapakah nilai limit yang diperoleh setelah menyederhanakan pembuat nol x minus tiga?',
      explanation:
        'Pembilang menghasilkan dua kali x minus tiga. Setelah mencoret x minus tiga di pembilang dan penyebut, kita masukkan x sama dengan tiga. Diperoleh dua dibagi empat dikali delapan, yaitu dua per tiga puluh dua atau satu per enam belas.',
      quickTrick:
        'Perhatikan bahwa sekawan akar menghasilkan empat ditambah empat yaitu delapan. Bagi dua dengan empat kali delapan menghasilkan satu per enam belas.',
      conclusion: 'Jawaban yang tepat adalah opsi A.',
    },
  },

  // Soal 24 - PG - Limit Trigonometri: Selisih Kosinus
  {
    id: 24,
    number: 24,
    element: 'kalkulus',
    subtopic: 'Limit Trigonometri: Rumus Selisih Kosinus',
    difficulty: 'sulit',
    type: 'pg',
    title: 'Analisis Spektrum Harmonik Akustik Ruang Konser',
    stimulus:
      'Interferensi dua gelombang nada murni pada aula konser menghasilkan intensitas suara relatif yang dirumuskan oleh limit selisih kosinus:\n$$I = \\lim_{x\\to 0} \\frac{\\cos(3x) - \\cos(5x)}{x \\tan(2x)}$$\nBentuk ini menghasilkan $\\left[\\frac{0}{0}\\right]$ saat $x = 0$.',
    questionText:
      'Nilai intensitas suara relatif $I$ yang dihitung dengan identitas selisih kosinus murni adalah...',
    options: [
      { id: 'A', text: '$2$' },
      { id: 'B', text: '$4$' },
      { id: 'C', text: '$8$' },
      { id: 'D', text: '$1$' },
      { id: 'E', text: '$-4$' },
    ],
    correctAnswer: 'B',
    pembahasan: {
      memahamiMasalah:
        'Diberikan $\\lim_{x\\to 0} \\frac{\\cos(3x) - \\cos(5x)}{x \\tan(2x)}$. Harus diselesaikan dengan rumus identitas perkalian/selisih sinus-kosinus tanpa L\'Hôpital.',
      konsep:
        'Rumus selisih kosinus:\n$$\\cos A - \\cos B = -2 \\sin\\left(\\frac{A + B}{2}\\right) \\sin\\left(\\frac{A - B}{2}\\right)$$\nLimit dasar trigonometri:\n$$\\lim_{x\\to 0} \\frac{\\sin(px)}{x} = p, \\quad \\lim_{x\\to 0} \\frac{\\tan(qx)}{x} = q$$',
      rumusKunci:
        '$$\\cos(3x) - \\cos(5x) = -2 \\sin(4x) \\sin(-x) = 2 \\sin(4x) \\sin(x)$$',
      langkahPenyelesaian: [
        'Gunakan rumus selisih kosinus pada pembilang dengan $A = 3x$ dan $B = 5x$:\n$$\\frac{A + B}{2} = \\frac{3x + 5x}{2} = 4x, \\quad \\frac{A - B}{2} = \\frac{3x - 5x}{2} = -x$$\n$$\\cos(3x) - \\cos(5x) = -2 \\sin(4x) \\sin(-x)$$',
        'Karena fungsi sinus bersifat ganjil, $\\sin(-x) = -\\sin(x)$, maka minus saling menghilangkan:\n$$-2 \\sin(4x) (-\\sin x) = 2 \\sin(4x) \\sin(x)$$',
        'Tuliskan kembali pecahan limit:\n$$\\lim_{x\\to 0} \\frac{2 \\sin(4x) \\sin(x)}{x \\tan(2x)}$$',
        'Pisahkan ke bentuk limit standar trigonometri:\n$$= 2 \\cdot \\left(\\lim_{x\\to 0} \\frac{\\sin(4x)}{\\tan(2x)}\\right) \\cdot \\left(\\lim_{x\\to 0} \\frac{\\sin(x)}{x}\\right)$$',
        'Evaluasi masing-masing suku:\n$$\\lim_{x\\to 0} \\frac{\\sin(4x)}{\\tan(2x)} = \\frac{4}{2} = 2$$\n$$\\lim_{x\\to 0} \\frac{\\sin(x)}{x} = 1$$',
        'Kalikan seluruh nilai:\n$$I = 2 \\cdot 2 \\cdot 1 = 4$$',
      ],
      pemeriksaan:
        'Metode cepat deret: $\\cos(3x) \\approx 1 - \\frac{9x^2}{2}$, $\\cos(5x) \\approx 1 - \\frac{25x^2}{2}$. Selisih: $\\left(1 - \\frac{9x^2}{2}\\right) - \\left(1 - \\frac{25x^2}{2}\\right) = \\frac{16x^2}{2} = 8x^2$. Penyebut: $x \\tan(2x) \\approx x(2x) = 2x^2$. Rasio: $\\frac{8x^2}{2x^2} = 4$. Cocok sempurna!',
      kesimpulan: 'Nilai intensitas relatif adalah $4$ (Pilihan B).',
      caraCepat:
        'Rumus kilat selisih kosinus di pembilang: $\\frac{B^2 - A^2}{2} x^2 = \\frac{5^2 - 3^2}{2} x^2 = \\frac{25 - 9}{2} x^2 = 8x^2$. Bagi dengan penyebut $2x^2$: $\\frac{8x^2}{2x^2} = 4$. Selesai dalam 5 detik!',
      kesalahanUmum:
        'Siswa sering lupa bahwa $\\sin(-x) = -\\sin(x)$ sehingga keliru tanda menjadi $-4$.',
    },
    narration: {
      intro:
        'Soal nomor dua puluh empat menguji kelihaian kita menggunakan identitas trigonometri selisih kosinus.',
      stimulus:
        'Intensitas gelombang dinyatakan oleh limit kosinus tiga x dikurang kosinus lima x per x tangen dua x.',
      hint: 'Ubah selisih kosinus menjadi perkalian sinus menggunakan rumus minus dua sinus setengah jumlah dikali sinus setengah selisih.',
      question: 'Berapakah nilai limit intensitas gelombang suara tersebut?',
      explanation:
        'Pembilang berubah menjadi dua kali sinus empat x dikali sinus x. Saat dipasangkan dengan penyebut x dan tangen dua x, diperoleh dua dikali empat per dua dikali satu, yang bernilai tepat empat.',
      quickTrick:
        'Rumus praktis Mister Jo: lima kuadrat dikurang tiga kuadrat dibagi dua adalah delapan. Delapan dibagi koefisien penyebut dua menghasilkan empat.',
      conclusion: 'Jawaban yang tepat adalah opsi B.',
    },
  },

  // Soal 25 - Kecukupan - Limit Aljabar Parameter a & b
  {
    id: 25,
    number: 25,
    element: 'kalkulus',
    subtopic: 'Limit Aljabar & Nilai Parameter',
    difficulty: 'sulit',
    type: 'kecukupan',
    title: 'Analisis Kecukupan: Penentuan Parameter Batas Stabilitas',
    stimulus:
      'Diberikan fungsi limit rasional yang memuat dua parameter konstanta real $a$ dan $b$:\n$$L = \\lim_{x\\to 1} \\frac{a x^2 + b x - 6}{x - 1}$$\nDiketahui bahwa nilai limit $L$ ADA dan merupakan bilangan real berhingga. Tim kontrol ingin menentukan nilai dari konstanta $a$.',
    questionText:
      'Apakah nilai dari konstanta $a$ dapat ditentukan secara pasti?\n\nPutuskan apakah informasi pada pernyataan (1) dan (2) berikut cukup untuk menjawab pertanyaan tersebut:\n(1) Nilai limit tersebut adalah $L = 5$.\n(2) $a + b = 6$.',
    statement1: 'Nilai limit tersebut adalah L = 5.',
    statement2: 'a + b = 6.',
    options: [
      { id: 'A', text: 'Pernyataan (1) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (2) SAJA tidak cukup.' },
      { id: 'B', text: 'Pernyataan (2) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (1) SAJA tidak cukup.' },
      { id: 'C', text: 'DUA pernyataan BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi SATU pernyataan SAJA tidak cukup.' },
      { id: 'D', text: 'Pernyataan (1) SAJA cukup untuk menjawab pertanyaan dan pernyataan (2) SAJA cukup.' },
      { id: 'E', text: 'Pernyataan (1) dan pernyataan (2) TIDAK CUKUP untuk menjawab pertanyaan.' },
    ],
    correctAnswer: 'A',
    pembahasan: {
      memahamiMasalah:
        'Limit $L = \\lim_{x\\to 1} \\frac{a x^2 + b x - 6}{x - 1}$ ada dan berhingga. Karena penyebut bernilai $1 - 1 = 0$ saat $x = 1$, maka syarat mutlak agar limit ada adalah pembilang JUGA harus bernilai 0 di $x = 1$ (bentuk $\\frac{0}{0}$).\nArtinya: $a(1)^2 + b(1) - 6 = 0 \\implies a + b = 6$.\nPerhatikan bahwa relasi $a + b = 6$ adalah syarat bawaan dari soal!',
      konsep:
        'Syarat keberadaan limit bentuk $\\frac{P(x)}{x-c}$ dengan penyebut menuju nol: pembilang harus memiliki pembuat nol $P(c) = 0$. Setelah disederhanakan, nilai limit berhingga $L$ memberikan persamaan linear kedua yang mengikat $a$ dan $b$.',
      rumusKunci:
        '$$a + b = 6 \\implies b = 6 - a, \\quad L = 2a + b$$',
      langkahPenyelesaian: [
        'Substitusi $b = 6 - a$ ke pembilang:\n$$a x^2 + (6 - a) x - 6 = a x^2 - a x + 6x - 6 = a x (x - 1) + 6(x - 1) = (x - 1)(a x + 6)$$',
        'Sederhanakan limit:\n$$L = \\lim_{x\\to 1} \\frac{(x - 1)(a x + 6)}{x - 1} = \\lim_{x\\to 1} (a x + 6) = a(1) + 6 = a + 6$$',
        'Analisis Pernyataan (1) saja:\nDiketahui $L = 5$.\nKarena $L = a + 6$, maka:\n$$a + 6 = 5 \\implies a = 5 - 6 = -1$$\nNilai konstanta $a$ langsung dapat ditentukan secara unik dan pasti ($a = -1$)! Jadi Pernyataan (1) SAJA CUKUP.',
        'Analisis Pernyataan (2) saja:\nPernyataan (2) memberikan $a + b = 6$. Seperti yang telah kita buktikan di awal, relasi $a + b = 6$ sudah menjadi syarat inheren agar limit ada, dan menghasilkan banyak pasangan solusi $(a, b)$ (misal $a=1, b=5$ atau $a=2, b=4$). Informasi ini tidak menghasilkan nilai $a$ yang unik. Jadi Pernyataan (2) SAJA TIDAK CUKUP.',
        'Kesimpulan: Pernyataan (1) SAJA cukup, tetapi pernyataan (2) SAJA tidak cukup.',
      ],
      pemeriksaan:
        'Jika $a = -1$, maka $b = 6 - (-1) = 7$. Limit: $\\lim_{x\\to 1}\\frac{-x^2 + 7x - 6}{x-1} = \\lim_{x\\to 1}\\frac{-(x-1)(x-6)}{x-1} = -(1-6) = 5 = L$. Tepat!',
      kesimpulan:
        'Pernyataan (1) saja cukup untuk menjawab pertanyaan, tetapi pernyataan (2) saja tidak cukup (Pilihan A).',
      caraCepat:
        'Nilai limit selalu mengevaluasi turunan pembilang: $2a(1) + b = L$. Bersama dengan $a + b = 6$, selisihnya langsung $(2a + b) - (a + b) = a$. Jadi $a = L - 6$. Mengetahui $L$ langsung mengetahui $a$ secara pasti!',
      kesalahanUmum:
        'Banyak siswa terkecoh memilih C karena merasa memerlukan sistem dua persamaan, tanpa menyadari bahwa syarat $\\frac{0}{0}$ sudah otomatis menghasilkan $a+b=6$ sehingga pernyataan 2 redundan.',
    },
    narration: {
      intro:
        'Soal nomor dua puluh lima menyajikan analisis kecukupan pernyataan yang sangat elegan pada limit fungsi rasional.',
      stimulus:
        'Limit fungsi rasional bernilai berhingga saat x mendekati satu. Kita ingin tahu apakah nilai parameter a dapat ditentukan secara pasti.',
      hint: 'Penyebut bernilai nol di x sama dengan satu, sehingga pembilang wajib bernilai nol di x sama dengan satu.',
      question:
        'Apakah pernyataan satu dan pernyataan dua cukup untuk menentukan nilai a?',
      explanation:
        'Syarat pembilang nol menghasilkan a tambah b sama dengan enam. Setelah memfaktorkan pembilang, nilai limit disederhanakan menjadi a tambah enam. Dengan mengetahui nilai limit L sama dengan lima pada pernyataan satu, nilai a langsung diperoleh yaitu minus satu.',
      quickTrick:
        'Pernyataan dua sebenarnya sudah tersirat dari syarat limit ada, sehingga pernyataan satu saja yang benar-benar memberikan nilai unik.',
      conclusion: 'Jawaban yang tepat adalah opsi A.',
    },
  },

  // Soal 26 - Kecukupan - Eksistensi Limit Fungsi Grafis / Sisi Kiri-Kanan
  {
    id: 26,
    number: 26,
    element: 'kalkulus',
    subtopic: 'Konsep Limit: Eksistensi Limit Kiri & Kanan',
    difficulty: 'sangat_sulit',
    type: 'kecukupan',
    title: 'Analisis Kecukupan: Eksistensi Limit Sinyal Pensaklaran',
    stimulus:
      'Sebuah sensor pensaklaran menghasilkan sinyal fungsi sepotong-sepotong (piecewise) $f(x)$ di sekitar titik transisi $x = 2$:\n$$f(x) = \\begin{cases} p x + 1, & x < 2 \\\\ 7, & x = 2 \\\\ x^2 + q, & x > 2 \\end{cases}$$\ndengan $p$ dan $q$ adalah konstanta bilangan real. Pengawas sistem ingin memastikan apakah nilai limit dua sisi $\\lim_{x\\to 2} f(x)$ ADA.',
    questionText:
      'Dapatkah dipastikan bahwa $\\lim_{x\\to 2} f(x)$ ADA?\n\nPutuskan apakah informasi pada pernyataan (1) dan (2) berikut cukup untuk menjawab pertanyaan tersebut:\n(1) $2p - q = 3$.\n(2) $p = 2$ dan $q = 1$.',
    statement1: '2p - q = 3.',
    statement2: 'p = 2 dan q = 1.',
    options: [
      { id: 'A', text: 'Pernyataan (1) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (2) SAJA tidak cukup.' },
      { id: 'B', text: 'Pernyataan (2) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (1) SAJA tidak cukup.' },
      { id: 'C', text: 'DUA pernyataan BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi SATU pernyataan SAJA tidak cukup.' },
      { id: 'D', text: 'Pernyataan (1) SAJA cukup untuk menjawab pertanyaan dan pernyataan (2) SAJA cukup.' },
      { id: 'E', text: 'Pernyataan (1) dan pernyataan (2) TIDAK CUKUP untuk menjawab pertanyaan.' },
    ],
    correctAnswer: 'D',
    pembahasan: {
      memahamiMasalah:
        'Limit dua sisi $\\lim_{x\\to 2} f(x)$ ADA jika dan hanya jika limit kiri sama dengan limit kanan:\n$$\\lim_{x\\to 2^-} f(x) = \\lim_{x\\to 2^+} f(x)$$\nPerhatikan bahwa nilai $f(2) = 7$ TIDAK memengaruhi eksistensi limit (nilai titik tunggal hanya memengaruhi kekontinuan, bukan eksistensi limit).',
      konsep:
        'Syarat eksistensi limit dua sisi:\n$$\\lim_{x\\to c^-} f(x) = \\lim_{x\\to c^+} f(x) = L$$\nLimit kiri: $\\lim_{x\\to 2^-} (px + 1) = 2p + 1$.\nLimit kanan: $\\lim_{x\\to 2^+} (x^2 + q) = 2^2 + q = 4 + q$.\nSyarat eksistensi limit:\n$$2p + 1 = 4 + q \\iff 2p - q = 3$$',
      rumusKunci:
        '$$\\lim_{x\\to 2} f(x) \\text{ ada } \\iff 2p + 1 = 4 + q \\iff 2p - q = 3$$',
      langkahPenyelesaian: [
        'Analisis Pernyataan (1) saja:\nDiketahui $2p - q = 3$.\nPersamaan ini persis sama dengan syarat mutlak eksistensi limit kiri = limit kanan ($2p + 1 = 4 + q$).\nOleh karena itu, jika $2p - q = 3$ terpenuhi, maka limit dipastikan PASTI ADA! Jadi Pernyataan (1) SAJA CUKUP.',
        'Analisis Pernyataan (2) saja:\nDiketahui $p = 2$ dan $q = 1$.\nKita dapat langsung menghitung:\nLimit kiri: $2(2) + 1 = 5$.\nLimit kanan: $2^2 + 1 = 5$.\nKarena limit kiri = limit kanan = 5, maka limit dipastikan PASTI ADA! Jadi Pernyataan (2) SAJA CUKUP.',
        'Karena Pernyataan (1) SAJA cukup dan Pernyataan (2) SAJA cukup, maka kesimpulannya adalah D.',
      ],
      pemeriksaan:
        'Pernyataan 1 menjamin syarat perlu dan cukup limit kiri = limit kanan secara umum aljabar. Pernyataan 2 memberikan nilai parameter konkret yang setelah disubstitusi juga membuktikan limit kiri = limit kanan = 5. Keduanya mandiri dan valid.',
      kesimpulan:
        'Pernyataan (1) SAJA cukup dan pernyataan (2) SAJA cukup (Pilihan D).',
      caraCepat:
        'Syarat limit ada adalah $2p+1 = 4+q \\iff 2p-q = 3$. Pernyataan 1 langsung menyatakan persamaan ini. Pernyataan 2 memberikan angka yang memenuhi $2(2)-1 = 3$. Keduanya langsung membuktikan keberadaan limit secara mandiri!',
      kesalahanUmum:
        'Siswa sering mengira limit hanya ada jika nilainya sama dengan $f(2) = 7$, padahal itu definisi fungsi kontinu, bukan syarat eksistensi limit.',
    },
    narration: {
      intro:
        'Soal nomor dua puluh enam melatih konsep fundamental tentang kapan sebuah limit dikatakan ada.',
      stimulus:
        'Sebuah fungsi sepotong memiliki formula berbeda di sebelah kiri dan kanan titik x sama dengan dua.',
      hint: 'Syarat limit dua sisi ada hanyalah limit kiri harus sama dengan limit kanan.',
      question:
        'Apakah pernyataan satu dan dua cukup untuk memastikan eksistensi limit?',
      explanation:
        'Limit kiri adalah dua p ditambah satu, sedangkan limit kanan adalah empat ditambah q. Keduanya sama jika dua p dikurang q sama dengan tiga. Pernyataan satu langsung menyatakan relasi ini, sementara pernyataan dua memberikan nilai p dan q yang memenuhi relasi tersebut. Masing-masing cukup secara mandiri.',
      quickTrick:
        'Ingat beda limit dengan kekontinuan: nilai fungsi f(2) sama dengan tujuh sama sekali tidak memengaruhi eksistensi nilai limit.',
      conclusion: 'Jawaban yang tepat adalah opsi D.',
    },
  },

  // Soal 27 - Kompleks - Limit Trigonometri Komposisi
  {
    id: 27,
    number: 27,
    element: 'kalkulus',
    subtopic: 'Limit Trigonometri: Sifat & Identitas',
    difficulty: 'sangat_sulit',
    type: 'kompleks',
    title: 'Analisis Evaluasi Nilai Ragam Limit Trigonometri',
    stimulus:
      'Laboratorium matematika komputasi menganalisis beberapa ekspresi limit fungsi trigonometri di sekitar titik asal $x = 0$ guna memvalidasi modul kalkulus numerik.',
    questionText:
      'Manakah di antara pernyataan hasil limit berikut yang bernilai BENAR? (Jawaban benar dapat lebih dari satu)',
    complexOptions: [
      { id: 'A', text: '$\\lim_{x\\to 0} \\frac{\\tan(6x)}{3x} = 2$.' },
      { id: 'B', text: '$\\lim_{x\\to 0} \\frac{x \\sin(4x)}{1 - \\cos(2x)} = 2$.' },
      { id: 'C', text: '$\\lim_{x\\to 0} \\frac{\\sin^2(3x)}{4x^2} = \\frac{9}{4}$.' },
      { id: 'D', text: '$\\lim_{x\\to 0} \\frac{1 - \\cos(6x)}{x^2} = 18$.' },
      { id: 'E', text: '$\\lim_{x\\to 0} \\frac{\\cos(x) - 1}{x} = 1$.' },
    ],
    correctAnswer: ['A', 'B', 'C', 'D'],
    pembahasan: {
      memahamiMasalah:
        'Menguji 5 ekspresi limit fungsi trigonometri bentuk tak tentu pada saat $x \\to 0$.',
      konsep:
        '1) $\\lim_{x\\to 0} \\frac{\\tan(ax)}{bx} = \\frac{a}{b}$\n2) $1 - \\cos(kx) = 2 \\sin^2(kx/2)$\n3) $\\lim_{x\\to 0} \\frac{\\sin(ax)}{x} = a$\n4) $\\lim_{x\\to 0} \\frac{1 - \\cos(kx)}{x^2} = \\frac{k^2}{2}$\n5) $\\lim_{x\\to 0} \\frac{\\cos(x) - 1}{x} = 0$.',
      rumusKunci:
        '$$\\lim_{x\\to 0}\\frac{1-\\cos(kx)}{x^2} = \\frac{k^2}{2}, \\quad \\lim_{x\\to 0}\\frac{\\sin(ax)}{\\sin(bx)} = \\frac{a}{b}$$',
      langkahPenyelesaian: [
        'Uji Opsi A: $\\lim_{x\\to 0} \\frac{\\tan(6x)}{3x} = \\frac{6}{3} = 2$. (BENAR)',
        'Uji Opsi B: Ubah penyebut $1 - \\cos(2x) = 2\\sin^2(x)$.\n$$\\lim_{x\\to 0} \\frac{x \\sin(4x)}{2 \\sin^2(x)} = \\frac{1}{2} \\cdot \\lim_{x\\to 0}\\left(\\frac{x}{\\sin x}\\right) \\cdot \\lim_{x\\to 0}\\left(\\frac{\\sin 4x}{\\sin x}\\right) = \\frac{1}{2} \\cdot 1 \\cdot 4 = 2$$ (BENAR)',
        'Uji Opsi C: $\\lim_{x\\to 0} \\frac{(\\sin 3x)^2}{4x^2} = \\frac{1}{4} \\left(\\lim_{x\\to 0} \\frac{\\sin 3x}{x}\\right)^2 = \\frac{1}{4} (3)^2 = \\frac{9}{4}$. (BENAR)',
        'Uji Opsi D: $1 - \\cos(6x) = 2\\sin^2(3x)$.\n$$\\lim_{x\\to 0} \\frac{2\\sin^2(3x)}{x^2} = 2 \\cdot 3^2 = 2 \\cdot 9 = 18$$ (BENAR)',
        'Uji Opsi E: $\\lim_{x\\to 0} \\frac{\\cos x - 1}{x} = \\lim_{x\\to 0} \\frac{-2\\sin^2(x/2)}{x} = \\lim_{x\\to 0} \\left(-2 \\cdot \\frac{\\sin(x/2)}{x} \\cdot \\sin(x/2)\\right) = -2 \\cdot \\frac{1}{2} \\cdot 0 = 0 \\neq 1$. (SALAH)',
      ],
      pemeriksaan:
        'Empat pernyataan (A, B, C, D) terbukti benar dengan aturan aljabar trigonometri murni. Opsi E salah karena hasilnya haruslah 0.',
      kesimpulan: 'Pernyataan yang bernilai BENAR adalah A, B, C, dan D.',
      caraCepat:
        'Gunakan sifat ekuivalensi: $\\tan(6x)/(3x) \\to 6/3 = 2$ (A benar). $x(4x) / (2x^2) = 4/2 = 2$ (B benar). $(3x)^2 / (4x^2) = 9/4$ (C benar). $(1/2)(6)^2 = 18$ (D benar). Turunan kosinus di 0 adalah $-\\sin(0) = 0$ (E salah). Langsung selesai!',
      kesalahanUmum:
        'Siswa sering mengira $\\lim_{x\\to 0} \\frac{\\cos x - 1}{x} = 1$ karena tertukar dengan $\\lim_{x\\to 0} \\frac{\\sin x}{x} = 1$.',
    },
    narration: {
      intro:
        'Soal nomor dua puluh tujuh menyajikan Pilihan Ganda Kompleks untuk mengevaluasi beberapa bentuk limit trigonometri.',
      stimulus:
        'Kita menguji lima pernyataan limit trigonometri di sekitar nol untuk melihat manakah yang bernilai benar.',
      hint: 'Gunakan hubungan limit dasar untuk tangen dan sinus, serta identitas sudut ganda untuk satu minus kosinus.',
      question:
        'Centang seluruh pernyataan limit yang bernilai benar dari pilihan berikut!',
      explanation:
        'Opsi A benar bernilai dua. Opsi B benar bernilai dua. Opsi C benar bernilai sembilan per empat. Opsi D benar bernilai delapan belas. Opsi E salah karena limit tersebut menghasilkan nol, bukan satu.',
      quickTrick:
        'Perhatikan opsi E: bentuk kosinus x minus satu dibagi x merupakan turunan fungsi kosinus di nol yang bernilai minus sinus nol yaitu nol.',
      conclusion: 'Jawaban yang tepat adalah opsi A, B, C, dan D.',
    },
  },

  // Soal 28 - Kompleks - Limit Fungsi Rasional Derajat Tinggi & Faktorisasi
  {
    id: 28,
    number: 28,
    element: 'kalkulus',
    subtopic: 'Limit Aljabar: Polinomial Kuartik & Pemfaktoran',
    difficulty: 'sangat_sulit',
    type: 'kompleks',
    title: 'Analisis Limit Kuartik Aljabar Murni',
    stimulus:
      'Diberikan fungsi rasional dengan pembilang polinomial berderajat empat:\n$$f(x) = \\frac{x^4 - 5x^2 + 4}{x^2 - 3x + 2}$$\nKita ingin menganalisis perilaku limit fungsi ini pada beberapa titik nilai kritis $x$.',
    questionText:
      'Manakah di antara pernyataan-pernyataan berikut yang bernilai BENAR? (Jawaban benar dapat lebih dari satu)',
    complexOptions: [
      { id: 'A', text: 'Pembilang $x^4 - 5x^2 + 4$ dapat difaktorkan menjadi $(x - 1)(x + 1)(x - 2)(x + 2)$.' },
      { id: 'B', text: 'Nilai dari $\\lim_{x\\to 1} f(x) = 6$.' },
      { id: 'C', text: 'Nilai dari $\\lim_{x\\to 2} f(x) = 12$.' },
      { id: 'D', text: 'Penyebut $x^2 - 3x + 2$ bernilai nol pada saat $x = 1$ dan $x = 2$.' },
      { id: 'E', text: 'Nilai dari $\\lim_{x\\to 0} f(x) = 2$.' },
    ],
    correctAnswer: ['A', 'B', 'C', 'D', 'E'],
    pembahasan: {
      memahamiMasalah:
        'Diberikan $f(x) = \\frac{x^4 - 5x^2 + 4}{x^2 - 3x + 2}$. Ingin diuji pemfaktoran pembilang dan penyebut serta evaluasi limit di $x = 1, x = 2,$ dan $x = 0$.',
      konsep:
        '1) Faktorisasi suku banyak bentuk kuadrat dari $x^2$: $u = x^2 \\implies u^2 - 5u + 4 = (u-1)(u-4) = (x^2-1)(x^2-4) = (x-1)(x+1)(x-2)(x+2)$.\n2) Faktorisasi penyebut: $x^2 - 3x + 2 = (x-1)(x-2)$.\n3) Penyederhanaan aljabar: untuk $x \\neq 1$ dan $x \\neq 2$, $f(x) = (x+1)(x+2) = x^2 + 3x + 2$.',
      rumusKunci:
        '$$f(x) = \\frac{(x-1)(x+1)(x-2)(x+2)}{(x-1)(x-2)} = (x+1)(x+2) \\quad (x \\neq 1, 2)$$',
      langkahPenyelesaian: [
        'Uji Opsi A: $x^4 - 5x^2 + 4 = (x^2-1)(x^2-4) = (x-1)(x+1)(x-2)(x+2)$. (BENAR)',
        'Uji Opsi D: Pembuat nol penyebut: $x^2 - 3x + 2 = (x-1)(x-2) = 0 \\implies x = 1$ dan $x = 2$. (BENAR)',
        'Bentuk sederhana fungsi: $f(x) = (x+1)(x+2)$.',
        'Uji Opsi B: $\\lim_{x\\to 1} f(x) = (1+1)(1+2) = 2 \\times 3 = 6$. (BENAR)',
        'Uji Opsi C: $\\lim_{x\\to 2} f(x) = (2+1)(2+2) = 3 \\times 4 = 12$. (BENAR)',
        'Uji Opsi E: Evaluasi di $x = 0$ (substitusi langsung): $f(0) = \\frac{0 - 0 + 4}{0 - 0 + 2} = \\frac{4}{2} = 2$. Atau $(0+1)(0+2) = 2$. (BENAR)',
      ],
      pemeriksaan:
        'Seluruh lima pernyataan terbukti benar secara matematis. Ini adalah bentuk soal Pilihan Ganda Kompleks yang membuktikan keutuhan pemahaman aljabar dan kalkulus secara menyeluruh.',
      kesimpulan: 'Seluruh pernyataan A, B, C, D, dan E bernilai BENAR.',
      caraCepat:
        'Faktorkan penyebut $(x-1)(x-2)$ dan pembilang $(x^2-1)(x^2-4)$. Coret langsung faktor sekutu menyisakan $(x+1)(x+2)$. Nilai di 1 adalah $2\\times 3 = 6$. Nilai di 2 adalah $3\\times 4 = 12$. Nilai di 0 adalah $1\\times 2 = 2$. Semua opsi terbukti tepat seketika!',
      kesalahanUmum:
        'Siswa sering mengira bahwa sebuah soal pilihan ganda kompleks tidak mungkin memiliki kelima-limanya benar, sehingga ragu memilih seluruh opsi.',
    },
    narration: {
      intro:
        'Pada soal nomor dua puluh delapan, kita menganalisis fungsi rasional kuartik secara komprehensif.',
      stimulus:
        'Fungsi rasional memiliki pembilang x pangkat empat minus lima x kuadrat tambah empat dan penyebut kuadrat.',
      hint: 'Faktorkan pembilang dan penyebut untuk menemukan bentuk sederhananya yang berupa fungsi kuadrat sederhana x plus satu dikali x plus dua.',
      question:
        'Centang seluruh pernyataan yang bernilai benar dari opsi yang diberikan!',
      explanation:
        'Pembilang terfaktorkan sempurna menjadi empat faktor linear. Faktor sekutu pembuat nol tercoret menyisakan x plus satu dikali x plus dua. Nilai limit di x sama dengan satu adalah enam, di x sama dengan dua adalah dua belas, dan di nol adalah dua. Seluruh pernyataan dari A sampai E bernilai benar.',
      quickTrick:
        'Substitusi langsung ke bentuk sederhana x plus satu dikali x plus dua memudahkan verifikasi seluruh nilai limit dalam hitungan detik.',
      conclusion: 'Seluruh opsi A, B, C, D, dan E bernilai BENAR.',
    },
  },

  // Soal 29 - Benar/Salah - Limit Kiri & Limit Kanan Fungsi Diskontinu
  {
    id: 29,
    number: 29,
    element: 'kalkulus',
    subtopic: 'Limit Sepihak & Titik Diskontinuitas',
    difficulty: 'sulit',
    type: 'benar_salah',
    title: 'Evaluasi Eksistensi Limit Kiri dan Kanan pada Fungsi Tangga',
    stimulus:
      'Diberikan fungsi nilai mutlak aljabar yang memodelkan sinyal digital tak kontinu:\n$$g(x) = \\frac{|x - 3|}{x - 3} + 2x$$\nKita ingin mengevaluasi perilaku limit sepihak fungsi $g(x)$ pada saat $x$ mendekati titik singular $x = 3$.',
    questionText:
      'Tentukan apakah masing-masing pernyataan berikut bernilai BENAR atau SALAH berdasarkan konsep limit kalkulus:',
    statements: [
      {
        id: 1,
        text: 'Nilai limit kiri adalah $\\lim_{x\\to 3^-} g(x) = 5$.',
        isCorrect: true,
      },
      {
        id: 2,
        text: 'Nilai limit kanan adalah $\\lim_{x\\to 3^+} g(x) = 7$.',
        isCorrect: true,
      },
      {
        id: 3,
        text: 'Nilai limit dua sisi $\\lim_{x\\to 3} g(x)$ ADA dan bernilai $6$.',
        isCorrect: false,
      },
    ],
    correctAnswer: [true, true, false],
    pembahasan: {
      memahamiMasalah:
        'Diberikan $g(x) = \\frac{|x-3|}{x-3} + 2x$. Ingin diuji limit kiri di $x=3$, limit kanan di $x=3$, dan eksistensi limit dua sisi di $x=3$.',
      konsep:
        'Definisi nilai mutlak:\n- Jika $x < 3$, maka $(x - 3) < 0$, sehingga $|x - 3| = -(x - 3)$. Akibatnya $\\frac{|x-3|}{x-3} = -1$.\n- Jika $x > 3$, maka $(x - 3) > 0$, sehingga $|x - 3| = +(x - 3)$. Akibatnya $\\frac{|x-3|}{x-3} = +1$.\nSyarat eksistensi limit dua sisi: limit kiri harus SAMA DENGAN limit kanan.',
      rumusKunci:
        '$$\\lim_{x\\to c^-} g(x) \\neq \\lim_{x\\to c^+} g(x) \\implies \\lim_{x\\to c} g(x) \\text{ TIDAK ADA}$$',
      langkahPenyelesaian: [
        'Hitung limit kiri ($x \\to 3^-$):\nSaat $x < 3$, $|x - 3| = -(x - 3)$, maka:\n$$\\lim_{x\\to 3^-} g(x) = \\lim_{x\\to 3^-} \\left(\\frac{-(x-3)}{x-3} + 2x\\right) = \\lim_{x\\to 3^-} (-1 + 2x) = -1 + 2(3) = -1 + 6 = 5$$\nJadi Pernyataan 1 BENAR.',
        'Hitung limit kanan ($x \\to 3^+$):\nSaat $x > 3$, $|x - 3| = +(x - 3)$, maka:\n$$\\lim_{x\\to 3^+} g(x) = \\lim_{x\\to 3^+} \\left(\\frac{x-3}{x-3} + 2x\\right) = \\lim_{x\\to 3^+} (1 + 2x) = 1 + 2(3) = 1 + 6 = 7$$\nJadi Pernyataan 2 BENAR.',
        'Evaluasi eksistensi limit dua sisi di $x = 3$:\nKarena $\\lim_{x\\to 3^-} g(x) = 5 \\neq \\lim_{x\\to 3^+} g(x) = 7$, maka limit dua sisi $\\lim_{x\\to 3} g(x)$ TIDAK ADA (does not exist).\nPernyataan 3 mengklaim limit dua sisi ada dan bernilai 6 (rata-rata), yang jelas bertentangan dengan definisi kalkulus. Jadi Pernyataan 3 SALAH.',
      ],
      pemeriksaan:
        'Grafik memiliki loncatan diskontinuitas (jump discontinuity) sebesar $|7 - 5| = 2$ satuan di $x = 3$. Terbukti limit dua sisi tidak pernah ada.',
      kesimpulan: 'Pernyataan 1 BENAR, Pernyataan 2 BENAR, Pernyataan 3 SALAH.',
      caraCepat:
        'Suku mutlak/pecahan langsung bernilai $-1$ untuk kiri dan $+1$ untuk kanan. Tambahkan $2(3) = 6$: kiri adalah $-1+6 = 5$, kanan adalah $+1+6 = 7$. Karena $5 \\neq 7$, limit dua sisi langsung TIDAK ADA. Selesai!',
      kesalahanUmum:
        'Siswa sering mengira jika limit kiri dan kanan ada tetapi beda, limit dua sisinya bisa diambil nilai tengah atau rata-ratanya.',
    },
    narration: {
      intro:
        'Soal nomor dua puluh sembilan membawa kita pada konsep limit sepihak pada fungsi nilai mutlak.',
      stimulus:
        'Fungsi memuat suku nilai mutlak x minus tiga dibagi x minus tiga ditambah dua x di sekitar titik singular tiga.',
      hint: 'Urai nilai mutlak berdasarkan definisinya: bernilai negatif untuk x kurang dari tiga dan bernilai positif untuk x lebih dari tiga.',
      question:
        'Tentukan kebenaran dari pernyataan limit kiri, limit kanan, dan eksistensi limit dua sisi.',
      explanation:
        'Limit kiri bernilai minus satu ditambah enam yaitu lima. Limit kanan bernilai satu ditambah enam yaitu tujuh. Karena limit kiri tidak sama dengan limit kanan, limit dua sisi tidak ada. Maka pernyataan tiga bernilai salah.',
      quickTrick:
        'Loncatan pada grafik fungsi nilai mutlak membuktikan limit dua sisi tidak terdefinisi.',
      conclusion: 'Status berturut-turut adalah BENAR, BENAR, dan SALAH.',
    },
  },

  // Soal 30 - Benar/Salah - Evaluasi Komparatif Limit Trigonometri & Rasional
  {
    id: 30,
    number: 30,
    element: 'kalkulus',
    subtopic: 'Limit Trigonometri & Bentuk Tak Tentu Khusus',
    difficulty: 'sangat_sulit',
    type: 'benar_salah',
    title: 'Validasi Teoretis Batas Asimtotik dan Limit Trigonometri Tingkat Lanjut',
    stimulus:
      'Dalam kalkulus tingkat lanjut, analisis limit sering melibatkan kombinasi fungsi aljabar dan trigonometri dengan manipulasi identitas tanpa menggunakan aturan turunan L\'Hôpital.',
    questionText:
      'Tentukan apakah masing-masing pernyataan evaluasi limit berikut bernilai BENAR atau SALAH:',
    statements: [
      {
        id: 1,
        text: 'Nilai dari $\\lim_{x\\to 0} \\frac{x \\tan(3x)}{\\cos(2x) - 1} = -\\frac{3}{2}$.',
        isCorrect: true,
      },
      {
        id: 2,
        text: 'Nilai dari $\\lim_{x\\to 0} \\frac{\\sin(5x) - \\sin(3x)}{\\sin(2x)} = 1$.',
        isCorrect: true,
      },
      {
        id: 3,
        text: 'Nilai dari $\\lim_{x\\to 4} \\frac{\\sqrt{x} - 2}{x - 4} = \\frac{1}{2}$.',
        isCorrect: false,
      },
    ],
    correctAnswer: [true, true, false],
    pembahasan: {
      memahamiMasalah:
        'Mengevaluasi tiga limit: limit trigonometri dengan penyebut $(\\cos 2x - 1)$, limit selisih sinus dasar, dan limit rasional bentuk akar di $x = 4$.',
      konsep:
        '1) $\\cos(2x) - 1 = -(1 - \\cos 2x) = -2\\sin^2(x)$.\n2) $\\lim_{x\\to 0} \\frac{\\sin(5x) - \\sin(3x)}{\\sin(2x)} = \\lim_{x\\to 0} \\frac{\\frac{\\sin 5x}{x} - \\frac{\\sin 3x}{x}}{\\frac{\\sin 2x}{x}} = \\frac{5 - 3}{2} = \\frac{2}{2} = 1$.\n3) $\\lim_{x\\to 4} \\frac{\\sqrt{x} - 2}{(\\sqrt{x}-2)(\\sqrt{x}+2)} = \\lim_{x\\to 4} \\frac{1}{\\sqrt{x}+2} = \\frac{1}{2+2} = \\frac{1}{4}$.',
      rumusKunci:
        '$$\\cos(2x) - 1 = -2\\sin^2(x), \\quad x - 4 = (\\sqrt{x}-2)(\\sqrt{x}+2)$$',
      langkahPenyelesaian: [
        'Pernyataan 1:\nPenyebut: $\\cos(2x) - 1 = -2\\sin^2(x)$.\n$$\\lim_{x\\to 0} \\frac{x \\tan(3x)}{-2 \\sin^2(x)} = -\\frac{1}{2} \\cdot \\left(\\lim_{x\\to 0} \\frac{x}{\\sin x}\\right) \\cdot \\left(\\lim_{x\\to 0} \\frac{\\tan 3x}{\\sin x}\\right) = -\\frac{1}{2} \\cdot 1 \\cdot 3 = -\\frac{3}{2}$$\nJadi Pernyataan 1 BENAR.',
        'Pernyataan 2:\nBagi pembilang dan penyebut dengan $x$:\n$$\\lim_{x\\to 0} \\frac{\\frac{\\sin(5x)}{x} - \\frac{\\sin(3x)}{x}}{\\frac{\\sin(2x)}{x}} = \\frac{5 - 3}{2} = \\frac{2}{2} = 1$$\nJadi Pernyataan 2 BENAR.',
        'Pernyataan 3:\nFaktorkan penyebut $x - 4$ sebagai selisih kuadrat bentuk akar $(\\sqrt{x} - 2)(\\sqrt{x} + 2)$:\n$$\\lim_{x\\to 4} \\frac{\\sqrt{x} - 2}{(\\sqrt{x} - 2)(\\sqrt{x} + 2)} = \\lim_{x\\to 4} \\frac{1}{\\sqrt{x} + 2} = \\frac{1}{\\sqrt{4} + 2} = \\frac{1}{2 + 2} = \\frac{1}{4}$$\nPernyataan 3 menyatakan hasilnya adalah $\\frac{1}{2}$, padahal hasil yang benar adalah $\\frac{1}{4}$. Jadi Pernyataan 3 SALAH.',
      ],
      pemeriksaan:
        'Pernyataan 1 bertanda negatif karena $\\cos(2x) - 1 < 0$ di dekat 0. Pernyataan 2 menghasilkan $(5-3)/2 = 1$. Pernyataan 3 adalah $1/(\\sqrt{4}+2) = 1/4$. Semuanya terverifikasi secara rigor.',
      kesimpulan: 'Pernyataan 1 BENAR, Pernyataan 2 BENAR, Pernyataan 3 SALAH.',
      caraCepat:
        'Untuk pernyataan 3: faktorkan $x-4$ langsung menghasilkan $1/(\\sqrt{4}+2) = 1/4 \\neq 1/2$. Pernyataan 3 seketika SALAH dalam 3 detik!',
      kesalahanUmum:
        'Siswa sering mengira $\\sqrt{4} = 2$ sehingga langsung menulis $1/2$ tanpa menambahkan suku $+2$ pada penyebut sekawannya.',
    },
    narration: {
      intro:
        'Luar biasa! Kita telah tiba di soal nomor tiga puluh, pamungkas dari seluruh rangkaian latihan TKA Matematika Tingkat Lanjut.',
      stimulus:
        'Kita menguji tiga limit pamungkas yang memadukan identitas trigonometri, limit dasar, dan pemfaktoran bentuk akar.',
      hint: 'Perhatikan tanda minus pada kosinus dua x minus satu, bagi suku sinus dengan x, dan faktorkan x minus empat menjadi perkalian selisih akar.',
      question:
        'Tentukan kebenaran dari masing-masing pernyataan limit nomor tiga puluh ini.',
      explanation:
        'Pernyataan satu benar bernilai minus tiga per dua. Pernyataan dua benar bernilai satu. Pernyataan tiga salah karena penyebut sekawan menghasilkan dua ditambah dua yaitu empat, sehingga nilai limitnya adalah satu per empat, bukan satu per dua.',
      quickTrick:
        'Faktorkan x minus empat seketika menjadi akar x minus dua dikali akar x plus dua untuk memeriksa pernyataan tiga.',
      conclusion:
        'Status berturut-turut adalah BENAR, BENAR, dan SALAH. Selamat telah menyelesaikan seluruh tiga puluh soal!',
    },
  },
];
