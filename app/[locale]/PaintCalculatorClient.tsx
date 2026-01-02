'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Ruler, DollarSign, Home, Droplet, Info, Download, Share2, Save, Palette, Settings } from 'lucide-react';
import { Locale } from '@/i18n/config';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getTranslations } from '@/i18n';
// Language switcher is placed in the main header; no need inside the hero area.

type UnitSystem = 'imperial' | 'metric';

type DoorSize = 'standard' | 'double' | 'french' | 'custom';
type WindowSize = 'small' | 'medium' | 'large' | 'bay' | 'custom';
type PaintType = 'latex' | 'oil' | 'primer' | 'enamel' | 'exterior' | 'ceiling';
type PaintFinish = 'flat' | 'eggshell' | 'satin' | 'semigloss' | 'gloss';

type RoomMeasurementMode = 'dimensions' | 'directWallArea';

interface OpeningLine {
  id: string;
  size: DoorSize | WindowSize;
  quantity: number;
  customWidth: string; // inches or cm depending on unit system
  customHeight: string; // inches or cm depending on unit system
}

interface RoomMeasurements {
  name: string;
  mode: RoomMeasurementMode;
  length: string; // ft or m (decimal) - used in dimensions mode
  width: string; // ft or m (decimal) - used in dimensions mode
  height: string; // ft or m (decimal) - used in dimensions mode
  directWallArea: string; // sq ft or sq m
  directCeilingArea: string; // sq ft or sq m (optional)
  directPerimeter: string; // ft or m (for trim/wainscoting in direct mode)
  doors: OpeningLine[];
  windows: OpeningLine[];
}

interface Surfaces {
  walls: boolean;
  ceiling: boolean;
  trim: boolean;
  doors: boolean;
}

interface PaintDetails {
  coats: number;
  paintType: PaintType;
  finish: PaintFinish;
  wallCondition: 'new' | 'good' | 'fair' | 'poor';
  usePrimer: boolean;
  primerCoats: number;
  paintCoverageRate: number; // sq ft/gal (or sq m/gal but we convert internally)
  primerCoverageRate: number; // sq ft/gal (or sq m/gal but we convert internally)
}

interface CostDetails {
  paintPrice: number;
  primerPrice: number;
  calculateLabor: boolean;
  laborRate: number;
  includeMaterials: boolean;
  brushRoller: number;
  tape: number;
  dropCloths: number;
  other: number;
}

interface Extras {
  accentWall: boolean;
  accentWallArea: string; // sq ft or sq m
  wainscoting: boolean;
  wainscotingHeight: number; // inches or cm depending on unit system
  crownMolding: boolean;
  builtIns: boolean;
  builtInsArea: string; // sq ft or sq m
  fireplace: boolean;
  fireplaceArea: string; // sq ft or sq m
}

interface PaintAmount {
  gallons: number;
  quarts: number;
  total?: number;
}

interface Results {
  roomName?: string;
  wallArea: number;
  ceilingArea: number;
  trimArea: number;
  doorArea: number;
  windowArea: number;
  accentWallArea: number;
  totalArea: number;
  wallPaint: PaintAmount;
  accentWallPaint: PaintAmount;
  ceilingPaint: PaintAmount;
  trimPaint: PaintAmount;
  doorPaint: PaintAmount;
  primer: PaintAmount;
  paintBySurfaceCost: {
    walls: string;
    accentWall: string;
    ceiling: string;
    trim: string;
    doors: string;
  };
  totalCost: string;
  paintCost: string;
  primerCost: string;
  laborCost: string;
  materialsCost: string;
  timeEstimate: number;
}

interface PaintCalculatorClientProps {
  locale: Locale;
}

type ProjectType = 'interior' | 'exterior' | 'ceiling' | 'trim';

interface RoomState {
  id: string;
  measurements: RoomMeasurements;
  surfaces: Surfaces;
  extras: Extras;
}

interface ProjectState {
  activeTab: ProjectType;
  unit: UnitSystem;
  paintDetails: PaintDetails;
  costDetails: CostDetails;
  rooms: RoomState[];
}

const STORAGE_KEY = 'paintcalc.projects.v1';
const SHARE_PARAM = 'p';

