"use client";
import { Story } from "@/app/page";

import Image from "next/image";

type StoryModalProps = {
  currentIndex: number | null;
  stories: Story[];
  setCurrentIndex: (index: number | null) => void;
};
function formatTime(timestamp: number) {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default function StoryModal({
  currentIndex,
  stories,
  setCurrentIndex,
}: StoryModalProps) {
  if (currentIndex === null) return null;
  const story = stories[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
      <div className=" flex flex-col relative w-[90%] md:w-[400px] h-[60vh] bg-white rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
        {/* progress bar */}
        <div className="p-2 text-center text-xs text-black mt-px">
          {formatTime(story.createdAt)}
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-300 z-10">
          <div
            key={currentIndex}
            className="h-full bg-red-500"
            style={{
              width: "0%",
              animation: "fillBar 3s linear forwards",
            }}
          />
        </div>

        {/* close button */}
        <button
          onClick={() => setCurrentIndex(null)}
          className="absolute top-3 right-3 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:bg-gray-800 transition"
        >
          ×
        </button>

        {/* prev arrow */}
        {currentIndex > 0 && (
          <button
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center text-3xl hover:bg-gray-800 transition"
          >
            ‹
          </button>
        )}

        {/* next arrow */}
        {currentIndex < stories.length - 1 && (
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center text-3xl hover:bg-gray-800 transition"
          >
            ›
          </button>
        )}

        {/* story image */}
        <Image
          src={stories[currentIndex].image}
          width={400}
          height={600}
          alt={`story ${currentIndex}`}
          className="object-cover"
        />
      </div>
    </div>
  );
}
