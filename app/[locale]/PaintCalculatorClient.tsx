'use client';

import React, { useEffect, useState } from 'react';
import { Ruler, DollarSign, Home, Droplet, Info, Download, Share2, Save, Palette, Settings } from 'lucide-react';
import { Locale } from '@/i18n/config';

type Unit = 'feet' | 'meters';

type DoorSize = 'standard' | 'double' | 'french' | 'custom';
type WindowSize = 'small' | 'medium' | 'large' | 'bay' | 'custom';
type PaintType = 'latex' | 'oil' | 'primer' | 'enamel' | 'exterior' | 'ceiling';

interface Measurements {
  length: string;
  width: string;
  height: string;
  doors: number;
  windows: number;
  doorSize: DoorSize;
  windowSize: WindowSize;
  customDoorWidth: string;
  customDoorHeight: string;
  customWindowWidth: string;
  customWindowHeight: string;
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
  finish: 'flat' | 'eggshell' | 'satin' | 'semigloss' | 'gloss';
  brand: 'behr' | 'sherwin' | 'valspar';
  wallCondition: 'new' | 'good' | 'fair' | 'poor';
  usePrimer: boolean;
  primerCoats: number;
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
  wainscoting: boolean;
  wainscotingHeight: number;
  crownMolding: boolean;
  builtIns: number;
  fireplace: boolean;
}

interface PaintAmount {
  gallons: number;
  quarts: number;
  total?: number;
}

