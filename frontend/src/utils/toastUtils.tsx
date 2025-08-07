import { Info } from "lucide-react";
import toast from "react-hot-toast";

export const comingSoonToast = () => {
  toast.custom((t) => (
    <div
      className={`max-w-xs w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 
        text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 transform transition-all 
        ${t.visible ? "animate-enter" : "animate-leave"}`}
    >
      <Info className="w-5 h-5 flex-shrink-0" />
      <span className="text-sm font-medium">🚀 This feature is coming soon!</span>
    </div>
  ), {
    duration: 2000
  });
};

