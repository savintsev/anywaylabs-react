export const randomEmoji = (): string => {
  const items = ['❤️', '🥺', '✨', '🔥', '😂', '🥰', '😊', '🥲', '🐻', '🍔', '⚽', '🌇', '💡', '🔣', '🎌'];

  return items[Math.floor(Math.random() * items.length)];
};

export const randomDate = (from: Date, to: Date): Date => {
  return new Date(
    from.getTime() + Math.random() * (to.getTime() - from.getTime())
  );
};

export const randomBoolean = (): boolean => Math.random() < 0.5;

export default {
  randomEmoji,
  randomDate,
  randomBoolean,
};
