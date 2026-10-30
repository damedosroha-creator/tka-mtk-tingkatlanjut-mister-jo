import React from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-teal-950/70 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-rose-100 pb-3">
          <div className="flex items-center gap-2.5 text-rose-700">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100">
              <AlertTriangle className="h-5 w-5 text-rose-600" />
            </div>
            <h3 className="font-bold text-base text-rose-950">Konfirmasi Reset Progres</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="py-4 text-sm text-slate-700 leading-relaxed">
          <p className="font-medium text-slate-900 mb-2">
            Apakah Anda yakin ingin mereset seluruh progres belajar?
          </p>
          <p className="text-slate-600 text-xs">
            Tindakan ini akan menghapus semua jawaban yang telah Anda pilih, penilaian skor, status penandaan soal (bookmark), dan mengembalikan aplikasi ke kondisi awal seperti baru pertama kali dibuka.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Batal
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-rose-700 transition"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Ya, Reset Seluruh Progres</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetModal;
