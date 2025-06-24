"use client";
import { useState, useEffect, useReducer } from "react";
import Image from "next/image";
import { storyReducer } from "@/app/reducer/storyReducer";
import StoryModal from "../app/fullScreen/fullScreen";
export default function Home() {
  const [stories, dispatch] = useReducer(storyReducer, []);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // load stories from localStorage on
  useEffect(() => {
    const saved = localStorage.getItem("stories");
    if (saved) {
      dispatch({ type: "SET", payload: JSON.parse(saved) });
    }
  }, []);

  // save stories to localStorage
  useEffect(() => {
    localStorage.setItem("stories", JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    if (currentIndex === null) return;

    const timer = setTimeout(() => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(null); // Close modal after last story
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex, stories.length]);

  // add story as base64
  const AddStory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      dispatch({ type: "ADD", payload: base64 });
    };
    reader.readAsDataURL(file);
  };

  // open story modal by index
  const openStory = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <nav className="w-full flex items-center justify-center py-4 ">
        <div className="w-full text-lg font-semibold border border-black h-[80px] flex overflow-x-auto items-center gap-3 px-3">
          {/* Add story button */}
          <label className="w-16 h-16 rounded-full border-2 border-gray-400 flex items-center justify-center cursor-pointer shrink-0">
            <span className="text-2xl font-bold text-gray-600">+</span>
            <input
              type="file"
              className="hidden"
              onChange={AddStory}
              accept="image/*"
            />
          </label>

          {/* Stories thumbnails */}
          {stories.map((story, i) => (
            <div
              key={i}
              onClick={() => openStory(i)}
              className="w-16 h-16 rounded-full border-2 border-pink-500 overflow-hidden shrink-0 cursor-pointer"
            >
              <Image
                width={64}
                height={64}
                src={story}
                alt={`story ${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </nav>

      {/* fullscreen story viewer */}
      <StoryModal
        currentIndex={currentIndex}
        stories={stories}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}
