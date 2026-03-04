import React from 'react';
import { MinibusLine, NAV_ITEMS, ANNOUNCEMENTS } from '../data/mockData';
import { X } from 'lucide-react';

interface InfoPanelProps {
  activeTab: string | null;
  onClose: () => void;
  selectedLine: MinibusLine | null;
}

export default function InfoPanel({ activeTab, onClose, selectedLine }: InfoPanelProps) {
  if (!activeTab) return null;

  const getTitle = () => {
    return NAV_ITEMS.find(item => item.id === activeTab)?.label || 'Bilgi';
  };

  const renderContent = () => {
    if (!selectedLine && activeTab !== 'announcements') {
      return <p className="text-gray-500 p-4 text-center">Lütfen önce bir hat seçiniz.</p>;
    }

    switch (activeTab) {
      case 'route':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-blue-900">Güzergah Bilgisi</h3>
            <p className="text-gray-700">
              <span className="font-medium">Başlangıç:</span> {selectedLine?.stops[0].name}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Bitiş:</span> {selectedLine?.stops[selectedLine.stops.length - 1].name}
            </p>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
              Bu hat toplam {selectedLine?.routeCoordinates.length} km uzunluğundadır.
              Ortalama sefer süresi 45 dakikadır.
            </div>
          </div>
        );
      case 'schedule':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-blue-900">Sefer Saatleri</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Hafta İçi</h4>
                {selectedLine?.schedules.weekday.map((s, _i) => (
                  <div key={_i} className="flex justify-between text-sm py-1 border-b border-gray-200 last:border-0">
                    <span>{s.departureTime}</span>
                    <span className="text-gray-500">{s.frequency}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Hafta Sonu</h4>
                {selectedLine?.schedules.weekend.map((s, _i) => (
                  <div key={_i} className="flex justify-between text-sm py-1 border-b border-gray-200 last:border-0">
                    <span>{s.departureTime}</span>
                    <span className="text-gray-500">{s.frequency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'stops':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-blue-900">Durak Listesi</h3>
            <div className="relative border-l-2 border-blue-200 ml-3 space-y-6 py-2">
              {selectedLine?.stops.map((stop) => (
                <div key={stop.id} className="ml-6 relative">
                  <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-sm"></span>
                  <p className="font-medium text-gray-900">{stop.name}</p>
                  <p className="text-xs text-gray-500">Durak No: {1000 + stop.id}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'tariff':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-blue-900">Ücret Tarifesi</h3>
            <div className="bg-white border rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 uppercase">
                  <tr>
                    <th className="px-4 py-3">Mesafe</th>
                    <th className="px-4 py-3 text-right">Ücret</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedLine?.tariffs.map((t, _i) => (
                    <tr key={_i} className="border-b last:border-0">
                      <td className="px-4 py-3 font-medium text-gray-900">{t.distance}</td>
                      <td className="px-4 py-3 text-right text-blue-600 font-bold">
                        {t.price === 0 ? 'ÜCRETSİZ' : `₺${t.price.toFixed(2)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              * İzmirim Kart geçerlidir. Aktarma hakkı 90 dakikadır.
            </p>
          </div>
        );
      case 'announcements':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-blue-900">Duyurular</h3>
            {ANNOUNCEMENTS.map((ann) => (
              <div key={ann.id} className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-yellow-900">{ann.title}</h4>
                  <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">{ann.date}</span>
                </div>
                <p className="text-sm text-yellow-800">{ann.content}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)] max-h-[80vh] flex flex-col animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">{getTitle()}</h2>
        <button 
          onClick={onClose}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>
      <div className="p-4 overflow-y-auto flex-1 pb-8">
        {renderContent()}
      </div>
    </div>
  );
}
