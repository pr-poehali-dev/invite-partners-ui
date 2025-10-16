import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Document {
  id: string;
  sender: string;
  documents: string[];
  date: string;
  status: 'pending' | 'signed' | 'counterparty_signed';
}

const mockDocuments: Document[] = [
  {
    id: '1',
    sender: 'ООО "Рога и копыта"',
    documents: ['Счёт на оплату №9999 от 01.01.2025.pdf'],
    date: '01.01.2025',
    status: 'pending'
  },
  {
    id: '2',
    sender: 'Дмитриев Дмитрий Дмитриевич',
    documents: ['Акт об оказании услуг №9999 от 01.01.2025.pdf'],
    date: '12.05.2025',
    status: 'pending'
  },
  {
    id: '3',
    sender: 'ООО "Рога и копыта"',
    documents: ['Письмо№6 от 01.01.2025'],
    date: '01.01.2025',
    status: 'pending'
  },
  {
    id: '4',
    sender: 'Дмитриев Дмитрий Дмитриевич',
    documents: ['Пакет_№СЧ-СД111111_от_01.01.2025_НазваниеКомпании.pdf'],
    date: '12.05.2025',
    status: 'counterparty_signed'
  },
  {
    id: '5',
    sender: 'ООО "Какое-то очень длинное название компании"',
    documents: [
      'Счёт на оплату №9999 от 01.01.2025.pdf',
      'Акт об оказании услуг №9999 от 01.01.2025.pdf',
      'Письмо№6 от 01.01.2025'
    ],
    date: '01.01.2025',
    status: 'pending'
  },
  {
    id: '6',
    sender: 'ООО "Рога и копыта"',
    documents: [
      'УПД №1234/123 от 02.09.2025',
      '99999,00 ₽ НДС: 9999,00 ₽ со счётов-фактурой',
      'Доверенность'
    ],
    date: '12.05.2025',
    status: 'signed'
  },
  {
    id: '7',
    sender: 'Дмитриев Дмитрий Дмитриевич',
    documents: ['Акт об оказании услуг №9999 от 01.01.2025.pdf'],
    date: '12.05.2025',
    status: 'pending'
  },
  {
    id: '8',
    sender: 'ООО "Рога и копыта"',
    documents: ['Счёт на оплату №9999 от 01.01.2025.pdf'],
    date: '01.01.2025',
    status: 'pending'
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('documents');
  const [activeSubmenu, setActiveSubmenu] = useState('incoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const menuItems = [
    { id: 'documents', label: 'Документы', icon: 'FileText', count: 9999 },
    { id: 'counterparties', label: 'Контрагенты', icon: 'Users', count: 9999 }
  ];

  const submenuItems = [
    { id: 'incoming', label: 'Входящие', count: 9999 },
    { id: 'outgoing', label: 'Исходящие', count: 9999 },
    { id: 'drafts', label: 'Черновики', count: 9999 },
    { id: 'deleted', label: 'Удалённые', count: 9999 },
    { id: 'processing', label: 'Требуют обработки', count: 9999 },
    { id: 'rejected', label: 'Отклонённые', count: 9999 }
  ];

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    setSelectedRows(prev => 
      prev.length === mockDocuments.length ? [] : mockDocuments.map(d => d.id)
    );
  };

  const getStatusBadge = (status: Document['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Требует подписания</Badge>;
      case 'counterparty_signed':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Документооборот завершён</Badge>;
      case 'signed':
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Подписан контрагентом</Badge>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7c3aed] flex items-center justify-center shadow-lg">
              <Icon name="Building2" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">ИП Дмитриев</h1>
              <p className="text-xs text-muted-foreground">Дмитрий Дмитриев</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <Button
            className="w-full mb-6 bg-gradient-to-r from-[#2563EB] to-[#7c3aed] hover:opacity-90 text-white shadow-lg"
            size="lg"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Новый документ
          </Button>

          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeMenu === item.id
                    ? 'bg-blue-50 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="flex-1 text-sm">{item.label}</span>
                {item.count && (
                  <Badge variant="secondary" className="text-xs">
                    {item.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg text-left">
            <Icon name="Settings" size={20} />
            <span className="text-sm">Настройки</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg text-left">
            <Icon name="Award" size={20} />
            <span className="text-sm">Тарифы</span>
          </button>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs font-medium">Хранение</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
              <div className="bg-gradient-to-r from-[#2563EB] to-[#7c3aed] h-1.5 rounded-full" style={{ width: '54%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground">8.2 / 15 ГБ</p>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7c3aed] flex items-center justify-center text-white text-sm font-semibold">
              ДД
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Дмитриев Дмитрий</p>
              <p className="text-xs text-muted-foreground">user@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Secondary Sidebar */}
      {activeMenu === 'documents' && (
        <aside className="w-64 bg-white border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-semibold text-lg">Документы</h2>
          </div>
          <nav className="p-4">
            <div className="space-y-1">
              {submenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSubmenu(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all text-sm ${
                    activeSubmenu === item.id
                      ? 'bg-blue-50 text-primary font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.count && (
                    <Badge variant="secondary" className="text-xs">
                      {item.count}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Входящие документы</h1>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Icon name="SlidersHorizontal" size={16} className="mr-2" />
                  Фильтры
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Icon
                  name="Search"
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="text"
                  placeholder="Поиск"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="FilePlus" size={16} />
                  Подписать
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="UserPlus" size={16} />
                  Согласовать
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="FileDown" size={16} />
                  Отклонить
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="Eye" size={16} />
                  Аннулировать
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="Download" size={16} />
                  Скачать
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="Trash2" size={16} />
                  Удалить
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="Printer" size={16} />
                  Печать
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white px-8 py-3 border-b border-gray-100">
            <div className="text-sm text-muted-foreground">
              Отправитель: <button className="text-primary hover:underline ml-1">Все</button> • 
              <span className="ml-2">Документы: <button className="text-primary hover:underline ml-1">Все</button></span> • 
              <span className="ml-2">Дата: <button className="text-primary hover:underline ml-1">Все</button></span> • 
              <span className="ml-2">Статус: <button className="text-primary hover:underline ml-1">Все</button></span>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white">
            <div className="px-8">
              <table className="w-full">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 w-10">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === mockDocuments.length}
                        onChange={toggleAllRows}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                        Отправитель
                        <Icon name="ChevronDown" size={14} />
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Документы</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                        Дата
                        <Icon name="ChevronDown" size={14} />
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                        Статус
                        <Icon name="ChevronDown" size={14} />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockDocuments.map((doc) => (
                    <tr 
                      key={doc.id} 
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(doc.id)}
                          onChange={() => toggleRowSelection(doc.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-sm">{doc.sender}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          {doc.documents.map((docName, idx) => (
                            <div key={idx} className="text-sm text-primary hover:underline">
                              {docName}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">{doc.date}</div>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(doc.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
