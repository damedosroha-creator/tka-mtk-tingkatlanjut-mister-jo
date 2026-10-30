import React from 'react';
import { DiagramConfig } from '../types/quiz';

interface MathDiagramProps {
  diagram: DiagramConfig;
}

export const MathDiagram: React.FC<MathDiagramProps> = ({ diagram }) => {
  const { type, title, params } = diagram;

  return (
    <div className="my-4 rounded-xl border border-teal-200 bg-white/90 p-4 shadow-sm">
      {title && (
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-teal-800">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
            {title}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-teal-600 font-mono">Diagram Ilmiah Akurat</span>
        </div>
      )}

      <div className="flex justify-center overflow-x-auto py-1">
        {type === 'circle_tangent' && <CircleTangentDiagram params={params} />}
        {type === 'circle_sector' && <CircleSectorDiagram params={params} />}
        {type === 'vector_2d' && <Vector2DDiagram params={params} />}
        {type === 'vector_3d' && <Vector3DDiagram params={params} />}
        {type === 'function_graph' && <FunctionGraphDiagram params={params} />}
        {type === 'limit_graph' && <LimitGraphDiagram params={params} />}
        {type === 'transformation_plane' && <TransformationDiagram params={params} />}
        {type === 'matrix_grid' && <MatrixGridDiagram params={params} />}
      </div>
    </div>
  );
};

