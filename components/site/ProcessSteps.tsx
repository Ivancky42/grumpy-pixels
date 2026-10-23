import { IsoBox, IsoScene, IsoShadow, IsoTile } from "@/components/site/iso/Iso";
import { Reveal } from "@/components/site/Reveal";
import { iso, ISO_TILE_H, riseDelay } from "@/lib/iso";

export type ProcessStep = { title: string; description: string };

/** Every step's scene shares one frame so the blocks sit on a common baseline. */
const VIEW: [number, number] = [96, 88];
const ORIGIN: [number, number] = [48, 46];
const BOX = 2;
/** Block heights climb from MIN_H to MAX_H across the steps (a staircase). */
const MIN_H = 0.8;
const MAX_H = 2.6;

const blockHeight = (i: number, n: number) =>
  n > 1 ? MIN_H + ((MAX_H - MIN_H) * i) / (n - 1) : MIN_H;

/** Percent offset from the scene's bottom edge to the block's top vertex. */
const labelBottom = (h: number) => {
  const [, y] = iso([0, 0, ISO_TILE_H + h]);
  return ((VIEW[1] - (ORIGIN[1] + y)) / VIEW[1]) * 100;
};

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <Reveal>
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const h = blockHeight(i, steps.length);
          const last = i === steps.length - 1;
          return (
            <li key={step.title} className="relative">
              <div className="relative pt-8">
                {/* lg connector: from this block's ground centre to the next one's */}
                {!last && (
                  <span
                    aria-hidden
                    className="absolute top-[calc(2rem+58px)] left-12 hidden h-px w-[calc(100%+1.5rem)] bg-violet/30 lg:block"
                  />
                )}
                <div className="relative w-24">
                  <IsoScene viewBox={VIEW} origin={ORIGIN}>
                    <IsoTile at={[-0.5, -0.5, 0]} size={[3, 3]} />
                    <g className="rise-in" style={riseDelay(i * 140)}>
                      <IsoShadow at={[0, 0, ISO_TILE_H]} size={[BOX, BOX]} />
                      <IsoBox at={[0, 0, ISO_TILE_H]} size={[BOX, BOX, h]} tone="violet" />
                    </g>
                  </IsoScene>
                  <span
                    className="rise-in absolute left-1/2 -translate-x-1/2 pb-1 font-display text-lg leading-none font-bold text-violet"
                    style={{ bottom: `${labelBottom(h)}%`, ...riseDelay(i * 140) }}
                  >
                    {i + 1}
                  </span>
                </div>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{step.description}</p>
            </li>
          );
        })}
      </ol>
    </Reveal>
  );
}
