'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  initialImages?: string[];
  onChange: (remainingImages: string[], newFiles: File[]) => void;
  maxFiles?: number;
}

export default function ImageUpload({ initialImages = [], onChange, maxFiles = 5 }: ImageUploadProps) {
  const [existingImages, setExistingImages] = useState<string[]>(initialImages);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Sync with initialImages when they change (e.g., after fetch)
  useEffect(() => {
    // Only update if the content actually differs
    if (JSON.stringify(initialImages) !== JSON.stringify(existingImages)) {
      setExistingImages(initialImages);
    }
  }, [initialImages, existingImages]);

  // Update parent whenever images change
  useEffect(() => {
    onChangeRef.current(existingImages, newFiles);
  }, [existingImages, newFiles]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentTotal = existingImages.length + newFiles.length;
    if (currentTotal + files.length > maxFiles) {
      toast.error(`Total images cannot exceed ${maxFiles}.`);
      return;
    }

    const addedFiles: File[] = [];
    const addedPreviews: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image.`);
        continue;
      }
      addedFiles.push(file);
      addedPreviews.push(URL.createObjectURL(file));
    }

    setNewFiles([...newFiles, ...addedFiles]);
    setPreviews([...previews, ...addedPreviews]);
    
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeExisting = (index: number) => {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);
  };

  const removeNew = (index: number) => {
    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(previews[index]);
    
    const updatedFiles = [...newFiles];
    const updatedPreviews = [...previews];
    
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setNewFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Existing Images */}
        {existingImages.map((url, index) => (
          <div key={`existing-${index}`} className="relative w-32 h-32 rounded-2xl overflow-hidden border border-neutral-200 shadow-sm group bg-neutral-100">
            <img src={url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${url}` : url} alt="Existing" className="w-full h-full object-cover" />
            <button
               type="button"
               onClick={() => removeExisting(index)}
               className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-neutral-900/60 py-1 text-[8px] font-black text-white text-center uppercase tracking-tighter">Existing</div>
          </div>
        ))}

        {/* New Previews */}
        {previews.map((url, index) => (
          <div key={`new-${index}`} className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary-500 shadow-xl group bg-neutral-100">
            <img src={url} alt="New Upload" className="w-full h-full object-cover" />
            <button
               type="button"
               onClick={() => removeNew(index)}
               className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-primary-600 py-1 text-[8px] font-black text-white text-center uppercase tracking-tighter">New Asset</div>
          </div>
        ))}
        
        {existingImages.length + newFiles.length < maxFiles && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 rounded-2xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center gap-2 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-neutral-400 hover:text-emerald-600 group"
          >
            <Upload className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Add Node</span>
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/*"
        className="hidden"
      />
      
      <div className="flex items-center justify-between">
         <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
            <ImageIcon className="w-3.5 h-3.5" /> Multimedia Synchronization Protocol ({existingImages.length + newFiles.length}/{maxFiles})
         </p>
      </div>
    </div>
  );
}