function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function clampNumber(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function encodeBase64Url(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeBase64UrlToBytes(value: string) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export default function PaintCalculatorClient({ locale: _locale }: PaintCalculatorClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useMemo(() => getTranslations(_locale), [_locale]);
  const ui = t.ui;

  const defaultSurfacesByTab: Record<ProjectType, Surfaces> = {
    interior: { walls: true, ceiling: false, trim: false, doors: false },
    exterior: { walls: true, ceiling: false, trim: false, doors: false },
    ceiling: { walls: false, ceiling: true, trim: false, doors: false },
    trim: { walls: false, ceiling: false, trim: true, doors: false },
  };

  const createDefaultRoom = (unit: UnitSystem, tab: ProjectType): RoomState => ({
    id: uid('room'),
    measurements: {
      name: `${ui.room} 1`,
      mode: 'dimensions',
      length: '',
      width: '',
      height: '',
      directWallArea: '',
      directCeilingArea: '',
      directPerimeter: '',
      doors: [
        { id: uid('door'), size: 'standard', quantity: 0, customWidth: '', customHeight: '' },
      ],
      windows: [
        { id: uid('window'), size: 'medium', quantity: 0, customWidth: '', customHeight: '' },
      ],
    },
    surfaces: defaultSurfacesByTab[tab],
    extras: {
      accentWall: false,
      accentWallArea: '',
      wainscoting: false,
      wainscotingHeight: unit === 'metric' ? 91.44 : 36,
      crownMolding: false,
      builtIns: false,
      builtInsArea: '',
      fireplace: false,
      fireplaceArea: '',
    },
  });

  const printRef = useRef<HTMLDivElement | null>(null);
  const [project, setProject] = useState<ProjectState>(() => ({
    activeTab: 'interior',
    unit: 'imperial',
    paintDetails: {
      coats: 2,
      paintType: 'latex',
      finish: 'eggshell',
      wallCondition: 'good',
      usePrimer: false,
      primerCoats: 1,
      paintCoverageRate: 400,
      primerCoverageRate: 350,
    },
    costDetails: {
      paintPrice: 35,
      primerPrice: 25,
      calculateLabor: false,
      laborRate: 50,
      includeMaterials: true,
      brushRoller: 25,
      tape: 10,
      dropCloths: 15,
      other: 0,
    },
    rooms: [],
  }));

  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [savedProjects, setSavedProjects] = useState<Array<{ id: string; name: string; savedAt: number; project: ProjectState }>>([]);
  const [selectedSavedId, setSelectedSavedId] = useState<string>('');
  const [projectNameDraft, setProjectNameDraft] = useState<string>('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  type ComputedRoom = RoomState & { results: Results };

  // Ensure at least one room exists
  useEffect(() => {
    setProject((prev) => {
      if (prev.rooms.length > 0) return prev;
      const room = createDefaultRoom(prev.unit, prev.activeTab);
      return { ...prev, rooms: [room] };
    });
  }, []);

  useEffect(() => {
    setActiveRoomId((prev) => prev ?? project.rooms[0]?.id ?? null);
  }, [project.rooms]);

  // Load saved projects from localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Array<{ id: string; name: string; savedAt: number; project: ProjectState }>;
      if (Array.isArray(parsed)) setSavedProjects(parsed);
    } catch {
      // ignore
    }
  }, []);

  const persistSavedProjects = (next: Array<{ id: string; name: string; savedAt: number; project: ProjectState }>) => {
    setSavedProjects(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  // Load from shared link (URL param)
  useEffect(() => {
    const encoded = searchParams.get(SHARE_PARAM);
    if (!encoded) return;
    try {
      const bytes = decodeBase64UrlToBytes(encoded);
      const json = new TextDecoder().decode(bytes);
      const decoded = JSON.parse(json) as ProjectState;
      if (decoded && typeof decoded === 'object' && Array.isArray(decoded.rooms)) {
        setProject(decoded);
        setActiveRoomId(decoded.rooms[0]?.id ?? null);
        // Clean URL (keep user on same page)
        router.replace(pathname, { scroll: false });
        setToast('Loaded from shared link');
      }
    } catch {
      setToast('Invalid share link');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const coverageRates: Record<PaintType, number> = {
    latex: 400,
    oil: 350,
    primer: 350,
    enamel: 350,
    exterior: 300,
    ceiling: 350,
  };

  const doorSizes: Record<Exclude<DoorSize, 'custom'>, { width: number; height: number }> = {
    standard: { width: 36, height: 80 },
    double: { width: 72, height: 80 },
    french: { width: 60, height: 80 },
  };

  const windowSizes: Record<Exclude<WindowSize, 'custom'>, { width: number; height: number }> = {
    small: { width: 24, height: 36 },
    medium: { width: 36, height: 48 },
    large: { width: 60, height: 60 },
    bay: { width: 120, height: 60 },
  };

  const FEET_PER_METER = 3.28084;
  const SQFT_PER_SQM = 10.7639;

  const toFeet = (value: number) => (project.unit === 'metric' ? value * FEET_PER_METER : value);
  const toSqFt = (value: number) => (project.unit === 'metric' ? value * SQFT_PER_SQM : value);

  const convertProjectUnits = (prev: ProjectState, nextUnit: UnitSystem): ProjectState => {
    if (prev.unit === nextUnit) return prev;

    const lengthFactor = prev.unit === 'imperial' && nextUnit === 'metric' ? 1 / FEET_PER_METER : FEET_PER_METER;
    const areaFactor = prev.unit === 'imperial' && nextUnit === 'metric' ? 1 / SQFT_PER_SQM : SQFT_PER_SQM;
    const smallFactor = prev.unit === 'imperial' && nextUnit === 'metric' ? 2.54 : 1 / 2.54; // in <-> cm

    const convertStr = (s: string, factor: number, decimals = 2) => {
      if (!s) return s;
      const n = parseFloat(s);
      if (!Number.isFinite(n)) return s;
      const v = n * factor;
      return Number.isFinite(v) ? v.toFixed(decimals).replace(/\.00$/, '') : s;
    };

    const rooms = prev.rooms.map((room) => ({
      ...room,
      measurements: {
        ...room.measurements,
        length: convertStr(room.measurements.length, lengthFactor, 3),
        width: convertStr(room.measurements.width, lengthFactor, 3),
        height: convertStr(room.measurements.height, lengthFactor, 3),
        directPerimeter: convertStr(room.measurements.directPerimeter, lengthFactor, 3),
        directWallArea: convertStr(room.measurements.directWallArea, areaFactor, 2),
        directCeilingArea: convertStr(room.measurements.directCeilingArea, areaFactor, 2),
        doors: room.measurements.doors.map((d) => ({
          ...d,
          customWidth: convertStr(d.customWidth, smallFactor, 1),
          customHeight: convertStr(d.customHeight, smallFactor, 1),
        })),
        windows: room.measurements.windows.map((w) => ({
          ...w,
          customWidth: convertStr(w.customWidth, smallFactor, 1),
          customHeight: convertStr(w.customHeight, smallFactor, 1),
        })),
      },
      extras: {
        ...room.extras,
        accentWallArea: convertStr(room.extras.accentWallArea, areaFactor, 2),
        fireplaceArea: convertStr(room.extras.fireplaceArea, areaFactor, 2),
        builtInsArea: convertStr(room.extras.builtInsArea, areaFactor, 2),
        wainscotingHeight: room.extras.wainscotingHeight * smallFactor,
      },
    }));

    const paintDetails: PaintDetails = {
      ...prev.paintDetails,
      paintCoverageRate:
        prev.unit === 'imperial' && nextUnit === 'metric' ? prev.paintDetails.paintCoverageRate / SQFT_PER_SQM : prev.paintDetails.paintCoverageRate * SQFT_PER_SQM,
      primerCoverageRate:
        prev.unit === 'imperial' && nextUnit === 'metric' ? prev.paintDetails.primerCoverageRate / SQFT_PER_SQM : prev.paintDetails.primerCoverageRate * SQFT_PER_SQM,
    };

    return { ...prev, unit: nextUnit, rooms, paintDetails };
  };

  const conditionMultiplier: Record<PaintDetails['wallCondition'], number> = {
    new: 1.0,
    good: 1.1,
    fair: 1.2,
    poor: 1.3,
  };

  const calculateGallonsQuarts = (areaSqFt: number, coats: number, coverageRateSqFtPerGal: number, multiplier: number): PaintAmount => {
    const safeArea = Math.max(0, areaSqFt);
    const safeCoats = clampNumber(coats, 1, 3);
    const safeCoverage = Math.max(1, coverageRateSqFtPerGal);
    const gallonsNeeded = (safeArea * safeCoats * multiplier) / safeCoverage;
    const gallons = Math.floor(gallonsNeeded);
    const quarts = Math.ceil((gallonsNeeded - gallons) * 4);
    return { gallons, quarts: quarts === 4 ? 0 : quarts, total: gallons + (quarts === 4 ? 1 : 0) };
  };

  const computeRoomResults = (room: RoomState): Results => {
    const { measurements, surfaces, extras } = room;

    let wallPerimeterFt = 0;
    let grossWallAreaSqFt = 0;
    let ceilingAreaSqFt = 0;

    const len = Math.max(0, parseFloat(measurements.length) || 0);
    const wid = Math.max(0, parseFloat(measurements.width) || 0);
    const hei = Math.max(0, parseFloat(measurements.height) || 0);

    if (measurements.mode === 'dimensions') {
      const lengthFt = toFeet(len);
      const widthFt = toFeet(wid);
      const heightFt = toFeet(hei);
      wallPerimeterFt = 2 * (lengthFt + widthFt);
      grossWallAreaSqFt = wallPerimeterFt * heightFt;
      ceilingAreaSqFt = lengthFt * widthFt;
    } else {
      grossWallAreaSqFt = toSqFt(Math.max(0, parseFloat(measurements.directWallArea) || 0));
      ceilingAreaSqFt = toSqFt(Math.max(0, parseFloat(measurements.directCeilingArea) || 0));
      wallPerimeterFt = toFeet(Math.max(0, parseFloat(measurements.directPerimeter) || 0));
    }

    const calcOpeningAreaSqFt = (line: OpeningLine, kind: 'door' | 'window') => {
      if (!line.quantity) return 0;
      const q = Math.max(0, line.quantity);
      const isCustom = line.size === 'custom';
      let wIn = 0;
      let hIn = 0;

      if (isCustom) {
        const w = Math.max(0, parseFloat(line.customWidth) || 0);
        const h = Math.max(0, parseFloat(line.customHeight) || 0);
        if (project.unit === 'metric') {
          // cm -> ft
          const wFt = w / 30.48;
          const hFt = h / 30.48;
          return wFt * hFt * q;
        }
        // inches -> ft
        return (w / 12) * (h / 12) * q;
      }

      if (kind === 'door') {
        const preset = doorSizes[line.size as Exclude<DoorSize, 'custom'>];
        wIn = preset.width;
        hIn = preset.height;
      } else {
        const preset = windowSizes[line.size as Exclude<WindowSize, 'custom'>];
        wIn = preset.width;
        hIn = preset.height;
      }

      // Presets are defined in inches; convert to ft regardless of unit system.
      return (wIn / 12) * (hIn / 12) * q;
    };

    const doorAreaSqFt = measurements.doors.reduce((sum, d) => sum + calcOpeningAreaSqFt(d, 'door'), 0);
    const windowAreaSqFt = measurements.windows.reduce((sum, w) => sum + calcOpeningAreaSqFt(w, 'window'), 0);

    // Exclusions (sq ft)
    const fireplaceExcludeSqFt = extras.fireplace ? toSqFt(Math.max(0, parseFloat(extras.fireplaceArea) || 0)) : 0;
    const builtInsExcludeSqFt = extras.builtIns ? toSqFt(Math.max(0, parseFloat(extras.builtInsArea) || 0)) : 0;

    // Net walls after openings + exclusions
    let netWallAreaSqFt = grossWallAreaSqFt - doorAreaSqFt - windowAreaSqFt - fireplaceExcludeSqFt - builtInsExcludeSqFt;
    netWallAreaSqFt = Math.max(0, netWallAreaSqFt);

    // Trim (simple estimate) – if we don't have perimeter, it becomes 0 for direct mode unless provided.
    let trimAreaSqFt = 0;
    if (surfaces.trim && wallPerimeterFt > 0) {
      const baseboardHeightFt = 0.5; // 6 inches
      trimAreaSqFt = wallPerimeterFt * baseboardHeightFt;
      if (extras.crownMolding) trimAreaSqFt += wallPerimeterFt * 0.5;
    }

    // Wainscoting reduces wall area (chair rail)
    if (extras.wainscoting && wallPerimeterFt > 0) {
      const wainscotingHeightFt = project.unit === 'metric' ? extras.wainscotingHeight / 30.48 : extras.wainscotingHeight / 12;
      const wainscotingAreaSqFt = wallPerimeterFt * wainscotingHeightFt;
      netWallAreaSqFt = Math.max(0, netWallAreaSqFt - wainscotingAreaSqFt);
    }

    // Accent wall split
    const accentWallAreaSqFt = extras.accentWall ? toSqFt(Math.max(0, parseFloat(extras.accentWallArea) || 0)) : 0;
    const clampedAccentSqFt = Math.max(0, Math.min(netWallAreaSqFt, accentWallAreaSqFt));
    const mainWallAreaSqFt = Math.max(0, netWallAreaSqFt - clampedAccentSqFt);

    const multiplier = conditionMultiplier[project.paintDetails.wallCondition];
    const paintCoverageSqFtPerGal = project.unit === 'metric' ? project.paintDetails.paintCoverageRate * SQFT_PER_SQM : project.paintDetails.paintCoverageRate;
    const primerCoverageSqFtPerGal = project.unit === 'metric' ? project.paintDetails.primerCoverageRate * SQFT_PER_SQM : project.paintDetails.primerCoverageRate;

    const wallPaint = surfaces.walls
      ? calculateGallonsQuarts(mainWallAreaSqFt, project.paintDetails.coats, paintCoverageSqFtPerGal, multiplier)
      : { gallons: 0, quarts: 0, total: 0 };

    const accentWallPaint = surfaces.walls && extras.accentWall
      ? calculateGallonsQuarts(clampedAccentSqFt, project.paintDetails.coats, paintCoverageSqFtPerGal, multiplier)
      : { gallons: 0, quarts: 0, total: 0 };

    const ceilingPaint = surfaces.ceiling
      ? calculateGallonsQuarts(ceilingAreaSqFt, project.paintDetails.coats, paintCoverageSqFtPerGal, multiplier)
      : { gallons: 0, quarts: 0, total: 0 };

    const trimPaint = surfaces.trim
      ? calculateGallonsQuarts(trimAreaSqFt, project.paintDetails.coats, paintCoverageSqFtPerGal, multiplier)
      : { gallons: 0, quarts: 0, total: 0 };

    // Door paint assumes both sides
    const doorPaint = surfaces.doors
      ? calculateGallonsQuarts(doorAreaSqFt * 2, project.paintDetails.coats, paintCoverageSqFtPerGal, multiplier)
      : { gallons: 0, quarts: 0, total: 0 };

    const totalPaintAreaSqFt =
      (surfaces.walls ? (mainWallAreaSqFt + clampedAccentSqFt) : 0) +
      (surfaces.ceiling ? ceilingAreaSqFt : 0) +
      (surfaces.trim ? trimAreaSqFt : 0) +
      (surfaces.doors ? doorAreaSqFt * 2 : 0);

    const primer = project.paintDetails.usePrimer
      ? calculateGallonsQuarts(totalPaintAreaSqFt, project.paintDetails.primerCoats, primerCoverageSqFtPerGal, multiplier)
      : { gallons: 0, quarts: 0, total: 0 };

    const toQuarts = (a: PaintAmount) => (a.gallons || 0) * 4 + (a.quarts || 0);
    const paintQuarts =
      toQuarts(wallPaint) + toQuarts(accentWallPaint) + toQuarts(ceilingPaint) + toQuarts(trimPaint) + toQuarts(doorPaint);
    const primerQuarts = project.paintDetails.usePrimer ? toQuarts(primer) : 0;

    const wallCost = (toQuarts(wallPaint) / 4) * project.costDetails.paintPrice;
    const accentCost = (toQuarts(accentWallPaint) / 4) * project.costDetails.paintPrice;
    const ceilingCost = (toQuarts(ceilingPaint) / 4) * project.costDetails.paintPrice;
    const trimCost = (toQuarts(trimPaint) / 4) * project.costDetails.paintPrice;
    const doorsCost = (toQuarts(doorPaint) / 4) * project.costDetails.paintPrice;

    const paintCost = (paintQuarts / 4) * project.costDetails.paintPrice;
    const primerCost = (primerQuarts / 4) * project.costDetails.primerPrice;

    const timeEstimate = Math.max(0, Math.ceil((totalPaintAreaSqFt / 200) * project.paintDetails.coats));
    const laborCost = 0;
    const materialsCost = 0;
    const totalCost = paintCost + primerCost;

    const nextResults: Results = {
      roomName: measurements.name,
      wallArea: Math.round(mainWallAreaSqFt + clampedAccentSqFt),
      ceilingArea: Math.round(ceilingAreaSqFt),
      trimArea: Math.round(trimAreaSqFt),
      doorArea: Math.round(doorAreaSqFt * 2),
      windowArea: Math.round(windowAreaSqFt),
      accentWallArea: Math.round(clampedAccentSqFt),
      totalArea: Math.round(totalPaintAreaSqFt),
      wallPaint,
      accentWallPaint,
      ceilingPaint,
      trimPaint,
      doorPaint,
      primer,
      paintBySurfaceCost: {
        walls: wallCost.toFixed(2),
        accentWall: accentCost.toFixed(2),
        ceiling: ceilingCost.toFixed(2),
        trim: trimCost.toFixed(2),
        doors: doorsCost.toFixed(2),
      },
      totalCost: totalCost.toFixed(2),
      paintCost: paintCost.toFixed(2),
      primerCost: primerCost.toFixed(2),
      laborCost: laborCost.toFixed(2),
      materialsCost: materialsCost.toFixed(2),
      timeEstimate,
    };

    return nextResults;
  };

  const computedRooms: ComputedRoom[] = useMemo(() => {
    return project.rooms.map((r) => ({ ...r, results: computeRoomResults(r) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  const activeRoom = useMemo(() => computedRooms.find((r) => r.id === activeRoomId) ?? computedRooms[0], [computedRooms, activeRoomId]);

  const totals = useMemo(() => {
    const base: Results = {
      wallArea: 0,
      ceilingArea: 0,
      trimArea: 0,
      doorArea: 0,
      windowArea: 0,
      accentWallArea: 0,
      totalArea: 0,
      wallPaint: { gallons: 0, quarts: 0, total: 0 },
      accentWallPaint: { gallons: 0, quarts: 0, total: 0 },
      ceilingPaint: { gallons: 0, quarts: 0, total: 0 },
      trimPaint: { gallons: 0, quarts: 0, total: 0 },
      doorPaint: { gallons: 0, quarts: 0, total: 0 },
      primer: { gallons: 0, quarts: 0, total: 0 },
      paintBySurfaceCost: {
        walls: '0.00',
        accentWall: '0.00',
        ceiling: '0.00',
        trim: '0.00',
        doors: '0.00',
      },
      totalCost: '0.00',
      paintCost: '0.00',
      primerCost: '0.00',
      laborCost: '0.00',
      materialsCost: '0.00',
      timeEstimate: 0,
    };

    const toQuarts = (a: PaintAmount) => (a.gallons || 0) * 4 + (a.quarts || 0);
    const fromQuarts = (quartsTotal: number): PaintAmount => {
      const q = Math.max(0, Math.round(quartsTotal));
      const gallons = Math.floor(q / 4);
      const quarts = q % 4;
      return { gallons, quarts, total: gallons + (quarts ? quarts / 4 : 0) };
    };

    const summed = computedRooms.reduce((acc, r) => {
      acc.wallArea += r.results.wallArea;
      acc.ceilingArea += r.results.ceilingArea;
      acc.trimArea += r.results.trimArea;
      acc.doorArea += r.results.doorArea;
      acc.windowArea += r.results.windowArea;
      acc.accentWallArea += r.results.accentWallArea;
      acc.totalArea += r.results.totalArea;
      acc.wallPaint = fromQuarts(toQuarts(acc.wallPaint) + toQuarts(r.results.wallPaint));
      acc.accentWallPaint = fromQuarts(toQuarts(acc.accentWallPaint) + toQuarts(r.results.accentWallPaint));
      acc.ceilingPaint = fromQuarts(toQuarts(acc.ceilingPaint) + toQuarts(r.results.ceilingPaint));
      acc.trimPaint = fromQuarts(toQuarts(acc.trimPaint) + toQuarts(r.results.trimPaint));
      acc.doorPaint = fromQuarts(toQuarts(acc.doorPaint) + toQuarts(r.results.doorPaint));
      acc.primer = fromQuarts(toQuarts(acc.primer) + toQuarts(r.results.primer));
      acc.timeEstimate += r.results.timeEstimate;
      return acc;
    }, base);

    const totalPaintQuarts =
      toQuarts(summed.wallPaint) +
      toQuarts(summed.accentWallPaint) +
      toQuarts(summed.ceilingPaint) +
      toQuarts(summed.trimPaint) +
      toQuarts(summed.doorPaint);
    const totalPrimerQuarts = toQuarts(summed.primer);

    const paintCost = (totalPaintQuarts / 4) * project.costDetails.paintPrice;
    const primerCost = (totalPrimerQuarts / 4) * project.costDetails.primerPrice;

    const paintBySurfaceCost = {
      walls: ((toQuarts(summed.wallPaint) / 4) * project.costDetails.paintPrice).toFixed(2),
      accentWall: ((toQuarts(summed.accentWallPaint) / 4) * project.costDetails.paintPrice).toFixed(2),
      ceiling: ((toQuarts(summed.ceilingPaint) / 4) * project.costDetails.paintPrice).toFixed(2),
      trim: ((toQuarts(summed.trimPaint) / 4) * project.costDetails.paintPrice).toFixed(2),
      doors: ((toQuarts(summed.doorPaint) / 4) * project.costDetails.paintPrice).toFixed(2),
    };
    const materialsCost = project.costDetails.includeMaterials
      ? project.costDetails.brushRoller + project.costDetails.tape + project.costDetails.dropCloths + project.costDetails.other
      : 0;
    const laborCost = project.costDetails.calculateLabor ? summed.timeEstimate * project.costDetails.laborRate : 0;
    const totalCost = paintCost + primerCost + materialsCost + laborCost;

    return {
      ...summed,
      paintBySurfaceCost,
      paintCost: paintCost.toFixed(2),
      primerCost: primerCost.toFixed(2),
      laborCost: laborCost.toFixed(2),
      materialsCost: materialsCost.toFixed(2),
      totalCost: totalCost.toFixed(2),
    };
  }, [computedRooms, project.costDetails]);

  const unitText = {
    length: project.unit === 'imperial' ? 'ft' : 'm',
    area: project.unit === 'imperial' ? 'sq ft' : 'sq m',
    small: project.unit === 'imperial' ? 'in' : 'cm',
  };

  const paintTypeLabel: Record<PaintType, string> = {
    latex: 'Latex (Water-Based)',
    oil: 'Oil-Based',
    primer: 'Primer',
    enamel: 'Enamel',
    exterior: 'Exterior Paint',
    ceiling: 'Ceiling Paint',
  };

  const finishLabel: Record<PaintDetails['finish'], string> = {
    flat: 'Flat / Matte',
    eggshell: 'Eggshell',
    satin: 'Satin',
    semigloss: 'Semi-Gloss',
    gloss: 'High Gloss',
  };

  const formatArea = (sqFt: number) => (project.unit === 'metric' ? (sqFt / SQFT_PER_SQM).toFixed(1) : `${Math.round(sqFt)}`);

  const any = useMemo(
    () => ({
      walls: computedRooms.some((r) => r.surfaces.walls),
      ceiling: computedRooms.some((r) => r.surfaces.ceiling),
      trim: computedRooms.some((r) => r.surfaces.trim),
      doors: computedRooms.some((r) => r.surfaces.doors),
      accentWall: computedRooms.some((r) => r.surfaces.walls && r.extras.accentWall),
    }),
    [computedRooms],
  );

  const validation = useMemo(() => {
    const roomIssues = computedRooms
      .map((r) => {
        const msgs: string[] = [];
        const m = r.measurements;

        if (m.mode === 'dimensions') {
          const len = parseFloat(m.length) || 0;
          const wid = parseFloat(m.width) || 0;
          const hei = parseFloat(m.height) || 0;
          const needsDims = r.surfaces.walls || r.surfaces.ceiling || r.surfaces.trim || r.extras.wainscoting;
          if (needsDims) {
            if (len <= 0) msgs.push(ui.errorLength);
            if (wid <= 0) msgs.push(ui.errorWidth);
            if (hei <= 0) msgs.push(ui.errorHeight);
          }
        } else {
          const wallArea = parseFloat(m.directWallArea) || 0;
          const ceilArea = parseFloat(m.directCeilingArea) || 0;
          const peri = parseFloat(m.directPerimeter) || 0;
          if (r.surfaces.walls && wallArea <= 0) msgs.push('Enter wall area (or switch to dimensions).');
          if (r.surfaces.ceiling && ceilArea <= 0) msgs.push('Enter ceiling area (or switch to dimensions).');
          if ((r.surfaces.trim || r.extras.wainscoting) && peri <= 0) msgs.push('Enter perimeter for trim/wainscoting in direct-area mode.');
        }

        if (r.surfaces.walls && r.extras.accentWall) {
          const a = parseFloat(r.extras.accentWallArea) || 0;
          if (a <= 0) msgs.push('Accent wall is enabled — enter accent wall area.');
        }
        if (r.extras.fireplace) {
          const a = parseFloat(r.extras.fireplaceArea) || 0;
          if (a <= 0) msgs.push('Fireplace exclusion is enabled — enter exclude area.');
        }
        if (r.extras.builtIns) {
          const a = parseFloat(r.extras.builtInsArea) || 0;
          if (a <= 0) msgs.push('Built-ins exclusion is enabled — enter exclude area.');
        }

        const hasCustomDoorMissing = r.measurements.doors.some(
          (d) => d.quantity > 0 && d.size === 'custom' && ((parseFloat(d.customWidth) || 0) <= 0 || (parseFloat(d.customHeight) || 0) <= 0),
        );
        if (hasCustomDoorMissing) msgs.push(`Custom door size is selected — enter width/height (${project.unit === 'metric' ? 'cm' : 'in'}).`);

        const hasCustomWindowMissing = r.measurements.windows.some(
          (w) => w.quantity > 0 && w.size === 'custom' && ((parseFloat(w.customWidth) || 0) <= 0 || (parseFloat(w.customHeight) || 0) <= 0),
        );
        if (hasCustomWindowMissing) msgs.push(`Custom window size is selected — enter width/height (${project.unit === 'metric' ? 'cm' : 'in'}).`);

        return msgs.length ? { roomId: r.id, roomName: r.measurements.name || 'Room', messages: msgs } : null;
      })
      .filter(Boolean) as Array<{ roomId: string; roomName: string; messages: string[] }>;

    const projectIssues: string[] = [];
    if ((project.paintDetails.paintCoverageRate || 0) <= 0) projectIssues.push('Paint coverage rate must be greater than 0.');
    if (project.paintDetails.usePrimer && (project.paintDetails.primerCoverageRate || 0) <= 0) projectIssues.push('Primer coverage rate must be greater than 0.');
    if ((project.costDetails.paintPrice || 0) < 0) projectIssues.push('Paint price cannot be negative.');
    if ((project.costDetails.primerPrice || 0) < 0) projectIssues.push('Primer price cannot be negative.');

    return { roomIssues, projectIssues };
  }, [computedRooms, project.unit, project.paintDetails, project.costDetails]);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2200);
  };

  const updateRoom = (roomId: string, updater: (r: RoomState) => RoomState) => {
    setProject((prev) => ({ ...prev, rooms: prev.rooms.map((r) => (r.id === roomId ? updater(r) : r)) }));
  };

  const addRoom = () => {
    setProject((prev) => {
      const nextIndex = prev.rooms.length + 1;
      const room = createDefaultRoom(prev.unit, prev.activeTab);
      room.measurements.name = `${ui.room} ${nextIndex}`;
      return { ...prev, rooms: [...prev.rooms, room] };
    });
  };

  const removeRoom = (roomId: string) => {
    setProject((prev) => {
      const remaining = prev.rooms.filter((r) => r.id !== roomId);
      return { ...prev, rooms: remaining.length ? remaining : prev.rooms };
    });
    setActiveRoomId((prev) => (prev === roomId ? null : prev));
  };

  const handlePrint = () => {
    window.print();
  };

  const loadScript = (src: string) =>
    new Promise<void>((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        existing.addEventListener('load', () => resolve());
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(script);
    });

  const getHtml2Canvas = async () => {
    if ((window as any).html2canvas) return (window as any).html2canvas as typeof import('html2canvas');
    await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
    return (window as any).html2canvas as typeof import('html2canvas');
  };

  const getJsPDF = async () => {
    if ((window as any).jspdf?.jsPDF) return (window as any).jspdf.jsPDF as typeof import('jspdf').jsPDF;
    await loadScript('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js');
    return (window as any).jspdf.jsPDF as typeof import('jspdf').jsPDF;
  };

  const handleShare = async () => {
    try {
      const json = JSON.stringify(project);
      const bytes = new TextEncoder().encode(json);
      const encoded = encodeBase64Url(bytes);
      const url = new URL(window.location.href);
      url.searchParams.set(SHARE_PARAM, encoded);
      await navigator.clipboard.writeText(url.toString());
      showToast('Share link copied');
    } catch {
      showToast('Could not generate share link');
    }
  };

  const handleExportPdf = async () => {
    try {
      const target = printRef.current;
      if (!target) return handlePrint();
      const html2canvas = await getHtml2Canvas();
      const jsPDF = await getJsPDF();
      const canvas = await html2canvas(target, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = (canvas.height * pageWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
      pdf.save('paint-calculator.pdf');
    } catch (err) {
      // Fallback to print dialog if PDF generation fails
      handlePrint();
    }
  };

  const handleSave = () => {
    setProjectNameDraft(projectNameDraft || `Project ${new Date().toLocaleString()}`);
    setShowSaveModal(true);
  };

  const handleCloseSave = () => setShowSaveModal(false);

  if (!activeRoom) {
    return <div className="min-h-screen p-6">Loading…</div>;
  }

  const doorOptions: Array<{ value: DoorSize; label: string }> = [
    { value: 'standard', label: 'Standard (36" x 80")' },
    { value: 'double', label: 'Double (72" x 80")' },
    { value: 'french', label: 'French (60" x 80")' },
    { value: 'custom', label: 'Custom size' },
  ];
  const windowOptions: Array<{ value: WindowSize; label: string }> = [
    { value: 'small', label: 'Small (24" x 36")' },
    { value: 'medium', label: 'Medium (36" x 48")' },
    { value: 'large', label: 'Large (60" x 60")' },
    { value: 'bay', label: 'Bay (120" x 60")' },
    { value: 'custom', label: 'Custom size' },
  ];

  const activeRoomMessages = validation.roomIssues.find((x) => x.roomId === activeRoom.id)?.messages ?? [];

  const tabConfig: Record<ProjectType, { label: string; icon: React.ReactNode }> = {
    interior: { label: ui.tabs.interior, icon: <Home size={16} /> },
    exterior: { label: ui.tabs.exterior, icon: <Droplet size={16} /> },
    ceiling: { label: ui.tabs.ceiling, icon: <Palette size={16} /> },
    trim: { label: ui.tabs.trim, icon: <Settings size={16} /> },
  };

  const surfaceLabelMap: Record<keyof Surfaces, string> = {
    walls: ui.walls,
    ceiling: ui.ceiling,
    trim: ui.trim,
    doors: ui.doorsSurface,
  };

  return (
    <div ref={printRef} className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 print:bg-white print:p-0">
      <div className="max-w-7xl mx-auto print:max-w-none">
        <div className="mb-6 print:hidden">
          <div className="relative rounded-2xl bg-white/95 backdrop-blur shadow-xl border border-blue-100 overflow-visible">
            <div className="flex flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{ui.heroTitle}</h1>
              <p className="text-sm text-gray-600">{ui.heroSubtitle}</p>
            </div>

              <div className="flex flex-col gap-3 w-full lg:w-auto">
                <div className="flex flex-wrap items-center justify-end gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-xl shadow-inner">
                    <select
                      value={selectedSavedId}
                      onChange={(e) => setSelectedSavedId(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-white border border-blue-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{ui.loadSaved}</option>
                      {savedProjects
                        .slice()
                        .sort((a, b) => b.savedAt - a.savedAt)
                        .map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                    </select>
                    <button
                      onClick={() => {
                        const found = savedProjects.find((p) => p.id === selectedSavedId);
                        if (!found) return;
                        setProject(found.project);
                        setActiveRoomId(found.project.rooms[0]?.id ?? null);
                        showToast('Project loaded');
                      }}
                      disabled={!selectedSavedId}
                      className="px-3 py-2 rounded-lg bg-white text-blue-700 border border-blue-200 shadow-sm hover:bg-blue-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {ui.load}
                    </button>
                    <button
                      onClick={() => {
                        if (!selectedSavedId) return;
                        const next = savedProjects.filter((p) => p.id !== selectedSavedId);
                        persistSavedProjects(next);
                        setSelectedSavedId('');
                        showToast('Deleted');
                      }}
                      disabled={!selectedSavedId}
                      className="px-3 py-2 rounded-lg bg-white text-red-600 border border-red-200 shadow-sm hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete saved project"
                    >
                      {ui.delete}
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 transition"
                  >
                    <Save size={18} />
                    {ui.save}
                  </button>
                  <button
                    onClick={handleExportPdf}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-800 shadow-sm hover:border-gray-300 transition"
                  >
                    <Download size={18} />
                    {ui.pdf}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm hover:bg-indigo-100 transition"
                  >
                    <Share2 size={18} />
                    {ui.share}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 px-4 pb-4 pt-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100">
              {Object.entries(tabConfig).map(([tabKey, config]) => {
                const tab = tabKey as ProjectType;
                return (
                  <button
                    key={tab}
                    onClick={() =>
                      setProject((prev) => ({
                        ...prev,
                        activeTab: tab,
                        paintDetails: {
                          ...prev.paintDetails,
                          paintType: tab === 'exterior' ? 'exterior' : prev.paintDetails.paintType,
                        },
                        rooms: prev.rooms.map((r) => ({ ...r, surfaces: defaultSurfacesByTab[tab] })),
                      }))
                    }
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold capitalize transition ${
                      project.activeTab === tab
                        ? 'bg-white text-blue-700 shadow-sm border border-blue-200'
                        : 'text-gray-600 hover:text-blue-700 hover:bg-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {config.icon}
                      <span>{config.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6 print:hidden">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Home size={20} className="text-blue-600" />
                {ui.rooms}
              </h3>

              <div className="flex flex-wrap gap-2 mb-4">
                {computedRooms.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setActiveRoomId(r.id)}
                    className={`px-3 py-2 rounded-lg border text-sm transition ${
                      r.id === activeRoom.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    {r.measurements.name || ui.room}
                  </button>
                ))}
                <button
                  onClick={addRoom}
                  className="px-3 py-2 rounded-lg border border-dashed text-sm hover:bg-gray-50 transition"
                >
                  {ui.addRoom}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{ui.room}</label>
                  <input
                    value={activeRoom.measurements.name}
                    onChange={(e) =>
                      updateRoom(activeRoom.id, (r) => ({ ...r, measurements: { ...r.measurements, name: e.target.value } }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`${ui.room} 1`}
                  />
                </div>
                <div className="flex gap-2 md:justify-end">
                  <button
                    onClick={() => removeRoom(activeRoom.id)}
                    disabled={project.rooms.length <= 1}
                    className="px-4 py-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {ui.remove}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings size={20} className="text-blue-600" />
                {ui.measurementSystem}
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setProject((prev) => convertProjectUnits(prev, 'imperial'))}
                  className={`flex-1 py-3 rounded-lg font-medium transition ${
                    project.unit === 'imperial' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {ui.imperial}
                </button>
                <button
                  onClick={() => setProject((prev) => convertProjectUnits(prev, 'metric'))}
                  className={`flex-1 py-3 rounded-lg font-medium transition ${
                    project.unit === 'metric' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {ui.metric}
                </button>
              </div>
              <div className="text-xs text-gray-600 mt-2">{ui.measurementHint}</div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Ruler size={20} className="text-blue-600" />
                {ui.measurementsTitle}
              </h3>

              {(validation.projectIssues.length > 0 || activeRoomMessages.length > 0) && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  <div className="font-semibold mb-1">{ui.errorsTitle}</div>
                  <ul className="list-disc pl-5 space-y-1">
                    {validation.projectIssues.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                    {activeRoomMessages.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <button
                  onClick={() =>
                    updateRoom(activeRoom.id, (r) => ({ ...r, measurements: { ...r.measurements, mode: 'dimensions' } }))
                  }
                  className={`flex-1 px-4 py-2 rounded-lg border transition ${
                    activeRoom.measurements.mode === 'dimensions' ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  {ui.useDimensions}
                </button>
                <button
                  onClick={() =>
                    updateRoom(activeRoom.id, (r) => ({ ...r, measurements: { ...r.measurements, mode: 'directWallArea' } }))
                  }
                  className={`flex-1 px-4 py-2 rounded-lg border transition ${
                    activeRoom.measurements.mode === 'directWallArea'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {ui.useDirect}
                </button>
              </div>

              {activeRoom.measurements.mode === 'dimensions' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{`${ui.length} (${unitText.length})`}</label>
                    <input
                      type="number"
                      value={activeRoom.measurements.length}
                      onChange={(e) =>
                        updateRoom(activeRoom.id, (r) => ({ ...r, measurements: { ...r.measurements, length: e.target.value } }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                      min={0}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{`${ui.width} (${unitText.length})`}</label>
                    <input
                      type="number"
                      value={activeRoom.measurements.width}
                      onChange={(e) =>
                        updateRoom(activeRoom.id, (r) => ({ ...r, measurements: { ...r.measurements, width: e.target.value } }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                      min={0}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{`${ui.height} (${unitText.length})`}</label>
                    <input
                      type="number"
                      value={activeRoom.measurements.height}
                      onChange={(e) =>
                        updateRoom(activeRoom.id, (r) => ({ ...r, measurements: { ...r.measurements, height: e.target.value } }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                      min={0}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{`${ui.walls} (${unitText.area})`}</label>
                    <input
                      type="number"
                      value={activeRoom.measurements.directWallArea}
                      onChange={(e) =>
                        updateRoom(activeRoom.id, (r) => ({
                          ...r,
                          measurements: { ...r.measurements, directWallArea: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                      min={0}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{`${ui.ceiling} (${unitText.area})`}</label>
                    <input
                      type="number"
                      value={activeRoom.measurements.directCeilingArea}
                      onChange={(e) =>
                        updateRoom(activeRoom.id, (r) => ({
                          ...r,
                          measurements: { ...r.measurements, directCeilingArea: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`0 ${unitText.area}`}
                      min={0}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{`${ui.perimeter ?? 'Perimeter'} (${unitText.length})`}</label>
                    <input
                      type="number"
                      value={activeRoom.measurements.directPerimeter}
                      onChange={(e) =>
                        updateRoom(activeRoom.id, (r) => ({
                          ...r,
                          measurements: { ...r.measurements, directPerimeter: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                      min={0}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900 capitalize">{ui.doors}</div>
                    <button
                      onClick={() =>
                        updateRoom(activeRoom.id, (r) => ({
                          ...r,
                          measurements: {
                            ...r.measurements,
                            doors: [...r.measurements.doors, { id: uid('door'), size: 'standard', quantity: 0, customWidth: '', customHeight: '' }],
                          },
                        }))
                      }
                      className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-50"
                    >
                      {ui.addDoorType}
                    </button>
                  </div>

                  <div className="space-y-2">
                    {activeRoom.measurements.doors.map((d) => (
                      <div key={d.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 p-3 border rounded-lg">
                        <div className="md:col-span-3">
                          <label className="block text-xs text-gray-600 mb-1">{ui.quantity}</label>
                          <input
                            type="number"
                            min={0}
                            value={d.quantity}
                            onChange={(e) =>
                              updateRoom(activeRoom.id, (r) => ({
                                ...r,
                                measurements: {
                                  ...r.measurements,
                                  doors: r.measurements.doors.map((x) =>
                                    x.id === d.id ? { ...x, quantity: parseInt(e.target.value, 10) || 0 } : x,
                                  ),
                                },
                              }))
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div className="md:col-span-6">
                          <label className="block text-xs text-gray-600 mb-1">{ui.size}</label>
                          <select
                            value={d.size}
                            onChange={(e) =>
                              updateRoom(activeRoom.id, (r) => ({
                                ...r,
                                measurements: {
                                  ...r.measurements,
                                  doors: r.measurements.doors.map((x) => (x.id === d.id ? { ...x, size: e.target.value as DoorSize } : x)),
                                },
                              }))
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                          >
                            {doorOptions.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-2 flex items-end">
                          <button
                            onClick={() =>
                              updateRoom(activeRoom.id, (r) => ({
                                ...r,
                                measurements: { ...r.measurements, doors: r.measurements.doors.filter((x) => x.id !== d.id) },
                              }))
                            }
                            disabled={activeRoom.measurements.doors.length <= 1}
                            className="w-full px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {ui.removeItem}
                          </button>
                        </div>
                        {d.size === 'custom' && (
                          <div className="md:col-span-12 grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">{`${ui.widthSmall} (${unitText.small})`}</label>
                              <input
                                type="number"
                                min={0}
                                value={d.customWidth}
                                onChange={(e) =>
                                  updateRoom(activeRoom.id, (r) => ({
                                    ...r,
                                    measurements: {
                                      ...r.measurements,
                                      doors: r.measurements.doors.map((x) => (x.id === d.id ? { ...x, customWidth: e.target.value } : x)),
                                    },
                                  }))
                                }
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">{`${ui.heightSmall} (${unitText.small})`}</label>
                              <input
                                type="number"
                                min={0}
                                value={d.customHeight}
                                onChange={(e) =>
                                  updateRoom(activeRoom.id, (r) => ({
                                    ...r,
                                    measurements: {
                                      ...r.measurements,
                                      doors: r.measurements.doors.map((x) => (x.id === d.id ? { ...x, customHeight: e.target.value } : x)),
                                    },
                                  }))
                                }
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900 capitalize">{ui.windows}</div>
                    <button
                      onClick={() =>
                        updateRoom(activeRoom.id, (r) => ({
                          ...r,
                          measurements: {
                            ...r.measurements,
                            windows: [...r.measurements.windows, { id: uid('window'), size: 'medium', quantity: 0, customWidth: '', customHeight: '' }],
                          },
                        }))
                      }
                      className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-50"
                    >
                      {ui.addWindowType}
                    </button>
                  </div>

                  <div className="space-y-2">
                    {activeRoom.measurements.windows.map((w) => (
                      <div key={w.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 p-3 border rounded-lg">
                        <div className="md:col-span-3">
                          <label className="block text-xs text-gray-600 mb-1">{ui.quantity}</label>
                          <input
                            type="number"
                            min={0}
                            value={w.quantity}
                            onChange={(e) =>
                              updateRoom(activeRoom.id, (r) => ({
                                ...r,
                                measurements: {
                                  ...r.measurements,
                                  windows: r.measurements.windows.map((x) =>
                                    x.id === w.id ? { ...x, quantity: parseInt(e.target.value, 10) || 0 } : x,
                                  ),
                                },
                              }))
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div className="md:col-span-6">
                          <label className="block text-xs text-gray-600 mb-1">{ui.size}</label>
                          <select
                            value={w.size}
                            onChange={(e) =>
                              updateRoom(activeRoom.id, (r) => ({
                                ...r,
                                measurements: {
                                  ...r.measurements,
                                  windows: r.measurements.windows.map((x) => (x.id === w.id ? { ...x, size: e.target.value as WindowSize } : x)),
                                },
                              }))
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                          >
                            {windowOptions.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-2 flex items-end">
                          <button
                            onClick={() =>
                              updateRoom(activeRoom.id, (r) => ({
                                ...r,
                                measurements: { ...r.measurements, windows: r.measurements.windows.filter((x) => x.id !== w.id) },
                              }))
                            }
                            disabled={activeRoom.measurements.windows.length <= 1}
                            className="w-full px-3 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {ui.removeItem}
                          </button>
                        </div>
                        {w.size === 'custom' && (
                          <div className="md:col-span-12 grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">{`${ui.widthSmall} (${unitText.small})`}</label>
                              <input
                                type="number"
                                min={0}
                                value={w.customWidth}
                                onChange={(e) =>
                                  updateRoom(activeRoom.id, (r) => ({
                                    ...r,
                                    measurements: {
                                      ...r.measurements,
                                      windows: r.measurements.windows.map((x) => (x.id === w.id ? { ...x, customWidth: e.target.value } : x)),
                                    },
                                  }))
                                }
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">{`${ui.heightSmall} (${unitText.small})`}</label>
                              <input
                                type="number"
                                min={0}
                                value={w.customHeight}
                                onChange={(e) =>
                                  updateRoom(activeRoom.id, (r) => ({
                                    ...r,
                                    measurements: {
                                      ...r.measurements,
                                      windows: r.measurements.windows.map((x) => (x.id === w.id ? { ...x, customHeight: e.target.value } : x)),
                                    },
                                  }))
                                }
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Home size={20} className="text-blue-600" />
                Surfaces to Paint (Active Room)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {(Object.entries(activeRoom.surfaces) as Array<[keyof Surfaces, boolean]>).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      checked={value}
                    onChange={(e) =>
                      updateRoom(activeRoom.id, (r) => ({ ...r, surfaces: { ...r.surfaces, [key]: e.target.checked } }))
                    }
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="capitalize font-medium">{surfaceLabelMap[key]}</span>
                </label>
              ))}
            </div>
          </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Palette size={20} className="text-blue-600" />
                {ui.paintSettingsTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{ui.numberOfCoats}</label>
                  <select
                    value={project.paintDetails.coats}
                    onChange={(e) => setProject((prev) => ({ ...prev, paintDetails: { ...prev.paintDetails, coats: parseInt(e.target.value, 10) } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{ui.paintType}</label>
                  <select
                    value={project.paintDetails.paintType}
                    onChange={(e) => {
                      const nextType = e.target.value as PaintType;
                      const defaultCoverageUserUnit = project.unit === 'metric' ? coverageRates[nextType] / SQFT_PER_SQM : coverageRates[nextType];
                      setProject((prev) => ({
                        ...prev,
                        paintDetails: { ...prev.paintDetails, paintType: nextType, paintCoverageRate: defaultCoverageUserUnit },
                      }));
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(ui.paintTypes).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{ui.paintFinish}</label>
                  <select
                    value={project.paintDetails.finish}
                    onChange={(e) => setProject((prev) => ({ ...prev, paintDetails: { ...prev.paintDetails, finish: e.target.value as PaintFinish } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(ui.paintFinishes).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{ui.surfaceCondition}</label>
                  <select
                    value={project.paintDetails.wallCondition}
                    onChange={(e) =>
                      setProject((prev) => ({ ...prev, paintDetails: { ...prev.paintDetails, wallCondition: e.target.value as PaintDetails['wallCondition'] } }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(ui.conditionOptions).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{ui.paintCoverage}</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={project.paintDetails.paintCoverageRate}
                      onChange={(e) =>
                        setProject((prev) => ({ ...prev, paintDetails: { ...prev.paintDetails, paintCoverageRate: parseFloat(e.target.value) || 0 } }))
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder={project.unit === 'metric' ? '37.2' : '400'}
                    />
                    <button
                      onClick={() => {
                        const d = project.paintDetails.paintType;
                        const defaultCoverageUserUnit = project.unit === 'metric' ? coverageRates[d] / SQFT_PER_SQM : coverageRates[d];
                        setProject((prev) => ({ ...prev, paintDetails: { ...prev.paintDetails, paintCoverageRate: defaultCoverageUserUnit } }));
                      }}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                      title={ui.useDefault}
                    >
                      {ui.useDefault}
                    </button>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {ui.unitsSqFt.replace('sq ft/gal', project.unit === 'metric' ? 'sq m/gal' : 'sq ft/gal')}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={project.paintDetails.usePrimer}
                    onChange={(e) => setProject((prev) => ({ ...prev, paintDetails: { ...prev.paintDetails, usePrimer: e.target.checked } }))}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="font-medium">{ui.includePrimer}</span>
                </label>

                {project.paintDetails.usePrimer && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{ui.primerCoats}</label>
                      <select
                        value={project.paintDetails.primerCoats}
                        onChange={(e) =>
                          setProject((prev) => ({ ...prev, paintDetails: { ...prev.paintDetails, primerCoats: parseInt(e.target.value, 10) } }))
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">{ui.primerCoverage}</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={project.paintDetails.primerCoverageRate}
                          onChange={(e) =>
                            setProject((prev) => ({ ...prev, paintDetails: { ...prev.paintDetails, primerCoverageRate: parseFloat(e.target.value) || 0 } }))
                          }
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder={project.unit === 'metric' ? '32.5' : '350'}
                        />
                        <button
                          onClick={() =>
                            setProject((prev) => ({
                              ...prev,
                              paintDetails: { ...prev.paintDetails, primerCoverageRate: project.unit === 'metric' ? 350 / SQFT_PER_SQM : 350 },
                            }))
                          }
                          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                          {ui.useDefault}
                        </button>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {ui.unitsSqFt.replace('sq ft/gal', project.unit === 'metric' ? 'sq m/gal' : 'sq ft/gal')}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <DollarSign size={20} className="text-blue-600" />
                {ui.costTitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{ui.paintPrice}</label>
                  <input
                    type="number"
                    value={project.costDetails.paintPrice}
                    onChange={(e) => setProject((prev) => ({ ...prev, costDetails: { ...prev.costDetails, paintPrice: parseFloat(e.target.value) || 0 } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min={0}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{ui.primerPrice}</label>
                  <input
                    type="number"
                    value={project.costDetails.primerPrice}
                    onChange={(e) => setProject((prev) => ({ ...prev, costDetails: { ...prev.costDetails, primerPrice: parseFloat(e.target.value) || 0 } }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min={0}
                  />
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg mb-4">
                <label className="flex items-center gap-3 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={project.costDetails.calculateLabor}
                    onChange={(e) => setProject((prev) => ({ ...prev, costDetails: { ...prev.costDetails, calculateLabor: e.target.checked } }))}
                    className="w-5 h-5 text-green-600"
                  />
                  <span className="font-medium">{ui.includeLabor}</span>
                </label>
                {project.costDetails.calculateLabor && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{ui.laborRate}</label>
                    <input
                      type="number"
                      value={project.costDetails.laborRate}
                      onChange={(e) => setProject((prev) => ({ ...prev, costDetails: { ...prev.costDetails, laborRate: parseFloat(e.target.value) || 0 } }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      min={0}
                    />
                  </div>
                )}
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={project.costDetails.includeMaterials}
                    onChange={(e) => setProject((prev) => ({ ...prev, costDetails: { ...prev.costDetails, includeMaterials: e.target.checked } }))}
                    className="w-5 h-5 text-purple-600"
                  />
                  <span className="font-medium">{ui.includeSupplies}</span>
                </label>
                {project.costDetails.includeMaterials && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">{ui.brushes}</label>
                      <input
                        type="number"
                        value={project.costDetails.brushRoller}
                        onChange={(e) => setProject((prev) => ({ ...prev, costDetails: { ...prev.costDetails, brushRoller: parseFloat(e.target.value) || 0 } }))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                        min={0}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">{ui.tape}</label>
                      <input
                        type="number"
                        value={project.costDetails.tape}
                        onChange={(e) => setProject((prev) => ({ ...prev, costDetails: { ...prev.costDetails, tape: parseFloat(e.target.value) || 0 } }))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                        min={0}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">{ui.dropCloths}</label>
                      <input
                        type="number"
                        value={project.costDetails.dropCloths}
                        onChange={(e) => setProject((prev) => ({ ...prev, costDetails: { ...prev.costDetails, dropCloths: parseFloat(e.target.value) || 0 } }))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                        min={0}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">{ui.otherSupplies}</label>
                      <input
                        type="number"
                        value={project.costDetails.other}
                        onChange={(e) => setProject((prev) => ({ ...prev, costDetails: { ...prev.costDetails, other: parseFloat(e.target.value) || 0 } }))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                        min={0}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Info size={20} className="text-blue-600" />
                Special Situations (Active Room)
              </h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeRoom.extras.accentWall}
                      onChange={(e) =>
                        updateRoom(activeRoom.id, (r) => ({ ...r, extras: { ...r.extras, accentWall: e.target.checked } }))
                      }
                      className="w-5 h-5"
                    />
                    <span className="font-medium">{ui.accentWall}</span>
                  </label>
                  {activeRoom.extras.accentWall && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">{`${ui.accentWall} (${unitText.area})`}</label>
                        <input
                          type="number"
                          min={0}
                          value={activeRoom.extras.accentWallArea}
                          onChange={(e) =>
                            updateRoom(activeRoom.id, (r) => ({ ...r, extras: { ...r.extras, accentWallArea: e.target.value } }))
                          }
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div className="text-xs text-gray-600 self-end">
                        {ui.coverageTip}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3 border rounded-lg">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeRoom.extras.wainscoting}
                      onChange={(e) =>
                        updateRoom(activeRoom.id, (r) => ({ ...r, extras: { ...r.extras, wainscoting: e.target.checked } }))
                      }
                      className="w-5 h-5"
                    />
                    <span className="font-medium">Wainscoting / chair rail (reduces wall area)</span>
                  </label>
                  {activeRoom.extras.wainscoting && (
                    <div className="mt-3">
                      <label className="block text-sm text-gray-600 mb-1">{`${ui.heightSmall} (${unitText.small})`}</label>
                      <input
                        type="number"
                        min={0}
                        value={activeRoom.extras.wainscotingHeight}
                        onChange={(e) =>
                          updateRoom(activeRoom.id, (r) => ({
                            ...r,
                            extras: { ...r.extras, wainscotingHeight: parseFloat(e.target.value) || (project.unit === 'metric' ? 91.44 : 36) },
                          }))
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                      <div className="text-xs text-gray-600 mt-1">
                        {ui.wainscotingNote}
                      </div>
                    </div>
                  )}
                </div>

                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={activeRoom.extras.crownMolding}
                    onChange={(e) =>
                      updateRoom(activeRoom.id, (r) => ({ ...r, extras: { ...r.extras, crownMolding: e.target.checked } }))
                      }
                      className="w-5 h-5"
                    />
                    <span className="font-medium">{ui.crownMolding}</span>
                  </label>

                <div className="p-3 border rounded-lg">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeRoom.extras.fireplace}
                      onChange={(e) =>
                        updateRoom(activeRoom.id, (r) => ({ ...r, extras: { ...r.extras, fireplace: e.target.checked } }))
                      }
                      className="w-5 h-5"
                    />
                    <span className="font-medium">{ui.fireplace}</span>
                  </label>
                  {activeRoom.extras.fireplace && (
                    <div className="mt-3">
                      <label className="block text-sm text-gray-600 mb-1">{`${ui.fireplace} (${unitText.area})`}</label>
                      <input
                        type="number"
                        min={0}
                        value={activeRoom.extras.fireplaceArea}
                        onChange={(e) =>
                          updateRoom(activeRoom.id, (r) => ({ ...r, extras: { ...r.extras, fireplaceArea: e.target.value } }))
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="p-3 border rounded-lg">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeRoom.extras.builtIns}
                      onChange={(e) =>
                        updateRoom(activeRoom.id, (r) => ({ ...r, extras: { ...r.extras, builtIns: e.target.checked } }))
                      }
                      className="w-5 h-5"
                    />
                    <span className="font-medium">Built-ins (exclude area)</span>
                  </label>
                  {activeRoom.extras.builtIns && (
                    <div className="mt-3">
                      <label className="block text-sm text-gray-600 mb-1">{`${ui.builtIns} (${unitText.area})`}</label>
                      <input
                        type="number"
                        min={0}
                        value={activeRoom.extras.builtInsArea}
                        onChange={(e) =>
                          updateRoom(activeRoom.id, (r) => ({ ...r, extras: { ...r.extras, builtInsArea: e.target.value } }))
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg p-6 print:shadow-none print:rounded-none print:bg-white print:text-black print:border">
              <h3 className="text-xl font-bold mb-4">{ui.summaryTitle}</h3>
              <div className="space-y-4">
                <div className="bg-white/95 text-gray-900 rounded-xl p-4 shadow-sm print:bg-transparent print:p-0">
                  <div className="text-sm text-gray-800 mb-1 print:text-black">{ui.totalArea}</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {formatArea(totals.totalArea)} {unitText.area}
                  </div>
                </div>
                <div className="bg-white/95 text-gray-900 rounded-xl p-4 shadow-sm print:bg-transparent print:p-0">
                  <div className="text-sm text-gray-800 mb-1 print:text-black">{ui.estimatedTime}</div>
                  <div className="text-3xl font-bold text-gray-900">{totals.timeEstimate} hours</div>
                </div>
                <div className="bg-white/95 text-gray-900 rounded-xl p-4 shadow-sm print:bg-transparent print:p-0">
                  <div className="text-sm text-gray-800 mb-1 print:text-black">{ui.totalCost}</div>
                  <div className="text-3xl font-bold text-gray-900">${totals.totalCost}</div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] p-6 print:shadow-none print:rounded-none print:border">
              <h3 className="text-lg font-semibold mb-4">{ui.paintRequired}</h3>
              <div className="space-y-3">
                {any.walls && (
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">{surfaceLabelMap.walls}</span>
                    <span className="text-blue-600 font-bold">
                      {totals.wallPaint.gallons}g {totals.wallPaint.quarts}qt
                    </span>
                  </div>
                )}
                {any.accentWall && (
                  <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                    <span className="font-medium">{ui.accentWall}</span>
                    <span className="text-indigo-700 font-bold">
                      {totals.accentWallPaint.gallons}g {totals.accentWallPaint.quarts}qt
                    </span>
                  </div>
                )}
                {any.ceiling && (
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">{surfaceLabelMap.ceiling}</span>
                    <span className="text-purple-600 font-bold">
                      {totals.ceilingPaint.gallons}g {totals.ceilingPaint.quarts}qt
                    </span>
                  </div>
                )}
                {any.trim && (
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">{surfaceLabelMap.trim}</span>
                    <span className="text-green-600 font-bold">
                      {totals.trimPaint.gallons}g {totals.trimPaint.quarts}qt
                    </span>
                  </div>
                )}
                {any.doors && (
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium capitalize">{surfaceLabelMap.doors}</span>
                    <span className="text-yellow-600 font-bold">
                      {totals.doorPaint.gallons}g {totals.doorPaint.quarts}qt
                    </span>
                  </div>
                )}
                {project.paintDetails.usePrimer && (
                  <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                    <span className="font-medium">{ui.primerLabel}</span>
                    <span className="text-gray-700 font-bold">
                      {totals.primer.gallons}g {totals.primer.quarts}qt
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-gray-600">
                  {ui.perCoatCoverage
                    .replace('{rate}', String(project.paintDetails.paintCoverageRate))
                    .replace('{unit}', project.unit === 'metric' ? 'sq m/gal' : 'sq ft/gal')}
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] p-6 print:shadow-none print:rounded-none print:border">
              <h3 className="text-lg font-semibold mb-4">{ui.costBreakdown}</h3>
              <div className="space-y-2">
                <div className="text-xs text-gray-500">{ui.paintBySurface}</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                  {any.walls && (
                    <>
                      <div className="text-gray-600">{surfaceLabelMap.walls}</div>
                      <div className="text-right font-medium">${totals.paintBySurfaceCost.walls}</div>
                    </>
                  )}
                  {any.accentWall && (
                    <>
                      <div className="text-gray-600">{ui.accentWall}</div>
                      <div className="text-right font-medium">${totals.paintBySurfaceCost.accentWall}</div>
                    </>
                  )}
                  {any.ceiling && (
                    <>
                      <div className="text-gray-600">{surfaceLabelMap.ceiling}</div>
                      <div className="text-right font-medium">${totals.paintBySurfaceCost.ceiling}</div>
                    </>
                  )}
                  {any.trim && (
                    <>
                      <div className="text-gray-600">{surfaceLabelMap.trim}</div>
                      <div className="text-right font-medium">${totals.paintBySurfaceCost.trim}</div>
                    </>
                  )}
                  {any.doors && (
                    <>
                      <div className="text-gray-600 capitalize">{surfaceLabelMap.doors}</div>
                      <div className="text-right font-medium">${totals.paintBySurfaceCost.doors}</div>
                    </>
                  )}
                </div>
                <div className="pt-2 border-t" />
                <div className="flex justify-between">
                  <span className="text-gray-600">{ui.paint}</span>
                  <span className="font-semibold">${totals.paintCost}</span>
                </div>
                {project.paintDetails.usePrimer && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">{ui.primerLabel}</span>
                    <span className="font-semibold">${totals.primerCost}</span>
                  </div>
                )}
                {project.costDetails.includeMaterials && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">{ui.supplies}</span>
                    <span className="font-semibold">${totals.materialsCost}</span>
                  </div>
                )}
                {project.costDetails.calculateLabor && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">{`${ui.includeLabor} (${totals.timeEstimate}h)`}</span>
                    <span className="font-semibold">${totals.laborCost}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t-2 border-gray-200">
                  <span className="font-bold text-lg">{ui.total}</span>
                  <span className="font-bold text-lg text-blue-600">${totals.totalCost}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] p-6 print:shadow-none print:rounded-none print:border">
              <h3 className="text-lg font-semibold mb-4">Shopping List</h3>
              <div className="space-y-2 text-sm">
                {any.walls && (
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <span>
                      Wall paint: {totals.wallPaint.gallons} gallons, {totals.wallPaint.quarts} quarts ({paintTypeLabel[project.paintDetails.paintType]},{' '}
                      {finishLabel[project.paintDetails.finish]})
                    </span>
                  </div>
                )}
                {any.accentWall && (
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2" />
                    <span>
                      Accent wall paint: {totals.accentWallPaint.gallons} gallons, {totals.accentWallPaint.quarts} quarts ({paintTypeLabel[project.paintDetails.paintType]},{' '}
                      {finishLabel[project.paintDetails.finish]})
                    </span>
                  </div>
                )}
                {any.ceiling && (
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                    <span>
                      Ceiling paint: {totals.ceilingPaint.gallons} gallons, {totals.ceilingPaint.quarts} quarts
                    </span>
                  </div>
                )}
                {any.trim && (
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                    <span>
                      Trim paint: {totals.trimPaint.gallons} gallons, {totals.trimPaint.quarts} quarts
                    </span>
                  </div>
                )}
                {any.doors && (
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2" />
                    <span>
                      Door paint: {totals.doorPaint.gallons} gallons, {totals.doorPaint.quarts} quarts
                    </span>
                  </div>
                )}
                {project.paintDetails.usePrimer && (
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-gray-700 rounded-full mt-2" />
                    <span>
                      Primer: {totals.primer.gallons} gallons, {totals.primer.quarts} quarts
                    </span>
                  </div>
                )}

                {project.costDetails.includeMaterials && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="font-medium mb-1">Supplies</div>
                    <div className="space-y-1 text-gray-700">
                      <div>Brushes & rollers: ${project.costDetails.brushRoller.toFixed(2)}</div>
                      <div>Painter's tape: ${project.costDetails.tape.toFixed(2)}</div>
                      <div>Drop cloths: ${project.costDetails.dropCloths.toFixed(2)}</div>
                      <div>Other supplies: ${project.costDetails.other.toFixed(2)}</div>
                    </div>
                  </div>
                )}
              </div>

              <button onClick={handlePrint} className="w-full mt-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition print:hidden">
                Print shopping list
              </button>
            </div>

            <details className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] p-6 print:shadow-none print:rounded-none print:border">
              <summary className="cursor-pointer font-semibold">Room-by-room breakdown</summary>
              <div className="mt-4 space-y-3">
                {computedRooms.map((r) => (
                  <div key={r.id} className="border rounded-lg p-4">
                    <div className="font-semibold mb-2">{r.measurements.name || 'Room'}</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Area to paint: {formatArea(r.results.totalArea)} {unitText.area}</div>
                      <div>Time: {r.results.timeEstimate}h</div>
                      <div>Walls: {r.results.wallPaint.gallons}g {r.results.wallPaint.quarts}qt</div>
                      {r.extras.accentWall && <div>Accent: {r.results.accentWallPaint.gallons}g {r.results.accentWallPaint.quarts}qt</div>}
                      <div>Paint (room): ${r.results.paintCost}</div>
                      <div>Primer (room): ${r.results.primerCost}</div>
                    </div>
                  </div>
                ))}
              </div>
            </details>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4 print:border print:border-yellow-400 print:border-l-4">
              <div className="flex items-start gap-3">
                <Info size={20} className="text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold text-yellow-900 mb-1">Pro Tips</div>
                  <ul className="space-y-1 text-yellow-800">
                    <li>Buy 10–15% extra paint for touch-ups</li>
                    <li>Prime dark colors before painting light</li>
                    <li>Two thin coats &gt; one thick coat</li>
                    <li>Save paint labels for future reference</li>
                    <li>Best conditions: low humidity, 50–85°F (10–30°C)</li>
                  </ul>
                </div>
              </div>
            </div>

            <details className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] p-6 print:shadow-none print:rounded-none print:border">
              <summary className="cursor-pointer font-semibold">Surface Condition Guide</summary>
              <div className="mt-4 text-sm text-gray-700 space-y-3">
                <div>
                  <div className="font-semibold">New / Excellent (100%)</div>
                  <div>Clean, sealed, uniform texture. Minimal absorption.</div>
                </div>
                <div>
                  <div className="font-semibold">Good (110%)</div>
                  <div>Previously painted, minor scuffs/patches, normal absorption.</div>
                </div>
                <div>
                  <div className="font-semibold">Fair (120%)</div>
                  <div>Multiple patches, light repairs, uneven texture/porosity.</div>
                </div>
                <div>
                  <div className="font-semibold">Poor (130%)</div>
                  <div>Heavy repairs, chalky surfaces, stains, rough texture; expect higher absorption.</div>
                </div>
              </div>
            </details>

            <details className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] p-6 print:shadow-none print:rounded-none print:border">
              <summary className="cursor-pointer font-semibold">Paint Coverage Info</summary>
              <div className="mt-4 text-sm text-gray-700 space-y-2">
                <div><span className="font-semibold">Typical coverage</span>: many paints cover ~350–450 sq ft/gal (≈ 32–42 sq m/gal) per coat.</div>
                <div><span className="font-semibold">Why it varies</span>: texture (orange peel, popcorn), porosity (new drywall), and color changes (dark→light) reduce coverage.</div>
                <div><span className="font-semibold">Tip</span>: If you know your brand’s label coverage, enter it in “Paint Coverage Rate” for best accuracy.</div>
              </div>
            </details>
          </div>
        </div>

        {toast && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg print:hidden">
            {toast}
          </div>
        )}

        {showSaveModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 print:hidden">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
              <h3 className="text-lg font-semibold mb-2">Save project</h3>
              <label className="block text-sm text-gray-600 mb-1">Project name</label>
              <input
                value={projectNameDraft}
                onChange={(e) => setProjectNameDraft(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g. Condo repaint"
              />
              <div className="flex gap-2 mt-4 justify-end">
                <button onClick={handleCloseSave} className="px-4 py-2 rounded-lg border hover:bg-gray-50">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Placeholder: next step wires localStorage save + history UI.
                    const name = projectNameDraft.trim() || `Project ${new Date().toLocaleString()}`;
                    const entry = { id: uid('proj'), name, savedAt: Date.now(), project };
                    const next = [entry, ...savedProjects].slice(0, 50);
                    persistSavedProjects(next);
                    setSelectedSavedId(entry.id);
                    setShowSaveModal(false);
                    showToast('Saved');
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
