'use client';

import { useState, useEffect } from 'react';
import { getTranslations } from '@/i18n';
import { Locale } from '@/i18n/config';

interface Wall {
  id: string;
  length: number;
  height: number;
}

interface DoorWindow {
  id: string;
  width: number;
  height: number;
  type: 'door' | 'window';
}

interface Room {
  id: string;
  name: string;
  walls: Wall[];
  doorsWindows: DoorWindow[];
}

interface PaintCalculatorClientProps {
  locale: Locale;
}

export default function PaintCalculatorClient({ locale }: PaintCalculatorClientProps) {
  const t = getTranslations(locale);
  
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      name: `${t.page.room} 1`,
      walls: [{ id: 'w1', length: 0, height: 0 }],
      doorsWindows: [],
    },
  ]);

  const [paintCoverage, setPaintCoverage] = useState(350);
  const [coats, setCoats] = useState(2);
  const [pricePerGallon, setPricePerGallon] = useState(0);

  useEffect(() => {
    const t = getTranslations(locale);
    setRooms([{
      id: '1',
      name: `${t.page.room} 1`,
      walls: [{ id: 'w1', length: 0, height: 0 }],
      doorsWindows: [],
    }]);
  }, [locale]);

  const addRoom = () => {
    const newRoom: Room = {
      id: Date.now().toString(),
      name: `${t.page.room} ${rooms.length + 1}`,
      walls: [{ id: `w${Date.now()}`, length: 0, height: 0 }],
      doorsWindows: [],
    };
    setRooms([...rooms, newRoom]);
  };

  const removeRoom = (roomId: string) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter((r) => r.id !== roomId));
    }
  };

  const updateRoomName = (roomId: string, name: string) => {
    setRooms(rooms.map((r) => (r.id === roomId ? { ...r, name } : r)));
  };

  const addWall = (roomId: string) => {
    setRooms(
      rooms.map((r) =>
        r.id === roomId
          ? {
              ...r,
              walls: [
                ...r.walls,
                { id: `w${Date.now()}`, length: 0, height: 0 },
              ],
            }
          : r
      )
    );
  };

  const removeWall = (roomId: string, wallId: string) => {
    setRooms(
      rooms.map((r) =>
        r.id === roomId
          ? { ...r, walls: r.walls.filter((w) => w.id !== wallId) }
          : r
      )
    );
  };

  const updateWall = (
    roomId: string,
    wallId: string,
    field: 'length' | 'height',
    value: number
  ) => {
    setRooms(
      rooms.map((r) =>
        r.id === roomId
          ? {
              ...r,
              walls: r.walls.map((w) =>
                w.id === wallId ? { ...w, [field]: value } : w
              ),
            }
          : r
      )
    );
  };

  const addDoorWindow = (roomId: string, type: 'door' | 'window') => {
    setRooms(
      rooms.map((r) =>
        r.id === roomId
          ? {
              ...r,
              doorsWindows: [
                ...r.doorsWindows,
                { id: `dw${Date.now()}`, width: 0, height: 0, type },
              ],
            }
          : r
      )
    );
  };

  const removeDoorWindow = (roomId: string, dwId: string) => {
    setRooms(
      rooms.map((r) =>
        r.id === roomId
          ? { ...r, doorsWindows: r.doorsWindows.filter((dw) => dw.id !== dwId) }
          : r
      )
    );
  };

  const updateDoorWindow = (
    roomId: string,
    dwId: string,
    field: 'width' | 'height',
    value: number
  ) => {
    setRooms(
      rooms.map((r) =>
        r.id === roomId
          ? {
              ...r,
              doorsWindows: r.doorsWindows.map((dw) =>
                dw.id === dwId ? { ...dw, [field]: value } : dw
              ),
            }
          : r
      )
    );
  };

  const calculateTotalArea = () => {
    let totalArea = 0;

    rooms.forEach((room) => {
      const wallArea = room.walls.reduce(
        (sum, wall) => sum + wall.length * wall.height,
        0
      );

      const doorsWindowsArea = room.doorsWindows.reduce(
        (sum, dw) => sum + dw.width * dw.height,
        0
      );

      totalArea += wallArea - doorsWindowsArea;
    });

    return Math.max(0, totalArea);
  };

  const calculatePaintNeeded = () => {
    const totalArea = calculateTotalArea();
    const areaWithCoats = totalArea * coats;
    const gallonsNeeded = areaWithCoats / paintCoverage;
    return Math.ceil(gallonsNeeded * 10) / 10;
  };

  const calculateCost = () => {
    const gallonsNeeded = calculatePaintNeeded();
    return gallonsNeeded * pricePerGallon;
  };

  const totalArea = calculateTotalArea();
  const gallonsNeeded = calculatePaintNeeded();
  const totalCost = calculateCost();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t.page.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t.page.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t.page.paintSettings}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.page.coverage}
                  </label>
                  <input
                    type="number"
                    value={paintCoverage}
                    onChange={(e) =>
                      setPaintCoverage(parseFloat(e.target.value) || 350)
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.page.coats}
                  </label>
                  <input
                    type="number"
                    value={coats}
                    onChange={(e) => setCoats(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.page.pricePerGallon}
                  </label>
                  <input
                    type="number"
                    value={pricePerGallon}
                    onChange={(e) =>
                      setPricePerGallon(parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <input
                    type="text"
                    value={room.name}
                    onChange={(e) => updateRoomName(room.id, e.target.value)}
                    className="text-xl font-semibold text-gray-900 dark:text-white bg-transparent border-b-2 border-transparent focus:border-blue-500 focus:outline-none"
                  />
                  {rooms.length > 1 && (
                    <button
                      onClick={() => removeRoom(room.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      {t.page.removeRoom}
                    </button>
                  )}
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {t.page.walls}
                    </h3>
                    <button
                      onClick={() => addWall(room.id)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      + {t.page.addWall}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {room.walls.map((wall) => (
                      <div
                        key={wall.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                              {t.page.length}
                            </label>
                            <input
                              type="number"
                              value={wall.length || ''}
                              onChange={(e) =>
                                updateWall(
                                  room.id,
                                  wall.id,
                                  'length',
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                              step="0.1"
                              min="0"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                              {t.page.height}
                            </label>
                            <input
                              type="number"
                              value={wall.height || ''}
                              onChange={(e) =>
                                updateWall(
                                  room.id,
                                  wall.id,
                                  'height',
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                              step="0.1"
                              min="0"
                            />
                          </div>
                        </div>
                        {room.walls.length > 1 && (
                          <button
                            onClick={() => removeWall(room.id, wall.id)}
                            className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {t.page.doorsWindows}
                    </h3>
                    <button
                      onClick={() => addDoorWindow(room.id, 'door')}
                      className="px-3 py-1 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      + {t.page.addDoor}
                    </button>
                    <button
                      onClick={() => addDoorWindow(room.id, 'window')}
                      className="px-3 py-1 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      + {t.page.addWindow}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {room.doorsWindows.map((dw) => (
                      <div
                        key={dw.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize w-20">
                          {dw.type === 'door' ? t.page.addDoor : t.page.addWindow}:
                        </span>
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                              {t.page.width}
                            </label>
                            <input
                              type="number"
                              value={dw.width || ''}
                              onChange={(e) =>
                                updateDoorWindow(
                                  room.id,
                                  dw.id,
                                  'width',
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                              step="0.1"
                              min="0"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                              {t.page.height}
                            </label>
                            <input
                              type="number"
                              value={dw.height || ''}
                              onChange={(e) =>
                                updateDoorWindow(
                                  room.id,
                                  dw.id,
                                  'height',
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                              step="0.1"
                              min="0"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => removeDoorWindow(room.id, dw.id)}
                          className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={addRoom}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
            >
              + {t.page.addRoom}
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t.page.results}
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {t.page.totalArea}
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {totalArea.toFixed(1)} sq ft
                  </div>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {t.page.paintNeeded}
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {gallonsNeeded.toFixed(1)} gallons
                  </div>
                </div>
                {pricePerGallon > 0 && (
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {t.page.estimatedCost}
                    </div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      ${totalCost.toFixed(2)}
                    </div>
                  </div>
                )}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <div className="flex justify-between">
                      <span>{t.page.rooms}:</span>
                      <span className="font-medium">{rooms.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.page.totalWalls}:</span>
                      <span className="font-medium">
                        {rooms.reduce((sum, r) => sum + r.walls.length, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.page.coatsLabel}:</span>
                      <span className="font-medium">{coats}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

