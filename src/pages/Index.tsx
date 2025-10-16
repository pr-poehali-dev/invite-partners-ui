import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Counterparty {
  id: string;
  name: string;
  inn: string;
  kpp: string;
  address: string;
  status: 'invite' | 'accept' | 'in_list';
  date: string;
}

const mockCounterparties: Counterparty[] = [
  {
    id: '1',
    name: 'ООО "Рога и копыта"',
    inn: '4693801631',
    kpp: '0474273962',
    address: 'г. Москва, ул. Тверская, д. 15, офис 302',
    status: 'invite',
    date: '01.01.2025'
  },
  {
    id: '2',
    name: 'Дмитриев Дмитрий Дмитриевич',
    inn: '4693801631',
    kpp: '0474273962',
    address: 'г. Москва, ул. Тверская, д. 15, офис 302',
    status: 'invite',
    date: '12.05.2025'
  },
  {
    id: '3',
    name: 'ООО "Какое-то очень длинное название компании"',
    inn: '1234567890',
    kpp: '0987654321',
    address: 'г. Тульская обл., г. Новомосковск, ул. Березовая, д. 1',
    status: 'accept',
    date: '01.01.2025'
  },
  {
    id: '4',
    name: 'Дмитриев Дмитрий Дмитриевич',
    inn: '1234567890',
    kpp: '0987654321',
    address: 'г. Тульская обл., г. Новомосковск, ул. Березовая, д. 1',
    status: 'in_list',
    date: '12.05.2025'
  },
  {
    id: '5',
    name: 'ООО "Рога и копыта"',
    inn: '4693801631',
    kpp: '0474273962',
    address: 'г. Москва, ул. Тверская, д. 15, офис 302',
    status: 'invite',
    date: '01.01.2025'
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('counterparties');
  const [activeSubmenu, setActiveSubmenu] = useState('invite');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'date'>('name');

  const menuItems = [
    { id: 'counterparties', label: 'Контрагенты', icon: 'Users', hasSubmenu: true },
    { id: 'documents', label: 'Документы', icon: 'FileText', count: 9999 },
    { id: 'profile', label: 'Профиль компании', icon: 'Building2' },
    { id: 'tariffs', label: 'Тарифы', icon: 'CreditCard' }
  ];

  const submenuItems = [
    { id: 'invite', label: 'Пригласить контрагента' },
    { id: 'your_counterparties', label: 'Ваши контрагенты', count: 9999 },
    { id: 'invitations', label: 'Приглашения вас', count: 9999, link: '/invitations' },
    { id: 'blocked', label: 'Заблокированные', count: 9999 }
  ];

  const toggleRowSelection = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleAllRows = () => {
    setSelectedRows(prev => 
      prev.length === mockCounterparties.length ? [] : mockCounterparties.map(c => c.id)
    );
  };

  const getStatusBadge = (status: Counterparty['status']) => {
    switch (status) {
      case 'invite':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Требует подписания</Badge>;
      case 'accept':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Требует подписания</Badge>;
      case 'in_list':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Подписан контрагентом</Badge>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7c3aed] flex items-center justify-center">
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
            className="w-full mb-6 bg-gradient-to-r from-[#2563EB] to-[#7c3aed] hover:opacity-90 text-white"
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

      {/* Secondary Sidebar (Submenu) */}
      {activeMenu === 'counterparties' && (
        <aside className="w-64 bg-white border-r border-gray-200 animate-in slide-in-from-left duration-300">
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-semibold text-lg">Контрагенты</h2>
          </div>
          <nav className="p-4">
            <Button
              className="w-full mb-4 bg-gradient-to-r from-[#2563EB] to-[#7c3aed] hover:opacity-90 text-white"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Пригласить контрагентов
            </Button>
            <div className="space-y-1">
              {submenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.link) {
                      navigate(item.link);
                    } else {
                      setActiveSubmenu(item.id);
                    }
                  }}
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
              <h1 className="text-2xl font-bold">Пригласить контрагентов</h1>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Icon name="SlidersHorizontal" size={16} className="mr-2" />
                  Фильтры
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  Удалить
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Printer" size={16} className="mr-2" />
                  Печать
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
              <Button className="bg-gradient-to-r from-[#2563EB] to-[#7c3aed] hover:opacity-90 text-white">
                <Icon name="Upload" size={18} className="mr-2" />
                Загрузить файл со списком ИНН
              </Button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Icon name="FilePlus" size={16} />
                      Подписать
                      <Icon name="ChevronDown" size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Подписать выбранные</DropdownMenuItem>
                    <DropdownMenuItem>Подписать все</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Icon name="UserPlus" size={16} />
                      Согласовать
                      <Icon name="ChevronDown" size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Отправить на согласование</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="FileDown" size={16} />
                  Отклонить
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Icon name="Eye" size={16} />
                      Аннулировать
                      <Icon name="ChevronDown" size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Аннулировать выбранные</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="Download" size={16} />
                  Скачать
                </Button>

                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="Trash2" size={16} />
                  Удалить
                </Button>

                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="Lock" size={16} />
                  Печать
                </Button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Icon name="SlidersHorizontal" size={16} />
                    Фильтры
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Все контрагенты</DropdownMenuItem>
                  <DropdownMenuItem>Требуют подписания</DropdownMenuItem>
                  <DropdownMenuItem>Подписанные</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white">
            <div className="px-8 py-4">
              <div className="text-sm text-muted-foreground mb-4">
                Отправитель: <button className="text-primary hover:underline">Все</button> • 
                Документы: <button className="text-primary hover:underline">Все</button> • 
                Дата: <button className="text-primary hover:underline">Все</button> • 
                Статус: <button className="text-primary hover:underline">Все</button>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 w-10">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === mockCounterparties.length}
                        onChange={toggleAllRows}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900">
                      <div className="flex items-center gap-1">
                        Отправитель
                        <Icon name="ChevronDown" size={14} />
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Документы</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900">
                      <div className="flex items-center gap-1">
                        Дата
                        <Icon name="ChevronDown" size={14} />
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900">
                      <div className="flex items-center gap-1">
                        Статус
                        <Icon name="ChevronDown" size={14} />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockCounterparties.map((counterparty) => (
                    <tr 
                      key={counterparty.id} 
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(counterparty.id)}
                          onChange={() => toggleRowSelection(counterparty.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-sm">{counterparty.name}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="text-sm text-primary hover:underline">
                            Счёт на оплату №{counterparty.inn.slice(0, 4)} от {counterparty.date}.pdf
                          </div>
                          <div className="text-sm text-primary hover:underline">
                            Акт об оказании услуг №{counterparty.kpp.slice(0, 4)} от {counterparty.date}.pdf
                          </div>
                          <div className="text-sm text-primary hover:underline">
                            Письмо№{counterparty.id} от {counterparty.date}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">{counterparty.date}</div>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(counterparty.status)}
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
