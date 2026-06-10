type Props = {
  children: string;
  className?: string;
};

/**
 * Blush-pink quip bubble used alongside the Mascot.
 * Keep quips short, lowercase grumble energy. One per screen, max.
 */
export function SpeechBubble({ children, className = "" }: Props) {
  return (
    <div className={`relative inline-block ${className}`} aria-hidden="true">
      <div className="rounded-2xl rounded-bl-sm border-2 border-navy bg-blush px-4 py-2 font-sans text-sm font-semibold text-navy shadow-soft">
        {children}
      </div>
      <div className="absolute -bottom-2 left-3 h-0 w-0 border-x-8 border-t-8 border-x-transparent border-t-navy" />
    </div>
  );
}
