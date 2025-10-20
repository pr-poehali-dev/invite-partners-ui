import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20">
      {/* Main Sidebar */}
      <aside className="w-64 bg-white/70 backdrop-blur-xl flex flex-col shadow-xl mr-4">
        <div className="p-6 border-b border-gray-200/50">
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
            onClick={() => navigate('/add-document')}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Новый документ
          </Button>

          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  activeMenu === item.id
                    ? 'bg-blue-50 text-primary font-medium shadow-md'
                    : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
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

        <div className="p-4 mt-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:shadow-md rounded-xl text-left transition-all">
            <Icon name="Settings" size={20} />
            <span className="text-sm">Настройки</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:shadow-md rounded-xl text-left transition-all">
            <Icon name="Award" size={20} />
            <span className="text-sm">Тарифы</span>
          </button>
        </div>

        <div className="p-4 mt-4">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 shadow-md">
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

        <div className="p-4 mt-4">
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
        <aside className="w-64 bg-white/70 backdrop-blur-xl shadow-xl mr-4">
          <div className="p-6 mb-2">
            <h2 className="font-semibold text-lg">Документы</h2>
          </div>
          <nav className="p-4">
            <div className="space-y-1">
              {submenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSubmenu(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all text-sm ${
                    activeSubmenu === item.id
                      ? 'bg-blue-50 text-primary font-medium shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
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
          <div className="bg-white/70 backdrop-blur-xl px-8 py-8 shadow-md mb-4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Входящие документы</h1>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => navigate('/add-document')}
                  className="bg-[#39587C] hover:bg-[#2d4560] text-white shadow-lg"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить документ
                </Button>
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
          <div className="bg-white/70 backdrop-blur-xl px-8 py-4 shadow-md mb-4">
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
          <div className="bg-white/70 backdrop-blur-xl px-8 py-4 shadow-md mb-4 rounded-xl mx-8">
            <div className="text-sm text-muted-foreground">
              Отправитель: <button className="text-primary hover:underline ml-1">Все</button> • 
              <span className="ml-2">Документы: <button className="text-primary hover:underline ml-1">Все</button></span> • 
              <span className="ml-2">Дата: <button className="text-primary hover:underline ml-1">Все</button></span> • 
              <span className="ml-2">Статус: <button className="text-primary hover:underline ml-1">Все</button></span>
            </div>
          </div>

          {/* Cards List */}
          <div className="flex-1 overflow-auto bg-gradient-to-b from-white/70 to-white/50 p-8">
            <div className="space-y-5">
              {mockDocuments.map((doc) => (
                <Card 
                  key={doc.id} 
                  className="bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all cursor-pointer border-0 overflow-hidden rounded-2xl"
                  onClick={() => navigate(`/document/${doc.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="pt-1" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(doc.id)}
                          onChange={() => toggleRowSelection(doc.id)}
                          className="rounded border-gray-300 w-5 h-5"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                                <Icon name="Building2" size={20} className="text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-base text-gray-900">{doc.sender}</h3>
                                <p className="text-sm text-muted-foreground">{doc.date}</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            {getStatusBadge(doc.status)}
                          </div>
                        </div>

                        <div className="space-y-2 pl-13">
                          {doc.documents.map((docName, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-primary hover:underline">
                              <Icon name="FileText" size={16} className="flex-shrink-0" />
                              <span>{docName}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;