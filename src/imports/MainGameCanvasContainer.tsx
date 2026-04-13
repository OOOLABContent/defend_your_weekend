import svgPaths from "./svg-ygh4k7cbo4";
import imgFuturisticServerRoomBackground from "figma:asset/c256faa93e00614f3231d342c9f27c5ce28dc124.png";

function FuturisticServerRoomBackground() {
  return (
    <div className="absolute inset-0 opacity-10" data-name="futuristic server room background">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[177.78%] left-0 max-w-none top-[-38.89%] w-full" src={imgFuturisticServerRoomBackground} />
        </div>
        <div className="absolute bg-white inset-0 mix-blend-saturation" />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e4e1e8] text-[10px] tracking-[1px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Active Operations</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-white whitespace-nowrap">
        <p className="text-[48px]">
          <span className="leading-[48px] text-white">98.4</span>
          <span className="leading-[48px] text-[#ff0082]">%</span>
        </p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ff0082] text-[10px] tracking-[-0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Current Uptime</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative self-stretch shrink-0 w-[148px]" data-name="Container">
      <Container1 />
      <Heading />
      <Container2 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-end mb-[-0.5px] pt-px relative shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-right text-white whitespace-nowrap">
        <p className="leading-[48px]">04,280</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-end pb-[0.5px] relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] mb-[-0.5px] not-italic relative shrink-0 text-[#e4e1e8] text-[10px] text-right tracking-[1px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">System Integrity</p>
      </div>
      <Heading1 />
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] mb-[-0.5px] not-italic relative shrink-0 text-[#ff0082] text-[10px] text-right tracking-[-0.5px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Points Secured</p>
      </div>
    </div>
  );
}

function HudTopStats() {
  return (
    <div className="absolute content-stretch flex h-[86px] items-start justify-between left-[32px] right-[32px] top-[32px]" data-name="HUD: Top Stats">
      <Container />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">Active Tasks</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ff0082] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">04</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative size-full">
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e4e1e8] text-[10px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Legacy Migration</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e4e1e8] text-[10px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">72%</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[15px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] h-[4px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Overlay">
      <div className="absolute bg-[#ff0082] inset-[0_28%_0_0]" data-name="Background" />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Overlay />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e4e1e8] text-[10px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">DDoS Mitigation</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e4e1e8] text-[10px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">45%</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[15px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] h-[4px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Overlay">
      <div className="absolute bg-[#ff0082] inset-[0_55%_0_0]" data-name="Background" />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Container13 />
      <Overlay1 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e4e1e8] text-[10px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Kernel Patching</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e4e1e8] text-[10px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">12%</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex h-[15px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container18 />
      <Container19 />
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] h-[4px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Overlay">
      <div className="absolute bg-[#ff0082] inset-[0_88%_0_0]" data-name="Background" />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Overlay2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative w-full">
        <Container8 />
        <Container12 />
        <Container16 />
      </div>
    </div>
  );
}

function OverlayVerticalBorderOverlayBlur() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(255,255,255,0.05)] relative shrink-0 w-full" data-name="Overlay+VerticalBorder+OverlayBlur">
      <div aria-hidden="true" className="absolute border-[rgba(255,0,130,0.3)] border-l-2 border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pl-[18px] pr-[16px] py-[16px] relative w-full">
        <Container4 />
        <Container7 />
      </div>
    </div>
  );
}

