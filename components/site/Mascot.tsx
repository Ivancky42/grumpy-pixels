import Image from "next/image";

type Props = {
  variant?: "grumpy" | "approving";
  /** Rendered height in px; width scales automatically */
  size?: number;
  className?: string;
  priority?: boolean;
};

const sprites = {
  grumpy: {
    src: "/brand/mascot.png",
    width: 358,
    height: 640,
    alt: "Pixel, the Grumpy Pixels mascot, arms crossed and unimpressed",
  },
  approving: {
    src: "/brand/mascot-approving.png",
    width: 344,
    height: 640,
    alt: "Pixel, the Grumpy Pixels mascot, with a rare approving smile",
  },
} as const;

export function Mascot({
  variant = "grumpy",
  size = 160,
  className = "",
  priority = false,
}: Props) {
  const sprite = sprites[variant];
  const width = Math.round((sprite.width / sprite.height) * size);
  return (
    <Image
      src={sprite.src}
      alt={sprite.alt}
      width={width}
      height={size}
      priority={priority}
      className={`pixelated ${className}`}
    />
  );
}
