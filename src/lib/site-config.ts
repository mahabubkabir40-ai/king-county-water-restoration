export const SITE_CONFIG = {
  brandName: "King County Water Restoration",
  domain: "https://kingcountywaterrestoration.com",
  hostname: "kingcountywaterrestoration.com",
  phoneDisplay: "(425) 675-3040",
  phoneHref: "tel:+14256753040",
  phoneE164: "+14256753040",
  /**
   * Controls whether `/locations/[slug]` routes are built and linked:
   * 1 = Wave 1 launch (9 fast-rank foothill & valley cities; 19 total pages)
   */
  LIVE_LOCATION_WAVE: 1 as const,
  disclosureShort:
    "Free 24/7 referral service. We connect homeowners with independent local water damage restoration companies. We are not the contractor.",
  disclosureBadge: "24/7 Free Referral Line • King County, WA",
};

export interface ServiceItem {
  pageId: string;
  slug: string;
  fileName: string;
  shortTitle: string;
  navTitle: string;
  description: string;
  urgencyTag: string;
}

export const SERVICES: ServiceItem[] = [
  {
    pageId: "P02",
    slug: "emergency-water-extraction",
    fileName: "P02-emergency-water-extraction.md",
    shortTitle: "Emergency Water Extraction",
    navTitle: "Emergency Water Extraction",
    description:
      "High-volume pumping and extraction of standing water from carpet, hardwood, basements, and lower levels.",
    urgencyTag: "Standing Water",
  },
  {
    pageId: "P03",
    slug: "crawlspace-basement-flood-cleanup",
    fileName: "P03-crawlspace-basement-flood-cleanup.md",
    shortTitle: "Crawl Space & Basement Floods",
    navTitle: "Crawl Space & Basement Flood Cleanup",
    description:
      "Crawl space water pumping, soaked insulation removal, vapor barrier replacement, and daylight basement drying.",
    urgencyTag: "Sump & Groundwater",
  },
  {
    pageId: "P04",
    slug: "burst-frozen-pipe-water-cleanup",
    fileName: "P04-burst-frozen-pipe-water-cleanup.md",
    shortTitle: "Burst & Frozen Pipe Cleanup",
    navTitle: "Burst & Frozen Pipe Cleanup",
    description:
      "Rapid water removal and wall/ceiling drying after frozen plumbing splits, supply-line breaks, or water heater failures.",
    urgencyTag: "Plumbing Leaks",
  },
  {
    pageId: "P05",
    slug: "sewage-backup-black-water-cleanup",
    fileName: "P05-sewage-backup-black-water-cleanup.md",
    shortTitle: "Sewage Backup Cleanup",
    navTitle: "Sewage & Black Water Cleanup",
    description:
      "Safe Category 3 black-water extraction, porous material removal, antimicrobial disinfection, and HEPA odor control.",
    urgencyTag: "Category 3 Hazard",
  },
  {
    pageId: "P06",
    slug: "structural-drying-dehumidification",
    fileName: "P06-structural-drying-dehumidification.md",
    shortTitle: "Structural Drying & Dehumidification",
    navTitle: "Structural Drying & Dehumidification",
    description:
      "Commercial LGR dehumidifiers, air movers, floor drying mats, and daily moisture logs for subfloors and framing.",
    urgencyTag: "Save Floors & Walls",
  },
  {
    pageId: "P07",
    slug: "moisture-inspection-mold-prevention",
    fileName: "P07-moisture-inspection-mold-prevention.md",
    shortTitle: "Moisture Inspection & Mold Prevention",
    navTitle: "Moisture Inspection & Mold Prevention",
    description:
      "FLIR thermal imaging and moisture meters to locate hidden water behind walls and subfloors within the 24–48 hour window.",
    urgencyTag: "24–48 Hr Window",
  },
];

export interface LocationItem {
  pageId: string;
  slug: string;
  fileName: string;
  cityName: string;
  displayName: string;
  corridor: "Snoqualmie Valley & Foothills" | "Southeast King County";
  zips: string[];
  wave: 1;
}