// 1. Circle Tangent Diagram
const CircleTangentDiagram: React.FC<{ params: any }> = ({ params }) => {
  const cx = params.cx ?? 160;
  const cy = params.cy ?? 140;
  const r = params.r ?? 70;
  const px = params.px ?? 310;
  const py = params.py ?? 80;

  // Tangent point estimation or precise coordinate
  const tx = params.tx ?? 190;
  const ty = params.ty ?? 77;

  return (
    <svg viewBox="0 0 380 260" className="w-full max-w-[420px] h-auto text-slate-700">
      <defs>
        <pattern id="grid1" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0fdf4" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="380" height="260" fill="url(#grid1)" rx="8" />

      {/* Coordinate axes */}
      <line x1="30" y1="230" x2="350" y2="230" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="60" y1="20" x2="60" y2="245" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="355" y="234" fontSize="11" fill="#64748b" fontWeight="600">X</text>
      <text x="56" y="16" fontSize="11" fill="#64748b" fontWeight="600">Y</text>

      {/* Circle */}
      <circle cx={cx} cy={cy} r={r} fill="#f0fdfa" stroke="#0d9488" strokeWidth="2.5" />

      {/* Center point */}
      <circle cx={cx} cy={cy} r="4" fill="#0f766e" />
      <text x={cx - 18} y={cy - 8} fontSize="11" fontWeight="bold" fill="#0f766e">P(a, b)</text>

      {/* Radius line to tangent point */}
      <line x1={cx} y1={cy} x2={tx} y2={ty} stroke="#0d9488" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x={(cx + tx) / 2 - 12} y={(cy + ty) / 2 - 4} fontSize="10" fill="#0f766e" fontStyle="italic">r</text>

      {/* Tangent Line */}
      <line x1={tx - 70} y1={ty + 40} x2={px + 40} y2={py - 15} stroke="#d97706" strokeWidth="2.5" />
      <text x={px + 20} y={py - 22} fontSize="11" fontWeight="bold" fill="#b45309">Garis Singgung g</text>

      {/* Point P outside */}
      <circle cx={px} cy={py} r="4.5" fill="#d97706" />
      <text x={px + 8} y={py + 14} fontSize="11" fontWeight="bold" fill="#92400e">Titik A({params.ax ?? 'x₁'}, {params.ay ?? 'y₁'})</text>

      {/* Tangent point T */}
      <circle cx={tx} cy={ty} r="4" fill="#0f766e" />
      <text x={tx - 18} y={ty - 8} fontSize="10" fontWeight="600" fill="#0f766e">T (Titik Singgung)</text>
    </svg>
  );
};

// 2. Circle Sector & Segment (Juring & Tembereng)
const CircleSectorDiagram: React.FC<{ params: any }> = ({ params }) => {
  const cx = 170;
  const cy = 130;
  const r = 85;
  const angleDeg = params.angle ?? 60;
  const angleRad = (angleDeg * Math.PI) / 180;

  const x1 = cx + r;
  const y1 = cy;
  const x2 = cx + r * Math.cos(angleRad);
  const y2 = cy - r * Math.sin(angleRad);

  return (
    <svg viewBox="0 0 340 250" className="w-full max-w-[400px] h-auto">
      {/* Background Circle */}
      <circle cx={cx} cy={cy} r={r} fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Shaded Juring / Sektor */}
      <path
        d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 0 ${x2} ${y2} Z`}
        fill="#ccfbf1"
        stroke="#0d9488"
        strokeWidth="2"
      />

      {/* Shaded Tembereng if requested */}
      {params.highlightSegment && (
        <path
          d={`M ${x1} ${y1} A ${r} ${r} 0 0 0 ${x2} ${y2} Z`}
          fill="#fed7aa"
          stroke="#ea580c"
          strokeWidth="2"
        />
      )}

      {/* Chord (Tali Busur) */}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ea580c" strokeWidth="2" strokeDasharray="2 2" />

      {/* Center point */}
      <circle cx={cx} cy={cy} r="4" fill="#0f766e" />
      <text x={cx - 15} y={cy + 16} fontSize="11" fontWeight="bold" fill="#0f766e">O</text>

      {/* Angle arc */}
      <path
        d={`M ${cx + 25} ${cy} A 25 25 0 0 0 ${cx + 25 * Math.cos(angleRad)} ${cy - 25 * Math.sin(angleRad)}`}
        fill="none"
        stroke="#0f766e"
        strokeWidth="1.5"
      />
      <text x={cx + 32} y={cy - 10} fontSize="11" fontWeight="bold" fill="#0f766e">{angleDeg}°</text>

      <text x={x1 + 6} y={y1 + 4} fontSize="11" fontWeight="bold" fill="#334155">A</text>
      <text x={x2 + 4} y={y2 - 6} fontSize="11" fontWeight="bold" fill="#334155">B</text>
      <text x={cx + 40} y={cy + 18} fontSize="10" fill="#0f766e">r = {params.radiusLabel ?? '14 cm'}</text>
    </svg>
  );
};

// 3. Vector 2D Diagram
const Vector2DDiagram: React.FC<{ params: any }> = ({ params }) => {
  const originX = 70;
  const originY = 190;
  const scale = params.scale ?? 22;

  const uX = params.ux ?? 6;
  const uY = params.uy ?? 2;
  const vX = params.vx ?? 2;
  const vY = params.vy ?? 5;

  const uEnd = { x: originX + uX * scale, y: originY - uY * scale };
  const vEnd = { x: originX + vX * scale, y: originY - vY * scale };
  const rEnd = { x: originX + (uX + vX) * scale, y: originY - (uY + vY) * scale };

  return (
    <svg viewBox="0 0 360 250" className="w-full max-w-[400px] h-auto">
      {/* Grid lines */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
        <line
          key={`gx-${i}`}
          x1={originX + i * scale}
          y1={20}
          x2={originX + i * scale}
          y2={220}
          stroke="#e2e8f0"
          strokeWidth="0.8"
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((j) => (
        <line
          key={`gy-${j}`}
          x1={30}
          y1={originY - j * scale}
          x2={340}
          y2={originY - j * scale}
          stroke="#e2e8f0"
          strokeWidth="0.8"
        />
      ))}

      {/* Axes */}
      <line x1={originX} y1={230} x2={originX} y2={15} stroke="#475569" strokeWidth="1.5" />
      <line x1={20} y1={originY} x2={345} y2={originY} stroke="#475569" strokeWidth="1.5" />
      <text x={originX - 12} y={originY + 16} fontSize="11" fontWeight="bold" fill="#64748b">O</text>
      <text x="340" y={originY - 8} fontSize="11" fontWeight="bold" fill="#475569">X</text>
      <text x={originX + 8} y="22" fontSize="11" fontWeight="bold" fill="#475569">Y</text>

      {/* Vector u */}
      <line x1={originX} y1={originY} x2={uEnd.x} y2={uEnd.y} stroke="#0d9488" strokeWidth="3" markerEnd="url(#arrow-teal)" />
      <text x={uEnd.x + 4} y={uEnd.y + 6} fontSize="12" fontWeight="bold" fill="#0f766e">
        {params.labelU ?? 'u⃗'}
      </text>

      {/* Vector v */}
      <line x1={originX} y1={originY} x2={vEnd.x} y2={vEnd.y} stroke="#d97706" strokeWidth="3" markerEnd="url(#arrow-amber)" />
      <text x={vEnd.x - 14} y={vEnd.y - 8} fontSize="12" fontWeight="bold" fill="#b45309">
        {params.labelV ?? 'v⃗'}
      </text>

      {/* Resultant if requested */}
      {params.showResultant && (
        <>
          <line x1={uEnd.x} y1={uEnd.y} x2={rEnd.x} y2={rEnd.y} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1={vEnd.x} y1={vEnd.y} x2={rEnd.x} y2={rEnd.y} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1={originX} y1={originY} x2={rEnd.x} y2={rEnd.y} stroke="#4338ca" strokeWidth="2.5" markerEnd="url(#arrow-indigo)" />
          <text x={rEnd.x + 4} y={rEnd.y - 4} fontSize="12" fontWeight="bold" fill="#4338ca">u⃗ + v⃗</text>
        </>
      )}

      {/* Marker defs */}
      <defs>
        <marker id="arrow-teal" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0d9488" />
        </marker>
        <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706" />
        </marker>
        <marker id="arrow-indigo" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#4338ca" />
        </marker>
      </defs>
    </svg>
  );
};

// 4. Vector 3D Isometric View
const Vector3DDiagram: React.FC<{ params: any }> = ({ params }) => {
  const ox = 170;
  const oy = 140;

  return (
    <svg viewBox="0 0 350 240" className="w-full max-w-[390px] h-auto">
      {/* 3D coordinate axes */}
      {/* Z axis (up) */}
      <line x1={ox} y1={oy} x2={ox} y2={20} stroke="#475569" strokeWidth="2" />
      <text x={ox + 8} y={30} fontSize="11" fontWeight="bold" fill="#475569">Z</text>

      {/* X axis (isometric down-left) */}
      <line x1={ox} y1={oy} x2={50} y2={210} stroke="#475569" strokeWidth="2" />
      <text x={42} y={222} fontSize="11" fontWeight="bold" fill="#475569">X</text>

      {/* Y axis (isometric down-right) */}
      <line x1={ox} y1={oy} x2={300} y2={200} stroke="#475569" strokeWidth="2" />
      <text x={306} y={204} fontSize="11" fontWeight="bold" fill="#475569">Y</text>

      {/* Vector 3D */}
      <line x1={ox} y1={oy} x2={220} y2={60} stroke="#0d9488" strokeWidth="3" markerEnd="url(#arrow-3d)" />
      <circle cx="220" cy="60" r="4" fill="#0f766e" />
      <text x="230" y="65" fontSize="12" fontWeight="bold" fill="#0f766e">
        {params.label ?? 'a⃗ = (a₁, a₂, a₃)'}
      </text>

      {/* Projection dashed lines */}
      <line x1={220} y1={60} x2={220} y2={175} stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1={ox} y1={oy} x2={220} y2={175} stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />

      <defs>
        <marker id="arrow-3d" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#0d9488" />
        </marker>
      </defs>
    </svg>
  );
};

// 5. Function Graph (Polynomial, Rational, Trig, etc.)
const FunctionGraphDiagram: React.FC<{ params: any }> = ({ params }) => {
  const curveType = params.curveType ?? 'rational'; // 'rational', 'polynomial', 'trig'

  return (
    <svg viewBox="0 0 360 230" className="w-full max-w-[420px] h-auto">
      {/* Axes */}
      <line x1="20" y1="120" x2="340" y2="120" stroke="#64748b" strokeWidth="1.5" />
      <line x1="170" y1="15" x2="170" y2="215" stroke="#64748b" strokeWidth="1.5" />
      <text x="345" y="124" fontSize="11" fontWeight="bold" fill="#64748b">x</text>
      <text x="174" y="22" fontSize="11" fontWeight="bold" fill="#64748b">y</text>

      {curveType === 'rational' && (
        <>
          {/* Vertical Asymptote */}
          <line x1="130" y1="20" x2="130" y2="210" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="134" y="35" fontSize="10" fill="#e11d48">x = -1</text>

          {/* Horizontal Asymptote */}
          <line x1="20" y1="80" x2="340" y2="80" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="285" y="74" fontSize="10" fill="#e11d48">y = 2</text>

          {/* Rational branch 1 (x > -1) */}
          <path d="M 140 210 Q 150 95 330 85" fill="none" stroke="#0d9488" strokeWidth="2.5" />
          {/* Rational branch 2 (x < -1) */}
          <path d="M 30 75 Q 110 70 120 20" fill="none" stroke="#0d9488" strokeWidth="2.5" />
        </>
      )}

      {curveType === 'polynomial' && (
        <>
          {/* Degree 3 curve */}
          <path
            d="M 50 190 C 110 30, 140 220, 290 40"
            fill="none"
            stroke="#0d9488"
            strokeWidth="2.5"
          />
          {/* Critical points */}
          <circle cx="100" cy="80" r="3.5" fill="#d97706" />
          <text x="105" y="75" fontSize="10" fill="#b45309">Maksimum Lokal</text>
          <circle cx="170" cy="160" r="3.5" fill="#d97706" />
          <text x="175" y="175" fontSize="10" fill="#b45309">Minimum Lokal</text>
        </>
      )}

      {curveType === 'trig' && (
        <>
          {/* Sine wave */}
          <path
            d="M 40 120 Q 90 40 140 120 T 240 120 T 340 120"
            fill="none"
            stroke="#0d9488"
            strokeWidth="2.5"
          />
          <text x="135" y="45" fontSize="10" fill="#0f766e" fontWeight="bold">Amplitudo A</text>
          <line x1="90" y1="120" x2="90" y2="60" stroke="#0d9488" strokeDasharray="2 2" />
        </>
      )}
    </svg>
  );
};

// 6. Limit Graph (Approaching behavior, holes)
const LimitGraphDiagram: React.FC<{ params: any }> = ({ params }) => {
  return (
    <svg viewBox="0 0 350 210" className="w-full max-w-[400px] h-auto">
      <line x1="20" y1="140" x2="330" y2="140" stroke="#64748b" strokeWidth="1.5" />
      <line x1="80" y1="20" x2="80" y2="190" stroke="#64748b" strokeWidth="1.5" />
      <text x="335" y="144" fontSize="11" fontWeight="bold" fill="#64748b">x</text>
      <text x="85" y="24" fontSize="11" fontWeight="bold" fill="#64748b">y</text>

      {/* Target point c */}
      <line x1="200" y1="140" x2="200" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="80" y1="60" x2="200" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
      <text x="195" y="156" fontSize="11" fontWeight="bold" fill="#334155">x = {params.c ?? 'a'}</text>
      <text x="55" y="64" fontSize="11" fontWeight="bold" fill="#334155">L</text>

      {/* Smooth curve with hole at (200, 60) */}
      <path d="M 40 120 Q 140 90 196 62" fill="none" stroke="#0d9488" strokeWidth="2.5" />
      <path d="M 204 58 Q 250 45 310 30" fill="none" stroke="#0d9488" strokeWidth="2.5" />

      {/* Open circle hole */}
      <circle cx="200" cy="60" r="4.5" fill="#ffffff" stroke="#0d9488" strokeWidth="2.5" />

      {/* Arrows showing limit from left and right */}
      <path d="M 150 115 L 175 105" stroke="#d97706" strokeWidth="2" markerEnd="url(#lim-arr)" />
      <text x="125" y="128" fontSize="10" fill="#b45309">x → a⁻</text>

      <path d="M 255 42 L 230 48" stroke="#d97706" strokeWidth="2" markerEnd="url(#lim-arr)" />
      <text x="245" y="32" fontSize="10" fill="#b45309">x → a⁺</text>

      <defs>
        <marker id="lim-arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706" />
        </marker>
      </defs>
    </svg>
  );
};

// 7. Transformation Diagram (Reflection / Rotation / Dilatation)
const TransformationDiagram: React.FC<{ params: any }> = ({ params }) => {
  return (
    <svg viewBox="0 0 350 230" className="w-full max-w-[400px] h-auto">
      {/* Cartesian axes */}
      <line x1="20" y1="120" x2="330" y2="120" stroke="#64748b" strokeWidth="1.5" />
      <line x1="175" y1="20" x2="175" y2="210" stroke="#64748b" strokeWidth="1.5" />

      {/* Reflection line y = x if requested */}
      {params.lineEquation === 'y=x' && (
        <>
          <line x1="60" y1="210" x2="270" y2="20" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="275" y="25" fontSize="10" fontWeight="bold" fill="#d97706">Garis y = x</text>
        </>
      )}

      {/* Original Polygon / Triangle ABC */}
      <polygon points="195,95 240,60 220,110" fill="#99f6e4" stroke="#0f766e" strokeWidth="2" />
      <text x="185" y="90" fontSize="10" fontWeight="bold" fill="#0f766e">A</text>
      <text x="242" y="55" fontSize="10" fontWeight="bold" fill="#0f766e">B</text>
      <text x="225" y="118" fontSize="10" fontWeight="bold" fill="#0f766e">C</text>

      {/* Transformed Polygon A'B'C' */}
      <polygon points="150,140 115,185 165,165" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
      <text x="140" y="138" fontSize="10" fontWeight="bold" fill="#854d0e">A'</text>
      <text x="100" y="195" fontSize="10" fontWeight="bold" fill="#854d0e">B'</text>
      <text x="170" y="175" fontSize="10" fontWeight="bold" fill="#854d0e">C'</text>

      <text x="180" y="222" fontSize="10" fill="#64748b">Bayangan Hasil Transformasi</text>
    </svg>
  );
};

// 8. Matrix Grid Diagram
const MatrixGridDiagram: React.FC<{ params: any }> = ({ params }) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 font-mono text-sm">
      <div className="flex items-center gap-4">
        <div className="rounded-lg border-2 border-teal-600 bg-teal-50/50 p-3 shadow-inner">
          <div className="text-center font-bold text-teal-900 mb-1">{params.matrixName ?? 'Matriks A'}</div>
          <table className="border-collapse">
            <tbody>
              {params.rows?.map((row: any[], rIdx: number) => (
                <tr key={`r-${rIdx}`}>
                  {row.map((val, cIdx) => (
                    <td key={`c-${cIdx}`} className="px-3 py-1.5 text-center font-semibold text-slate-800">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {params.caption && <div className="mt-2 text-xs text-teal-800 font-sans italic">{params.caption}</div>}
    </div>
  );
};

export default MathDiagram;
