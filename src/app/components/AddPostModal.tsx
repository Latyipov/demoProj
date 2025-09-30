"use client";

import { Fragment, useRef, useState } from "react";
import {
  Transition,
  Dialog,
  DialogTitle,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";

type AddPostModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; text: string; file: File | null }) => void;
};

export function AddPostModal({ open, onClose, onSubmit }: AddPostModalProps) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<{ title?: string; text?: string }>({});
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = "title is empty";
    if (!text.trim()) newErrors.text = "textarea is empty";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title: title.trim(),
      text: text.trim(),
      file: fileRef.current?.files?.[0] ?? null,
    });

    setTitle("");
    setText("");
    if (fileRef.current) fileRef.current.value = "";
    setErrors({});
    onClose();
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Overlay */}
        <TransitionChild as={Fragment}>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </TransitionChild>

        {/* Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild as={Fragment}>
            <DialogPanel
              className="w-[min(92vw,520px)] rounded-2xl shadow-2xl p-6"
              style={{
                background: "var(--card-bg)",
                color: "var(--text-secondary)",
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <DialogTitle
                  className="text-xl font-semibold"
                  style={{ color: "var(--text-main)" }}
                >
                  Add new post
                </DialogTitle>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg px-2 py-1 hover:bg-black/10 transition"
                  aria-label="close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-sm opacity-80">Title</span>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title"
                    className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                    style={{
                      background: "transparent",
                      color: "var(--text-main)",
                      borderColor: errors.title ? "#dc2626" : "black/10",
                    }}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </label>
                <label className="block">
                  <span className="text-sm opacity-80">Text</span>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="text"
                    rows={3}
                    className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 resize-none"
                    style={{
                      background: "transparent",
                      color: "var(--text-main)",
                      borderColor: errors.text ? "#dc2626" : "black/10",
                    }}
                  />
                  {errors.text && (
                    <p className="mt-1 text-sm text-red-600">{errors.text}</p>
                  )}
                </label>
                <label className="block">
                  <span className="text-sm opacity-80">File</span>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*,.pdf"
                    className="mt-1 block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:px-3 file:py-2 file:shadow file:cursor-pointer hover:file:shadow-md"
                    style={{ color: "var(--text-secondary)" }}
                  />
                </label>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl px-4 py-2 shadow hover:shadow-md transition"
                    style={{
                      background: "var(--card-bg)",
                      color: "var(--text-main)",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl px-4 py-2 shadow hover:shadow-md transition"
                    style={{
                      background: "var(--card-bg)",
                      color: "var(--text-main)",
                    }}
                  >
                    Save
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