interface Results {
  wallArea: number;
  ceilingArea: number;
  trimArea: number;
  doorArea: number;
  totalArea: number;
  wallPaint: PaintAmount;
  ceilingPaint: PaintAmount;
  trimPaint: PaintAmount;
  doorPaint: PaintAmount;
  primer: PaintAmount;
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

export default function PaintCalculatorClient({ locale: _locale }: PaintCalculatorClientProps) {
  const [activeTab, setActiveTab] = useState<'interior' | 'exterior' | 'ceiling' | 'trim'>('interior');
  const [unit, setUnit] = useState<Unit>('feet');

  const [measurements, setMeasurements] = useState<Measurements>({
    length: '',
    width: '',
    height: '',
    doors: 0,
    windows: 0,
    doorSize: 'standard',
    windowSize: 'medium',
    customDoorWidth: '',
    customDoorHeight: '',
    customWindowWidth: '',
    customWindowHeight: '',
  });

  const [surfaces, setSurfaces] = useState<Surfaces>({
    walls: true,
    ceiling: false,
    trim: false,
    doors: false,
  });

  const [paintDetails, setPaintDetails] = useState<PaintDetails>({
    coats: 2,
    paintType: 'latex',
    finish: 'eggshell',
    brand: 'behr',
    wallCondition: 'good',
    usePrimer: false,
    primerCoats: 1,
  });

  const [costDetails, setCostDetails] = useState<CostDetails>({
    paintPrice: 35,
    primerPrice: 25,
    calculateLabor: false,
    laborRate: 50,
    includeMaterials: true,
    brushRoller: 25,
    tape: 10,
    dropCloths: 15,
    other: 0,
  });

  const [extras, setExtras] = useState<Extras>({
    accentWall: false,
    wainscoting: false,
    wainscotingHeight: 36,
    crownMolding: false,
    builtIns: 0,
    fireplace: false,
  });

  const [results, setResults] = useState<Results>({
    wallArea: 0,
    ceilingArea: 0,
    trimArea: 0,
    doorArea: 0,
    totalArea: 0,
    wallPaint: { gallons: 0, quarts: 0 },
    ceilingPaint: { gallons: 0, quarts: 0 },
    trimPaint: { gallons: 0, quarts: 0 },
    doorPaint: { gallons: 0, quarts: 0 },
    primer: { gallons: 0, quarts: 0 },
    totalCost: '0.00',
    paintCost: '0.00',
    primerCost: '0.00',
    laborCost: '0.00',
    materialsCost: '0.00',
    timeEstimate: 0,
  });

  const coverageRates: Record<PaintType, number> = {
    latex: 400,
    oil: 350,
    primer: 300,
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

  const convertToFeet = (value: number) => (unit === 'meters' ? value * 3.28084 : value);

  const calculatePaint = () => {
    const len = parseFloat(measurements.length) || 0;
    const wid = parseFloat(measurements.width) || 0;
    const hei = parseFloat(measurements.height) || 0;
    if (len === 0 || wid === 0 || hei === 0) return;

    const length = convertToFeet(len);
    const width = convertToFeet(wid);
    const height = convertToFeet(hei);

    const wallPerimeter = 2 * (length + width);
    const grossWallArea = wallPerimeter * height;
    const ceilingArea = length * width;

    let doorArea = 0;
    if (measurements.doorSize === 'custom' && measurements.customDoorWidth && measurements.customDoorHeight) {
      doorArea =
        (parseFloat(measurements.customDoorWidth) / 12) *
        (parseFloat(measurements.customDoorHeight) / 12) *
        measurements.doors;
    } else if (measurements.doorSize !== 'custom') {
      const doorDim = doorSizes[measurements.doorSize];
      doorArea = (doorDim.width / 12) * (doorDim.height / 12) * measurements.doors;
    }

    let windowArea = 0;
    if (measurements.windowSize === 'custom' && measurements.customWindowWidth && measurements.customWindowHeight) {
      windowArea =
        (parseFloat(measurements.customWindowWidth) / 12) *
        (parseFloat(measurements.customWindowHeight) / 12) *
        measurements.windows;
    } else if (measurements.windowSize !== 'custom') {
      const windowDim = windowSizes[measurements.windowSize];
      windowArea = (windowDim.width / 12) * (windowDim.height / 12) * measurements.windows;
    }

    const netWallArea = grossWallArea - doorArea - windowArea;

    let trimArea = 0;
    if (surfaces.trim) {
      const baseboardHeight = 0.5; // 6 inches
      trimArea = wallPerimeter * baseboardHeight;
      if (extras.crownMolding) {
        trimArea += wallPerimeter * 0.5;
      }
    }

    let finalWallArea = netWallArea;
    if (extras.wainscoting) {
      const wainscotingFt = extras.wainscotingHeight / 12;
      const wainscotingArea = wallPerimeter * wainscotingFt;
      finalWallArea -= wainscotingArea;
    }

    const coverage = coverageRates[paintDetails.paintType];
    const primerCoverage = coverageRates.primer;
    const wasteFactor = paintDetails.wallCondition === 'poor' ? 1.15 : 1.1;

    const calculateGallonsQuarts = (area: number, coats: number, coverageRate: number): PaintAmount => {
      const totalSqFt = area * coats * wasteFactor;
      const gallonsNeeded = totalSqFt / coverageRate;
      const gallons = Math.floor(gallonsNeeded);
      const quarts = Math.ceil((gallonsNeeded - gallons) * 4);
      return { gallons, quarts: quarts === 4 ? 0 : quarts, total: gallons + (quarts === 4 ? 1 : 0) };
    };

    const wallPaint = surfaces.walls ? calculateGallonsQuarts(finalWallArea, paintDetails.coats, coverage) : { gallons: 0, quarts: 0, total: 0 };
    const ceilingPaint = surfaces.ceiling ? calculateGallonsQuarts(ceilingArea, paintDetails.coats, coverageRates.ceiling) : { gallons: 0, quarts: 0, total: 0 };
    const trimPaint = surfaces.trim ? calculateGallonsQuarts(trimArea, paintDetails.coats, coverage) : { gallons: 0, quarts: 0, total: 0 };
    const doorPaint = surfaces.doors ? calculateGallonsQuarts(doorArea * 2, paintDetails.coats, coverage) : { gallons: 0, quarts: 0, total: 0 };

    const totalPaintArea =
      (surfaces.walls ? finalWallArea : 0) +
      (surfaces.ceiling ? ceilingArea : 0) +
      (surfaces.trim ? trimArea : 0) +
      (surfaces.doors ? doorArea * 2 : 0);

    const primer = paintDetails.usePrimer
      ? calculateGallonsQuarts(totalPaintArea, paintDetails.primerCoats, primerCoverage)
      : { gallons: 0, quarts: 0, total: 0 };

    const paintCost =
      ((wallPaint.total ?? 0) +
        (ceilingPaint.total ?? 0) +
        (trimPaint.total ?? 0) +
        (doorPaint.total ?? 0)) *
      costDetails.paintPrice;
    const primerCost = paintDetails.usePrimer ? (primer.total || 0) * costDetails.primerPrice : 0;

    const materialsCost = costDetails.includeMaterials
      ? costDetails.brushRoller + costDetails.tape + costDetails.dropCloths + costDetails.other
      : 0;

    const timeEstimate = Math.ceil((totalPaintArea / 200) * paintDetails.coats);
    const laborCost = costDetails.calculateLabor ? timeEstimate * costDetails.laborRate : 0;
    const totalCost = paintCost + primerCost + materialsCost + laborCost;

    setResults({
      wallArea: Math.round(finalWallArea),
      ceilingArea: Math.round(ceilingArea),
      trimArea: Math.round(trimArea),
      doorArea: Math.round(doorArea * 2),
      totalArea: Math.round(totalPaintArea),
      wallPaint,
      ceilingPaint,
      trimPaint,
      doorPaint,
      primer,
      totalCost: totalCost.toFixed(2),
      paintCost: paintCost.toFixed(2),
      primerCost: primerCost.toFixed(2),
      laborCost: laborCost.toFixed(2),
      materialsCost: materialsCost.toFixed(2),
      timeEstimate,
    });
  };

  useEffect(() => {
    calculatePaint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measurements, surfaces, paintDetails, costDetails, extras, unit]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Droplet className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Professional Paint Calculator</h1>
                <p className="text-gray-600">Calculate paint, primer, cost & time for any project</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Save size={18} />
                Save
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Download size={18} />
                PDF
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>

          <div className="flex gap-2 border-b">
            {['interior', 'exterior', 'ceiling', 'trim'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-6 py-3 font-medium capitalize transition ${
                  activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings size={20} className="text-blue-600" />
                Measurement System
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setUnit('feet')}
                  className={`flex-1 py-3 rounded-lg font-medium transition ${
                    unit === 'feet' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Feet / Inches
                </button>
                <button
                  onClick={() => setUnit('meters')}
                  className={`flex-1 py-3 rounded-lg font-medium transition ${
                    unit === 'meters' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Meters / CM
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Ruler size={20} className="text-blue-600" />
                Room Dimensions
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length ({unit === 'feet' ? 'ft' : 'm'})
                  </label>
                  <input
                    type="number"
                    value={measurements.length}
                    onChange={(e) => setMeasurements({ ...measurements, length: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width ({unit === 'feet' ? 'ft' : 'm'})
                  </label>
                  <input
                    type="number"
                    value={measurements.width}
                    onChange={(e) => setMeasurements({ ...measurements, width: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height ({unit === 'feet' ? 'ft' : 'm'})
                  </label>
                  <input
                    type="number"
                    value={measurements.height}
                    onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Doors</label>
                  <input
                    type="number"
                    value={measurements.doors}
                    onChange={(e) => setMeasurements({ ...measurements, doors: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={0}
                  />
                  <select
                    value={measurements.doorSize}
                    onChange={(e) => setMeasurements({ ...measurements, doorSize: e.target.value as DoorSize })}
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="standard">Standard (36" x 80")</option>
                    <option value="double">Double (72" x 80")</option>
                    <option value="french">French (60" x 80")</option>
                    <option value="custom">Custom Size</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Windows</label>
                  <input
                    type="number"
                    value={measurements.windows}
                    onChange={(e) => setMeasurements({ ...measurements, windows: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={0}
                  />
                  <select
                    value={measurements.windowSize}
                    onChange={(e) => setMeasurements({ ...measurements, windowSize: e.target.value as WindowSize })}
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="small">Small (24" x 36")</option>
                    <option value="medium">Medium (36" x 48")</option>
                    <option value="large">Large (60" x 60")</option>
                    <option value="bay">Bay Window (120" x 60")</option>
                    <option value="custom">Custom Size</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Home size={20} className="text-blue-600" />
                Surfaces to Paint
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(surfaces).map(([key, value]) => (
                  <label
                    key={key}
                    className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                  >
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setSurfaces({ ...surfaces, [key]: e.target.checked } as Surfaces)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="capitalize font-medium">{key}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Palette size={20} className="text-blue-600" />
                Paint Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Coats</label>
                  <select
                    value={paintDetails.coats}
                    onChange={(e) => setPaintDetails({ ...paintDetails, coats: parseInt(e.target.value, 10) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1">1 Coat</option>
                    <option value="2">2 Coats (Recommended)</option>
                    <option value="3">3 Coats</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paint Type</label>
                  <select
                    value={paintDetails.paintType}
                    onChange={(e) => setPaintDetails({ ...paintDetails, paintType: e.target.value as PaintType })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="latex">Latex (Water-Based)</option>
                    <option value="oil">Oil-Based</option>
                    <option value="enamel">Enamel</option>
                    <option value="exterior">Exterior Paint</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paint Finish</label>
                  <select
                    value={paintDetails.finish}
                    onChange={(e) => setPaintDetails({ ...paintDetails, finish: e.target.value as PaintDetails['finish'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="flat">Flat / Matte</option>
                    <option value="eggshell">Eggshell</option>
                    <option value="satin">Satin</option>
                    <option value="semigloss">Semi-Gloss</option>
                    <option value="gloss">High Gloss</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wall Condition</label>
                  <select
                    value={paintDetails.wallCondition}
                    onChange={(e) => setPaintDetails({ ...paintDetails, wallCondition: e.target.value as PaintDetails['wallCondition'] })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">New / Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair (Some Repairs)</option>
                    <option value="poor">Poor (Major Repairs)</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={paintDetails.usePrimer}
                    onChange={(e) => setPaintDetails({ ...paintDetails, usePrimer: e.target.checked })}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="font-medium">Include Primer</span>
                </label>
                {paintDetails.usePrimer && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primer Coats</label>
                    <select
                      value={paintDetails.primerCoats}
                      onChange={(e) => setPaintDetails({ ...paintDetails, primerCoats: parseInt(e.target.value, 10) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1">1 Coat</option>
                      <option value="2">2 Coats</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <DollarSign size={20} className="text-blue-600" />
                Cost Estimation
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paint Price (per gallon)</label>
                  <input
                    type="number"
                    value={costDetails.paintPrice}
                    onChange={(e) => setCostDetails({ ...costDetails, paintPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="35"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primer Price (per gallon)</label>
                  <input
                    type="number"
                    value={costDetails.primerPrice}
                    onChange={(e) => setCostDetails({ ...costDetails, primerPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="25"
                  />
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg mb-4">
                <label className="flex items-center gap-3 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={costDetails.calculateLabor}
                    onChange={(e) => setCostDetails({ ...costDetails, calculateLabor: e.target.checked })}
                    className="w-5 h-5 text-green-600"
                  />
                  <span className="font-medium">Include Labor Cost</span>
                </label>
                {costDetails.calculateLabor && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Labor Rate (per hour)</label>
                    <input
                      type="number"
                      value={costDetails.laborRate}
                      onChange={(e) => setCostDetails({ ...costDetails, laborRate: parseFloat(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="50"
                    />
                  </div>
                )}
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={costDetails.includeMaterials}
                    onChange={(e) => setCostDetails({ ...costDetails, includeMaterials: e.target.checked })}
                    className="w-5 h-5 text-purple-600"
                  />
                  <span className="font-medium">Include Supplies Cost</span>
                </label>
                {costDetails.includeMaterials && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Brushes & Rollers</label>
                      <input
                        type="number"
                        value={costDetails.brushRoller}
                        onChange={(e) => setCostDetails({ ...costDetails, brushRoller: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Painter's Tape</label>
                      <input
                        type="number"
                        value={costDetails.tape}
                        onChange={(e) => setCostDetails({ ...costDetails, tape: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Drop Cloths</label>
                      <input
                        type="number"
                        value={costDetails.dropCloths}
                        onChange={(e) => setCostDetails({ ...costDetails, dropCloths: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Other</label>
                      <input
                        type="number"
                        value={costDetails.other}
                        onChange={(e) => setCostDetails({ ...costDetails, other: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Info size={20} className="text-blue-600" />
                Additional Features
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={extras.accentWall}
                    onChange={(e) => setExtras({ ...extras, accentWall: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span>Accent Wall (Different Color)</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={extras.wainscoting}
                    onChange={(e) => setExtras({ ...extras, wainscoting: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span>Wainscoting / Chair Rail</span>
                </label>
                {extras.wainscoting && (
                  <div className="ml-8">
                    <label className="block text-sm text-gray-600 mb-1">Height (inches)</label>
                    <input
                      type="number"
                      value={extras.wainscotingHeight}
                      onChange={(e) => setExtras({ ...extras, wainscotingHeight: parseFloat(e.target.value) || 36 })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                )}
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={extras.crownMolding}
                    onChange={(e) => setExtras({ ...extras, crownMolding: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span>Crown Molding</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={extras.fireplace}
                    onChange={(e) => setExtras({ ...extras, fireplace: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span>Fireplace (Exclude Area)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Your Project Summary</h3>
              <div className="space-y-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Total Area to Paint</div>
                  <div className="text-3xl font-bold">{results.totalArea} sq ft</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Estimated Time</div>
                  <div className="text-3xl font-bold">{results.timeEstimate} hours</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Total Project Cost</div>
                  <div className="text-3xl font-bold">${results.totalCost}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Paint Required</h3>
              <div className="space-y-3">
                {surfaces.walls && (
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Walls</span>
                    <span className="text-blue-600 font-bold">
                      {results.wallPaint.gallons}g {results.wallPaint.quarts}qt
                    </span>
                  </div>
                )}
                {surfaces.ceiling && (
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Ceiling</span>
                    <span className="text-purple-600 font-bold">
                      {results.ceilingPaint.gallons}g {results.ceilingPaint.quarts}qt
                    </span>
                  </div>
                )}
                {surfaces.trim && (
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Trim</span>
                    <span className="text-green-600 font-bold">
                      {results.trimPaint.gallons}g {results.trimPaint.quarts}qt
                    </span>
                  </div>
                )}
                {surfaces.doors && (
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium">Doors</span>
                    <span className="text-yellow-600 font-bold">
                      {results.doorPaint.gallons}g {results.doorPaint.quarts}qt
                    </span>
                  </div>
                )}
                {paintDetails.usePrimer && (
                  <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                    <span className="font-medium">Primer</span>
                    <span className="text-gray-600 font-bold">
                      {results.primer.gallons}g {results.primer.quarts}qt
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="text-sm text-gray-600 mb-2">
                  Per coat • Coverage: {coverageRates[paintDetails.paintType]} sq ft/gal
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Cost Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Paint</span>
                  <span className="font-semibold">${results.paintCost}</span>
                </div>
                {paintDetails.usePrimer && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Primer</span>
                    <span className="font-semibold">${results.primerCost}</span>
                  </div>
                )}
                {costDetails.includeMaterials && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Supplies</span>
                    <span className="font-semibold">${results.materialsCost}</span>
                  </div>
                )}
                {costDetails.calculateLabor && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Labor ({results.timeEstimate}h)</span>
                    <span className="font-semibold">${results.laborCost}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t-2 border-gray-200">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-blue-600">${results.totalCost}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Shopping List</h3>
              <div className="space-y-2 text-sm">
                {surfaces.walls && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span>Wall Paint: {results.wallPaint.gallons} gallons, {results.wallPaint.quarts} quarts</span>
                  </div>
                )}
                {surfaces.ceiling && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full" />
                    <span>Ceiling Paint: {results.ceilingPaint.gallons} gallons, {results.ceilingPaint.quarts} quarts</span>
                  </div>
                )}
                {paintDetails.usePrimer && (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full" />
                    <span>Primer: {results.primer.gallons} gallons, {results.primer.quarts} quarts</span>
                  </div>
                )}
                {costDetails.includeMaterials && (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full" />
                      <span>Brushes & Rollers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full" />
                      <span>Painter's Tape</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full" />
                      <span>Drop Cloths</span>
                    </div>
                  </>
                )}
              </div>
              <button className="w-full mt-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                Print Shopping List
              </button>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info size={20} className="text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold text-yellow-900 mb-1">Pro Tips</div>
                  <ul className="space-y-1 text-yellow-800">
                    <li>• Always buy 10-15% extra paint for touch-ups</li>
                    <li>• Prime dark colors before painting light</li>
                    <li>• Two thin coats are better than one thick coat</li>
                    <li>• Save paint can labels for future reference</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
