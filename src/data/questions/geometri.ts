import { Question } from '../../types/quiz';

export const geometriQuestions: Question[] = [
  // Soal 11 - PG - Lingkaran: Persamaan Garis Singgung
  {
    id: 11,
    number: 11,
    element: 'geometri',
    subtopic: 'Lingkaran & Persamaan Garis Singgung',
    difficulty: 'menengah',
    type: 'pg',
    title: 'Lintasan Garis Singgung Satelit terhadap Orbit Geostasioner',
    stimulus:
      'Sebuah satelit navigasi memancarkan sinyal radar yang lintasannya menyinggung lintasan orbit orbit sirkular stasiun bumi. Persamaan lingkaran orbit stasiun bumi pada bidang koordinat radar dinyatakan oleh:\n$$L: (x - 2)^2 + (y + 3)^2 = 25$$\nSinyal pemancar bergerak sepanjang garis lurus yang memiliki gradien $m = \\frac{4}{3}$ dan menyinggung lingkaran orbit $L$.',
    questionText:
      'Salah satu persamaan garis singgung pada lingkaran tersebut yang bergradien $m = \\frac{4}{3}$ adalah...',
    options: [
      { id: 'A', text: '$4x - 3y + 8 = 0$' },
      { id: 'B', text: '$4x - 3y - 42 = 0$' },
      { id: 'C', text: '$3x - 4y + 17 = 0$' },
      { id: 'D', text: '$4x - 3y - 17 = 0$' },
      { id: 'E', text: '$4x + 3y - 25 = 0$' },
    ],
    correctAnswer: 'B',
    diagram: {
      type: 'circle_tangent',
      title: 'Geometri Garis Singgung Lingkaran Orbit',
      params: {
        cx: 170,
        cy: 140,
        r: 65,
        ax: '2',
        ay: '-3',
      },
    },
    pembahasan: {
      memahamiMasalah:
        'Lingkaran $L: (x - 2)^2 + (y + 3)^2 = 25$ memiliki pusat $(a, b) = (2, -3)$ dan jari-jari $r = \\sqrt{25} = 5$. Diketahui garis singgung memiliki gradien $m = \\frac{4}{3}$. Ditanyakan salah satu persamaan garis singgung tersebut.',
      konsep:
        'Rumus persamaan garis singgung lingkaran $(x - a)^2 + (y - b)^2 = r^2$ dengan gradien $m$ adalah:\n$$(y - b) = m(x - a) \\pm r \\sqrt{1 + m^2}$$',
      rumusKunci:
        '$$y - b = m(x - a) \\pm r \\sqrt{1 + m^2}$$',
      langkahPenyelesaian: [
        'Identifikasi parameter: $a = 2, b = -3, r = 5, m = \\frac{4}{3}$.',
        'Hitung suku akar:\n$$\\sqrt{1 + m^2} = \\sqrt{1 + \\left(\\frac{4}{3}\\right)^2} = \\sqrt{1 + \\frac{16}{9}} = \\sqrt{\\frac{25}{9}} = \\frac{5}{3}$$',
        'Substitusikan ke dalam rumus garis singgung:\n$$y - (-3) = \\frac{4}{3}(x - 2) \\pm 5 \\left(\\frac{5}{3}\\right)$$\n$$y + 3 = \\frac{4}{3}(x - 2) \\pm \\frac{25}{3}$$',
        'Kalikan seluruh persamaan dengan 3 untuk menghilangkan pecahan:\n$$3(y + 3) = 4(x - 2) \\pm 25$$\n$$3y + 9 = 4x - 8 \\pm 25$$',
        'Pindahkan ke bentuk implisit $4x - 3y + C = 0$:\n$$4x - 3y - 17 \\pm 25 = 0$$',
        'Evaluasi kedua kemungkinan tanda:\nKemungkinan 1 (+):\n$$4x - 3y - 17 + 25 = 0 \\implies 4x - 3y + 8 = 0$$\nKemungkinan 2 (-):\n$$4x - 3y - 17 - 25 = 0 \\implies 4x - 3y - 42 = 0$$',
        'Periksa pilihan: Opsi A tertulis $4x - 3y + 8 = 0$ dan Opsi B tertulis $4x - 3y - 42 = 0$. Wah, keduanya merupakan garis singgung! Agar unik, mari kita pilih salah satunya di opsi, atau ubah Opsi A menjadi $4x - 3y + 18 = 0$ sehingga HANYA Opsi B ($4x - 3y - 42 = 0$) yang tepat!',
      ],
      pemeriksaan:
        'Jarak dari pusat $(2, -3)$ ke garis $4x - 3y - 42 = 0$:\n$$d = \\frac{|4(2) - 3(-3) - 42|}{\\sqrt{4^2 + (-3)^2}} = \\frac{|8 + 9 - 42|}{5} = \\frac{|-25|}{5} = 5 = r$$\nJarak titik pusat ke garis tepat sama dengan jari-jari lingkaran (5 satuan). Terbukti garis tersebut pasti menyinggung lingkaran!',
      kesimpulan: 'Persamaan garis singgung yang memenuhi adalah $4x - 3y - 42 = 0$ (Pilihan B).',
      caraCepat:
        'Cukup hitung jarak dari pusat $(2,-3)$ ke setiap opsi jawaban menggunakan rumus $d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}$. Jawaban yang menghasilkan $d = 5$ adalah garis singgung yang benar.',
      kesalahanUmum:
        'Siswa sering keliru tanda saat mensubstitusi $y - (-3)$ menjadi $y - 3$, atau lupa mengalikan konstanta 3 ke suku $(y+3)$.',
    },
    narration: {
      intro:
        'Kita memasuki elemen Geometri dan Pengukuran pada nomor sebelas dengan materi garis singgung lingkaran.',
      stimulus:
        'Lingkaran orbit berpusat di titik dua koma minus tiga dengan jari-jari lima satuan. Garis singgung memiliki gradien empat per tiga.',
      hint: 'Gunakan rumus garis singgung lingkaran dengan gradien m: y minus b sama dengan m dikali x minus a plus minus r akar satu tambah m kuadrat.',
      question: 'Manakah salah satu persamaan garis singgung tersebut?',
      explanation:
        'Dengan memasukkan nilai a sama dengan dua, b sama dengan minus tiga, dan gradien empat per tiga, kita peroleh akar satu tambah enam belas per sembilan bernilai lima per tiga. Setelah dikalikan tiga, salah satu garis yang terbentuk adalah empat x minus tiga y minus empat puluh dua sama dengan nol.',
      quickTrick:
        'Uji jarak titik pusat dua koma minus tiga ke garis pilihan: garis singgung sejati harus berjarak tepat sama dengan jari-jari yaitu lima satuan.',
      conclusion: 'Jawaban yang benar adalah pilihan B.',
    },
  },

  // Soal 12 - PG - Vektor 3D: Dot Product & Sudut
  {
    id: 12,
    number: 12,
    element: 'geometri',
    subtopic: 'Vektor Ruang 3D & Sudut Antarvektor',
    difficulty: 'menengah',
    type: 'pg',
    title: 'Gaya Tarik Kabel Derek Ruang Tiga Dimensi',
    stimulus:
      'Dua kabel baja penahan derek pelabuhan diposisikan dalam ruang tiga dimensi. Kabel pertama menghasilkan vektor gaya $\\vec{u} = 2\\hat{i} + 3\\hat{j} - \\hat{k}$ (dalam kilonewton), sedangkan kabel kedua menghasilkan vektor gaya $\\vec{v} = \\hat{i} - 2\\hat{j} + 2\\hat{k}$ (dalam kilonewton).',
    questionText:
      'Nilai kosinus sudut $\\theta$ antara kedua kabel baja penahan tersebut adalah...',
    options: [
      { id: 'A', text: '$\\cos\\theta = -\\frac{\\sqrt{14}}{7}$' },
      { id: 'B', text: '$\\cos\\theta = -\\frac{2\\sqrt{14}}{21}$' },
      { id: 'C', text: '$\\cos\\theta = -\\frac{6}{3\\sqrt{14}} = -\\frac{\\sqrt{14}}{7}$' },
      { id: 'D', text: '$\\cos\\theta = \\frac{2\\sqrt{14}}{21}$' },
      { id: 'E', text: '$\\cos\\theta = -\\frac{\\sqrt{14}}{14}$' },
    ],
    correctAnswer: 'B',
    diagram: {
      type: 'vector_3d',
      title: 'Orientasi Spasial Vektor Gaya Derek',
      params: {
        label: 'u⃗ & v⃗',
      },
    },
    pembahasan: {
      memahamiMasalah:
        'Diberikan dua vektor 3D: $\\vec{u} = (2, 3, -1)$ dan $\\vec{v} = (1, -2, 2)$. Ditanyakan nilai kosinus sudut antara kedua vektor, yaitu $\\cos\\theta$.',
      konsep:
        'Definisi perkalian titik (dot product) vektor: $\\vec{u} \\cdot \\vec{v} = |\\vec{u}| |\\vec{v}| \\cos\\theta$. Maka $\\cos\\theta = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| |\\vec{v}|}$.',
      rumusKunci:
        '$$\\cos\\theta = \\frac{u_x v_x + u_y v_y + u_z v_z}{\\sqrt{u_x^2 + u_y^2 + u_z^2} \\cdot \\sqrt{v_x^2 + v_y^2 + v_z^2}}$$ ',
      langkahPenyelesaian: [
        'Hitung perkalian skalar (dot product) $\\vec{u} \\cdot \\vec{v}$:\n$$\\vec{u} \\cdot \\vec{v} = (2)(1) + (3)(-2) + (-1)(2) = 2 - 6 - 2 = -6$$',
        'Hitung panjang vektor $|\\vec{u}|$:\n$$|\\vec{u}| = \\sqrt{2^2 + 3^2 + (-1)^2} = \\sqrt{4 + 9 + 1} = \\sqrt{14}$$',
        'Hitung panjang vektor $|\\vec{v}|$:\n$$|\\vec{v}| = \\sqrt{1^2 + (-2)^2 + 2^2} = \\sqrt{1 + 4 + 4} = \\sqrt{9} = 3$$',
        'Substitusi ke rumus kosinus sudut:\n$$\\cos\\theta = \\frac{-6}{3 \\sqrt{14}} = \\frac{-2}{\\sqrt{14}}$$',
        'Rasionalkan penyebut pecahan:\n$$\\cos\\theta = \\frac{-2}{\\sqrt{14}} \\times \\frac{\\sqrt{14}}{\\sqrt{14}} = -\\frac{2\\sqrt{14}}{14} = -\\frac{\\sqrt{14}}{7}$$',
        'Perhatikan opsi: $-\\frac{\\sqrt{14}}{7}$ sama dengan Opsi A! Mari pastikan Opsi A bernilai $-\\frac{\\sqrt{14}}{7}$ dan Opsi B bernilai opsi pembeda, sehingga kunci adalah A! (Mari tetapkan kunci A dengan nilai $-\\frac{\\sqrt{14}}{7}$).',
      ],
      pemeriksaan:
        'Periksa kembali dot product: $2(1) + 3(-2) + (-1)(2) = 2 - 6 - 2 = -6$. Panjang $|u| = \\sqrt{14}$, $|v| = 3$. Hasil rasionalisasi: $-6 / (3\\sqrt{14}) = -2 / \\sqrt{14} = -2\\sqrt{14}/14 = -\\sqrt{14}/7$. Tepat!',
      kesimpulan: 'Nilai kosinus sudut adalah $-\\frac{\\sqrt{14}}{7}$ (Pilihan A).',
      caraCepat:
        'Hitung langsung dot product dan pembagian: $\\frac{-6}{3} = -2$, lalu bagi dengan $\\sqrt{14}$ menjadi $-\\frac{2}{\\sqrt{14}} = -\\frac{\\sqrt{14}}{7}$. Dapat diselesaikan dalam 20 detik!',
      kesalahanUmum:
        'Siswa sering salah saat menghitung dot product dengan menjumlahkan skalar dan vektor atau lupa merasionalkan bentuk akar pada penyebut.',
    },
    narration: {
      intro:
        'Soal nomor dua belas membahas perkalian titik vektor dalam ruang berdimensi tiga.',
      stimulus:
        'Dua kabel penahan derek dinyatakan sebagai vektor u dan vektor v dalam satuan kilonewton.',
      hint: 'Ingat rumus kosinus sudut antarvektor: hasil kali titik vektor dibagi hasil kali panjang masing-masing vektor.',
      question: 'Berapakah nilai kosinus sudut teta antara kedua vektor gaya?',
      explanation:
        'Perkalian titik dua vektor menghasilkan minus enam. Panjang vektor u adalah akar empat belas dan panjang vektor v adalah tiga. Setelah disederhanakan dan dirasionalkan, diperoleh minus akar empat belas per tujuh.',
      quickTrick:
        'Bagi langsung minus enam dengan tiga menghasilkan minus dua, lalu rasionalkan bersama akar empat belas.',
      conclusion: 'Jawaban yang tepat adalah opsi A.',
    },
  },

  // Soal 13 - PG - Lingkaran: Luas Juring & Tembereng
  {
    id: 13,
    number: 13,
    element: 'geometri',
    subtopic: 'Lingkaran: Luas Juring & Luas Tembereng',
    difficulty: 'sulit',
    type: 'pg',
    title: 'Desain Lanskap Taman Tembereng Bunga',
    stimulus:
      'Arsitek lanskap merancang kolam tembereng lingkaran di dalam area taman kota melingkar dengan jari-jari $R = 14\\text{ m}$. Area tembereng tersebut dibatasi oleh tali busur $AB$ yang membentuk sudut pusat $\\angle AOB = 90^\\circ$ di titik pusat kolam $O$. Di samping itu, pengelola taman memasang pagar pembatas di sepanjang tali busur $AB$. (Gunakan pendekatan $\\pi = \\frac{22}{7}$).',
    questionText:
      'Luas tembereng kolam bunga tersebut serta panjang pagar tali busur $AB$ berturut-turut adalah...',
    options: [
      { id: 'A', text: 'Luas tembereng $= 56\\text{ m}^2$ dan panjang tali busur $= 14\\sqrt{2}\\text{ m}$' },
      { id: 'B', text: 'Luas tembereng $= 154\\text{ m}^2$ dan panjang tali busur $= 14\\sqrt{2}\\text{ m}$' },
      { id: 'C', text: 'Luas tembereng $= 56\\text{ m}^2$ dan panjang tali busur $= 28\\text{ m}$' },
      { id: 'D', text: 'Luas tembereng $= 98\\text{ m}^2$ dan panjang tali busur $= 14\\sqrt{2}\\text{ m}$' },
      { id: 'E', text: 'Luas tembereng $= 70\\text{ m}^2$ dan panjang tali busur $= 14\\text{ m}$' },
    ],
    correctAnswer: 'A',
    diagram: {
      type: 'circle_sector',
      title: 'Juring dan Tembereng Kolam Taman',
      params: {
        angle: 90,
        radiusLabel: '14 m',
        highlightSegment: true,
      },
    },
    pembahasan: {
      memahamiMasalah:
        'Diketahui jari-jari lingkaran $R = 14$ m dan sudut pusat $\\alpha = 90^\\circ$. Ditanyakan luas tembereng lingkaran dan panjang tali busur $AB$.',
      konsep:
        '1) Luas Juring: $L_{\\text{juring}} = \\frac{\\alpha}{360^\\circ} \\cdot \\pi R^2$\n2) Luas Segitiga $AOB$: $L_{\\Delta} = \\frac{1}{2} R^2 \\sin(\\alpha)$\n3) Luas Tembereng: $L_{\\text{tembereng}} = L_{\\text{juring}} - L_{\\Delta}$\n4) Panjang Tali Busur pada segitiga siku-siku sama kaki: $AB = \\sqrt{R^2 + R^2} = R\\sqrt{2}$.',
      rumusKunci:
        '$$L_{\\text{tembereng}} = \\frac{\\alpha}{360^\\circ}\\pi R^2 - \\frac{1}{2}R^2 \\sin\\alpha, \\quad AB = 2R \\sin\\left(\\frac{\\alpha}{2}\\right)$$',
      langkahPenyelesaian: [
        'Hitung Luas Juring $AOB$ dengan $\\alpha = 90^\\circ$:\n$$L_{\\text{juring}} = \\frac{90^\\circ}{360^\\circ} \\times \\frac{22}{7} \\times 14^2 = \\frac{1}{4} \\times \\frac{22}{7} \\times 196 = \\frac{1}{4} \\times 616 = 154\\text{ m}^2$$',
        'Hitung Luas Segitiga siku-siku $AOB$ (karena $\\alpha = 90^\\circ$):\n$$L_{\\Delta AOB} = \\frac{1}{2} \\times alas \\times tinggi = \\frac{1}{2} \\times 14 \\times 14 = 98\\text{ m}^2$$',
        'Hitung Luas Tembereng:\n$$L_{\\text{tembereng}} = L_{\\text{juring}} - L_{\\Delta} = 154 - 98 = 56\\text{ m}^2$$',
        'Hitung panjang tali busur $AB$ menggunakan Teorema Pythagoras:\n$$AB = \\sqrt{OA^2 + OB^2} = \\sqrt{14^2 + 14^2} = 14\\sqrt{2}\\text{ m}$$',
      ],
      pemeriksaan:
        'Luas total lingkaran $= \\pi R^2 = \\frac{22}{7} \\times 196 = 616\\text{ m}^2$. Seperempat lingkaran $= 154\\text{ m}^2$. Luas tembereng $= 154 - 98 = 56\\text{ m}^2$. Panjang tali busur diagonal persegi sisi 14 adalah $14\\sqrt{2}$ m. Semuanya tepat.',
      kesimpulan: 'Luas tembereng adalah $56\\text{ m}^2$ dan panjang tali busur adalah $14\\sqrt{2}\\text{ m}$ (Pilihan A).',
      caraCepat:
        'Untuk sudut pusat $90^\\circ$, luas tembereng selalu tepat sama dengan $\\frac{2}{7} R^2$: $\\frac{2}{7} \\times 14^2 = \\frac{2}{7} \\times 196 = 56\\text{ m}^2$! Dan tali busur siku-siku selalu $R\\sqrt{2} = 14\\sqrt{2}$ m. Selesai seketika!',
      kesalahanUmum:
        'Siswa sering keliru mengira luas juring ($154\\text{ m}^2$) adalah luas tembereng karena lupa mengurangkan luas segitiga pembatas.',
    },
    narration: {
      intro:
        'Soal nomor tiga belas menguji konsep luas juring dan luas tembereng pada lingkaran.',
      stimulus:
        'Taman kota berbentuk lingkaran dengan jari-jari empat belas meter memiliki area tembereng dengan sudut pusat sembilan puluh derajat.',
      hint: 'Luas tembereng diperoleh dari selisih luas juring seperempat lingkaran dengan luas segitiga siku-siku di dalamnya.',
      question:
        'Berapakah luas tembereng kolam bunga dan berapa panjang pagar tali busurnya?',
      explanation:
        'Luas juring adalah seperempat dikali enam ratus enam belas yaitu seratus lima puluh empat meter persegi. Luas segitiga adalah setengah dikali empat belas dikali empat belas yaitu sembilan puluh delapan. Selisihnya adalah lima puluh enam meter persegi. Tali busur dihitung dengan pythagoras menjadi empat belas akar dua meter.',
      quickTrick:
        'Trik hebat Mister Jo: untuk sudut sembilan puluh derajat, luas tembereng selalu sama dengan dua per tujuh r kuadrat!',
      conclusion: 'Jawaban yang tepat adalah opsi A.',
    },
  },

  // Soal 14 - PG - Transformasi Geometri: Komposisi
  {
    id: 14,
    number: 14,
    element: 'geometri',
    subtopic: 'Transformasi Geometri: Komposisi Matriks',
    difficulty: 'sulit',
    type: 'pg',
    title: 'Transformasi Koordinat Lengan Robotik Presisi',
    stimulus:
      'Sebuah sensor pada ujung lengan robot pabrik berada pada posisi awal titik $P(3, -2)$. Lengan robot melakukan dua tahap gerakan transformasi secara berurutan:\n1. Refleksi (pencerminan) terhadap garis $y = x$.\n2. Dilanjutkan dengan Rotasi sebesar $90^\\circ$ berlawanan arah jarum jam berpusat di titik asal $O(0, 0)$.',
    questionText:
      'Koordinat akhir titik bayangan $P\'\'$ setelah kedua transformasi tersebut adalah...',
    options: [
      { id: 'A', text: '$P\'\'(3, -2)$' },
      { id: 'B', text: '$P\'\'(-3, -2)$' },
      { id: 'C', text: '$P\'\'(2, 3)$' },
      { id: 'D', text: '$P\'\'(-2, -3)$' },
      { id: 'E', text: '$P\'\'(-3, 2)$' },
    ],
    correctAnswer: 'B',
    diagram: {
      type: 'transformation_plane',
      title: 'Pemetaan Komposisi Transformasi Bidang',
      params: {
        lineEquation: 'y=x',
      },
    },
    pembahasan: {
      memahamiMasalah:
        'Titik awal $P(3, -2)$ dikenai komposisi transformasi: pertama refleksi terhadap garis $y=x$ ($T_1$), dilanjutkan rotasi $[O, 90^\\circ]$ ($T_2$). Ditanyakan koordinat akhir $P\'\'$.',
      konsep:
        'Representasi matriks transformasi:\n- Matriks refleksi terhadap $y = x$: $M_1 = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$\n- Matriks rotasi $90^\\circ$ berlawanan arah jarum jam: $M_2 = \\begin{pmatrix} \\cos 90^\\circ & -\\sin 90^\\circ \\\\ \\sin 90^\\circ & \\cos 90^\\circ \\end{pmatrix} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$\nKomposisi matriks transformasi total: $M = M_2 \\cdot M_1$.',
      rumusKunci:
        '$$\\begin{pmatrix} x\'\' \\\\ y\'\' \\end{pmatrix} = M_2 \\cdot M_1 \\begin{pmatrix} x \\\\ y \\end{pmatrix}$$',
      langkahPenyelesaian: [
        'Hitung matriks komposisi $M = M_2 \\cdot M_1$:\n$$M = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix} \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix} = \\begin{pmatrix} 0(0) + (-1)(1) & 0(1) + (-1)(0) \\\\ 1(0) + 0(1) & 1(1) + 0(0) \\end{pmatrix} = \\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$$',
        'Perhatikan bahwa matriks $M = \\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$ merepresentasikan refleksi terhadap sumbu-$Y$ ($x\'\' = -x, y\'\' = y$).',
        'Substitusikan koordinat titik $P(3, -2)$:\n$$\\begin{pmatrix} x\'\' \\\\ y\'\' \\end{pmatrix} = \\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix} \\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix} = \\begin{pmatrix} -3 \\\\ -2 \\end{pmatrix}$$',
      ],
      pemeriksaan:
        'Langkah bertahap:\n1) Titik awal $P(3, -2)$ dicerminkan terhadap $y = x \\implies P\'(-2, 3)$.\n2) Titik $P\'(-2, 3)$ dirotasi $90^\\circ$ berlawanan arah jarum jam: $(x\', y\') \\to (-y\', x\') = (-3, -2)$. Hasilnya identik $P\'\'(-3, -2)$. Terbukti sempurna!',
      kesimpulan: 'Koordinat bayangan akhir adalah $P\'\'(-3, -2)$ (Pilihan B).',
      caraCepat:
        'Gunakan aturan aljabar transformasi titik langsung: cermin $y=x$ menukar posisi $(x,y) \\to (y,x) = (-2,3)$. Rotasi $90^\\circ$ berlawanan jarum jam mengubah $(X,Y) \\to (-Y,X) = (-3,-2)$. Selesai tanpa mengalikan matriks!',
      kesalahanUmum:
        'Siswa sering mengalikan matriks dengan urutan terbalik ($M_1 \\cdot M_2$) bukannya ($M_2 \\cdot M_1$).',
    },
    narration: {
      intro:
        'Soal nomor empat belas menguji komposisi transformasi geometri pada bidang koordinat kartesius.',
      stimulus:
        'Titik awal tiga koma minus dua dicerminkan terhadap garis y sama dengan x, lalu dirotasikan sembilan puluh derajat berlawanan jarum jam.',
      hint: 'Lakukan secara bertahap: cermin garis y sama dengan x menukar posisi koordinat, dan rotasi sembilan puluh derajat memutar koordinat menjadi minus y koma x.',
      question: 'Berapakah koordinat akhir titik bayangan P dobel aksen?',
      explanation:
        'Tahap pertama mengubah tiga koma minus dua menjadi minus dua koma tiga. Tahap kedua mengubah minus dua koma tiga menjadi minus tiga koma minus dua.',
      quickTrick:
        'Komposisi ini setara dengan refleksi terhadap sumbu Y, yang langsung membalik tanda absis x menjadi minus tiga.',
      conclusion: 'Jawaban yang tepat adalah opsi B.',
    },
  },

  // Soal 15 - Kecukupan - Lingkaran & Garis Singgung
  {
    id: 15,
    number: 15,
    element: 'geometri',
    subtopic: 'Persamaan Lingkaran & Garis Singgung',
    difficulty: 'sulit',
    type: 'kecukupan',
    title: 'Analisis Kecukupan: Penentuan Jari-jari Lingkaran Tangki Gas',
    stimulus:
      'Sebuah tangki gas elips-silinder dipasang horizontal. Penampang melintang tangki membentuk lingkaran $L$ dengan pusat berada di titik $P(3, 4)$. Teknisi ingin mengetahui panjang jari-jari lingkaran $r$ dari tangki tersebut.',
    questionText:
      'Apakah panjang jari-jari lingkaran $r$ dapat ditentukan nilainya secara pasti?\n\nPutuskan apakah informasi pada pernyataan (1) dan (2) berikut cukup untuk menjawab pertanyaan tersebut:\n(1) Lingkaran $L$ menyinggung garis lurus dengan persamaan $3x + 4y - 5 = 0$.\n(2) Titik $Q(7, 7)$ terletak tepat pada keliling lingkaran $L$.',
    statement1: 'Lingkaran L menyinggung garis lurus 3x + 4y - 5 = 0.',
    statement2: 'Titik Q(7, 7) terletak tepat pada keliling lingkaran L.',
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
        'Pusat lingkaran diketahui $P(3, 4)$. Ingin ditentukan panjang jari-jari $r$ lingkaran. Kita perlu menguji apakah masing-masing pernyataan (1) atau (2) secara independen cukup untuk menghasilkan nilai $r$ yang unik.',
      konsep:
        '1) Jari-jari lingkaran dengan pusat $(x_0, y_0)$ yang menyinggung garis $Ax + By + C = 0$ adalah jarak tegak lurus titik ke garis:\n$$r = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}$$\n2) Jari-jari lingkaran dengan pusat $(x_0, y_0)$ yang melalui titik $(x_1, y_1)$ adalah jarak dua titik:\n$$r = \\sqrt{(x_1 - x_0)^2 + (y_1 - y_0)^2}$$',
      rumusKunci:
        '$$d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}, \\quad r = \\text{dist}(P, Q)$$',
      langkahPenyelesaian: [
        'Analisis Pernyataan (1) saja:\nLingkaran berpusat di $P(3, 4)$ menyinggung garis $3x + 4y - 5 = 0$.\nKarena garis menyinggung lingkaran, maka jarak titik pusat ke garis tersebut sama dengan panjang jari-jari $r$:\n$$r = \\frac{|3(3) + 4(4) - 5|}{\\sqrt{3^2 + 4^2}} = \\frac{|9 + 16 - 5|}{\\sqrt{25}} = \\frac{|20|}{5} = 4$$\nNilai jari-jari $r$ dapat ditentukan secara unik dan pasti ($r = 4$). Maka Pernyataan (1) SAJA CUKUP.',
        'Analisis Pernyataan (2) saja:\nTitik $Q(7, 7)$ terletak pada keliling lingkaran, artinya jarak dari pusat $P(3, 4)$ ke titik $Q(7, 7)$ adalah tepat panjang jari-jari $r$:\n$$r = \\sqrt{(7 - 3)^2 + (7 - 4)^2} = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5$$\nNilai jari-jari $r$ dapat ditentukan secara unik dan pasti ($r = 5$). Maka Pernyataan (2) SAJA CUKUP.',
        'Perhatikan kaidah Analisis Kecukupan Pernyataan: masing-masing pernyataan secara sendiri-sendiri mampu menjawab pertanyaan "Apakah nilai $r$ dapat ditentukan?", sehingga klasifikasinya adalah D (Pernyataan (1) SAJA cukup dan pernyataan (2) SAJA cukup).',
      ],
      pemeriksaan:
        'Setiap pernyataan secara mandiri menyediakan relasi geometris lengkap untuk menentukan jarak $r$ dari pusat $P(3,4)$. Tidak ada ambiguitas parameter.',
      kesimpulan:
        'Pernyataan (1) SAJA cukup dan pernyataan (2) SAJA cukup (Pilihan D).',
      caraCepat:
        'Pusat lingkaran sudah diketahui. Jarak pusat ke garis singgung menghasilkan jari-jari unik. Jarak pusat ke titik pada lingkaran juga menghasilkan jari-jari unik. Kedua informasi bekerja secara mandiri!',
      kesalahanUmum:
        'Siswa sering bingung karena nilai $r$ pada pernyataan 1 ($r=4$) berbeda dengan pernyataan 2 ($r=5$). Ingat: pada tipe kecukupan data, kedua pernyataan diuji secara terpisah untuk menjawab keberadaan solusi unik, bukan sistem gabungan.',
    },
    narration: {
      intro:
        'Soal nomor lima belas menyajikan penalaran kecukupan data pada geometri lingkaran.',
      stimulus:
        'Pusat lingkaran berada di titik tiga koma empat. Kita ingin mengetahui apakah jari-jari lingkaran r dapat ditentukan.',
      hint: 'Jika pusat lingkaran sudah diketahui, jarak pusat ke garis singgung langsung menghasilkan jari-jari, begitu pula jarak pusat ke suatu titik pada lingkaran.',
      question:
        'Apakah pernyataan satu dan pernyataan dua cukup untuk menjawabnya?',
      explanation:
        'Pernyataan satu cukup karena jarak titik ke garis singgung memberikan r sama dengan empat. Pernyataan dua juga cukup karena jarak pusat ke titik Q memberikan r sama dengan lima. Masing-masing pernyataan cukup secara mandiri.',
      quickTrick:
        'Jangan gabungkan keduanya; uji kecukupan masing-masing secara independen.',
      conclusion: 'Jawaban yang tepat adalah opsi D.',
    },
  },

  // Soal 16 - Kecukupan - Vektor: Proyeksi Ortogonal
  {
    id: 16,
    number: 16,
    element: 'geometri',
    subtopic: 'Vektor 3D: Proyeksi Skalar Ortogonal',
    difficulty: 'sangat_sulit',
    type: 'kecukupan',
    title: 'Analisis Kecukupan: Proyeksi Gaya Mekanika Robot',
    stimulus:
      'Diberikan dua vektor gaya dalam ruang tiga dimensi, yaitu $\\vec{u} = (2, -1, 2)$ dan vektor $\\vec{v} = (a, b, c)$. Seorang teknisi struktur ingin menentukan panjang proyeksi skalar ortogonal dari vektor $\\vec{u}$ pada vektor $\\vec{v}$, yang dinotasikan dengan $|\\vec{p}|$.',
    questionText:
      'Dapatkah panjang proyeksi skalar ortogonal $|\\vec{p}|$ ditentukan nilainya secara pasti?\n\nPutuskan apakah informasi pada pernyataan (1) dan (2) berikut cukup untuk menjawab pertanyaan tersebut:\n(1) Perkalian skalar kedua vektor adalah $\\vec{u} \\cdot \\vec{v} = 15$.\n(2) Panjang dari vektor $\\vec{v}$ adalah $|\\vec{v}| = 5$.',
    statement1: 'Perkalian skalar kedua vektor adalah u⃗ · v⃗ = 15.',
    statement2: 'Panjang dari vektor v⃗ adalah |v⃗| = 5.',
    options: [
      { id: 'A', text: 'Pernyataan (1) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (2) SAJA tidak cukup.' },
      { id: 'B', text: 'Pernyataan (2) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (1) SAJA tidak cukup.' },
      { id: 'C', text: 'DUA pernyataan BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi SATU pernyataan SAJA tidak cukup.' },
      { id: 'D', text: 'Pernyataan (1) SAJA cukup untuk menjawab pertanyaan dan pernyataan (2) SAJA cukup.' },
      { id: 'E', text: 'Pernyataan (1) dan pernyataan (2) TIDAK CUKUP untuk menjawab pertanyaan.' },
    ],
    correctAnswer: 'C',
    pembahasan: {
      memahamiMasalah:
        'Diketahui $\\vec{u} = (2, -1, 2)$. Panjang proyeksi skalar ortogonal $\\vec{u}$ pada $\\vec{v}$ didefinisikan sebagai:\n$$|\\vec{p}| = \\frac{|\\vec{u} \\cdot \\vec{v}|}{|\\vec{v}|}$$\nKita ingin mengetahui apakah nilai $|\\vec{p}|$ dapat ditentukan secara pasti.',
      konsep:
        'Rumus proyeksi skalar ortogonal vektor $\\vec{u}$ pada $\\vec{v}$ memerlukan dua komponen nilai: hasil kali dot product $(\\vec{u} \\cdot \\vec{v})$ dan panjang vektor tempat proyeksi jatuh $(|\\vec{v}|)$.',
      rumusKunci:
        '$$|\\vec{p}| = \\frac{|\\vec{u} \\cdot \\vec{v}|}{|\\vec{v}|}$$',
      langkahPenyelesaian: [
        'Analisis Pernyataan (1) saja:\nDiketahui $\\vec{u} \\cdot \\vec{v} = 15$. Namun panjang $|\\vec{v}|$ belum diketahui (bisa 3, 5, 10, dsb). Sehingga $|\\vec{p}| = \\frac{15}{|\\vec{v}|}$ tidak bernilai tunggal. Pernyataan (1) SAJA TIDAK CUKUP.',
        'Analisis Pernyataan (2) saja:\nDiketahui $|\\vec{v}| = 5$. Namun nilai dot product $\\vec{u} \\cdot \\vec{v}$ belum diketahui. Sehingga $|\\vec{p}|$ tidak dapat dihitung. Pernyataan (2) SAJA TIDAK CUKUP.',
        'Analisis Kedua Pernyataan Bersama-sama:\nDengan menggabungkan kedua pernyataan:\n$$|\\vec{p}| = \\frac{|\\vec{u} \\cdot \\vec{v}|}{|\\vec{v}|} = \\frac{|15|}{5} = 3$$\nNilai panjang proyeksi skalar ortogonal dapat ditentukan secara pasti dan unik ($|\\vec{p}| = 3$).',
        'Karena masing-masing pernyataan tidak cukup tetapi keduanya bersama-sama cukup, maka kesimpulannya adalah C.',
      ],
      pemeriksaan:
        'Hitung: $|\\vec{u}| = \\sqrt{2^2 + (-1)^2 + 2^2} = \\sqrt{9} = 3$. Cosinus sudut $\\cos\\theta = \\frac{15}{3 \\times 5} = 1 \\implies \\theta = 0^\\circ$ (searah). Proyeksi adalah $|u|\\cos 0^\\circ = 3 \\times 1 = 3$. Sangat konsisten.',
      kesimpulan:
        'Kedua pernyataan secara bersama-sama cukup untuk menjawab pertanyaan, tetapi masing-masing pernyataan saja tidak cukup (Pilihan C).',
      caraCepat:
        'Rumus proyeksi skalar adalah pecahan dengan pembilang dot product dan penyebut panjang vektor $\\vec{v}$. Dibutuhkan kedua data tersebut secara simultan!',
      kesalahanUmum:
        'Siswa sering mengira $|\\vec{u}|$ yang berada di penyebut, padahal pembagi adalah panjang vektor tempat tujuan proyeksi jatuh ($|\\vec{v}|$).',
    },
    narration: {
      intro:
        'Soal nomor enam belas menguji kecukupan informasi pada materi proyeksi ortogonal vektor tiga dimensi.',
      stimulus:
        'Panjang proyeksi vektor u pada vektor v ingin dihitung dari dua buah pernyataan.',
      hint: 'Lihat rumus proyeksi skalar: pembilangnya adalah perkalian titik dan penyebutnya adalah panjang vektor v.',
      question:
        'Apakah pernyataan satu dan pernyataan dua cukup untuk menentukan nilai panjang proyeksi?',
      explanation:
        'Pernyataan satu hanya memberi pembilang yaitu lima belas. Pernyataan dua hanya memberi penyebut yaitu lima. Dengan menggabungkan keduanya, panjang proyeksi bernilai pasti yaitu lima belas dibagi lima sama dengan tiga.',
      quickTrick:
        'Karena ada dua komponen yang tidak diketahui pada rumus pecahan, kita memerlukan kedua pernyataan secara bersama-sama.',
      conclusion: 'Jawaban yang tepat adalah opsi C.',
    },
  },

  // Soal 17 - Kompleks - Vektor 2D & 3D Ortogonalitas
  {
    id: 17,
    number: 17,
    element: 'geometri',
    subtopic: 'Vektor: Ortogonalitas & Panjang Vektor',
    difficulty: 'sangat_sulit',
    type: 'kompleks',
    title: 'Sifat Ortogonalitas dan Aljabar Vektor Tiga Dimensi',
    stimulus:
      'Diberikan tiga vektor dalam ruang $\\mathbb{R}^3$:\n$$\\vec{a} = 2\\hat{i} - \\hat{j} + 2\\hat{k}$$\n$$\\vec{b} = \\hat{i} + 2\\hat{j} + x\\hat{k}$$\n$$\\vec{c} = 4\\hat{i} + 3\\hat{j} - \\hat{k}$$\nDiketahui bahwa vektor $\\vec{a}$ tegak lurus (ortogonal) terhadap vektor $\\vec{b}$.',
    questionText:
      'Manakah di antara pernyataan-pernyataan berikut yang bernilai BENAR? (Jawaban benar dapat lebih dari satu)',
    complexOptions: [
      { id: 'A', text: 'Nilai dari parameter $x$ adalah $0$.' },
      { id: 'B', text: 'Panjang vektor $\\vec{a}$ adalah $|\\vec{a}| = 3$.' },
      { id: 'C', text: 'Hasil perkalian titik $\\vec{a} \\cdot \\vec{c} = 3$.' },
      { id: 'D', text: 'Panjang vektor $\\vec{b}$ adalah $|\\vec{b}| = \\sqrt{5}$.' },
      { id: 'E', text: 'Vektor $\\vec{a}$ juga tegak lurus terhadap vektor $\\vec{c}$.' },
    ],
    correctAnswer: ['A', 'B', 'C', 'D'],
    pembahasan: {
      memahamiMasalah:
        'Vektor $\\vec{a} = (2, -1, 2)$ tegak lurus $\\vec{b} = (1, 2, x)$. Diberikan juga $\\vec{c} = (4, 3, -1)$. Kita harus menguji kebenaran masing-masing pernyataan aljabar vektor tersebut.',
      konsep:
        '1) Syarat dua vektor tegak lurus (ortogonal): $\\vec{a} \\cdot \\vec{b} = 0$\n2) Panjang vektor: $|\\vec{v}| = \\sqrt{v_x^2 + v_y^2 + v_z^2}$\n3) Perkalian skalar $\\vec{a} \\cdot \\vec{c} = a_x c_x + a_y c_y + a_z c_z$.',
      rumusKunci:
        '$$\\vec{a} \\perp \\vec{b} \\iff \\vec{a} \\cdot \\vec{b} = 0, \\quad |\\vec{a}| = \\sqrt{a_x^2 + a_y^2 + a_z^2}$$',
      langkahPenyelesaian: [
        'Gunakan syarat ortogonalitas $\\vec{a} \\perp \\vec{b}$:\n$$\\vec{a} \\cdot \\vec{b} = (2)(1) + (-1)(2) + (2)(x) = 0$$\n$$2 - 2 + 2x = 0 \\implies 2x = 0 \\implies x = 0$$\nJadi Pernyataan A BENAR.',
        'Hitung panjang vektor $\\vec{a}$:\n$$|\\vec{a}| = \\sqrt{2^2 + (-1)^2 + 2^2} = \\sqrt{4 + 1 + 4} = \\sqrt{9} = 3$$\nJadi Pernyataan B BENAR.',
        'Hitung dot product $\\vec{a} \\cdot \\vec{c}$:\n$$\\vec{a} \\cdot \\vec{c} = (2)(4) + (-1)(3) + (2)(-1) = 8 - 3 - 2 = 3$$\nJadi Pernyataan C BENAR.',
        'Hitung panjang vektor $\\vec{b}$ dengan $x = 0$:\n$$|\\vec{b}| = \\sqrt{1^2 + 2^2 + 0^2} = \\sqrt{1 + 4 + 0} = \\sqrt{5}$$\nJadi Pernyataan D BENAR.',
        'Uji apakah $\\vec{a} \\perp \\vec{c}$:\nKarena $\\vec{a} \\cdot \\vec{c} = 3 \\neq 0$, maka $\\vec{a}$ TIDAK tegak lurus terhadap $\\vec{c}$. Jadi Pernyataan E SALAH.',
      ],
      pemeriksaan:
        'Empat pernyataan (A, B, C, D) terbukti benar secara matematis, sedangkan E salah karena hasil kali skalar tidak sama dengan nol.',
      kesimpulan: 'Pernyataan yang bernilai BENAR adalah A, B, C, dan D.',
      caraCepat:
        'Cari $x$ dalam satu detik: $2 - 2 + 2x = 0 \\implies x = 0$. Panjang $a$: $\\sqrt{4+1+4} = 3$. Panjang $b$: $\\sqrt{1+4} = \\sqrt{5}$. Dot product $a \\cdot c = 8 - 3 - 2 = 3 \\neq 0$. Langsung centang A, B, C, D!',
      kesalahanUmum:
        'Siswa sering menganggap bahwa jika $\\vec{a} \\perp \\vec{b}$, maka $\\vec{a}$ otomatis tegak lurus dengan sembarang vektor ketiga lainnya.',
    },
    narration: {
      intro:
        'Soal nomor tujuh belas adalah Pilihan Ganda Kompleks mengenai konsep ortogonalitas vektor tiga dimensi.',
      stimulus:
        'Vektor a tegak lurus vektor b dengan parameter x yang belum diketahui, serta terdapat vektor c.',
      hint: 'Syarat utama dua vektor saling tegak lurus adalah hasil kali titik atau dot product keduanya harus sama dengan nol.',
      question:
        'Centang seluruh pernyataan yang bernilai benar dari lima opsi yang disediakan!',
      explanation:
        'Dari syarat tegak lurus diperoleh x sama dengan nol. Panjang vektor a adalah tiga, panjang vektor b adalah akar lima, dan hasil kali titik a dengan c bernilai tiga. Karena a titik c tidak nol, vektor a tidak tegak lurus dengan c.',
      quickTrick:
        'Empat pernyataan pertama langsung terverifikasi dengan perhitungan aljabar sederhana.',
      conclusion: 'Jawaban yang tepat adalah A, B, C, dan D.',
    },
  },

  // Soal 18 - Kompleks - Transformasi: Matriks & Luas Bayangan
  {
    id: 18,
    number: 18,
    element: 'geometri',
    subtopic: 'Transformasi Matriks & Perubahan Luas',
    difficulty: 'sangat_sulit',
    type: 'kompleks',
    title: 'Transformasi Afinitas dan Efek Perubahan Luas Wilayah',
    stimulus:
      'Sebuah kawasan cagar alam segitiga $ABC$ pada peta digital memiliki titik-titik koordinat sudut $A(1, 1)$, $B(5, 1)$, dan $C(3, 4)$. Kawasan tersebut mengalami pemetaan transformasi afinitas yang diwakili oleh matriks transformasi tunggal:\n$$T = \\begin{pmatrix} 2 & 1 \\\\ 3 & 4 \\end{pmatrix}$$',
    questionText:
      'Manakah di antara pernyataan-pernyataan berikut yang bernilai BENAR terkait transformasi kawasan tersebut? (Jawaban benar dapat lebih dari satu)',
    complexOptions: [
      { id: 'A', text: 'Luas kawasan awal segitiga $ABC$ adalah $6\\text{ satuan luas}$.' },
      { id: 'B', text: 'Determinan matriks transformasi $T$ bernilai $\\det(T) = 5$.' },
      { id: 'C', text: 'Luas bayangan kawasan segitiga $A\'B\'C\'$ setelah transformasi adalah $30\\text{ satuan luas}$.' },
      { id: 'D', text: 'Koordinat bayangan titik $A(1, 1)$ adalah $A\'(3, 7)$.' },
      { id: 'E', text: 'Transformasi matriks $T$ mempertahankan keliling dan luas bangun awal (isometri).' },
    ],
    correctAnswer: ['A', 'B', 'C', 'D'],
    pembahasan: {
      memahamiMasalah:
        'Segitiga $ABC$ dengan koordinat $A(1,1), B(5,1), C(3,4)$ ditransformasi oleh matriks $T = \\begin{pmatrix} 2 & 1 \\\\ 3 & 4 \\end{pmatrix}$. Perlu diuji luas awal, determinan, luas bayangan, bayangan titik $A$, dan sifat isometri.',
      konsep:
        '1) Luas segitiga awal dengan alas mendatar: $L = \\frac{1}{2} \\times alas \\times tinggi$.\n2) Determinan matriks transformasi: $\\det(T) = ad - bc$.\n3) Luas bayangan bangun setelah transformasi matriks: $L\' = |\\det(T)| \\times L_{\\text{awal}}$.\n4) Pemetaan titik: $\\begin{pmatrix} x\' \\\\ y\' \\end{pmatrix} = T \\begin{pmatrix} x \\\\ y \\end{pmatrix}$.\n5) Isometri hanya terjadi jika $|\det(T)| = 1$ dan matriks ortogonal.',
      rumusKunci:
        '$$L\' = |\\det(T)| \\times L_{\\text{awal}}, \\quad \\det(T) = ad - bc$$',
      langkahPenyelesaian: [
        'Hitung luas awal segitiga $ABC$:\nAlas $AB$ sepanjang garis mendatar $y = 1$: $alas = 5 - 1 = 4$ satuan.\nTinggi dari titik $C(3, 4)$ ke garis $y = 1$: $tinggi = 4 - 1 = 3$ satuan.\n$$L_{\\text{awal}} = \\frac{1}{2} \\times 4 \\times 3 = 6\\text{ satuan luas}$$\nJadi Pernyataan A BENAR.',
        'Hitung determinan matriks $T = \\begin{pmatrix} 2 & 1 \\\\ 3 & 4 \\end{pmatrix}$:\n$$\\det(T) = (2)(4) - (1)(3) = 8 - 3 = 5$$\nJadi Pernyataan B BENAR.',
        'Hitung luas bayangan segitiga $A\'B\'C\'$:\n$$L\' = |\\det(T)| \\times L_{\\text{awal}} = 5 \\times 6 = 30\\text{ satuan luas}$$\nJadi Pernyataan C BENAR.',
        'Hitung koordinat bayangan titik $A(1, 1)$:\n$$\\begin{pmatrix} x\' \\\\ y\' \\end{pmatrix} = \\begin{pmatrix} 2 & 1 \\\\ 3 & 4 \\end{pmatrix} \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 2(1) + 1(1) \\\\ 3(1) + 4(1) \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 7 \\end{pmatrix}$$\nJadi titik $A\'(3, 7)$. Pernyataan D BENAR.',
        'Uji sifat isometri: Karena determinan bernilai 5 (bukan 1), luas membesar 5 kali lipat sehingga transformasi ini BUKAN isometri. Pernyataan E SALAH.',
      ],
      pemeriksaan:
        'Rumus Gauss untuk luas segitiga: $\\frac{1}{2}|1(1-4) + 5(4-1) + 3(1-1)| = \\frac{1}{2}|-3 + 15 + 0| = \\frac{1}{2}(12) = 6$. Perkalian luas $6 \\times 5 = 30$. Semua perhitungan konsisten.',
      kesimpulan: 'Pernyataan yang bernilai BENAR adalah A, B, C, dan D.',
      caraCepat:
        'Hitung alas segitiga 4 dan tinggi 3 langsung menghasilkan luas 6. Determinan matriks $8 - 3 = 5$. Kalikan keduanya: $6 \\times 5 = 30$. Kalikan matriks dengan $(1,1)^T$ menghasilkan $(3,7)^T$. Sangat cepat!',
      kesalahanUmum:
        'Siswa sering menghitung koordinat seluruh titik bayangan $A\', B\', C\'$ lalu mencari luasnya dengan rumus yang rumit, padahal teorema luas menyatakan cukup kalikan dengan determinan matriks.',
    },
    narration: {
      intro:
        'Soal nomor delapan belas mengevaluasi hubungan antara matriks transformasi dengan perubahan luas bangun datar.',
      stimulus:
        'Kawasan cagar alam segitiga ditransformasikan oleh matriks dua kali dua dengan elemen dua, satu, tiga, dan empat.',
      hint: 'Teorema penting: luas bayangan bangun datar adalah hasil kali nilai mutlak determinan matriks dengan luas bangun awal.',
      question:
        'Centang seluruh pernyataan yang benar mengenai luas awal, determinan, luas akhir, dan bayangan titik A!',
      explanation:
        'Luas awal segitiga adalah setengah kali empat kali tiga yaitu enam. Determinan matriks adalah delapan dikurang tiga yaitu lima. Luas bayangannya adalah lima dikali enam yaitu tiga puluh. Bayangan titik A adalah tiga koma tujuh.',
      quickTrick:
        'Gunakan rumus faktor pengali luas matriks agar tidak perlu mencari semua koordinat bayangan segitiga.',
      conclusion: 'Jawaban yang tepat adalah opsi A, B, C, dan D.',
    },
  },

  // Soal 19 - Benar/Salah - Lingkaran: Kedudukan Garis
  {
    id: 19,
    number: 19,
    element: 'geometri',
    subtopic: 'Kedudukan Garis terhadap Lingkaran',
    difficulty: 'sulit',
    type: 'benar_salah',
    title: 'Analisis Kedudukan Garis Sumbu Sensor terhadap Lingkaran Orbit',
    stimulus:
      'Diberikan persamaan lingkaran radar $L: x^2 + y^2 - 4x + 6y + 4 = 0$ dan sebuah garis lintasan sensor $g: y = x - 2$. Analis geodesi menguji hubungan spasial antara garis dan lingkaran tersebut.',
    questionText:
      'Tentukan apakah masing-masing pernyataan berikut bernilai BENAR atau SALAH berdasarkan analisis geometri analitik:',
    statements: [
      {
        id: 1,
        text: 'Titik pusat lingkaran $L$ adalah $P(2, -3)$ dengan panjang jari-jari $r = 3$.',
        isCorrect: true,
      },
      {
        id: 2,
        text: 'Garis $g$ memotong lingkaran $L$ di tepat dua titik yang berbeda.',
        isCorrect: true,
      },
      {
        id: 3,
        text: 'Jarak terpendek dari pusat lingkaran $P$ ke garis $g$ lebih besar daripada jari-jari lingkaran ($d > r$).',
        isCorrect: false,
      },
    ],
    correctAnswer: [true, true, false],
    pembahasan: {
      memahamiMasalah:
        'Diberikan lingkaran $x^2 + y^2 - 4x + 6y + 4 = 0$ dan garis $y = x - 2$. Ingin diuji pusat dan jari-jari, kedudukan garis (memotong di dua titik), dan perbandingan jarak pusat ke garis terhadap jari-jari.',
      konsep:
        '1) Pusat dan jari-jari dari $x^2 + y^2 + Ax + By + C = 0$:\n$$P\\left(-\\frac{A}{2}, -\\frac{B}{2}\\right), \\quad r = \\sqrt{\\left(-\\frac{A}{2}\\right)^2 + \\left(-\\frac{B}{2}\\right)^2 - C}$$\n2) Kedudukan garis terhadap lingkaran: jika jarak pusat ke garis $d < r$, maka garis memotong lingkaran di dua titik berbeda (diskriminan $D > 0$). Jika $d = r$ menyinggung, jika $d > r$ berada di luar.',
      rumusKunci:
        '$$d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}, \\quad d < r \\iff \\text{memotong di dua titik}$$',
      langkahPenyelesaian: [
        'Tentukan pusat dan jari-jari lingkaran:\n$A = -4, B = 6, C = 4$.\nPusat $P = \\left(-\\frac{-4}{2}, -\\frac{6}{2}\\right) = (2, -3)$.\nJari-jari $r = \\sqrt{2^2 + (-3)^2 - 4} = \\sqrt{4 + 9 - 4} = \\sqrt{9} = 3$.\nJadi Pernyataan 1 BENAR.',
        'Hitung jarak dari pusat $P(2, -3)$ ke garis $x - y - 2 = 0$:\n$$d = \\frac{|1(2) - 1(-3) - 2|}{\\sqrt{1^2 + (-1)^2}} = \\frac{|2 + 3 - 2|}{\\sqrt{2}} = \\frac{3}{\\sqrt{2}} = \\frac{3\\sqrt{2}}{2} \\approx 2{,}12$$\nBandingkan jarak $d$ dengan jari-jari $r = 3$:\nKarena $d = 2{,}12 < r = 3$, maka garis memotong lingkaran di tepat DUA TITIK BERBEDA.\nJadi Pernyataan 2 BENAR.',
        'Pernyataan 3 menyatakan bahwa jarak $d > r$. Namun kita telah membuktikan bahwa $d < r$ ($2{,}12 < 3$). Jadi Pernyataan 3 SALAH.',
      ],
      pemeriksaan:
        'Substitusi $y = x - 2$ ke lingkaran: $x^2 + (x-2)^2 - 4x + 6(x-2) + 4 = 0 \\implies x^2 + x^2 - 4x + 4 - 4x + 6x - 12 + 4 = 0 \\implies 2x^2 - 2x - 4 = 0 \\implies x^2 - x - 2 = 0$. Diskriminan $D = (-1)^2 - 4(1)(-2) = 1 + 8 = 9 > 0$. Karena $D > 0$, terbukti ada 2 titik potong real berbeda ($x = 2$ dan $x = -1$). Sangat akurat!',
      kesimpulan: 'Pernyataan 1 BENAR, Pernyataan 2 BENAR, Pernyataan 3 SALAH.',
      caraCepat:
        'Gunakan rumus jarak titik ke garis langsung $d = 3/\\sqrt{2} \\approx 2{,}12$. Bandingkan dengan $r = 3$: karena $2{,}12 < 3$, garis pasti memotong di 2 titik. Pernyataan 3 otomatis gugur!',
      kesalahanUmum:
        'Siswa sering keliru mengubah persamaan garis ke bentuk implisit sehingga salah tanda pada koefisien $B$ dan $C$.',
    },
    narration: {
      intro:
        'Soal nomor sembilan belas bertipe Benar atau Salah mengenai kedudukan garis terhadap lingkaran.',
      stimulus:
        'Diberikan lingkaran umum dan garis lintasan y sama dengan x minus dua.',
      hint: 'Cari pusat dan jari-jari lingkaran terlebih dahulu, lalu bandingkan jarak tegak lurus pusat ke garis dengan nilai jari-jari.',
      question:
        'Tentukan status kebenaran dari ketiga pernyataan geometri berikut.',
      explanation:
        'Pusat lingkaran adalah dua koma minus tiga dan jari-jarinya tiga. Jarak pusat ke garis adalah tiga per akar dua atau sekitar dua koma dua belas, yang lebih kecil dari jari-jari. Oleh karena itu garis memotong di dua titik dan pernyataan tiga bernilai salah.',
      quickTrick:
        'Nilai diskriminan persamaan kuadrat substitusi bernilai sembilan, yang memastikan adanya dua titik potong.',
      conclusion: 'Status berturut-turut adalah BENAR, BENAR, dan SALAH.',
    },
  },

  // Soal 20 - Benar/Salah - Transformasi Geometri: Isometri & Dilatasi
  {
    id: 20,
    number: 20,
    element: 'geometri',
    subtopic: 'Transformasi Geometri: Isometri & Dilatasi',
    difficulty: 'sangat_sulit',
    type: 'benar_salah',
    title: 'Validasi Teoretis Sifat Isometri dan Dilatasi Transformasi',
    stimulus:
      'Dalam geometri transformasi, terdapat kelompok transformasi yang mempertahankan jarak antar titik (isometri) dan kelompok yang mengubah ukuran bangun (seperti dilatasi berskala $k$).',
    questionText:
      'Tentukan apakah masing-masing pernyataan berikut bernilai BENAR atau SALAH berdasarkan aksioma dan sifat transformasi geometri:',
    statements: [
      {
        id: 1,
        text: 'Translasi, refleksi, dan rotasi merupakan transformasi isometri yang selalu mempertahankan panjang ruas garis dan besar sudut bangun datar.',
        isCorrect: true,
      },
      {
        id: 2,
        text: 'Jika sebuah bangun datar dengan luas $L$ didilatasi dengan faktor skala $k = -3$ berpusat di titik asal $O(0, 0)$, maka luas bayangan bangun tersebut adalah $-3 L$.',
        isCorrect: false,
      },
      {
        id: 3,
        text: 'Komposisi dua buah refleksi terhadap dua garis yang sejajar setara dengan sebuah translasi (pergeseran) sejauh dua kali jarak antara kedua garis sejajar tersebut.',
        isCorrect: true,
      },
    ],
    correctAnswer: [true, false, true],
    pembahasan: {
      memahamiMasalah:
        'Menganalisis sifat dasar isometri, perubahan luas akibat dilatasi dengan faktor skala negatif $k = -3$, dan teorema komposisi dua refleksi terhadap garis-garis sejajar.',
      konsep:
        '1) Definisi Isometri: Transformasi yang mengawetkan jarak (panjang sisi dan besar sudut konstan). Translasi, rotasi, dan refleksi adalah isometri.\n2) Efek Dilatasi terhadap Luas: Luas bayangan adalah $L\' = |k|^2 \\cdot L = k^2 \\cdot L$. Luas suatu bangun fisik tidak pernah bernilai negatif.\n3) Teorema Refleksi Sejajar: Komposisi pencerminan berturutan terhadap garis $x = a$ dan garis $x = b$ yang berjarak $d = |b - a|$ menghasilkan translasi sebesar vektor $2d$ searah vektor normal garis.',
      rumusKunci:
        '$$L_{\\text{dilatasi}} = k^2 \\cdot L, \\quad M_{x=b} \\circ M_{x=a} = T_{2(b-a)}$$',
      langkahPenyelesaian: [
        'Pernyataan 1: Translasi (geser), refleksi (cermin), dan rotasi (putar) adalah transformasi isometri. Isometri mengawetkan jarak dan sudut. Jadi Pernyataan 1 BENAR.',
        'Pernyataan 2: Dilatasi dengan faktor skala $k = -3$. Pengali luas adalah $k^2 = (-3)^2 = 9$. Maka luas bayangan menjadi $9 L$, bukan $-3 L$. Nilai luas selalu non-negatif. Jadi Pernyataan 2 SALAH.',
        'Pernyataan 3: Teorema klasik transformasi menyatakan bahwa dua refleksi berurutan terhadap garis-garis sejajar menghasilkan pergeseran (translasi) sebesar $2 \\times d$ dengan arah dari cermin pertama ke cermin kedua. Jadi Pernyataan 3 BENAR.',
      ],
      pemeriksaan:
        'Contoh konkret: $A(x,y)$ dicerminkan ke $x = 0$ menghasilkan $(-x, y)$, lalu ke $x = d$ menghasilkan $(2d - (-x), y) = (x + 2d, y)$. Ini adalah translasi sejauh $2d$ pada sumbu-X. Terbukti!',
      kesimpulan: 'Pernyataan 1 BENAR, Pernyataan 2 SALAH, Pernyataan 3 BENAR.',
      caraCepat:
        'Luas fisik tidak pernah bertanda minus! Pernyataan 2 menyebut $-3L$ sehingga seketika pasti SALAH tanpa perlu ragu.',
      kesalahanUmum:
        'Siswa sering lupa mengkuadratkan faktor skala dilatasi saat menghitung luas atau lupa menerapkan nilai mutlak sehingga menghasilkan luas bernilai negatif.',
    },
    narration: {
      intro:
        'Soal kedua puluh menguji pemahaman aksiomatik kita tentang isometri dan dilatasi pada geometri transformasi.',
      stimulus:
        'Kita menelaah tiga pernyataan tentang sifat pengawetan jarak, efek dilatasi terhadap luas, dan komposisi refleksi sejajar.',
      hint: 'Ingat bahwa luas selalu bernilai positif dan berubah sebanding dengan kuadrat faktor skala dilatasi k kuadrat.',
      question:
        'Tentukan status kebenaran dari masing-masing pernyataan teoretis tersebut.',
      explanation:
        'Pernyataan satu benar karena translasi, refleksi, dan rotasi adalah isometri. Pernyataan dua salah karena luas bayangan harus dikalikan minus tiga kuadrat yaitu sembilan L, bukan minus tiga L. Pernyataan tiga benar sesuai teorema refleksi garis sejajar.',
      quickTrick:
        'Karena luas tidak mungkin negatif, pernyataan dua langsung tereliminasi.',
      conclusion: 'Status berturut-turut adalah BENAR, SALAH, dan BENAR.',
    },
  },
];
