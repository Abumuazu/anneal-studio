import { Parallax } from '@studio/kit/motion';
import { CaseStage } from '@studio/kit/sections';

import { ExchangePortfolio } from '@/components/mockups/ExchangePortfolio';
import { ExchangeSwap } from '@/components/mockups/ExchangeSwap';
import { JewelleryInbox } from '@/components/mockups/JewelleryInbox';
import { JewelleryOffer } from '@/components/mockups/JewelleryOffer';
import { JewelleryProduct } from '@/components/mockups/JewelleryProduct';
import { JewellerySprite } from '@/components/mockups/JewellerySprite';
import { WispMeetings } from '@/components/mockups/WispMeetings';
import { WispOnboarding } from '@/components/mockups/WispOnboarding';
import { WispTranscript } from '@/components/mockups/WispTranscript';
import { phone } from '@/components/mockups/frames';
import { requireCase } from '@/content/cases';

// Hero stages, laid out as on the case boards. Phone sizes and parallax
// distances are the boards' (data-par).

export function WispStage() {
  return (
    <CaseStage
      background={requireCase('wisp').theme.stage}
      height={900}
      canvas={1100}
      fit={{ sm: 0.36, md: 0.66 }}
      className="flex items-center justify-center gap-14"
    >
      <Parallax distance={110} className="mt-[120px]">
        <WispMeetings size={phone(277, 577, 47, 0.66)} />
      </Parallax>
      <Parallax distance={-40} className="-mt-[60px]">
        <WispOnboarding size={phone(309, 645, 51, 0.74)} />
      </Parallax>
      <Parallax distance={180} className="mt-[200px]">
        <WispTranscript size={phone(277, 577, 47, 0.66)} />
      </Parallax>
    </CaseStage>
  );
}

export function ExchangeStage() {
  return (
    <CaseStage
      background={requireCase('naira-crypto-exchange').theme.stage}
      height={940}
      canvas={800}
      fit={{ sm: 0.46, md: 0.8 }}
      className="flex items-center justify-center gap-14"
    >
      <Parallax distance={-40} className="-mt-10">
        <ExchangePortfolio size={phone(324, 678, 54, 0.78)} />
      </Parallax>
      <Parallax distance={150} className="mt-40">
        <ExchangeSwap size={phone(293, 611, 49, 0.7)} />
      </Parallax>
    </CaseStage>
  );
}

export function JewelleryStage() {
  return (
    <>
      <JewellerySprite />
      <CaseStage
        background={requireCase('jewellery-marketplace').theme.stage}
        height={960}
        canvas={1400}
        fit={{ sm: 0.28, md: 0.5 }}
      >
        <Parallax distance={60} className="absolute top-[100px] left-[calc(50%-600px)]">
          <JewelleryProduct size={{ width: 792, height: 502, radius: 20, scale: 0.66 }} />
        </Parallax>
        <Parallax distance={200} className="absolute top-[250px] left-[calc(50%+250px)]">
          <JewelleryOffer size={phone(277, 577, 47, 0.66)} />
        </Parallax>
        <Parallax distance={120} className="absolute top-[420px] left-[calc(50%-680px)]">
          <JewelleryInbox size={phone(238, 493, 41, 0.56)} />
        </Parallax>
      </CaseStage>
    </>
  );
}