function HudSidebarTasksRight() {
  return (
    <div className="absolute content-stretch flex flex-col items-start right-[32px] top-[128px] w-[288px]" data-name="HUD: Sidebar Tasks (Right)">
      <OverlayVerticalBorderOverlayBlur />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[44px] relative w-[36px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 44">
        <g id="Icon">
          <path d={svgPaths.p1b087000} fill="var(--fill-0, #FF0082)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <Icon />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white tracking-[-0.5px] uppercase whitespace-nowrap">
          <p className="leading-[15px]">System Bug</p>
        </div>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#ff0082] right-[0.86px] rounded-[4px] top-[-3px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[6px] py-[2px] relative">
        <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-white whitespace-nowrap">
          <p className="leading-[12px]">CRITICAL</p>
        </div>
      </div>
    </div>
  );
}

function BorderOverlayBlur() {
  return (
    <div className="backdrop-blur-[2px] relative rounded-[4px] shrink-0 w-full" data-name="Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center pb-[25px] pt-[23px] px-[25px] relative w-full">
          <Container20 />
          <Container21 />
          <Background />
        </div>
      </div>
    </div>
  );
}

function Target1SystemBug() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[21.94%_72.97%_64.1%_19.38%] items-start" data-name="Target 1: System Bug">
      <BorderOverlayBlur />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[44px] relative w-[36px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 44">
        <g id="Icon">
          <path d={svgPaths.p23554200} fill="var(--fill-0, #FF0082)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <Icon1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="min-w-[85.5199966430664px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start min-w-[inherit] relative">
        <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white tracking-[-0.5px] uppercase whitespace-nowrap">
          <p className="leading-[15px]">Security Threat</p>
        </div>
      </div>
    </div>
  );
}

function BorderOverlayBlur1() {
  return (
    <div className="backdrop-blur-[2px] relative rounded-[4px] shrink-0 w-full" data-name="Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center pb-[25px] pt-[23px] px-[25px] relative w-full">
          <Container22 />
          <Container23 />
        </div>
      </div>
    </div>
  );
}

function Target2SecurityThreat() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[38.02%_24.7%_48.02%_65.88%] items-start" data-name="Target 2: Security Threat">
      <BorderOverlayBlur1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[44px] relative w-[36px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 44">
        <g id="Icon">
          <path d={svgPaths.p1d749e80} fill="var(--fill-0, #E4E1E8)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <Icon2 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white tracking-[-0.5px] uppercase whitespace-nowrap">
          <p className="leading-[15px]">Legacy Code</p>
        </div>
      </div>
    </div>
  );
}

function BorderOverlayBlur2() {
  return (
    <div className="backdrop-blur-[2px] relative rounded-[4px] shrink-0 w-full" data-name="Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center pb-[25px] pt-[23px] px-[25px] relative w-full">
          <Container24 />
          <Container25 />
        </div>
      </div>
    </div>
  );
}

function Target3LegacyCode() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[53.02%_55.94%_33.02%_35.94%] items-start" data-name="Target 3: Legacy Code">
      <BorderOverlayBlur2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[44px] relative w-[36px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 44">
        <g id="Icon">
          <path d={svgPaths.p28be8780} fill="var(--fill-0, #FF0082)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex items-center justify-center relative shrink-0">
          <div className="-scale-y-100 flex-none">
            <Icon3 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white tracking-[-0.5px] uppercase whitespace-nowrap">
          <p className="leading-[15px]">Bottleneck</p>
        </div>
      </div>
    </div>
  );
}

function BorderOverlayBlur3() {
  return (
    <div className="backdrop-blur-[2px] relative rounded-[4px] shrink-0 w-full" data-name="Border+OverlayBlur">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center pb-[25px] pt-[23px] px-[25px] relative w-full">
          <Container26 />
          <Container27 />
        </div>
      </div>
    </div>
  );
}

function Target4Bottleneck() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[8.02%_38.92%_78.02%_53.24%] items-start" data-name="Target 4: Bottleneck">
      <BorderOverlayBlur3 />
    </div>
  );
}

function CentralCrosshair() {
  return (
    <div className="relative shrink-0 size-[96px]" data-name="Central Crosshair">
      <div className="absolute border-2 border-[#ff0082] border-solid inset-0 opacity-40 rounded-[9999px]" data-name="Border" />
      <div className="-translate-y-1/2 absolute bg-[#ff0082] h-[2px] left-0 right-0 top-1/2" data-name="Horizontal Divider" />
      <div className="-translate-x-1/2 absolute bg-[#ff0082] bottom-0 left-1/2 top-0 w-[2px]" data-name="Vertical Divider" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#ff0082] left-1/2 rounded-[9999px] shadow-[0px_0px_15px_0px_#ff0082] size-[8px] top-1/2" data-name="Background+Shadow" />
      <div className="absolute border-[#ff0082] border-l-2 border-solid border-t-2 left-0 size-[16px] top-0" data-name="Border" />
      <div className="absolute border-[#ff0082] border-r-2 border-solid border-t-2 right-0 size-[16px] top-0" data-name="Border" />
      <div className="absolute border-[#ff0082] border-b-2 border-l-2 border-solid bottom-0 left-0 size-[16px]" data-name="Border" />
      <div className="absolute border-[#ff0082] border-b-2 border-r-2 border-solid bottom-0 right-0 size-[16px]" data-name="Border" />
    </div>
  );
}

