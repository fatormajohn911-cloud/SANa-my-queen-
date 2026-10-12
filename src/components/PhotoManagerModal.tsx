import React, { useRef } from 'react';
import { Camera, Upload, Trash2, X, Check, Image as ImageIcon, Sparkles } from 'lucide-react';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customPhotos: Record<string, string>;
  onUpdatePhoto: (id: string, url: string) => void;
  onResetPhotos: () => void;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
  isOpen,
  onClose,
  customPhotos,
  onUpdatePhoto,
  onResetPhotos,
}) => {
  const fileInputs = {
    'wa-0054': useRef<HTMLInputElement | null>(null),
    'wa-0050': useRef<HTMLInputElement | null>(null),
    'wa-0049': useRef<HTMLInputElement | null>(null),
  };

  if (!isOpen) return null;

  const handleFileChange = (id: 'wa-0054' | 'wa-0050' | 'wa-0049', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        if (result) {
          onUpdatePhoto(id, result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const slots = [
    {
      id: 'wa-0054' as const,
      filename: 'IMG-20261011-WA0054.jpg',
      label: "Sana's Radiant Portrait",
      defaultPath: './images/IMG-20261011-WA0054.jpg',
    },
    {
      id: 'wa-0050' as const,
      filename: 'IMG-20261011-WA0050.jpg',
      label: 'Deep Eyes & Modest Noor',
      defaultPath: './images/IMG-20261011-WA0050.jpg',
    },
    {
      id: 'wa-0049' as const,
      filename: 'IMG-20261011-WA0049.jpg',
      label: 'Mehndi & Gentle Grace',
      defaultPath: './images/IMG-20261011-WA0049.jpg',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-photos-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in text-left"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full rounded-3xl glass-panel border border-pink-500/40 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-pink-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-950 border border-pink-500/30 flex items-center justify-center text-pink-300">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 id="modal-photos-title" className="text-xl font-serif font-bold text-white">
                Sana's Real Photos Manager
              </h3>
              <p className="text-xs text-pink-300">
                Preserve Sana's real face, natural skin tone & original photos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 mb-6 leading-relaxed font-light">
          Your uploaded WhatsApp photos are connected to this website. You can also upload or swap high-resolution camera originals from your phone or device right now:
        </p>

        <div className="space-y-4">
          {slots.map((slot) => {
            const currentSrc = customPhotos[slot.id] || slot.defaultPath;
            const isCustom = Boolean(customPhotos[slot.id]);

            return (
              <div
                key={slot.id}
                className="p-3.5 rounded-2xl bg-black/40 border border-pink-500/20 flex items-center gap-4"
              >
                <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-900 border border-amber-300/30 shrink-0">
                  <img
                    src={currentSrc}
                    alt={slot.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-amber-200 truncate">
                      {slot.label}
                    </span>
                    {isCustom && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
                        Active
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 block truncate">
                    {slot.filename}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => fileInputs[slot.id].current?.click()}
                      className="px-3 py-1 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors min-h-[36px]"
                    >
                      <Upload className="w-3 h-3" />
                      <span>{isCustom ? 'Replace Photo' : 'Upload From Phone'}</span>
                    </button>
                    <input
                      ref={fileInputs[slot.id]}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(slot.id, e)}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-pink-500/20 flex items-center justify-between">
          <button
            onClick={onResetPhotos}
            className="text-xs text-rose-300 hover:text-rose-200 flex items-center gap-1 min-h-[44px]"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset To Default Bundled Assets</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white text-xs font-semibold shadow-lg min-h-[44px]"
          >
            Save & View
          </button>
        </div>
      </div>
    </div>
  );
};