export const LOCATIONS: LocationItem[] = [
  {
    pageId: "P08",
    slug: "duvall-wa",
    fileName: "P08-duvall-wa.md",
    cityName: "Duvall",
    displayName: "Duvall, WA",
    corridor: "Snoqualmie Valley & Foothills",
    zips: ["98019"],
    wave: 1,
  },
  {
    pageId: "P09",
    slug: "carnation-wa",
    fileName: "P09-carnation-wa.md",
    cityName: "Carnation",
    displayName: "Carnation, WA",
    corridor: "Snoqualmie Valley & Foothills",
    zips: ["98014"],
    wave: 1,
  },
  {
    pageId: "P10",
    slug: "fall-city-wa",
    fileName: "P10-fall-city-wa.md",
    cityName: "Fall City",
    displayName: "Fall City, WA",
    corridor: "Snoqualmie Valley & Foothills",
    zips: ["98024"],
    wave: 1,
  },
  {
    pageId: "P11",
    slug: "snoqualmie-wa",
    fileName: "P11-snoqualmie-wa.md",
    cityName: "Snoqualmie",
    displayName: "Snoqualmie & Pass, WA",
    corridor: "Snoqualmie Valley & Foothills",
    zips: ["98065", "98068"],
    wave: 1,
  },
  {
    pageId: "P12",
    slug: "north-bend-wa",
    fileName: "P12-north-bend-wa.md",
    cityName: "North Bend",
    displayName: "North Bend, WA",
    corridor: "Snoqualmie Valley & Foothills",
    zips: ["98045", "98224", "98288"],
    wave: 1,
  },
  {
    pageId: "P13",
    slug: "maple-valley-wa",
    fileName: "P13-maple-valley-wa.md",
    cityName: "Maple Valley",
    displayName: "Maple Valley, WA",
    corridor: "Southeast King County",
    zips: ["98038"],
    wave: 1,
  },
  {
    pageId: "P14",
    slug: "enumclaw-wa",
    fileName: "P14-enumclaw-wa.md",
    cityName: "Enumclaw",
    displayName: "Enumclaw, WA",
    corridor: "Southeast King County",
    zips: ["98022"],
    wave: 1,
  },
  {
    pageId: "P15",
    slug: "black-diamond-wa",
    fileName: "P15-black-diamond-wa.md",
    cityName: "Black Diamond",
    displayName: "Black Diamond, WA",
    corridor: "Southeast King County",
    zips: ["98010"],
    wave: 1,
  },
  {
    pageId: "P16",
    slug: "ravensdale-hobart-wa",
    fileName: "P16-ravensdale-hobart-wa.md",
    cityName: "Ravensdale & Hobart",
    displayName: "Ravensdale & Hobart, WA",
    corridor: "Southeast King County",
    zips: ["98051", "98025"],
    wave: 1,
  },
];

export interface ZipEntry {
  city: string;
  corridor: string;
  locationSlug: string;
}

export const KING_COUNTY_ZIPS: Record<string, ZipEntry> = {
  "98010": {
    city: "Black Diamond",
    corridor: "Southeast King County",
    locationSlug: "black-diamond-wa",
  },
  "98014": {
    city: "Carnation",
    corridor: "Snoqualmie Valley & Foothills",
    locationSlug: "carnation-wa",
  },
  "98019": {
    city: "Duvall",
    corridor: "Snoqualmie Valley & Foothills",
    locationSlug: "duvall-wa",
  },
  "98022": {
    city: "Enumclaw",
    corridor: "Southeast King County",
    locationSlug: "enumclaw-wa",
  },
  "98024": {
    city: "Fall City",
    corridor: "Snoqualmie Valley & Foothills",
    locationSlug: "fall-city-wa",
  },
  "98025": {
    city: "Hobart",
    corridor: "Southeast King County",
    locationSlug: "ravensdale-hobart-wa",
  },
  "98038": {
    city: "Maple Valley",
    corridor: "Southeast King County",
    locationSlug: "maple-valley-wa",
  },
  "98045": {
    city: "North Bend",
    corridor: "Snoqualmie Valley & Foothills",
    locationSlug: "north-bend-wa",
  },
  "98051": {
    city: "Ravensdale",
    corridor: "Southeast King County",
    locationSlug: "ravensdale-hobart-wa",
  },
  "98065": {
    city: "Snoqualmie",
    corridor: "Snoqualmie Valley & Foothills",
    locationSlug: "snoqualmie-wa",
  },
  "98068": {
    city: "Snoqualmie Pass",
    corridor: "Snoqualmie Valley & Foothills",
    locationSlug: "snoqualmie-wa",
  },
  "98224": {
    city: "Baring",
    corridor: "Snoqualmie Valley & Foothills",
    locationSlug: "north-bend-wa",
  },
  "98288": {
    city: "Skykomish",
    corridor: "Snoqualmie Valley & Foothills",
    locationSlug: "north-bend-wa",
  },
};