function GameplayArea() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-center min-h-px min-w-px relative" data-name="Gameplay Area">
      <Target1SystemBug />
      <Target2SecurityThreat />
      <Target3LegacyCode />
      <Target4Bottleneck />
      <CentralCrosshair />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e4e1e8] text-[8px] tracking-[0.8px] uppercase whitespace-nowrap">
        <p className="leading-[8px]">Architecture Node</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">
        <p className="leading-[18px]">NX-9000-GLB</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[122px]" data-name="Container">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e4e1e8] text-[8px] tracking-[0.8px] uppercase whitespace-nowrap">
        <p className="leading-[8px]">Sector Authority</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-white whitespace-nowrap">
        <p className="leading-[18px]">EMEA-HUB-01</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-[123px]" data-name="Container">
      <Container33 />
      <Container34 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[32px] items-end relative shrink-0" data-name="Container">
      <Container29 />
      <div className="bg-[rgba(228,225,232,0.2)] h-[32px] shrink-0 w-px" data-name="Vertical Divider" />
      <Container32 />
    </div>
  );
}

function CornerIdentityBranding() {
  return (
    <div className="absolute bottom-[64px] content-stretch flex flex-col items-start left-[32px]" data-name="Corner Identity Branding">
      <Container28 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[15.989px] relative w-[14.01px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.01 15.9886">
        <g id="Icon">
          <path d={svgPaths.p38290e40} fill="var(--fill-0, #FF0082)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start py-[2px] relative shrink-0" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <Icon4 />
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[182.16000366210938px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[5.6px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">Your Weekend</p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[15.989px] relative w-[14.01px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.01 15.9886">
        <g id="Icon">
          <path d={svgPaths.p38290e40} fill="var(--fill-0, #FF0082)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start py-[2px] relative shrink-0" data-name="Container">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <Icon5 />
        </div>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[107.27999877929688px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e4e1e8] text-[10px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">Failure Threshold</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#ba1a1a] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">
        <p className="leading-[15px]">HIGH RISK</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center right-[36.83px] top-[12.5px]" data-name="Container">
      <Container39 />
      <Background1 />
    </div>
  );
}

function OverlayOverlayBlur() {
  return (
    <div className="backdrop-blur-[12px] bg-[rgba(27,27,32,0.8)] content-stretch flex gap-[16px] items-center justify-center py-[12px] relative shrink-0 w-full" data-name="Overlay+OverlayBlur">
      <Container35 />
      <Container36 />
      <Container37 />
      <Container38 />
    </div>
  );
}

function HudBottomWarningLineYourWeekend() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 right-0" data-name="HUD: Bottom Warning Line (YOUR WEEKEND)">
      <div className="bg-gradient-to-r from-[rgba(255,0,130,0)] h-[4px] opacity-80 shadow-[0px_0px_20px_0px_#ff0082] shrink-0 to-[rgba(255,0,130,0)] via-1/2 via-[#ff0082] w-full" data-name="Gradient+Shadow" />
      <OverlayOverlayBlur />
    </div>
  );
}

export default function MainGameCanvasContainer() {
  return (
    <div className="bg-[#1b1b20] content-stretch flex items-center justify-center relative shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] size-full" data-name="Main Game Canvas Container">
      <div className="absolute inset-0 opacity-20" data-name="Game Background (Data Center Blueprint)" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1920 1080\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(135.76 0 0 76.368 960 540)\\'><stop stop-color=\\'rgba(255,0,130,1)\\' offset=\\'0.017678\\'/><stop stop-color=\\'rgba(255,0,130,0)\\' offset=\\'0.017678\\'/></radialGradient></defs></svg>')" }} />
      <FuturisticServerRoomBackground />
      <HudTopStats />
      <HudSidebarTasksRight />
      <GameplayArea />
      <CornerIdentityBranding />
      <HudBottomWarningLineYourWeekend />
    </div>
  );
}