import React, { useState } from 'react';
import { MOCK_LINES, NAV_ITEMS } from './data/mockData';
import MapView from './components/MapView';
import InfoPanel from './components/InfoPanel';
import { Menu, Search, Bus } from 'lucide-react';

function App() {
  const [selectedLineId, setSelectedLineId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const selectedLine = MOCK_LINES.find(l => l.id === selectedLineId) || null;

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 overflow-hidden relative font-sans">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 shadow-md z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-900 shadow-sm">
            <Bus size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Minibüsüm Nerede</h1>
            <p className="text-xs text-blue-200">İzmir Büyükşehir Belediyesi</p>
          </div>
        </div>
        <button className="p-2 hover:bg-blue-800 rounded-lg transition-colors">
          <Menu size={24} />
        </button>
      </header>

      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm z-20">
        <div className="flex justify-around items-center">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(isActive ? null : item.id)}
                className={`flex flex-col items-center justify-center py-3 px-1 w-full transition-all duration-200 ${
                  isActive ? 'text-blue-900 bg-blue-50 border-b-2 border-blue-900' : 'text-gray-500 hover:text-blue-800'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area (Map) */}
      <main className="flex-1 relative z-0">
        <MapView selectedLine={selectedLine} />

        {/* Floating Line Selector */}
        <div className="absolute top-4 left-4 right-4 z-[1000]">
          <div className="bg-white rounded-xl shadow-lg p-2 flex items-center gap-2 border border-gray-200">
            <Search className="text-gray-400 ml-2" size={20} />
            <select 
              className="w-full bg-transparent p-2 outline-none text-gray-700 font-medium"
              value={selectedLineId}
              onChange={(e) => setSelectedLineId(e.target.value)}
            >
              <option value="">Hat Seçiniz...</option>
              {MOCK_LINES.map(line => (
                <option key={line.id} value={line.id}>
                  {line.id} - {line.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </main>

      {/* Info Panel Overlay */}
      {activeTab && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 z-30 backdrop-blur-[1px]"
            onClick={() => setActiveTab(null)}
          />
          <InfoPanel 
            activeTab={activeTab} 
            onClose={() => setActiveTab(null)} 
            selectedLine={selectedLine}
          />
        </>
      )}
    </div>
  );
}

export default App;