export function isLocationPageLive(slug: string): boolean {
  return LOCATIONS.some((l) => l.slug === slug);
}

export interface PageImageItem {
  src: string;
  alt: string;
  caption: string;
}

export const PAGE_IMAGES: Record<
  string,
  [PageImageItem, PageImageItem, PageImageItem]
> = {
  P01: [
    {
      src: "/images/water-extraction-wand.jpg",
      alt: "Commercial water extraction wand removing standing water from carpet in a King County, WA home",
      caption:
        "High-volume water extraction pulls standing water out of carpet and subfloors before structural drying starts.",
    },
    {
      src: "/images/crawlspace-submersible-pump.jpg",
      alt: "Submersible pump draining groundwater from a King County crawl space vapor barrier",
      caption:
        "Submersible pumping removes winter groundwater from residential crawl spaces across King County river valleys.",
    },
    {
      src: "/images/pnw-valley-rain-home.jpg",
      alt: "Rain-soaked suburban home in the King County foothills during an atmospheric river storm",
      caption:
        "Back-to-back winter storms across King County's valleys and foothills make fast water mitigation essential.",
    },
  ],
  P02: [
    {
      src: "/images/water-extraction-wand.jpg",
      alt: "Commercial stainless-steel extraction wand removing standing water from soaked living room carpet in King County, WA",
      caption:
        "Truck-mounted and portable extraction wands pull far more water out of carpet and pad than a household shop vac.",
    },
    {
      src: "/images/daylight-basement-drying.jpg",
      alt: "Air movers and commercial dehumidifier drying a flooded King County daylight basement after extraction",
      caption:
        "Once standing water is extracted, commercial air movers and dehumidifiers stabilize indoor humidity.",
    },
    {
      src: "/images/thermal-moisture-meter.jpg",
      alt: "Technician using thermal imaging camera and moisture meter to map water damage behind drywall",
      caption:
        "Moisture meters and infrared thermal cameras trace how far water traveled beneath flooring and baseboards.",
    },
  ],
  P03: [
    {
      src: "/images/crawlspace-submersible-pump.jpg",
      alt: "Submersible pump clearing standing water from a flooded crawl space in King County, WA",
      caption:
        "Submersible pumps clear standing groundwater off crawl space vapor barriers before framing absorbs moisture.",
    },
    {
      src: "/images/daylight-basement-drying.jpg",
      alt: "Commercial air movers and dehumidifier drying a flooded daylight basement with baseboards removed",
      caption:
        "Removing wet baseboards lets air movers and dehumidifiers dry the bottom plate and wall cavity of a basement.",
    },
    {
      src: "/images/foothill-wooded-home-storm.jpg",
      alt: "Wooded King County home surrounded by rainwater runoff and saturated drainage ditches",
      caption:
        "Saturated winter soil and clogged foundation drains are leading causes of crawl space flooding in wooded areas.",
    },
  ],
  P04: [
    {
      src: "/images/burst-frozen-pipe-leak.jpg",
      alt: "Frozen copper pipe split and leaking water beside a brass shutoff valve in a King County crawl space",
      caption:
        "Hard winter freezes split uninsulated copper and supply lines, often leaking heavily as soon as temperatures thaw.",
    },
    {
      src: "/images/water-extraction-wand.jpg",
      alt: "Extracting standing water from residential carpet after a burst plumbing pipe in King County, WA",
      caption:
        "Fast extraction after shutting off the main water valve limits damage to subfloors, ceilings, and adjacent rooms.",
    },
    {
      src: "/images/lgr-dehumidifier-hardwood.jpg",
      alt: "Commercial LGR dehumidifier and floor drying mats rescuing wet oak hardwood floors after a pipe burst",
      caption:
        "Negative-pressure floor drying mats help pull trapped moisture out of hardwood planks after an upstairs leak.",
    },
  ],
  P05: [
    {
      src: "/images/sewage-containment-ppe.jpg",
      alt: "Protective containment barriers and HEPA air scrubber during Category 3 sewage backup cleanup in King County, WA",
      caption:
        "Containment plastic, protective gear, and HEPA air scrubbers keep Category 3 black-water cleanup isolated and safe.",
    },
    {
      src: "/images/crawlspace-submersible-pump.jpg",
      alt: "Pumping contaminated wastewater and groundwater from a residential basement or crawl space",
      caption:
        "Standing wastewater in basements or crawl spaces is extracted before contaminated porous materials are disposed of.",
    },
    {
      src: "/images/daylight-basement-drying.jpg",
      alt: "Sanitized lower-level utility and basement framing undergoing commercial structural drying after backup cleanup",
      caption:
        "After disinfection and porous material removal, commercial drying equipment returns framing to safe moisture levels.",
    },
  ],
  P06: [
    {
      src: "/images/lgr-dehumidifier-hardwood.jpg",
      alt: "Commercial blue LGR dehumidifier and taped floor-drying mats on wet oak hardwood in King County, WA",
      caption:
        "LGR dehumidifiers and negative-pressure mats draw deep moisture out of hardwood flooring to reduce cupping.",
    },
    {
      src: "/images/daylight-basement-drying.jpg",
      alt: "Centrifugal air movers and dehumidifier drying exposed basement studs and subfloor in King County",
      caption:
        "High-velocity airflow accelerates evaporation while commercial dehumidifiers capture moisture in damp winter weather.",
    },
    {
      src: "/images/insurance-moisture-documentation.jpg",
      alt: "Technician logging daily structural drying moisture readings for insurance documentation",
      caption:
        "Daily moisture logs verify that wall framing and subfloors reached dry standards before reconstruction begins.",
    },
  ],
  P07: [
    {
      src: "/images/thermal-moisture-meter.jpg",
      alt: "Technician inspecting stained drywall above baseboard with infrared thermal camera and pinless moisture meter",
      caption:
        "Thermal cameras spot cool damp zones behind drywall, while moisture meters confirm exact moisture readings.",
    },
    {
      src: "/images/lgr-dehumidifier-hardwood.jpg",
      alt: "Targeted hardwood floor drying mats and dehumidifier preventing post-leak mold growth within 48 hours",
      caption:
        "Finding and drying trapped water within the 24-to-48 hour window helps prevent mold colonization under floors.",
    },
    {
      src: "/images/insurance-moisture-documentation.jpg",
      alt: "Recording moisture mapping data next to a commercial dehumidifier in a King County residence",
      caption:
        "Written moisture maps document every wet area so nothing stays damp inside walls or behind cabinetry.",
    },
  ],
  P08: [
    {
      src: "/images/pnw-valley-rain-home.jpg",
      alt: "Rain-soaked home in Duvall, WA 98019 overlooking the misty Snoqualmie Valley",
      caption:
        "Winter storms over Duvall (98019) and the Snoqualmie Valley push runoff down hillside lots and onto the valley floor.",
    },
    {
      src: "/images/crawlspace-submersible-pump.jpg",
      alt: "Crawl space sump pump removing standing groundwater in a Duvall, WA 98019 home",
      caption:
        "Submersible pumping clears rising groundwater from Snoqualmie Valley crawl spaces before floor joists stay wet.",
    },
    {
      src: "/images/burst-frozen-pipe-leak.jpg",
      alt: "Frozen split copper pipe leaking inside a crawl space during a Duvall cold snap",
      caption:
        "Cold snaps across Duvall and Cherry Valley frequently split exposed crawl space and exterior-wall supply lines.",
    },
  ],
  P09: [
    {
      src: "/images/pnw-valley-rain-home.jpg",
      alt: "Winter rainstorm over a suburban residence near the Tolt and Snoqualmie rivers in Carnation, WA 98014",
      caption:
        "When both the Tolt and Snoqualmie rivers run high, homes across Carnation (98014) face high water tables.",
    },
    {
      src: "/images/crawlspace-submersible-pump.jpg",
      alt: "Extracting standing floodwater from a crawl space vapor barrier in Carnation, WA 98014",
      caption:
        "Crawl space pumping and wet insulation removal help protect valley homes around Carnation and Lake Marcel.",
    },
    {
      src: "/images/sewage-containment-ppe.jpg",
      alt: "Category 3 septic and sewage backup containment and extraction equipment in Carnation, WA",
      caption:
        "Saturated winter septic drainfields require contained Category 3 extraction and thorough surface disinfection.",
    },
  ],
  P10: [
    {
      src: "/images/foothill-wooded-home-storm.jpg",
      alt: "Wooded rural home in Fall City, WA 98024 with winter storm rainwater drainage",
      caption:
        "Heavy rain in the Raging River and Fall City (98024) hills quickly tests perimeter drains and hillside foundations.",
    },
    {
      src: "/images/crawlspace-submersible-pump.jpg",
      alt: "Submersible pump draining groundwater seepage from a Fall City, WA crawl space",
      caption:
        "Pumping out crawl space groundwater early prevents structural wood rot and damp indoor air.",
    },
    {
      src: "/images/burst-frozen-pipe-leak.jpg",
      alt: "Broken copper water line and shutoff valve inside a rural Fall City, WA 98024 utility space",
      caption:
        "Homes on private wells in Fall City should shut off both the main valve and the well pump breaker if a pipe splits.",
    },
  ],
  P11: [
    {
      src: "/images/lgr-dehumidifier-hardwood.jpg",
      alt: "LGR dehumidifier and floor drying mats saving oak hardwood in Snoqualmie Ridge, WA 98065",
      caption:
        "Two-story homes on Snoqualmie Ridge (98065) often rely on mat drying systems after upstairs supply-line leaks.",
    },
    {
      src: "/images/pnw-valley-rain-home.jpg",
      alt: "Rainy winter weather over a Snoqualmie Valley craftsman home in ZIP 98065",
      caption:
        "Valley neighborhoods near downtown Snoqualmie and Meadowbrook face winter groundwater seepage near the river.",
    },
    {
      src: "/images/burst-frozen-pipe-leak.jpg",
      alt: "Frozen burst plumbing line in Snoqualmie and Snoqualmie Pass, WA 98065 and 98068",
      caption:
        "East-wind freezes funneling down I-90 split uninsulated pipes from Snoqualmie Ridge up to Snoqualmie Pass (98068).",
    },
  ],
  P12: [
    {
      src: "/images/burst-frozen-pipe-leak.jpg",
      alt: "Split frozen copper pipe spraying water during a winter freeze in North Bend, WA 98045",
      caption:
        "Cold east winds off Snoqualmie Pass freeze pipes in North Bend (98045) crawl spaces, garages, and exterior walls.",
    },
    {
      src: "/images/foothill-wooded-home-storm.jpg",
      alt: "Heavy mountain rainfall around a wooded foothill property in North Bend, WA 98045",
      caption:
        "Over 60 inches of annual rainfall around Mount Si keeps North Bend footing drains and sump pumps working hard.",
    },
    {
      src: "/images/crawlspace-submersible-pump.jpg",
      alt: "Crawl space groundwater extraction after Snoqualmie River valley rain in North Bend, WA",
      caption:
        "Rapid crawl space pumping and structural drying protect North Bend homes after heavy storms and power outages.",
    },
  ],
  P13: [
    {
      src: "/images/water-extraction-wand.jpg",
      alt: "Water extraction wand removing standing water from carpet in Maple Valley, WA 98038",
      caption:
        "Fast extraction pulls water from soaked carpet and pad after a supply-line break or upstairs laundry overflow.",
    },
    {
      src: "/images/daylight-basement-drying.jpg",
      alt: "Drying a flooded lower level with air movers and dehumidifier in Maple Valley, WA 98038",
      caption:
        "Commercial air movers and dehumidifiers dry basement drywall and framing after windstorm sump pump outages.",
    },
    {
      src: "/images/foothill-wooded-home-storm.jpg",
      alt: "Rainy wooded yard drainage around a Maple Valley and Lake Wilderness home in ZIP 98038",
      caption:
        "Wooded lots around Lake Wilderness and the Cedar River corridor frequently face winter runoff and power outages.",
    },
  ],
  P14: [
    {
      src: "/images/crawlspace-submersible-pump.jpg",
      alt: "Pumping out a flooded crawl space after a windstorm power outage in Enumclaw, WA 98022",
      caption:
        "Plateau windstorm outages often stop sump pumps right when Enumclaw (98022) crawl spaces need pumping most.",
    },
    {
      src: "/images/burst-frozen-pipe-leak.jpg",
      alt: "Frozen burst copper pipe inside a crawl space or outbuilding on the Enumclaw Plateau, WA 98022",
      caption:
        "Gales and sub-freezing air across the open Enumclaw Plateau put crawl space and shop plumbing at high risk.",
    },
    {
      src: "/images/pnw-valley-rain-home.jpg",
      alt: "Winter rainstorm hitting a craftsman house on the Enumclaw Plateau, WA 98022",
      caption:
        "Checking the crawl space hatch after every winter power outage helps catch standing water early.",
    },
  ],
  P15: [
    {
      src: "/images/lgr-dehumidifier-hardwood.jpg",
      alt: "LGR dehumidifier drying wet hardwood flooring after an appliance leak in Black Diamond, WA 98010",
      caption:
        "In newer Ten Trails homes (98010), fast floor mat drying helps protect hardwood after laundry or appliance leaks.",
    },
    {
      src: "/images/crawlspace-submersible-pump.jpg",
      alt: "Submersible pump draining Lake Sawyer groundwater from a Black Diamond, WA 98010 crawl space",
      caption:
        "Properties near Lake Sawyer and historic Black Diamond deal with high winter water tables under crawl spaces.",
    },
    {
      src: "/images/thermal-moisture-meter.jpg",
      alt: "Moisture meter and thermal inspection behind drywall in a Black Diamond, WA home",
      caption:
        "Non-invasive moisture checks verify whether hidden water spread inside walls below an upper-floor leak.",
    },
  ],
  P16: [
    {
      src: "/images/foothill-wooded-home-storm.jpg",
      alt: "Wooded acreage property in Ravensdale (98051) and Hobart (98025) during heavy winter rain",
      caption:
        "Timbered lots in Ravensdale (98051) and Hobart (98025) see heavy winter runoff and falling-branch power outages.",
    },
    {
      src: "/images/crawlspace-submersible-pump.jpg",
      alt: "Crawl space sump pump clearing groundwater in a Ravensdale or Hobart, WA residence",
      caption:
        "Clearing clogged French drains and pumping standing crawl space water keeps floor framing dry all winter.",
    },
    {
      src: "/images/sewage-containment-ppe.jpg",
      alt: "Containment and Category 3 cleanup after a rural septic backup in Ravensdale or Hobart, WA",
      caption:
        "Saturated winter septic drainfields require safe containment, Category 3 extraction, and thorough disinfection.",
    },
  ],
  P28: [
    {
      src: "/images/insurance-moisture-documentation.jpg",
      alt: "Technician recording daily moisture logs for a King County homeowners insurance water damage claim",
      caption:
        "Detailed moisture logs, equipment counts, and thermal photos give your insurance adjuster clear mitigation records.",
    },
    {
      src: "/images/burst-frozen-pipe-leak.jpg",
      alt: "Documenting a sudden burst copper pipe and shutoff valve for insurance claim review",
      caption:
        "Photograph the failed pipe or supply hose clearly before repairs and save the broken part for your adjuster.",
    },
    {
      src: "/images/lgr-dehumidifier-hardwood.jpg",
      alt: "Commercial structural drying setup started promptly under insurance Duty to Mitigate guidelines",
      caption:
        "Starting water extraction and drying quickly helps prevent secondary mold damage and fulfills policy duties.",
    },
  ],
  P29: [
    {
      src: "/images/pnw-valley-rain-home.jpg",
      alt: "King County foothill home during winter rain served by our 24/7 water damage referral line",
      caption:
        "We focus exclusively on residential water and moisture emergencies across King County's valleys and foothills.",
    },
    {
      src: "/images/water-extraction-wand.jpg",
      alt: "Independent local water extraction technician removing standing water from residential carpet",
      caption:
        "Calling connects you directly with an independent local restoration company serving your King County ZIP code.",
    },
    {
      src: "/images/thermal-moisture-meter.jpg",
      alt: "Technician verifying drywall moisture readings with thermal camera and moisture meter",
      caption:
        "We encourage homeowners to verify WA L&I registration, IICRC S500 practices, and written moisture readings.",
    },
  ],
  P30: [
    {
      src: "/images/water-extraction-wand.jpg",
      alt: "Emergency water extraction crew removing standing water after a 24/7 dispatch call in King County",
      caption:
        "Having your ZIP code, water source, and affected rooms ready speeds up connection with a local provider.",
    },
    {
      src: "/images/crawlspace-submersible-pump.jpg",
      alt: "Crawl space flood pumping service available 24/7 across King County foothill and valley ZIP codes",
      caption:
        "Whether standing water is in a living room, finished basement, or crawl space, local help is available 24/7.",
    },
    {
      src: "/images/insurance-moisture-documentation.jpg",
      alt: "Local restoration moisture assessment and drying plan setup in King County, WA",
      caption:
        "Speak directly with an independent local restoration company to discuss availability and next steps.",
    },
  ],
};

