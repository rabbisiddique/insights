import { Flame, Frown, Heart, Meh, Smile } from "lucide-react";

export const useMood = () => {
  const getMoodIcon = (mood) => {
    switch (mood?.toLowerCase()) {
      case "happy":
        return (
          <Smile className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
        );
      case "over the moon":
        return <Heart className="w-4 h-4 text-pink-500 dark:text-pink-400" />;
      case "sad":
        return <Frown className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
      case "heartbreaking":
        return <Frown className="w-4 h-4 text-red-500 dark:text-red-400" />;
      case "angry":
        return (
          <Flame className="w-4 h-4 text-orange-500 dark:text-orange-400" />
        );
      default:
        return <Meh className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
    }
  };
  return { getMoodIcon };
};
